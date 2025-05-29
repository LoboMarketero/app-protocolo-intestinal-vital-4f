import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { protocolData } from '../data/protocol';
import { ArrowLeft, Droplet, Coffee, Moon, CheckCircle2, Clock } from 'lucide-react';

interface DailyProtocolProps {
  onBack: () => void;
}

const DailyProtocol: React.FC<DailyProtocolProps> = ({ onBack }) => {
  const { user, incrementDay } = useUser();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const todayProtocol = protocolData.find(p => p.day === user.currentDay);

  if (!todayProtocol) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card">
          <p className="text-gray-600">Protocolo não encontrado para o dia {user.currentDay}</p>
        </div>
      </div>
    );
  }

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    } else {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    }
  };

  const allStepsCompleted = completedSteps.length === 3;

  const handleCompleteDay = () => {
    if (allStepsCompleted && user.currentDay < 21) {
      incrementDay();
      setCompletedSteps([]);
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
    <div className="container mx-auto px-4 py-8 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-jade hover:text-jade/80"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <span className="badge badge-essencial">Dia {user.currentDay}/21</span>
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
      {allStepsCompleted && user.currentDay < 21 && (
        <div className="fixed bottom-20 left-4 right-4 z-40">
          <button
            onClick={handleCompleteDay}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Clock className="w-5 h-5" />
            Concluir Dia {user.currentDay} e Avançar
          </button>
        </div>
      )}

      {/* Completion Message */}
      {user.currentDay === 21 && allStepsCompleted && (
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
