import { useState } from 'react';
import { UserProvider } from './context/UserContext';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import DailyProtocol from './components/DailyProtocol';
import UpgradePage from './components/UpgradePage';
import PremiumModal from './components/PremiumModal';
import GuiaManutencao from './components/GuiaManutencao';
import ReceitasExtras from './components/ReceitasExtras';
import ProtocoloTurbo from './components/ProtocoloTurbo';
import CoachVirtual from './components/CoachVirtual';
import AnalyticsPremium from './components/AnalyticsPremium';
import PWAInstall from './components/PWAInstall';
import SideMenu from './components/SideMenu';

type Page = 
  | 'dashboard' 
  | 'protocol' 
  | 'videos' 
  | 'materials' 
  | 'progress' 
  | 'community' 
  | 'upgrade'
  | 'guiaManutencao'
  | 'receitasExtras'
  | 'protocoloTurbo'
  | 'coachVirtual'
  | 'analyticsPremium';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handlePremiumFeature = (featureId: string) => {
    setSelectedFeature(featureId);
    setShowPremiumModal(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPremiumFeature={handlePremiumFeature} onNavigate={setCurrentPage} />;
      
      case 'protocol':
        return <DailyProtocol onBack={() => setCurrentPage('dashboard')} />;
      
      case 'upgrade':
        return <UpgradePage onBack={() => setCurrentPage('dashboard')} />;
      
      // Novos componentes para planos premium
      case 'guiaManutencao':
        return <GuiaManutencao onBack={() => setCurrentPage('dashboard')} />;
      
      case 'receitasExtras':
        return <ReceitasExtras onBack={() => setCurrentPage('dashboard')} />;
      
      case 'protocoloTurbo':
        return <ProtocoloTurbo onBack={() => setCurrentPage('dashboard')} />;
      
      case 'coachVirtual':
        return <CoachVirtual onBack={() => setCurrentPage('dashboard')} />;
      
      case 'analyticsPremium':
        return <AnalyticsPremium onBack={() => setCurrentPage('dashboard')} />;
      
      
      case 'videos':
      case 'materials':
      case 'progress':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="card">
              <h2 className="text-2xl font-bold text-jade mb-4">Em Desenvolvimento</h2>
              <p className="text-gray-600 mb-4">Esta seção está sendo preparada com muito carinho para você!</p>
              <p className="text-gray-600 text-sm">
                Você receberá uma notificação por e-mail e WhatsApp assim que esta funcionalidade estiver disponível.
              </p>
            </div>
          </div>
        );
      
      case 'community':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="card locked-content">
              <h2 className="text-2xl font-bold text-jade mb-4">Comunidade VIP 🔒</h2>
              <p className="text-gray-600 mb-4">Acesso exclusivo para assinantes VIP</p>
              <button 
                onClick={() => handlePremiumFeature('vip-community')}
                className="btn-premium"
              >
                Desbloquear por R$ 37/mês
              </button>
            </div>
          </div>
        );
      
      default:
        return <Dashboard onPremiumFeature={handlePremiumFeature} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-mint/10 via-white to-jade/10">
        {renderPage()}
        <Navigation 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
          onOpenMenu={() => setSideMenuOpen(true)}
        />
        {showPremiumModal && (
          <PremiumModal 
            featureId={selectedFeature}
            onClose={() => setShowPremiumModal(false)}
            onUpgrade={() => {
              setShowPremiumModal(false);
              setCurrentPage('upgrade');
            }}
          />
        )}
        <SideMenu 
          isOpen={sideMenuOpen} 
          onClose={() => setSideMenuOpen(false)}
          onNavigate={setCurrentPage}
        />
        <PWAInstall />
      </div>
    </UserProvider>
  );
}

export default App;
