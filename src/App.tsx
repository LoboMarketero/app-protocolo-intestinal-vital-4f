import { useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { LoginPage } from './components/LoginPage'; // Added LoginPage import
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
import BasicTracker from './components/BasicTracker';
import AdvancedTracker from './components/AdvancedTracker';
import MateriaisApoio from './components/MateriaisApoio';
import FAQIntegrado from './components/FAQIntegrado';

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
  | 'analyticsPremium'
  | 'faq';

function AppContent() {
  const { authUser, userProfile, loading } = useUser(); // Changed to authUser, userProfile

  // Hooks must be called at the top level, before conditional returns.
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-jade-50 flex items-center justify-center">
        <div className="text-jade-600">Carregando...</div>
      </div>
    );
  }

  if (!authUser) { // Changed to !authUser
    return <LoginPage />;
  }
  
  // When authUser exists, userProfile might still be loading.
  // Components below need to handle userProfile potentially being null.
  // Or add another loading state / guard for userProfile.
  // For now, let's assume components will use optional chaining or check userProfile.

  // Existing AppContent logic that depends on user being non-null
  // const [currentPage, setCurrentPage] = useState<Page>('dashboard'); // Moved up
  // const [showPremiumModal, setShowPremiumModal] = useState(false); // Moved up
  // const [selectedFeature, setSelectedFeature] = useState<string>(''); // Moved up
  // const [sideMenuOpen, setSideMenuOpen] = useState(false); // Moved up

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
        return (
          <div className="container mx-auto px-4 py-8 pb-24">
            <div className="card">
              <h2 className="text-2xl font-bold text-jade mb-4">Em Desenvolvimento</h2>
              <p className="text-gray-600 mb-4">Esta seção está sendo preparada com muito carinho para você!</p>
              <p className="text-gray-600 text-sm">
                Você receberá uma notificação por e-mail e WhatsApp assim que esta funcionalidade estiver disponível.
              </p>
            </div>
          </div>
        );
      
      case 'materials':
        if (!userProfile) return <div className="p-4">Carregando dados do perfil...</div>; // Guard for userProfile
        return <MateriaisApoio onBack={() => setCurrentPage('dashboard')} />;
      
      case 'progress':
        if (!userProfile) return <div className="p-4">Carregando dados do perfil...</div>; // Guard for userProfile
        return (
          <div className="container mx-auto px-4 py-8 pb-24">
            {userProfile.plan === 'essencial' ? (
              <BasicTracker onNavigateToUpgrade={() => setCurrentPage('upgrade')} /> 
            ) : (
              <AdvancedTracker onNavigateToUpgrade={() => setCurrentPage('upgrade')} /> 
            )}
          </div>
        );
      
      case 'community':
        return (
          <div className="container mx-auto px-4 py-8 pb-24">
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
      
      case 'faq':
        return <FAQIntegrado onBack={() => setCurrentPage('dashboard')} />;

      default:
        return <Dashboard onPremiumFeature={handlePremiumFeature} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint/10 via-white to-jade/10 pb-24">
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
        onNavigate={(page: string) => setCurrentPage(page as Page)}
      />
      <PWAInstall />
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
