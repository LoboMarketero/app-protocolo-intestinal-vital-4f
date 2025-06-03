export type UserPlan = 'essencial' | 'completo' | 'premium';

export interface User {
  name: string;
  plan: 'essencial' | 'completo' | 'premium';
  currentDay: number;
  permissions: {
    basicProtocol: boolean;
    basicVideos: boolean;
    basicTracker: boolean;
    maintenanceGuide: boolean;
    extraRecipes: boolean;
    advancedTracker: boolean;
    turboProtocol: boolean;
    virtualCoach: boolean;
    premiumAnalytics: boolean;
    vipCommunity: boolean;
  };
}

export interface ProtocolPhase {
  id: number;
  name: string;
  days: string;
  description: string;
}

export interface ChecklistItem {
  text: string;
  checked?: boolean;
}

export interface DailyProtocol {
  day: number;
  phase: number;
  phaseName: string;
  morning: {
    title: string;
    description: string;
    preparation?: string;
    checklist?: ChecklistItem[];
  };
  afternoon: {
    title: string;
    description: string;
    preparation?: string;
    checklist?: ChecklistItem[];
  };
  night: {
    title: string;
    description: string;
    preparation?: string;
    checklist?: ChecklistItem[];
  };
  ingredients?: {
    category: string;
    items: ChecklistItem[];
  }[];
}

export interface PremiumFeature {
  id: string;
  title: string;
  description: string;
  price: string;
  planRequired: UserPlan | 'vip';
  icon: string;
}
