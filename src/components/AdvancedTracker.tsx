import React, { useState } from 'react'; // Added useState for activeTab
import LockedPreview from './LockedPreview';
import { useUser } from '../context/UserContext'; // Import useUser
import { TrendingUp } from 'lucide-react'; // For upgrade button icon

interface AdvancedTrackerProps {
  // userPlan prop will be removed, access via context
  onNavigateToUpgrade?: () => void; // Optional prop to handle navigation for locked state
}

const AdvancedTracker: React.FC<AdvancedTrackerProps> = ({ onNavigateToUpgrade }) => {
  const { userProfile, permissions } = useUser(); // Use context
  const [activeTab, setActiveTab] = useState<'peso' | 'energia' | 'inchaco' | 'sono'>('peso');

  if (!userProfile || !permissions) {
    return <div className="p-4 text-center">Carregando dados...</div>;
  }

  const hasAccess = permissions.canAccessAdvancedTracker; // Use permission from context

  // Placeholder for chart initialization logic
  // React.useEffect(() => {
  //   if (hasAccess) {
  //     // Logic for activeTab can be added here if charts were real
  //     const canvas = document.getElementById('advancedChart') as HTMLCanvasElement;
  //     if (canvas) {
  //       // Initialize chart here
  //       const ctx = canvas.getContext('2d');
  //       // ... chart drawing logic
  //     }
  //   }
  // }, [hasAccess, activeTab]);

  if (!hasAccess) {
    // For users on 'essencial' plan, show LockedPreview with upgrade option
    return (
      <LockedPreview 
        componentName="Tracker Avançado" 
        onUpgradeClick={onNavigateToUpgrade} 
      />
    );
  }

  // Helper function to determine tab style
  const getTabStyle = (tabName: typeof activeTab) => {
    return activeTab === tabName
      ? "py-2 px-4 text-jade border-b-2 border-jade font-semibold"
      : "py-2 px-4 text-gray-500 hover:text-jade";
  };

  return (
    <div className="tracker-avancado"> {/* Removed section class, App.tsx provides container */}
      <h2 className="text-2xl font-bold text-jade mb-6 text-center md:text-left">📊 Análises Premium</h2>
      
      <div className="advanced-charts card mb-6">
        <h3 className="text-xl font-semibold text-jade mb-4">Gráficos Detalhados</h3>
        <div className="chart-tabs flex flex-wrap space-x-0 sm:space-x-2 mb-4 border-b border-gray-200">
          <button onClick={() => setActiveTab('peso')} className={getTabStyle('peso')}>Peso</button>
          <button onClick={() => setActiveTab('energia')} className={getTabStyle('energia')}>Energia</button>
          <button onClick={() => setActiveTab('inchaco')} className={getTabStyle('inchaco')}>Inchaço</button>
          <button onClick={() => setActiveTab('sono')} className={getTabStyle('sono')}>Sono</button>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 sm:p-12 text-center"> {/* Adjusted padding for smaller screens */}
          <div className="h-48 flex items-center justify-center">
            <div className="text-gray-400">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <p className="text-sm font-medium">Análise de {activeTab} em desenvolvimento</p>
              <p className="text-xs mt-1">Visualize tendências e padrões do seu progresso.</p>
            </div>
          </div>
        </div>
      </div>

      {permissions.canAccessAICoach && ( // Check permission for AI Coach insights
        <div className="ai-insights card bg-gradient-to-r from-gold/10 to-yellow-400/10 mb-6 premium-card">
          <h3 className="text-xl font-semibold text-yellow-700 mb-3">🧠 Insights do Coach Virtual</h3>
          <div className="insight-card p-4 bg-white rounded-lg shadow">
            <p className="text-gray-700 mb-1">💡 Sua energia aumentou 40% na última semana</p>
            <p className="text-gray-700">🎯 Dica: Continue na Fase 2 por mais 2 dias</p>
          </div>
        </div>
      )}

      <div className="photo-gallery card mb-6">
        <h3 className="text-xl font-semibold text-jade mb-4">📸 Fotos do Progresso</h3>
        <div className="photo-grid grid grid-cols-2 sm:grid-cols-3 gap-4">
          <button className="aspect-square border border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <div className="text-center">
              <svg className="w-8 h-8 mx-auto mb-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">ANTES</span>
            </div>
          </button>
          <button className="aspect-square border border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <div className="text-center">
              <svg className="w-8 h-8 mx-auto mb-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">DIA 8</span>
            </div>
          </button>
          <button className="aspect-square border-2 border-dashed border-mint rounded-lg flex items-center justify-center text-mint hover:bg-mint/10 font-semibold transition-colors">
            <div className="text-center">
              <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-xs">ADICIONAR</span>
            </div>
          </button>
        </div>
      </div>

      <div className="text-center">
        <button className="btn-secondary export-report">
          📊 Exportar Relatório PDF
        </button>
      </div>
    </div>
  );
};

export default AdvancedTracker;
