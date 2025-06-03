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
// import CoachVirtual from './components/CoachVirtual'; // Removed Coach Virtual
// import AnalyticsPremium from './components/AnalyticsPremium'; // Temporarily hidden
// import PWAInstall from './components/PWAInstall';
import SideMenu from './components/SideMenu';
// import BasicTracker from './components/BasicTracker'; // Temporarily hidden
// import AdvancedTracker from './components/AdvancedTracker'; // Temporarily hidden
// import MateriaisApoio from './components/MateriaisApoio'; // Removed again based on feedback
import FAQIntegrado from './components/FAQIntegrado';

type Page = 
  | 'dashboard' 
  | 'protocol' 
  | 'videos' 
  // | 'materials' // Removed again based on feedback
  // | 'progress' // Removed progress
  | 'community' 
  | 'upgrade'
  | 'guiaManutencao'
  | 'receitasExtras'
  | 'protocoloTurbo'
  // | 'coachVirtual' // Removed Coach Virtual
  | 'analyticsPremium'
  | 'faq';

function AppContent() {
  const { 
    authUser, 
    // Removing userProfile as it's not used
    loading, 
    refreshUserData, 
    isRefreshingUserData 
  } = useUser();

  // Hooks must be called at the top level, before conditional returns.
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [returnedFromUpgrade, setReturnedFromUpgrade] = useState(false);

  // Handle returning from upgrade page to refresh user data
  if (returnedFromUpgrade && currentPage !== 'upgrade') {
    refreshUserData();
    setReturnedFromUpgrade(false);
  }

  // Custom navigation handler to track upgrade page visits
  const handleNavigate = (page: Page) => {
    // If navigating away from upgrade page, set flag to refresh data
    if (currentPage === 'upgrade' && page !== 'upgrade') {
      setReturnedFromUpgrade(true);
    }
    
    // If navigating to upgrade page, clear the flag
    if (page === 'upgrade') {
      setReturnedFromUpgrade(false);
    }
    
    setCurrentPage(page);
  };

  if (loading || isRefreshingUserData) {
    return (
      <div className="min-h-screen bg-jade-50 flex items-center justify-center">
        <div className="text-jade-600">
          {isRefreshingUserData ? 'Atualizando seu plano...' : 'Carregando...'}
        </div>
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
        return <Dashboard onPremiumFeature={handlePremiumFeature} onNavigate={handleNavigate} />;
      
      case 'protocol':
        return <DailyProtocol onBack={() => handleNavigate('dashboard')} />;
      
      case 'upgrade':
        return <UpgradePage onBack={() => handleNavigate('dashboard')} />;
      
      // Novos componentes para planos premium
      case 'guiaManutencao':
        return <GuiaManutencao onBack={() => handleNavigate('dashboard')} />;
      
      case 'receitasExtras':
        return <ReceitasExtras onBack={() => handleNavigate('dashboard')} />;
      
      case 'protocoloTurbo':
        return <ProtocoloTurbo onBack={() => handleNavigate('dashboard')} />;
      
      // Coach Virtual removed as requested
      
      case 'analyticsPremium':
        // Temporarily hidden
        return (
          <div className="container mx-auto px-4 py-8 pb-24">
            <div className="card">
              <h2 className="text-2xl font-bold text-jade mb-4">Em Desenvolvimento</h2>
              <p className="text-gray-600 mb-4">O Analytics Premium está sendo preparado e estará disponível em breve!</p>
              <button 
                onClick={() => handleNavigate('dashboard')}
                className="btn-primary"
              >
                Voltar para o Dashboard
              </button>
            </div>
          </div>
        );
      
      
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
      
      // Materials page removed based on feedback
      
      // Progress page removed as requested
      
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
        return <FAQIntegrado onBack={() => handleNavigate('dashboard')} />;

      default:
        return <Dashboard onPremiumFeature={handlePremiumFeature} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint/10 via-white to-jade/10 pb-24">
      {renderPage()}
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        onOpenMenu={() => setSideMenuOpen(true)}
      />
      {showPremiumModal && (
        <PremiumModal 
          featureId={selectedFeature}
          onClose={() => setShowPremiumModal(false)}
          onUpgrade={() => {
            setShowPremiumModal(false);
            handleNavigate('upgrade');
          }}
        />
      )}
      <SideMenu 
        isOpen={sideMenuOpen} 
        onClose={() => setSideMenuOpen(false)}
        onNavigate={(page: string) => handleNavigate(page as Page)}
      />
      {/* <PWAInstall /> */}
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
