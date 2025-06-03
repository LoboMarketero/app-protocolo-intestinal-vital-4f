import React from 'react';
import { 
  Home, 
  Calendar, 
  Menu
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: any) => void;
  onOpenMenu: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, onOpenMenu }) => {
  // Keeping useUser hook for future use but not destructuring any properties
  const { } = useUser();
  
  // Simplificamos a navegação para apenas 2 elementos principais + menu
  const navItems = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'protocol', label: 'Protocolo', icon: Calendar },
    // Removed materials and progress as requested
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white glassmorphism border-t border-gray-200 px-2 py-2 z-40">
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
        
        {/* Botão do menu lateral */}
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
