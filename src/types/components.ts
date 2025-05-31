// Tipos centralizados para componentes

export interface NavigationProps {
  onBack?: () => void;
}

export interface PlanBasedProps {
  userPlan: 'essencial' | 'completo' | 'premium';
}
