import React from 'react';
import { useUser } from '../context/UserContext';
import { protocolData } from '../data/protocol';
import { 
  Lock, 
  Sparkles, 
  Calendar, 
  CheckCircle, 
  Eye, 
  BookOpen, 
  Utensils, 
  Rocket, 
  Users
} from 'lucide-react';

interface DashboardProps {
  onPremiumFeature: (featureId: string) => void;
  onNavigate: (page: any) => void;
}

// Feature card component for unlocked features
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  onClick 
}: { 
  icon: React.ElementType, 
  title: string, 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className="p-3 bg-mint/10 rounded-lg flex flex-col items-center text-center hover:bg-mint/20 transition-colors"
  >
    <Icon className="w-6 h-6 text-jade mb-2" />
    <span className="text-sm font-semibold text-gray-800">{title}</span>
  </button>
);

// Locked feature card component
const LockedFeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  featureId,
  onPreview
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string,
  featureId: string,
  onPreview: (id: string) => void
}) => (
  <div 
    className="card relative overflow-hidden cursor-pointer mb-4"
    onClick={() => onPreview(featureId)}
  >
    <div className="absolute inset-0 backdrop-blur-sm bg-white/50 pointer-events-none" />
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-bold text-gray-800 flex items-center gap-2">
          <Icon className="w-5 h-5 text-jade" />
          {title} <span className="text-amber-500">🔒</span>
        </h4>
      </div>
      
      <p className="text-gray-600 text-sm mb-3">
        {description}
      </p>
      
      <div className="flex items-center mt-4 justify-center">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onPreview(featureId);
          }}
          className="text-jade hover:text-jade/80 font-semibold text-sm flex items-center gap-1 transition-colors relative z-20"
        >
          <Eye className="w-4 h-4" />
          VER PREVIEW
        </button>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ onPremiumFeature, onNavigate }) => {
  const { authUser, userProfile, permissions, isRefreshingUserData } = useUser(); 
  
  // Handle loading and data refresh states
  if (isRefreshingUserData) {
    return <div className="p-4 text-center">Atualizando dados do seu plano...</div>;
  }
  
  if (!userProfile) {
    return <div className="p-4 text-center">Carregando perfil do usuário...</div>;
  }

  const todayProtocol = protocolData.find(p => p.day === userProfile.current_day);
  const progress = Math.round((userProfile.current_day / 21) * 100);

  const getPlanBadge = () => {
    switch (userProfile.plan) {
      case 'premium':
        return <span className="badge badge-premium">PREMIUM ⭐</span>;
      case 'completo':
        return <span className="badge badge-completo">COMPLETO 🔓</span>;
      default:
        return <span className="badge badge-essencial">ESSENCIAL 🔓</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-16">
      {/* Header */}
      <div className="text-center mb-8 animate-fadeIn">
        <img src="/piv4f-logo.png" alt="Protocolo Vital 4F" className="h-14 mx-auto mb-2" />
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs text-gray-500">{getPlanBadge()}</span>
          <button 
            onClick={() => onNavigate('upgrade')}
            className="bg-coral text-white hover:bg-coral/90 font-semibold text-sm px-3 py-1.5 rounded-full flex items-center gap-1 animate-pulse-slow"
          >
            <Sparkles className="w-3 h-3" />
            FAZER UPGRADE
          </button>
        </div>
      </div>

      {/* Welcome */}
      <div className="card mb-6 animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Olá, {userProfile.name || authUser!.email}! 👋 
        </h2>
        <p className="text-gray-600">Dia {userProfile.current_day} de 21</p>
      </div>

      {/* Daily Protocol */}
      <div className="card mb-6 animate-fadeIn">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-jade flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              DIA {userProfile.current_day} - FASE {todayProtocol?.phase}: {todayProtocol?.phaseName}
            </h3>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden"> {/* Changed h-3 to h-4 */}
            <div 
              className="bg-gradient-to-r from-jade to-mint h-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${progress}%` }}
            >
              {progress > 5 && <span className="text-xs text-white font-semibold">{progress}%</span>} {/* Conditional rendering */}
            </div>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('protocol')}
          className="btn-primary w-full"
        >
          COMEÇAR HOJE
        </button>
      </div>

      {/* Today's Protocol Summary */}
      {todayProtocol && (
        <div className="card mb-6 animate-fadeIn">
          <h4 className="font-bold text-jade mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            SEU PROTOCOLO HOJE:
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">☀️</span>
              <span className="text-gray-700">{todayProtocol.morning.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌤️</span>
              <span className="text-gray-700">{todayProtocol.afternoon.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌙</span>
              <span className="text-gray-700">{todayProtocol.night.title}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Core Resources Available to All */}
      <div className="card mb-6 animate-fadeIn">
        <h4 className="font-bold text-jade mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          RECURSOS DISPONÍVEIS:
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Core features always available - temporalmente oculto
          {permissions.canAccessDailyProtocol && (
            <FeatureCard 
              icon={Calendar} 
              title="Protocolo Diário" 
              onClick={() => onNavigate('protocol')}
            />
          )}
          */}
          
          {/* Tracker Básico temporalmente oculto
          {permissions.canAccessBasicTracker && (
            <FeatureCard 
              icon={BarChart2} 
              title="Tracker Básico" 
              onClick={() => onNavigate('basicTracker')}
            />
          )}
          */}
          
          {/* FAQ Integrado temporalmente oculto
          {permissions.canAccessFAQ && (
            <FeatureCard 
              icon={HelpCircle} 
              title="FAQ Integrado" 
              onClick={() => onNavigate('faq')}
            />
          )}
          */}

          {/* Completo plan features */}
          {permissions.canAccessMaintenanceGuide && (
            <FeatureCard 
              icon={BookOpen} 
              title="Guia de Manutenção" 
              onClick={() => onNavigate('guiaManutencao')}
            />
          )}
          
          {permissions.canAccessExtraRecipes && (
            <FeatureCard 
              icon={Utensils} 
              title="Receitas Extras" 
              onClick={() => onNavigate('receitasExtras')}
            />
          )}
          
          {/* Premium plan features */}
          {permissions.canAccessTurboProtocol && (
            <FeatureCard 
              icon={Rocket} 
              title="Protocolo Turbo" 
              onClick={() => onNavigate('protocoloTurbo')}
            />
          )}
          
          {/* Analytics Premium temporalmente oculto
          {permissions.canAccessAnalyticsPremium && (
            <FeatureCard 
              icon={BarChart2} 
              title="Análises Premium" 
              onClick={() => onNavigate('analyticsPremium')}
            />
          )}
          */}
          
          {/* Coach AI temporalmente oculto
          {permissions.canAccessAICoach && (
            <FeatureCard 
              icon={FileText} 
              title="Coach AI" 
              onClick={() => onNavigate('coachVirtual')}
            />
          )}
          */}
          
          {/* Subscription features */}
          {permissions.canAccessVIPCommunity && (
            <FeatureCard 
              icon={Users} 
              title="Comunidade VIP" 
              onClick={() => onNavigate('community')}
            />
          )}
        </div>
      </div>

      {/* Locked Features / Upgrade Section */}
      {(!userProfile.plan || userProfile.plan !== 'premium' || !permissions.canAccessVIPCommunity) && (
        <div className="space-y-6">
          <h3 className="font-bold text-jade flex items-center gap-2 pl-6">
            <Lock className="w-5 h-5" />
            {userProfile.plan === 'premium' ? 'OUTROS RECURSOS DISPONÍVEIS:' : 'DESBLOQUEIE MAIS RECURSOS:'}
          </h3>
          
          {/* Completo Plan Features */}
          {!permissions.canAccessMaintenanceGuide && (
            <LockedFeatureCard 
              icon={BookOpen}
              title="GUIA DE MANUTENÇÃO"
              description="Aprenda como manter os resultados do protocolo para sempre com estratégias comprovadas."
              featureId="maintenance-guide"
              onPreview={onPremiumFeature}
            />
          )}
          
          {!permissions.canAccessExtraRecipes && (
            <LockedFeatureCard 
              icon={Utensils}
              title="25 RECEITAS EXTRAS"
              description="Acelere 2x mais seus resultados com receitas exclusivas para potencializar o protocolo."
              featureId="extra-recipes"
              onPreview={onPremiumFeature}
            />
          )}

          {/* Premium Plan Features */}
          {!permissions.canAccessTurboProtocol && (
            <LockedFeatureCard 
              icon={Rocket}
              title="PROTOCOLO TURBO"
              description="Versão acelerada do protocolo para obter resultados em apenas 15 dias."
              featureId="turbo-protocol"
              onPreview={onPremiumFeature}
            />
          )}
          
          {/* Analytics Premium temporalmente oculto
          {!permissions.canAccessAnalyticsPremium && (
            <LockedFeatureCard 
              icon={BarChart2}
              title="ANÁLISES PREMIUM"
              description="Análises detalhadas do seu progresso com gráficos e insights personalizados."
              featureId="analytics-premium"
              onPreview={onPremiumFeature}
            />
          )}
          */}
          
          {/* Coach AI temporalmente oculto 
          {!permissions.canAccessAICoach && (
            <LockedFeatureCard 
              icon={FileText}
              title="COACH AI"
              description="Assistente virtual para tirar suas dúvidas e personalizar o protocolo."
              featureId="coach-ai"
              onPreview={onPremiumFeature}
            />
          )}
          */}
          
          {/* VIP Community */}
          {!permissions.canAccessVIPCommunity && (
            <LockedFeatureCard 
              icon={Users}
              title="COMUNIDADE VIP"
              description="Acesso direto à Dra. Mariana e suporte prioritário exclusivo para membros."
              featureId="vip-community"
              onPreview={onPremiumFeature}
            />
          )}
        </div>
      )}

      {/* Removido o botão grande de Upgrade para evitar redundância */}

      {/* AppDownloadButton removed */}
      {/* <div className="mt-4 mb-4"> 
        <AppDownloadButton />
      </div> */}
    </div>
  );
};

export default Dashboard;
