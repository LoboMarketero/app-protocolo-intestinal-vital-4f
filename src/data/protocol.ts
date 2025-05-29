import { DailyProtocol, ProtocolPhase } from '../types';

export const protocolPhases: ProtocolPhase[] = [
  {
    id: 1,
    name: 'PREPARAÇÃO',
    days: 'Dias 1-5',
    description: 'Prepare seu corpo para a transformação'
  },
  {
    id: 2,
    name: 'ELIMINAÇÃO',
    days: 'Dias 6-12',
    description: 'Elimine toxinas e parasitas'
  },
  {
    id: 3,
    name: 'RESTAURAÇÃO',
    days: 'Dias 13-18',
    description: 'Restaure sua flora intestinal'
  },
  {
    id: 4,
    name: 'FORTALECIMENTO',
    days: 'Dias 19-21',
    description: 'Fortaleça seu sistema digestivo'
  }
];

export const protocolData: DailyProtocol[] = [
  // FASE 1: PREPARAÇÃO (Dias 1-5)
  {
    day: 1,
    phase: 1,
    phaseName: 'PREPARAÇÃO',
    morning: {
      title: 'Água Detox Matinal',
      description: 'Água morna com limão e gengibre',
      preparation: 'Em 250ml de água morna, esprema meio limão e adicione 1 colher de chá de gengibre ralado. Tome em jejum.'
    },
    afternoon: {
      title: 'Chá Digestivo',
      description: 'Chá de hortelã com chia',
      preparation: 'Prepare o chá de hortelã e adicione 1 colher de sopa de chia. Deixe hidratar por 10 minutos.'
    },
    night: {
      title: 'Chá Calmante',
      description: 'Chá verde com exercício de respiração',
      preparation: 'Tome o chá verde 30 minutos antes de dormir. Faça 10 respirações profundas.'
    }
  },
  {
    day: 2,
    phase: 1,
    phaseName: 'PREPARAÇÃO',
    morning: {
      title: 'Água Detox Matinal',
      description: 'Água morna com limão e gengibre',
      preparation: 'Em 250ml de água morna, esprema meio limão e adicione 1 colher de chá de gengibre ralado. Tome em jejum.'
    },
    afternoon: {
      title: 'Chá Digestivo',
      description: 'Chá de hortelã com chia',
      preparation: 'Prepare o chá de hortelã e adicione 1 colher de sopa de chia. Deixe hidratar por 10 minutos.'
    },
    night: {
      title: 'Chá Calmante',
      description: 'Chá verde com exercício de respiração',
      preparation: 'Tome o chá verde 30 minutos antes de dormir. Faça 10 respirações profundas.'
    }
  },
  {
    day: 3,
    phase: 1,
    phaseName: 'PREPARAÇÃO',
    morning: {
      title: 'Água Detox Matinal',
      description: 'Água morna com limão e gengibre',
      preparation: 'Em 250ml de água morna, esprema meio limão e adicione 1 colher de chá de gengibre ralado. Tome em jejum.'
    },
    afternoon: {
      title: 'Chá Digestivo',
      description: 'Chá de hortelã com chia',
      preparation: 'Prepare o chá de hortelã e adicione 1 colher de sopa de chia. Deixe hidratar por 10 minutos.'
    },
    night: {
      title: 'Chá Calmante',
      description: 'Chá verde com exercício de respiração',
      preparation: 'Tome o chá verde 30 minutos antes de dormir. Faça 10 respirações profundas.'
    }
  },
  {
    day: 4,
    phase: 1,
    phaseName: 'PREPARAÇÃO',
    morning: {
      title: 'Água Detox Matinal',
      description: 'Água morna com limão e gengibre',
      preparation: 'Em 250ml de água morna, esprema meio limão e adicione 1 colher de chá de gengibre ralado. Tome em jejum.'
    },
    afternoon: {
      title: 'Chá Digestivo',
      description: 'Chá de hortelã com chia',
      preparation: 'Prepare o chá de hortelã e adicione 1 colher de sopa de chia. Deixe hidratar por 10 minutos.'
    },
    night: {
      title: 'Chá Calmante',
      description: 'Chá verde com exercício de respiração',
      preparation: 'Tome o chá verde 30 minutos antes de dormir. Faça 10 respirações profundas.'
    }
  },
  {
    day: 5,
    phase: 1,
    phaseName: 'PREPARAÇÃO',
    morning: {
      title: 'Água Detox Matinal',
      description: 'Água morna com limão e gengibre',
      preparation: 'Em 250ml de água morna, esprema meio limão e adicione 1 colher de chá de gengibre ralado. Tome em jejum.'
    },
    afternoon: {
      title: 'Chá Digestivo',
      description: 'Chá de hortelã com chia',
      preparation: 'Prepare o chá de hortelã e adicione 1 colher de sopa de chia. Deixe hidratar por 10 minutos.'
    },
    night: {
      title: 'Chá Calmante',
      description: 'Chá verde com exercício de respiração',
      preparation: 'Tome o chá verde 30 minutos antes de dormir. Faça 10 respirações profundas.'
    }
  },
  // FASE 2: ELIMINAÇÃO (Dias 6-12)
  {
    day: 6,
    phase: 2,
    phaseName: 'ELIMINAÇÃO',
    morning: {
      title: 'Suco Anti-Parasita',
      description: 'Abacaxi com alho e cúrcuma',
      preparation: 'Bata 2 rodelas de abacaxi, 1 dente de alho pequeno e 1/2 colher de chá de cúrcuma com 200ml de água.'
    },
    afternoon: {
      title: 'Óleo de Coco',
      description: '1 colher de sopa de óleo de coco',
      preparation: 'Tome 1 colher de sopa de óleo de coco extra virgem puro.'
    },
    night: {
      title: 'Vitamina Digestiva',
      description: 'Mamão com cúrcuma',
      preparation: 'Bata 1/2 mamão papaia com 1/2 colher de chá de cúrcuma e 150ml de água.'
    }
  },
  {
    day: 7,
    phase: 2,
    phaseName: 'ELIMINAÇÃO',
    morning: {
      title: 'Suco Anti-Parasita',
      description: 'Abacaxi com alho e cúrcuma',
      preparation: 'Bata 2 rodelas de abacaxi, 1 dente de alho pequeno e 1/2 colher de chá de cúrcuma com 200ml de água.'
    },
    afternoon: {
      title: 'Óleo de Coco',
      description: '1 colher de sopa de óleo de coco',
      preparation: 'Tome 1 colher de sopa de óleo de coco extra virgem puro.'
    },
    night: {
      title: 'Vitamina Digestiva',
      description: 'Mamão com cúrcuma',
      preparation: 'Bata 1/2 mamão papaia com 1/2 colher de chá de cúrcuma e 150ml de água.'
    }
  },
  {
    day: 8,
    phase: 2,
    phaseName: 'ELIMINAÇÃO',
    morning: {
      title: 'Suco Anti-Parasita',
      description: 'Abacaxi com alho e cúrcuma',
      preparation: 'Bata 2 rodelas de abacaxi, 1 dente de alho pequeno e 1/2 colher de chá de cúrcuma com 200ml de água.'
    },
    afternoon: {
      title: 'Óleo de Coco',
      description: '1 colher de sopa de óleo de coco',
      preparation: 'Tome 1 colher de sopa de óleo de coco extra virgem puro.'
    },
    night: {
      title: 'Vitamina Digestiva',
      description: 'Mamão com cúrcuma',
      preparation: 'Bata 1/2 mamão papaia com 1/2 colher de chá de cúrcuma e 150ml de água.'
    }
  },
  {
    day: 9,
    phase: 2,
    phaseName: 'ELIMINAÇÃO',
    morning: {
      title: 'Suco Anti-Parasita',
      description: 'Abacaxi com alho e cúrcuma',
      preparation: 'Bata 2 rodelas de abacaxi, 1 dente de alho pequeno e 1/2 colher de chá de cúrcuma com 200ml de água.'
    },
    afternoon: {
      title: 'Óleo de Coco',
      description: '1 colher de sopa de óleo de coco',
      preparation: 'Tome 1 colher de sopa de óleo de coco extra virgem puro.'
    },
    night: {
      title: 'Vitamina Digestiva',
      description: 'Mamão com cúrcuma',
      preparation: 'Bata 1/2 mamão papaia com 1/2 colher de chá de cúrcuma e 150ml de água.'
    }
  },
  {
    day: 10,
    phase: 2,
    phaseName: 'ELIMINAÇÃO',
    morning: {
      title: 'Suco Anti-Parasita',
      description: 'Abacaxi com alho e cúrcuma',
      preparation: 'Bata 2 rodelas de abacaxi, 1 dente de alho pequeno e 1/2 colher de chá de cúrcuma com 200ml de água.'
    },
    afternoon: {
      title: 'Óleo de Coco',
      description: '1 colher de sopa de óleo de coco',
      preparation: 'Tome 1 colher de sopa de óleo de coco extra virgem puro.'
    },
    night: {
      title: 'Vitamina Digestiva',
      description: 'Mamão com cúrcuma',
      preparation: 'Bata 1/2 mamão papaia com 1/2 colher de chá de cúrcuma e 150ml de água.'
    }
  },
  {
    day: 11,
    phase: 2,
    phaseName: 'ELIMINAÇÃO',
    morning: {
      title: 'Suco Anti-Parasita',
      description: 'Abacaxi com alho e cúrcuma',
      preparation: 'Bata 2 rodelas de abacaxi, 1 dente de alho pequeno e 1/2 colher de chá de cúrcuma com 200ml de água.'
    },
    afternoon: {
      title: 'Óleo de Coco',
      description: '1 colher de sopa de óleo de coco',
      preparation: 'Tome 1 colher de sopa de óleo de coco extra virgem puro.'
    },
    night: {
      title: 'Vitamina Digestiva',
      description: 'Mamão com cúrcuma',
      preparation: 'Bata 1/2 mamão papaia com 1/2 colher de chá de cúrcuma e 150ml de água.'
    }
  },
  {
    day: 12,
    phase: 2,
    phaseName: 'ELIMINAÇÃO',
    morning: {
      title: 'Suco Anti-Parasita',
      description: 'Abacaxi com alho e cúrcuma',
      preparation: 'Bata 2 rodelas de abacaxi, 1 dente de alho pequeno e 1/2 colher de chá de cúrcuma com 200ml de água.'
    },
    afternoon: {
      title: 'Óleo de Coco',
      description: '1 colher de sopa de óleo de coco',
      preparation: 'Tome 1 colher de sopa de óleo de coco extra virgem puro.'
    },
    night: {
      title: 'Vitamina Digestiva',
      description: 'Mamão com cúrcuma',
      preparation: 'Bata 1/2 mamão papaia com 1/2 colher de chá de cúrcuma e 150ml de água.'
    }
  },
  // FASE 3: RESTAURAÇÃO (Dias 13-18)
  {
    day: 13,
    phase: 3,
    phaseName: 'RESTAURAÇÃO',
    morning: {
      title: 'Smoothie Probiótico',
      description: 'Bebida com probióticos naturais',
      preparation: 'Bata 1 banana, 1/2 xícara de iogurte natural, 1 colher de mel e 150ml de água.'
    },
    afternoon: {
      title: 'Maçã com Casca',
      description: '1 maçã média com casca',
      preparation: 'Consuma 1 maçã média com casca, mastigando bem.'
    },
    night: {
      title: 'Linhaça Hidratada',
      description: 'Linhaça com água morna',
      preparation: 'Deixe 1 colher de sopa de linhaça de molho em 200ml de água morna por 2 horas. Tome antes de dormir.'
    }
  },
  {
    day: 14,
    phase: 3,
    phaseName: 'RESTAURAÇÃO',
    morning: {
      title: 'Smoothie Probiótico',
      description: 'Bebida com probióticos naturais',
      preparation: 'Bata 1 banana, 1/2 xícara de iogurte natural, 1 colher de mel e 150ml de água.'
    },
    afternoon: {
      title: 'Maçã com Casca',
      description: '1 maçã média com casca',
      preparation: 'Consuma 1 maçã média com casca, mastigando bem.'
    },
    night: {
      title: 'Linhaça Hidratada',
      description: 'Linhaça com água morna',
      preparation: 'Deixe 1 colher de sopa de linhaça de molho em 200ml de água morna por 2 horas. Tome antes de dormir.'
    }
  },
  {
    day: 15,
    phase: 3,
    phaseName: 'RESTAURAÇÃO',
    morning: {
      title: 'Smoothie Probiótico',
      description: 'Bebida com probióticos naturais',
      preparation: 'Bata 1 banana, 1/2 xícara de iogurte natural, 1 colher de mel e 150ml de água.'
    },
    afternoon: {
      title: 'Maçã com Casca',
      description: '1 maçã média com casca',
      preparation: 'Consuma 1 maçã média com casca, mastigando bem.'
    },
    night: {
      title: 'Linhaça Hidratada',
      description: 'Linhaça com água morna',
      preparation: 'Deixe 1 colher de sopa de linhaça de molho em 200ml de água morna por 2 horas. Tome antes de dormir.'
    }
  },
  {
    day: 16,
    phase: 3,
    phaseName: 'RESTAURAÇÃO',
    morning: {
      title: 'Smoothie Probiótico',
      description: 'Bebida com probióticos naturais',
      preparation: 'Bata 1 banana, 1/2 xícara de iogurte natural, 1 colher de mel e 150ml de água.'
    },
    afternoon: {
      title: 'Maçã com Casca',
      description: '1 maçã média com casca',
      preparation: 'Consuma 1 maçã média com casca, mastigando bem.'
    },
    night: {
      title: 'Linhaça Hidratada',
      description: 'Linhaça com água morna',
      preparation: 'Deixe 1 colher de sopa de linhaça de molho em 200ml de água morna por 2 horas. Tome antes de dormir.'
    }
  },
  {
    day: 17,
    phase: 3,
    phaseName: 'RESTAURAÇÃO',
    morning: {
      title: 'Smoothie Probiótico',
      description: 'Bebida com probióticos naturais',
      preparation: 'Bata 1 banana, 1/2 xícara de iogurte natural, 1 colher de mel e 150ml de água.'
    },
    afternoon: {
      title: 'Maçã com Casca',
      description: '1 maçã média com casca',
      preparation: 'Consuma 1 maçã média com casca, mastigando bem.'
    },
    night: {
      title: 'Linhaça Hidratada',
      description: 'Linhaça com água morna',
      preparation: 'Deixe 1 colher de sopa de linhaça de molho em 200ml de água morna por 2 horas. Tome antes de dormir.'
    }
  },
  {
    day: 18,
    phase: 3,
    phaseName: 'RESTAURAÇÃO',
    morning: {
      title: 'Smoothie Probiótico',
      description: 'Bebida com probióticos naturais',
      preparation: 'Bata 1 banana, 1/2 xícara de iogurte natural, 1 colher de mel e 150ml de água.'
    },
    afternoon: {
      title: 'Maçã com Casca',
      description: '1 maçã média com casca',
      preparation: 'Consuma 1 maçã média com casca, mastigando bem.'
    },
    night: {
      title: 'Linhaça Hidratada',
      description: 'Linhaça com água morna',
      preparation: 'Deixe 1 colher de sopa de linhaça de molho em 200ml de água morna por 2 horas. Tome antes de dormir.'
    }
  },
  // FASE 4: FORTALECIMENTO (Dias 19-21)
  {
    day: 19,
    phase: 4,
    phaseName: 'FORTALECIMENTO',
    morning: {
      title: 'Suco Verde Detox',
      description: 'Couve, maçã verde e limão',
      preparation: 'Bata 2 folhas de couve, 1/2 maçã verde, suco de 1/2 limão com 200ml de água.'
    },
    afternoon: {
      title: 'Água de Coco',
      description: '200ml de água de coco natural',
      preparation: 'Tome 200ml de água de coco natural, de preferência gelada.'
    },
    night: {
      title: 'Chá Finalizador',
      description: 'Camomila com mel',
      preparation: 'Prepare o chá de camomila e adicione 1 colher de chá de mel. Tome 30 minutos antes de dormir.'
    }
  },
  {
    day: 20,
    phase: 4,
    phaseName: 'FORTALECIMENTO',
    morning: {
      title: 'Suco Verde Detox',
      description: 'Couve, maçã verde e limão',
      preparation: 'Bata 2 folhas de couve, 1/2 maçã verde, suco de 1/2 limão com 200ml de água.'
    },
    afternoon: {
      title: 'Água de Coco',
      description: '200ml de água de coco natural',
      preparation: 'Tome 200ml de água de coco natural, de preferência gelada.'
    },
    night: {
      title: 'Chá Finalizador',
      description: 'Camomila com mel',
      preparation: 'Prepare o chá de camomila e adicione 1 colher de chá de mel. Tome 30 minutos antes de dormir.'
    }
  },
  {
    day: 21,
    phase: 4,
    phaseName: 'FORTALECIMENTO',
    morning: {
      title: 'Suco Verde Detox',
      description: 'Couve, maçã verde e limão',
      preparation: 'Bata 2 folhas de couve, 1/2 maçã verde, suco de 1/2 limão com 200ml de água.'
    },
    afternoon: {
      title: 'Água de Coco',
      description: '200ml de água de coco natural',
      preparation: 'Tome 200ml de água de coco natural, de preferência gelada.'
    },
    night: {
      title: 'Chá Finalizador',
      description: 'Camomila com mel',
      preparation: 'Prepare o chá de camomila e adicione 1 colher de chá de mel. Tome 30 minutos antes de dormir.'
    }
  }
];
