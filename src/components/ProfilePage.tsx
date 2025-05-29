import React from 'react';
import { useUser } from '../context/UserContext';
import { 
  ArrowLeft, 
  User, 
  Package, 
  Calendar, 
  Shield, 
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

interface ProfilePageProps {
  onBack: () => void;
  onNavigate: (page: any) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, onNavigate }) => {
  const { user, darkMode, toggleDarkMode } = useUser();

  const getPlanInfo = () => {
    switch (user.plan) {
      case 'premium':
        return {
          name: 'PREMIUM',
          badgeClass: 'bg-gold/20 text-gold dark:bg-gold/30 dark:text-yellow-300',
          icon: '👑',
          description: 'Acesso a todos os recursos e ferramentas exclusivas'
        };
      case 'completo':
        return {
          name: 'COMPLETO',
          badgeClass: 'bg-blue-400/20 text-blue-500 dark:bg-blue-500/30 dark:text-blue-300',
          icon: '⭐',
          description: 'Guia de manutenção e receitas extras incluídos'
        };
      default:
        return {
          name: 'ESSENCIAL',
          badgeClass: 'bg-jade/20 text-jade dark:bg-jade/30 dark:text-mint',
          icon: '🌱',
          description: 'Protocolo básico de 21 dias'
        };
    }
  };

  const planInfo = getPlanInfo();

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-jade hover:text-jade/80 dark:text-mint dark:hover:text-mint/80"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
      </div>

      {/* Perfil do Usuário */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-mint/20 dark:bg-mint/10 rounded-full flex items-center justify-center text-jade dark:text-mint mb-3">
          <User className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h2>
        <div className={`px-3 py-1 rounded-full text-xs font-bold mt-2 flex items-center gap-1 ${planInfo.badgeClass}`}>
          <span>{planInfo.icon}</span>
          <span>PLANO {planInfo.name}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{planInfo.description}</p>
      </div>

      {/* Informações do Plano */}
      <div className="card mb-6">
        <h3 className="text-lg font-bold text-jade dark:text-mint mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Seu Plano
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Progresso</span>
            </div>
            <span className="text-gray-800 dark:text-gray-200 font-medium">Dia {user.currentDay} de 21</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Status da Assinatura</span>
            </div>
            <span className="text-green-600 dark:text-green-400 font-medium">Ativo</span>
          </div>
          
          <button 
            onClick={() => onNavigate('upgrade')}
            className="w-full btn-secondary flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            Fazer Upgrade
          </button>
        </div>
      </div>

      {/* Configurações */}
      <div className="card mb-6">
        <h3 className="text-lg font-bold text-jade dark:text-mint mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Configurações
        </h3>
        
        <div className="space-y-4">
          {/* Toggle de Tema */}
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className="flex items-center gap-2">
              {darkMode ? 
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : 
                <Sun className="w-5 h-5 text-amber-500" />
              }
              <span className="text-gray-700 dark:text-gray-300">Tema {darkMode ? 'Escuro' : 'Claro'}</span>
            </div>
            <button 
              onClick={toggleDarkMode}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <span className={`${darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform dark:bg-mint`} />
            </button>
          </div>
        </div>
      </div>

      {/* Permissões e Recursos */}
      <div className="card mb-6">
        <h3 className="text-lg font-bold text-jade dark:text-mint mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Seus Recursos
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Protocolo Básico</span>
            <span className="text-green-600 dark:text-green-400 font-medium">✓</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Vídeos Instrucionais</span>
            <span className="text-green-600 dark:text-green-400 font-medium">✓</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Guia de Manutenção</span>
            {user.permissions.maintenanceGuide ? (
              <span className="text-green-600 dark:text-green-400 font-medium">✓</span>
            ) : (
              <span className="text-right text-gray-400 dark:text-gray-500 text-sm">Plano Completo ou Premium</span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Receitas Extras</span>
            {user.permissions.extraRecipes ? (
              <span className="text-green-600 dark:text-green-400 font-medium">✓</span>
            ) : (
              <span className="text-right text-gray-400 dark:text-gray-500 text-sm">Plano Completo ou Premium</span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Protocolo Turbo</span>
            {user.permissions.turboProtocol ? (
              <span className="text-green-600 dark:text-green-400 font-medium">✓</span>
            ) : (
              <span className="text-right text-gray-400 dark:text-gray-500 text-sm">Plano Premium</span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Análises Premium</span>
            {user.permissions.premiumAnalytics ? (
              <span className="text-green-600 dark:text-green-400 font-medium">✓</span>
            ) : (
              <span className="text-right text-gray-400 dark:text-gray-500 text-sm">Plano Premium</span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Coach Virtual</span>
            {user.permissions.virtualCoach ? (
              <span className="text-green-600 dark:text-green-400 font-medium">✓</span>
            ) : (
              <span className="text-right text-gray-400 dark:text-gray-500 text-sm">Plano Premium</span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Comunidade VIP</span>
            {user.permissions.vipCommunity ? (
              <span className="text-green-600 dark:text-green-400 font-medium">✓</span>
            ) : (
              <span className="text-right text-gray-400 dark:text-gray-500 text-sm">Assinatura Mensal</span>
            )}
          </div>
        </div>
      </div>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
        <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <span className="text-gray-700 dark:text-gray-300 font-medium">Sair</span>
      </button>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
        Versão 1.0.0 • Protocolo Vital 4F
      </p>
    </div>
  );
};

export default ProfilePage;
