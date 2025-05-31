import React from 'react'; // Removed useEffect as it's not used
import { useUser } from '../context/UserContext';
import { BarChart3, TrendingUp } from 'lucide-react'; // Added icons

// Define a prop type for navigation if we want to make the upgrade button work
interface BasicTrackerProps {
  onNavigateToUpgrade?: () => void; // Optional prop to handle navigation
}

const BasicTracker: React.FC<BasicTrackerProps> = ({ onNavigateToUpgrade }) => {
  const { userProfile } = useUser(); // Use userProfile
  
  if (!userProfile) {
    return <div className="p-4 text-center">Carregando dados do progresso...</div>;
  }

  // Usando dados reais do usuário
  const completedDays = userProfile.current_day || 0; // Use current_day from userProfile
  // Weight loss estimation - consider removing or making it clear it's a rough estimate
  // For now, keeping it but acknowledging it's not real data.
  const weightLoss = Math.round((completedDays / 21) * 5 * 2) / 2; // Adjusted placeholder logic slightly (e.g. up to 5kg)
  const nextDay = Math.min(completedDays + 1, 21);
  
  // Placeholder for chart initialization logic - Basic tracker might not have a chart.
  // useEffect(() => {
  //   const canvas = document.getElementById('basicWeightChart') as HTMLCanvasElement;
  //   if (canvas) {
  //     // Initialize chart here (e.g., using Chart.js or a simple drawing context)
  //     const ctx = canvas.getContext('2d');
  //     if (ctx) {
  //       // Example: Draw a simple line
  //       ctx.beginPath();
  //       ctx.moveTo(0, 50);
  //       ctx.lineTo(100, 100);
  //       ctx.stroke();
  //     }
  //   }
  // }, []);

  return (
    // Added standard container classes for consistency, assuming `section` is for specific content blocks
    <div className="tracker-basico"> 
      <h2 className="text-2xl font-bold text-jade mb-6 text-center md:text-left">📊 Meu Progresso</h2>
      
      <div className="progress-card card mb-6">
        <h3 className="text-xl font-semibold text-jade mb-3">Resumo Geral</h3>
        <div className="metrics grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-mint/10 rounded-lg shadow">
            <div className="text-3xl font-bold text-jade">{completedDays}</div>
            <div className="text-sm text-gray-600">Dias completos / 21</div>
          </div>
          <div className="p-4 bg-mint/10 rounded-lg shadow">
            <div className="text-3xl font-bold text-jade">~{weightLoss}kg</div> {/* Indicate estimate */}
            <div className="text-sm text-gray-600">Peso perdido (estimativa)</div>
          </div>
          <div className="p-4 bg-mint/10 rounded-lg shadow">
            <div className="text-3xl font-bold text-jade">Dia {nextDay > 21 ? 'Final' : nextDay}</div>
            <div className="text-sm text-gray-600">Próxima meta</div>
          </div>
        </div>
      </div>

      <div className="weight-chart-basic card mb-6">
        <h3 className="text-xl font-semibold text-jade mb-3">⚖️ Controle de Peso</h3>
        <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
          <BarChart3 className="w-12 h-12 text-jade/50 mx-auto mb-3" />
          <p className="text-gray-600 font-semibold mb-1">Gráficos Detalhados de Peso</p>
          <p className="text-sm text-gray-500 mb-3">
            Acompanhe sua evolução com gráficos visuais e insights sobre seu peso.
          </p>
          <button 
            onClick={onNavigateToUpgrade} 
            className="btn-secondary btn-sm flex items-center justify-center mx-auto"
          >
            <TrendingUp size={16} className="mr-2" />
            Disponível no Plano Completo
          </button>
        </div>
      </div>

      <div className="milestones card mb-6">
        <h3 className="text-xl font-semibold text-jade mb-3">🎯 Marcos Atingidos (Exemplos)</h3>
        <div className="milestone-list space-y-3">
          <div className="milestone flex items-center p-3 bg-mint/20 rounded-lg shadow-sm">
            <span className="text-green-600 mr-3 text-2xl">🎉</span>
            <div>
              <span className="font-semibold text-gray-800">Semana 1 Concluída!</span>
              <p className="text-xs text-gray-500">Você completou a fase de preparação.</p>
            </div>
          </div>
          <div className="milestone flex items-center p-3 bg-mint/20 rounded-lg shadow-sm">
            <span className="text-green-600 mr-3 text-2xl">💧</span>
            <div>
              <span className="font-semibold text-gray-800">Meta de Hidratação</span>
              <p className="text-xs text-gray-500">Atingiu 2L de água por 3 dias seguidos.</p>
            </div>
          </div>
           {/* Add more illustrative milestones if needed */}
        </div>
      </div>

      {userProfile.plan === 'essencial' && (
        <div className="upgrade-cta-tracker card bg-gradient-to-r from-jade/10 to-mint/10 text-center p-6 border border-jade/30">
          <p className="text-lg font-semibold text-jade mb-1">Desbloqueie o Tracker Avançado!</p>
          <p className="text-sm text-gray-600 mb-4">
            Tenha acesso a gráficos detalhados, registro de sintomas, humor e muito mais.
          </p>
          <button 
            onClick={onNavigateToUpgrade} 
            className="btn-primary flex items-center justify-center mx-auto"
          >
            <TrendingUp size={18} className="mr-2" />
            Fazer Upgrade para Completo
          </button>
        </div>
      )}
    </div>
  );
};

export default BasicTracker;
