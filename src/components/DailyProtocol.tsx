import React, { useState, useEffect } from 'react'; // Added useEffect
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase'; // Added supabase import
import { protocolData } from '../data/protocol';
import { ArrowLeft, Droplet, Coffee, Moon, CheckCircle2, Clock } from 'lucide-react';

interface DailyProtocolProps {
  onBack: () => void;
}

// Add these functions to save/load progress
const loadDailyProgress = async (userId: string, day: number) => {
  console.log(`[DailyProtocol] loadDailyProgress called for userId: ${userId}, day: ${day}`);
  const { data, error } = await supabase
    .from('daily_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('day', day)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116: "Searched item was not found"
    console.error('[DailyProtocol] loadDailyProgress - Error loading progress:', error);
    return null;
  }
  if (error && error.code === 'PGRST116') {
    console.log(`[DailyProtocol] loadDailyProgress - No progress record found for userId: ${userId}, day: ${day}. This is normal if no tasks completed yet.`);
    return null;
  }
  console.log(`[DailyProtocol] loadDailyProgress - Successfully fetched progress for userId: ${userId}, day: ${day}, data:`, JSON.stringify(data));
  return data;
}

const saveDailyProgress = async (userId: string, day: number, progress: any) => {
  console.log('[DailyProtocol] saveDailyProgress - Attempting to save progress:', { userId, day, progress });
  const upsertData = {
    user_id: userId,
    day,
    morning_completed: progress.morning,
    afternoon_completed: progress.afternoon,
    evening_completed: progress.evening, // Maps to 'night' in UI state
    completed_at: (progress.morning && progress.afternoon && progress.evening) ? new Date().toISOString() : null
  };

  const { data, error } = await supabase
    .from('daily_progress')
    .upsert(upsertData, {
      onConflict: 'user_id,day' // Specify the constraint to use for conflict resolution
    })
    .select(); // Return the upserted row(s)

  console.log('[DailyProtocol] saveDailyProgress - upsert result data (should be array of upserted rows):', JSON.stringify(data));
  if (error) {
    console.error('[DailyProtocol] saveDailyProgress - upsert error:', error);
    throw error;
  }
  return data; 
}

