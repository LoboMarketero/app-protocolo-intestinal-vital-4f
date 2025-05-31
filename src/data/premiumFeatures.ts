import { PremiumFeature } from '../types';

export const premiumFeatures: PremiumFeature[] = [
  {
    id: 'maintenance-guide',
    title: 'GUIA MANUTENÇÃO',
    description: 'Mantenha resultados para sempre',
    price: 'Incluído no Plano Completo',
    planRequired: 'completo',
    icon: 'BookOpen'
  },
  {
    id: 'extra-recipes',
    title: '25 RECEITAS EXTRAS',
    description: 'Acelere 2x mais',
    price: 'Incluído no Plano Completo',
    planRequired: 'completo',
    icon: 'Salad'
  },
  {
    id: 'turbo-protocol',
    title: 'PROTOCOLO TURBO',
    description: 'Resultados em 15 dias',
    price: 'Incluído no Plano Premium',
    planRequired: 'premium',
    icon: 'Rocket'
  },
  {
    id: 'ai-coach',
    title: 'COACH VIRTUAL IA',
    description: 'Análises e recomendações personalizadas',
    price: 'Incluído no Plano Premium',
    planRequired: 'premium',
    icon: 'BrainCircuit'
  },
  {
    id: 'vip-community',
    title: 'COMUNIDADE VIP',
    description: 'Suporte Dra. Mariana',
    price: 'R$ 37/mês',
    planRequired: 'vip',
    icon: 'Users'
  }
];

export const planDetails = {
  essencial: {
    name: 'ESSENCIAL',
    features: [
      'Protocolo básico de 21 dias',
      'Guia de preparação',
      'Acompanhamento de progresso'
    ],
    price: 'R$ 47',
    fullPrice: 47
  },
  completo: {
    name: 'COMPLETO',
    features: [
      'Tudo do Essencial',
      '📖 Guia de Manutenção',
      '🍹 25 Receitas Extras',
      '📱 Suporte por email'
    ],
    price: 'R$ 87',
    fullPrice: 87,
    upgradeFromEssencial: '+R$ 40'
  },
  premium: {
    name: 'PREMIUM',
    features: [
      'Tudo do Completo',
      '🚀 Protocolo Turbo 15 dias',
      '🎥 Vídeos exclusivos',
      '📞 Suporte prioritário',
      '🎁 Bônus surpresa'
    ],
    price: 'R$ 127',
    fullPrice: 127,
    upgradeFromEssencial: '+R$ 80',
    upgradeFromCompleto: '+R$ 40'
  }
};
