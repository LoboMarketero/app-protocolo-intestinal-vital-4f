import React from 'react';
import { useUser } from '../context/UserContext';
import { 
  X, 
  BookOpen, 
  Utensils, 
  Rocket, 
  BrainCircuit, 
  // BarChart, // Unused import
  Users,
  ChevronRight
  // DownloadCloud // Unused import, AppDownloadButton handles its own icon
} from 'lucide-react';
import AppDownloadButton from './AppDownloadButton';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const { permissions } = useUser(); // Only permissions is used directly in this component
  
  // AppContent should ensure permissions are non-null when SideMenu is rendered.
  if (!permissions) {
    // This case should ideally not be reached if AppContent's logic is correct.
    // Return null or a loading indicator if permissions might not be ready.
    return null; 
  }

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50"
          onClick={onClose}
        />
      )}
      
      {/* Menu Lateral */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } shadow-xl`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-jade">Protocolo Vital 4F</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Contenido */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-sm font-bold text-gray-500 mb-2">RECURSOS DESBLOQUEADOS</h3>
            
            <div className="space-y-1 mb-6">
              {/* Guia de Manutenção (Plano Completo ou Premium) */}
              {permissions.canAccessMaintenanceGuide && (
                <button 
                  onClick={() => handleNavigate('guiaManutencao')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-jade" />
                    <span className="text-gray-700">Guia de Manutenção</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              )}
              
              {/* Receitas Extras (Plano Completo ou Premium) */}
              {permissions.canAccessExtraRecipes && (
                <button 
                  onClick={() => handleNavigate('receitasExtras')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Utensils className="w-5 h-5 text-jade" />
                    <span className="text-gray-700">15 Receitas Extras</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              )}
              
              {/* Protocolo Turbo (Plano Premium) */}
              {permissions.canAccessTurboProtocol && (
                <button 
                  onClick={() => handleNavigate('protocoloTurbo')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Rocket className="w-5 h-5 text-jade" />
                    <span className="text-gray-700">Protocolo Turbo</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              )}
              
              {/* Coach Virtual (Plano Premium) */}
              {permissions.canAccessAICoach && ( // Corrected to canAccessAICoach
                <button 
                  onClick={() => handleNavigate('coachVirtual')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <BrainCircuit className="w-5 h-5 text-jade" />
                    <span className="text-gray-700">Coach Virtual</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              )}
              
              {/* Analytics Premium (Plano Premium) - This permission is not in UserPermissions type */}
              {/* {permissions.premiumAnalytics && (
                <button 
                  onClick={() => handleNavigate('analyticsPremium')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <BarChart className="w-5 h-5 text-jade" />
                    <span className="text-gray-700">Análises Premium</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              )} */}
              
              {/* Comunidade VIP (Assinatura mensal) */}
              {permissions.canAccessVIPCommunity && (
                <button 
                  onClick={() => handleNavigate('community')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-coral" />
                    <span className="text-gray-700">Comunidade VIP</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              )}
              
              {/* FAQ (Free resource) - REMOVED as per user request */}
            </div>
            
            {/* Adding Download App button here */}
            <div className="my-4 py-2 border-t border-b border-gray-200">
              <AppDownloadButton />
            </div>

            <h3 className="text-sm font-bold text-gray-500 mb-2">RECURSOS PREMIUM</h3>
            
            <div className="space-y-1">
              {/* Guia de Manutenção (Bloqueado) */}
              {!permissions.canAccessMaintenanceGuide && (
                <button 
                  onClick={() => handleNavigate('upgrade')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <BookOpen className="w-5 h-5 text-gray-400" />
                      <span className="absolute -top-1 -right-1 text-xs">🔒</span>
                    </div>
                    <span className="text-gray-500">Guia de Manutenção</span>
                  </div>
                  <span className="text-xs font-medium text-coral">Desbloquear</span>
                </button>
              )}
              
              {/* Receitas Extras (Bloqueado) */}
              {!permissions.canAccessExtraRecipes && (
                <button 
                  onClick={() => handleNavigate('upgrade')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Utensils className="w-5 h-5 text-gray-400" />
                      <span className="absolute -top-1 -right-1 text-xs">🔒</span>
                    </div>
                    <span className="text-gray-500">15 Receitas Extras</span>
                  </div>
                  <span className="text-xs font-medium text-coral">Desbloquear</span>
                </button>
              )}
              
              {/* Protocolo Turbo (Bloqueado) */}
              {!permissions.canAccessTurboProtocol && (
                <button 
                  onClick={() => handleNavigate('upgrade')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Rocket className="w-5 h-5 text-gray-400" />
                      <span className="absolute -top-1 -right-1 text-xs">🔒</span>
                    </div>
                    <span className="text-gray-500">Protocolo Turbo</span>
                  </div>
                  <span className="text-xs font-medium text-coral">Desbloquear</span>
                </button>
              )}
              
              {/* Coach Virtual (Bloqueado) */}
              {!permissions.canAccessAICoach && ( // Corrected to canAccessAICoach
                <button 
                  onClick={() => handleNavigate('upgrade')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <BrainCircuit className="w-5 h-5 text-gray-400" />
                      <span className="absolute -top-1 -right-1 text-xs">🔒</span>
                    </div>
                    <span className="text-gray-500">Coach Virtual</span>
                  </div>
                  <span className="text-xs font-medium text-coral">Desbloquear</span>
                </button>
              )}
              
              {/* Analytics Premium (Bloqueado) - This permission is not in UserPermissions type */}
              {/* {!permissions.premiumAnalytics && (
                <button 
                  onClick={() => handleNavigate('upgrade')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <BarChart className="w-5 h-5 text-gray-400" />
                      <span className="absolute -top-1 -right-1 text-xs">🔒</span>
                    </div>
                    <span className="text-gray-500">Análises Premium</span>
                  </div>
                  <span className="text-xs font-medium text-coral">Desbloquear</span>
                </button>
              )} */}
              
              {/* Comunidade VIP (Bloqueado) */}
              {!permissions.canAccessVIPCommunity && (
                <button 
                  onClick={() => handleNavigate('upgrade')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="absolute -top-1 -right-1 text-xs">🔒</span>
                    </div>
                    <span className="text-gray-500">Comunidade VIP</span>
                  </div>
                  <span className="text-xs font-medium text-coral">Desbloquear</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button 
              onClick={() => handleNavigate('upgrade')}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              Fazer Upgrade
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">
              Versão 1.0.0 • Protocolo Vital 4F
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