const DailyProtocol: React.FC<DailyProtocolProps> = ({ onBack }) => {
  const { authUser, userProfile, advanceDay } = useUser(); 
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  if (!authUser || !userProfile) {
    return <div className="p-4 text-center">Carregando dados do usuário ou perfil...</div>;
  }
  // Now authUser and userProfile are guaranteed non-null.

  const currentDay = userProfile.current_day;
  const todayProtocol = protocolData.find(p => p.day === currentDay);

  useEffect(() => {
    console.log('[DailyProtocol] useEffect triggered. AuthUser ID:', authUser.id, 'currentDay:', currentDay, 'todayProtocol exists:', !!todayProtocol);
    // userProfile is already confirmed non-null if we reach here due to the guard above.
    // authUser.id is also confirmed.
    if (todayProtocol) { // Only need to check todayProtocol as authUser and userProfile are guarded
      const performLoadProgress = async () => {
        console.log('[DailyProtocol] useEffect - Condition met, calling loadDailyProgress.');
        const progressData = await loadDailyProgress(authUser.id, currentDay);
        console.log('[DailyProtocol] useEffect - loadDailyProgress returned:', JSON.stringify(progressData));
        if (progressData) {
          const steps = [];
          if (progressData.morning_completed) steps.push('morning');
          if (progressData.afternoon_completed) steps.push('afternoon');
          if (progressData.evening_completed) steps.push('night'); // Map evening_completed to 'night'
          console.log('[DailyProtocol] useEffect - Setting completedSteps from DB data:', steps);
          setCompletedSteps(steps);
        } else {
          console.log('[DailyProtocol] useEffect - No progressData from DB, setting completedSteps to empty array.');
          setCompletedSteps([]); 
        }
      };
      performLoadProgress();
    } else {
      console.log('[DailyProtocol] useEffect - Condition NOT met for loading progress.');
    }
  }, [authUser, userProfile, currentDay]); // Corrected dependency array

  // The guards for !authUser, !userProfile, and !todayProtocol are now at the top or implicit.
  // if (!authUser || !userProfile) handled by early return.
  // if (!todayProtocol) also needs to be handled if currentDay could be invalid.
  // For now, assuming currentDay from userProfile will always find a todayProtocol or component handles it.
  // The existing !todayProtocol guard is fine.

  if (!todayProtocol) { // This guard is still useful if current_day from DB is out of protocolData range
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card">
          <p className="text-gray-600">Protocolo não encontrado para o dia {currentDay}</p>
        </div>
      </div>
    );
  }

  const handleStepComplete = async (stepId: string) => {
    let newCompletedSteps;
    if (!completedSteps.includes(stepId)) {
      newCompletedSteps = [...completedSteps, stepId];
    } else {
      newCompletedSteps = completedSteps.filter(id => id !== stepId);
    }
    setCompletedSteps(newCompletedSteps);

    // authUser and userProfile are guaranteed non-null here by the top guard
    const progressToSave = {
      morning: newCompletedSteps.includes('morning'),
      afternoon: newCompletedSteps.includes('afternoon'),
      evening: newCompletedSteps.includes('night'),
    };
    try {
      console.log('[DailyProtocol] handleStepComplete - calling saveDailyProgress with:', { userId: authUser.id, currentDay, progressToSave });
      const savedData = await saveDailyProgress(authUser.id, currentDay, progressToSave);
      console.log('[DailyProtocol] handleStepComplete - progress saved successfully:', savedData);
    } catch (error) {
      console.error('[DailyProtocol] handleStepComplete - error saving progress:', error);
    }
  };

  const allStepsCompleted = completedSteps.length === 3;

  const handleCompleteDay = async () => {
    // userProfile is guaranteed non-null here due to the guard at the component's top.
    // currentDay is derived from userProfile.current_day.
    if (allStepsCompleted && typeof currentDay === 'number' && currentDay < 21) {
      await advanceDay();
      // Optionally reset local steps for immediate UI feedback, though useEffect will handle it upon context update.
      // setCompletedSteps([]); 
      // The useEffect listening to currentDay (from the updated userProfile in context)
      // will fetch the new day's progress, effectively resetting/updating the UI.
    }
  };

  const StepCard = ({
    stepId, 
    icon, 
    iconBg, 
    period, 
    data 
  }: { 
    stepId: string;
    icon: React.ReactNode;
    iconBg: string;
    period: string;
    data: { title: string; description: string; preparation?: string };
  }) => {
    const isCompleted = completedSteps.includes(stepId);

    return (
      <div className={`card transition-all ${isCompleted ? 'border-jade bg-jade/5' : ''}`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${iconBg}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-1">{period}</h4>
            <h5 className="font-bold text-jade mb-2">{data.title}</h5>
            <p className="text-gray-600 text-sm mb-3">{data.description}</p>
            
            {data.preparation && (
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700">
                  <strong>Como preparar:</strong> {data.preparation}
                </p>
              </div>
            )}

            <button
              onClick={() => handleStepComplete(stepId)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isCompleted 
                  ? 'bg-jade text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Concluído' : 'Marcar como feito'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-36"> {/* Increased bottom padding */}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-jade hover:text-jade/80"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <span className="badge badge-essencial">Dia {currentDay}/21</span>
      </div>

      {/* Phase Info */}
      <div className="card mb-6 bg-gradient-to-r from-jade/10 to-mint/10">
        <h2 className="text-2xl font-bold text-jade mb-2">
          Fase {todayProtocol.phase}: {todayProtocol.phaseName}
        </h2>
        <p className="text-gray-700">
          {todayProtocol.phase === 1 && 'Preparando seu corpo para a transformação'}
          {todayProtocol.phase === 2 && 'Eliminando toxinas e parasitas do seu sistema'}
          {todayProtocol.phase === 3 && 'Restaurando sua flora intestinal saudável'}
          {todayProtocol.phase === 4 && 'Fortalecendo seu sistema digestivo'}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Progresso de hoje
          </span>
          <span className="text-sm font-semibold text-jade">
            {completedSteps.length}/3 completos
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-jade to-mint h-full transition-all duration-500"
            style={{ width: `${(completedSteps.length / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Protocol Steps */}
      <div className="space-y-4 mb-8">
        <StepCard
          stepId="morning"
          icon={<Droplet className="w-6 h-6 text-yellow-600" />}
          iconBg="bg-yellow-100"
          period="MANHÃ"
          data={todayProtocol.morning}
        />

        <StepCard
          stepId="afternoon"
          icon={<Coffee className="w-6 h-6 text-orange-600" />}
          iconBg="bg-orange-100"
          period="TARDE"
          data={todayProtocol.afternoon}
        />

        <StepCard
          stepId="night"
          icon={<Moon className="w-6 h-6 text-indigo-600" />}
          iconBg="bg-indigo-100"
          period="NOITE"
          data={todayProtocol.night}
        />
      </div>

      {/* Complete Day Button */}
      {allStepsCompleted && currentDay < 21 && (
        <div className="fixed bottom-24 left-4 right-4 z-40"> {/* Increased bottom offset */}
          <button
            onClick={handleCompleteDay}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Clock className="w-5 h-5" />
            Concluir Dia {currentDay} e Avançar
          </button>
        </div>
      )}

      {/* Completion Message */}
      {currentDay === 21 && allStepsCompleted && (
        <div className="card bg-gradient-to-r from-gold/20 to-yellow-400/20 border-gold/30">
          <h3 className="text-xl font-bold text-jade mb-2">
            🎉 Parabéns! Você completou o protocolo!
          </h3>
          <p className="text-gray-700">
            Você finalizou os 21 dias do Protocolo Vital 4F. Continue mantendo os hábitos saudáveis!
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyProtocol;
