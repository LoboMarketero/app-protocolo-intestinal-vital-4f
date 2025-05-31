import React from 'react';
import { useUser } from '../context/UserContext';
import { protocolData } from '../data/protocol';
import AppDownloadButton from './AppDownloadButton'; // Import AppDownloadButton
import { 
  Lock, 
  Sparkles, 
  Calendar, 
  CheckCircle, 
  Eye, 
  BookOpen, 
  Utensils, 
  Rocket, 
  BrainCircuit, 
  // BarChart, // Unused import
  Users
  // ArrowRight // Unused import
} from 'lucide-react';

interface DashboardProps {
  onPremiumFeature: (featureId: string) => void;
  onNavigate: (page: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onPremiumFeature, onNavigate }) => {
  const { authUser, userProfile, permissions } = useUser(); 
  
  // AppContent ensures authUser is non-null. We need userProfile for most content.
  if (!userProfile) {
    return <div className="p-4 text-center">Carregando perfil do usuário...</div>; // Or some other loading indicator
  }
  // Now, userProfile is guaranteed non-null. authUser is also non-null.

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
    <div className="container mx-auto px-4 py-8 pb-24">
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
          Olá, {authUser!.email}! 👋 
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
      
      {/* Recursos Desbloqueados do Plano Atual */}
      {(userProfile.plan === 'completo' || userProfile.plan === 'premium') && permissions && (
        <div className="card mb-6 animate-fadeIn">
          <h4 className="font-bold text-jade mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            RECURSOS DESBLOQUEADOS:
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            {permissions.canAccessMaintenanceGuide && ( // Changed from user.permissions to permissions
              <button 
                onClick={() => onNavigate('guiaManutencao')}
                className="p-3 bg-mint/10 rounded-lg flex flex-col items-center text-center hover:bg-mint/20 transition-colors"
              >
                <BookOpen className="w-6 h-6 text-jade mb-2" />
                <span className="text-sm font-semibold text-gray-800">Guia de Manutenção</span>
              </button>
            )}
            
            {permissions.canAccessExtraRecipes && ( // Changed from user.permissions to permissions
              <button 
                onClick={() => onNavigate('receitasExtras')}
                className="p-3 bg-mint/10 rounded-lg flex flex-col items-center text-center hover:bg-mint/20 transition-colors"
              >
                <Utensils className="w-6 h-6 text-jade mb-2" />
                <span className="text-sm font-semibold text-gray-800">Receitas Extras</span>
              </button>
            )}
            
            {permissions.canAccessTurboProtocol && ( // Changed from user.permissions to permissions
              <button 
                onClick={() => onNavigate('protocoloTurbo')}
                className="p-3 bg-gold/10 rounded-lg flex flex-col items-center text-center hover:bg-gold/20 transition-colors"
              >
                <Rocket className="w-6 h-6 text-jade mb-2" />
                <span className="text-sm font-semibold text-gray-800">Protocolo Turbo</span>
              </button>
            )}
            
            {permissions.canAccessAICoach && ( // Changed from user.permissions to permissions (and property name)
              <button 
                onClick={() => onNavigate('coachVirtual')}
                className="p-3 bg-gold/10 rounded-lg flex flex-col items-center text-center hover:bg-gold/20 transition-colors"
              >
                <BrainCircuit className="w-6 h-6 text-jade mb-2" />
                <span className="text-sm font-semibold text-gray-800">Coach Virtual</span>
              </button>
            )}
            
            {/* Assuming premiumAnalytics maps to a permission, not directly on user.permissions */}
            {/* Let's assume it's canAccessAnalytics based on UserPermissions type */}
            {/* This property was not in UserPermissions, so I'll comment it out for now or assume a name */}
            {/* {permissions.canAccessAnalytics && ( */}
            {/* For now, I will assume premiumAnalytics was a typo and it's covered by other premium features or not yet in UserPermissions */}
            {/* If there's a specific permission for AnalyticsPremium, it should be in UserPermissions */}
            
            {permissions.canAccessVIPCommunity && ( // Changed from user.permissions to permissions
              <button 
                onClick={() => onNavigate('community')}
                className="p-3 bg-coral/10 rounded-lg flex flex-col items-center text-center hover:bg-coral/20 transition-colors"
              >
                <Users className="w-6 h-6 text-jade mb-2" />
                <span className="text-sm font-semibold text-gray-800">Comunidade VIP</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Premium Features by Resource */}
      <div className="space-y-6">
        <h3 className="font-bold text-jade flex items-center gap-2 pl-6"> {/* Added pl-6 for alignment */}
          <Lock className="w-5 h-5" />
          {userProfile.plan === 'premium' ? 'OUTROS RECURSOS DISPONÍVEIS:' : 'DESBLOQUEIE MAIS RECURSOS:'}
        </h3>
        
        {/* Recursos del Plan Completo */}
        {permissions && !permissions.canAccessMaintenanceGuide && ( // Added permissions check
          <div 
            className="card relative overflow-hidden cursor-pointer"
            onClick={() => onPremiumFeature('maintenance-guide')}
          >
            <div className="absolute inset-0 backdrop-blur-sm bg-white/50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">📖</span>
                  GUIA DE MANUTENÇÃO 🔒
                </h4>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">
                Aprenda como manter os resultados do protocolo para sempre com estratégias comprovadas.
              </p>
              
              <div className="flex items-center mt-4 justify-between">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onPremiumFeature('maintenance-guide');
                  }}
                  className="text-jade hover:text-jade/80 font-semibold text-sm flex items-center gap-1 transition-colors relative z-20"
                >
                  <Eye className="w-4 h-4" />
                  VER PREVIEW
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPremiumFeature('maintenance-guide');
                  }}
                  className="text-jade hover:text-jade/80 font-semibold text-sm flex items-center gap-1 transition-colors relative z-20"
                >
                  <Eye className="w-4 h-4" />
                  VER PREVIEW
                </button>
                {/* DESBLOQUEAR button removed */}
              </div>
            </div>
          </div>
        )}
        
        {permissions && !permissions.canAccessExtraRecipes && ( // Added permissions check
          <div 
            className="card relative overflow-hidden cursor-pointer"
            onClick={() => onPremiumFeature('extra-recipes')}
          >
            <div className="absolute inset-0 backdrop-blur-sm bg-white/50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🍹</span>
                  25 RECEITAS EXTRAS 🔒
                </h4>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">
                Acelere 2x mais seus resultados com receitas exclusivas para potencializar o protocolo.
              </p>
              
              <div className="flex items-center mt-4 justify-center"> {/* Changed to justify-center */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onPremiumFeature('extra-recipes');
                  }}
                  className="text-jade hover:text-jade/80 font-semibold text-sm flex items-center gap-1 transition-colors relative z-20"
                >
                  <Eye className="w-4 h-4" />
                  VER PREVIEW
                </button>
                {/* DESBLOQUEAR button removed */}
              </div>
            </div>
          </div>
        )}

        {/* Recursos del Plan Premium */}
        {permissions && !permissions.canAccessTurboProtocol && ( // Added permissions check
          <div 
            className="card relative overflow-hidden cursor-pointer"
            onClick={() => onPremiumFeature('turbo-protocol')}
          >
            <div className="absolute inset-0 backdrop-blur-sm bg-white/50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  PROTOCOLO TURBO 🔒
                </h4>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">
                Versão acelerada do protocolo para obter resultados em apenas 15 dias.
              </p>
              
              <div className="flex items-center mt-4 justify-center"> {/* Changed to justify-center */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onPremiumFeature('turbo-protocol');
                  }}
                  className="text-jade hover:text-jade/80 font-semibold text-sm flex items-center gap-1 transition-colors relative z-20"
                >
                  <Eye className="w-4 h-4" />
                  VER PREVIEW
                </button>
                {/* DESBLOQUEAR button removed */}
              </div>
            </div>
          </div>
        )}
        
        {permissions && !permissions.canAccessAICoach && ( // Added permissions check and used correct prop name
          <div 
            className="card relative overflow-hidden cursor-pointer"
            onClick={() => onPremiumFeature('coach-virtual')}
          >
            <div className="absolute inset-0 backdrop-blur-sm bg-white/50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🧠</span>
                  COACH VIRTUAL 🔒
                </h4>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">
                Orientação personalizada com inteligência artificial para maximizar seus resultados.
              </p>
              
              <div className="flex items-center mt-4 justify-center"> {/* Changed to justify-center */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onPremiumFeature('coach-virtual');
                  }}
                  className="text-jade hover:text-jade/80 font-semibold text-sm flex items-center gap-1 transition-colors relative z-20"
                >
                  <Eye className="w-4 h-4" />
                  VER PREVIEW
                </button>
                {/* DESBLOQUEAR button removed */}
              </div>
            </div>
          </div>
        )}
        
        {/* Analytics Premium - Assuming this maps to a permission like canAccessAnalytics */}
        {/* As canAccessAnalytics is not in UserPermissions, this section is commented out or needs clarification */}
        {/* {permissions && !permissions.canAccessAnalytics && (
          <div 
            className="card relative overflow-hidden cursor-pointer"
            onClick={() => onPremiumFeature('analytics-premium')}
          >
            <div className="absolute inset-0 backdrop-blur-sm bg-white/50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  ANÁLISES PREMIUM 🔒
                </h4>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">
                Análises detalhadas do seu progresso com gráficos e insights personalizados.
              </p>
              
              <div className="flex items-center mt-4 justify-center"> {/* Changed to justify-center */}
                {/* <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onPremiumFeature('analytics-premium');
                  }}
                  className="text-jade hover:text-jade/80 font-semibold text-sm flex items-center gap-1 transition-colors relative z-20"
                >
                  <Eye className="w-4 h-4" />
                  VER PREVIEW
                </button> */}
                {/* DESBLOQUEAR button removed */}
              {/* </div>
            </div>
          </div>
        )} */}
        
        {/* Comunidade VIP */}
        {permissions && !permissions.canAccessVIPCommunity && ( // Added permissions check
          <div 
            className="card relative overflow-hidden cursor-pointer"
            onClick={() => onPremiumFeature('vip-community')}
          >
            <div className="absolute inset-0 backdrop-blur-sm bg-white/50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3"> {/* Changed items-start to items-center */}
                <h4 className="font-bold text-gray-800 flex items-center gap-2 whitespace-nowrap"> {/* Added whitespace-nowrap */}
                  <span className="text-2xl">👥</span>
                  COMUNIDADE VIP <span className="text-amber-500">🔒</span>
                </h4>
                {/* Price div removed */}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-jade mt-0.5">•</span>
                  <div>
                    <p className="text-gray-700 text-sm">Acesso direto à Dra. Mariana</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-jade mt-0.5">•</span>
                  <div>
                    <p className="text-gray-700 text-sm">Suporte prioritário</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mt-4 justify-center"> {/* Changed to justify-center */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onPremiumFeature('vip-community');
                  }}
                  className="text-jade hover:text-jade/80 font-semibold text-sm flex items-center gap-1 transition-colors relative z-20"
                >
                  <Eye className="w-4 h-4" />
                  VER PREVIEW
                </button>
                {/* DESBLOQUEAR button removed */}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Removido o botão grande de Upgrade para evitar redundância */}

      {/* AppDownloadButton added here, intended to be above the bottom navigation */}
      <div className="mt-4 mb-4"> 
        <AppDownloadButton />
      </div>
    </div>
  );
};

export default Dashboard;
