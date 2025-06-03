import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';
import { protocolData, protocolPhases } from '../data/protocol'; // Import protocolPhases
// import { TaskDetails } from '../types'; // Reverted: TaskDetails removed
import { ArrowLeft, Droplet, Coffee, Moon, CheckCircle2, Clock } from 'lucide-react'; // Removed Info

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

// Function to load checklist item completions
const loadChecklistProgress = async (userId: string, day: number) => {
  console.log(`[DailyProtocol] loadChecklistProgress called for userId: ${userId}, day: ${day}`);
  const { data, error } = await supabase
    .from('checklist_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('day', day)
    .single();
  
  if (error && error.code !== 'PGRST116') {
    console.error('[DailyProtocol] loadChecklistProgress - Error loading checklist progress:', error);
    return {};
  }
  
  if (data && data.checklist_data) {
    console.log(`[DailyProtocol] loadChecklistProgress - Successfully fetched checklist data for userId: ${userId}, day: ${day}`);
    return data.checklist_data;
  }
  
  return {};
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

// Function to save checklist item completions
const saveChecklistProgress = async (userId: string, day: number, checklistData: Record<string, boolean>) => {
  console.log('[DailyProtocol] saveChecklistProgress - Saving checklist data:', { userId, day, checklistItems: Object.keys(checklistData).length });
  
  const upsertData = {
    user_id: userId,
    day,
    checklist_data: checklistData,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('checklist_progress')
    .upsert(upsertData, {
      onConflict: 'user_id,day'
    })
    .select();

  if (error) {
    console.error('[DailyProtocol] saveChecklistProgress - Error saving checklist data:', error);
    throw error;
  }
  
  console.log('[DailyProtocol] saveChecklistProgress - Checklist data saved successfully');
  return data;
}

const DailyProtocol: React.FC<DailyProtocolProps> = ({ onBack }) => {
  const { authUser, userProfile, advanceDay } = useUser();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [itemCompletions, setItemCompletions] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Ensure userProfile and authUser are loaded
  if (!authUser || !userProfile) {
    return <div className="p-4 text-center">Carregando dados do usuário ou perfil...</div>;
  }

  const currentDay = userProfile.current_day;
  const todayProtocol = protocolData.find(p => p.day === currentDay);
  const currentPhaseInfo = protocolPhases.find(p => p.id === todayProtocol?.phase);

  // Load daily progress (main tasks) and checklist items
  useEffect(() => {
    console.log('[DailyProtocol] useEffect triggered. AuthUser ID:', authUser.id, 'currentDay:', currentDay, 'todayProtocol exists:', !!todayProtocol);
    if (todayProtocol) {
      const performLoadProgress = async () => {
        setIsLoading(true);
        console.log('[DailyProtocol] useEffect - Condition met, calling loadDailyProgress.');
        
        try {
          // Load main tasks progress
          const progressData = await loadDailyProgress(authUser.id, currentDay);
          console.log('[DailyProtocol] useEffect - loadDailyProgress returned:', JSON.stringify(progressData));
          if (progressData) {
            const steps = [];
            if (progressData.morning_completed) steps.push('morning');
            if (progressData.afternoon_completed) steps.push('afternoon');
            if (progressData.evening_completed) steps.push('night');
            console.log('[DailyProtocol] useEffect - Setting completedSteps from DB data:', steps);
            setCompletedSteps(steps);
          } else {
            console.log('[DailyProtocol] useEffect - No progressData from DB, setting completedSteps to empty array.');
            setCompletedSteps([]);
          }
          
          // Load checklist items progress
          const checklistData = await loadChecklistProgress(authUser.id, currentDay);
          console.log('[DailyProtocol] useEffect - Loaded checklist data:', checklistData);
          setItemCompletions(checklistData || {});
        } catch (error) {
          console.error('[DailyProtocol] useEffect - Error loading progress:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      performLoadProgress();
    } else {
      console.log('[DailyProtocol] useEffect - Condition NOT met for loading progress.');
      setIsLoading(false);
    }
  }, [authUser.id, currentDay, todayProtocol]); // authUser.id is stable, userProfile.current_day changes currentDay

  if (!todayProtocol || !currentPhaseInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card">
          <p className="text-gray-600">Protocolo ou informações da fase não encontrados para o dia {currentDay}</p>
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

  const handleChecklistItemToggle = async (stepId: string, itemIndex: number) => {
    const itemKey = `${stepId}-${itemIndex}`;
    const newCompletions = {
      ...itemCompletions,
      [itemKey]: !itemCompletions[itemKey]
    };
    
    setItemCompletions(newCompletions);
    
    try {
      // Save the updated checklist data to the database
      await saveChecklistProgress(authUser.id, currentDay, newCompletions);
      console.log('[DailyProtocol] handleChecklistItemToggle - Checklist progress saved successfully');
    } catch (error) {
      console.error('[DailyProtocol] handleChecklistItemToggle - Error saving checklist progress:', error);
      // Revert the state if there was an error saving
      setItemCompletions(itemCompletions);
    }
  };

  const StepCard = ({
    stepId,
    icon,
    iconBg,
    data,
    period,
  }: {
    stepId: string;
    icon: React.ReactNode;
    iconBg: string;
    data: { 
      title: string; 
      description: string; 
      preparation?: string; 
      checklist?: { text: string; checked?: boolean }[];
    };
    period: string;
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
            
            {data.checklist && data.checklist.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <h6 className="text-sm font-semibold text-gray-700 mb-2">Checklist:</h6>
                <ul className="space-y-1">
                  {data.checklist.map((item, index) => {
                    const itemKey = `${stepId}-${index}`;
                    const isItemChecked = itemCompletions[itemKey] || false;
                    
                    return (
                      <li key={index} className="flex items-start gap-2">
                        <button 
                          onClick={() => handleChecklistItemToggle(stepId, index)}
                          className="mt-0.5 flex-shrink-0"
                        >
                          {isItemChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-jade" />
                          ) : (
                            <div className="w-4 h-4 border border-gray-400 rounded-full" />
                          )}
                        </button>
                        <span className={`text-sm ${isItemChecked ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                          {item.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-jade/20 rounded-full mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-16"> {/* Reduced bottom padding */}
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
          {currentPhaseInfo.name} {/* This was 'Fase X: NAME', now just NAME from protocolPhases */}
        </h2>
        <p className="text-gray-700">
          {currentPhaseInfo.description} {/* Reverted from objective to description */}
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
