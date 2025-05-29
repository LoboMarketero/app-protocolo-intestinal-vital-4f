import React from 'react';
import { 
  Home, 
  Calendar, 
  FileText, 
  BarChart, 
  Menu
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: any) => void;
  onOpenMenu: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, onOpenMenu }) => {
  const { user } = useUser();
  
  // Badge para mostrar o plano do usuário
  const PlanBadge = () => {
    switch(user.plan) {
      case 'essencial':
        return <span className="bg-jade/10 text-jade text-[10px] px-1 py-0.5 rounded font-bold">ESSENCIAL</span>;
      case 'completo':
        return <span className="bg-blue-400/10 text-blue-500 text-[10px] px-1 py-0.5 rounded font-bold">COMPLETO</span>;
      case 'premium':
        return <span className="bg-gold/10 text-gold text-[10px] px-1 py-0.5 rounded font-bold">PREMIUM</span>;
      default:
        return null;
    }
  };
  
  // Simplificamos la navegación a solo 4 elementos principales + menú
  const navItems = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'protocol', label: 'Protocolo', icon: Calendar },
    { id: 'materials', label: 'Materiais', icon: FileText },
    { id: 'progress', label: 'Progresso', icon: BarChart },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white glassmorphism border-t border-gray-200 px-2 py-2 z-40">
      <div className="flex items-center justify-between px-3 pb-1">
        <PlanBadge />
        <button 
          onClick={() => onNavigate('upgrade')}
          className="text-xs text-jade font-medium hover:text-jade/80"
        >
          Fazer Upgrade
        </button>
      </div>
      
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                isActive 
                  ? 'text-jade transform scale-105' 
                  : 'text-gray-600 hover:text-jade'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'w-6 h-6' : ''}`} />
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
        
        {/* Botón del menú lateral */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center p-2 rounded-lg transition-all text-gray-600 hover:text-jade"
        >
          <div className="relative">
            <Menu className="w-5 h-5" />
          </div>
          <span className="text-xs mt-1">Menu</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
