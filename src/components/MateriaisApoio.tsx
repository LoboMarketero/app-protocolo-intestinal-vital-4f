import React, { useState } from 'react'; // Added useState
import MaterialCard from './MaterialCard';
import { NavigationProps } from '../types/components';
import { useUser } from '../context/UserContext'; // Using UserContext
import { ArrowLeft, CheckCircle, X } from 'lucide-react'; // Added icons for modal

// Placeholder data for checklists - this would ideally come from a data file
const checklistData: Record<number, { title: string; items: string[] }> = {
  1: { title: "Checklist Fase 1: Preparação", items: ["Beber 2L de água", "Evitar açúcar refinado", "Consumir probióticos"] },
  2: { title: "Checklist Fase 2: Eliminação Ativa", items: ["Tomar shot matinal", "Seguir dieta antiparasitária", "Chá específico à noite"] },
  3: { title: "Checklist Fase 3: Restauração", items: ["Introduzir alimentos fermentados", "Suplementar com L-glutamina", "Manter hidratação"] },
  4: { title: "Checklist Fase 4: Fortalecimento", items: ["Consumir fibras prebióticas", "Exercício físico regular", "Sono reparador de 8h"] },
};

const MateriaisApoio: React.FC<NavigationProps> = ({ onBack }) => { // Removed userPlan from props
  const { userProfile } = useUser(); // Get userProfile from context
  const [selectedChecklistPhase, setSelectedChecklistPhase] = useState<number | null>(null);

  if (!userProfile) {
    return <div className="p-4 text-center">Carregando dados do usuário...</div>;
  }
  const actualUserPlan = userProfile.plan as 'essencial' | 'completo' | 'premium'; // Cast for MaterialCard

  const ChecklistModal = ({ phase, onClose }: { phase: number; onClose: () => void }) => {
    const data = checklistData[phase];
    if (!data) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-jade">{data.title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <ul className="space-y-2 mb-6">
            {data.items.map((item, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <CheckCircle size={18} className="text-mint mr-2 flex-shrink-0" /> 
                {item}
              </li>
            ))}
          </ul>
          <button onClick={onClose} className="btn-secondary w-full">
            Fechar
          </button>
        </div>
      </div>
    );
  };
  
  const checklistPhases = [1, 2, 3, 4];

  return (
    <div className="container mx-auto px-4 py-8 pb-24"> {/* Standard container */}
      {onBack && (
        <button 
          onClick={onBack}
          className="mb-4 text-jade hover:text-jade/80 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> {/* Using ArrowLeft from lucide */}
          Voltar
        </button>
      )}
      <h1 className="text-3xl font-bold text-jade mb-8 text-center">📋 Materiais de Apoio</h1>

      {/* Checklists Básicos - TODOS OS PLANOS */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-jade mb-4">✅ Checklists Básicos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {checklistPhases.map(phase => (
            <button 
              key={phase}
              onClick={() => setSelectedChecklistPhase(phase)}
              className="checklist-card card bg-mint/10 p-4 text-center hover:shadow-lg transition-shadow"
            >
              <span className="text-3xl block mb-2">📋</span>
              <span className="font-semibold text-jade">Checklist Fase {phase}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedChecklistPhase && (
        <ChecklistModal 
          phase={selectedChecklistPhase} 
          onClose={() => setSelectedChecklistPhase(null)} 
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Guia de Manutenção - COMPLETO/PREMIUM */}
        <MaterialCard
          title="📖 Guia de Manutenção"
          description="15 receitas anti-reinfestação + cronograma mensal de prevenção"
          requiredPlan="completo"
          userPlan={actualUserPlan} 
          upgradePrice="R$ 40" // This might need to be dynamic based on current plan
          preview={{
            items: [
              "✅ 15 receitas anti-reinfestação",
              "✅ Cronograma mensal de prevenção", 
              "✅ Sinais de alerta de parasitas",
              "✅ Protocolo semanal de manutenção"
            ],
            content: "Semana 1 pós-protocolo: Para manter os resultados ████████████████ [CONTEÚDO BLOQUEADO]"
          }}
        />

        {/* 25 Receitas Extras - COMPLETO/PREMIUM */}
        <MaterialCard
          title="🍹 25 Receitas Extras"
          description="Acelere 2x mais seus resultados com receitas exclusivas"
          requiredPlan="completo"
          userPlan={actualUserPlan}
          upgradePrice="R$ 40"
          preview={{
            categories: [
              "🥤 Suco Verde Turbinado",
              "⚡ Shots Potencializados", 
              "🔥 Água Queima-Gordura",
              "🌟 Smoothies Termogênicos",
              "🍵 Chás Noturnos +"
            ],
            recipePreview: "🥤 SUCO VERDE TURBO\nCouve + ████████ [INGREDIENTES BLOQUEADOS]"
          }}
        />

        {/* Coach Virtual - APENAS PREMIUM */}
        <MaterialCard
          title="🧠 Coach Virtual"
          description="Orientação personalizada com IA para maximizar resultados"
          requiredPlan="premium"
          userPlan={actualUserPlan}
          upgradePrice="R$ 80" // From Essencial to Premium (127-47=80) or Completo to Premium (127-87=40) - User prompt says R$80
          preview={{
            features: [
              "✅ Análise diária personalizada",
              "✅ Recomendações adaptativas",
              "✅ Alertas inteligentes",
              "✅ Chat com IA 24/7"
            ]
          }}
        />
      </div>
    </div>
  );
};

export default MateriaisApoio;
