import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User;
  updateUserPlan: (plan: 'essencial' | 'completo' | 'premium') => void;
  updateVipSubscription: (isSubscribed: boolean) => void;
  incrementDay: () => void;
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    name: 'Maria Silva',
    plan: 'essencial',
    currentDay: 3,
    permissions: {
      basicProtocol: true,
      basicVideos: true,
      basicTracker: true,
      maintenanceGuide: false,
      extraRecipes: false,
      advancedTracker: false,
      turboProtocol: false,
      virtualCoach: false,
      premiumAnalytics: false,
      vipCommunity: false
    }
  });

  const updateUserPlan = (plan: 'essencial' | 'completo' | 'premium') => {
    setUser(prev => ({
      ...prev,
      plan,
      permissions: {
        basicProtocol: true,
        basicVideos: true,
        basicTracker: true,
        maintenanceGuide: plan === 'completo' || plan === 'premium',
        extraRecipes: plan === 'completo' || plan === 'premium',
        advancedTracker: plan === 'completo' || plan === 'premium',
        turboProtocol: plan === 'premium',
        virtualCoach: plan === 'premium',
        premiumAnalytics: plan === 'premium',
        vipCommunity: false // Sempre requer assinatura mensal
      }
    }));
  };

  const incrementDay = () => {
    setUser(prev => ({
      ...prev,
      currentDay: Math.min(prev.currentDay + 1, 21)
    }));
  };

  const updateVipSubscription = (isSubscribed: boolean) => {
    setUser(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        vipCommunity: isSubscribed
      }
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      updateUserPlan, 
      updateVipSubscription, 
      incrementDay,
      darkMode,
      toggleDarkMode
    }}>
      {children}
    </UserContext.Provider>
  );
};
