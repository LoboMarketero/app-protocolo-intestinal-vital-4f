// Tipos centralizados para componentes

export interface NavigationProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

export interface PlanBasedProps {
  userPlan: 'essencial' | 'completo' | 'premium';
}
