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
      preparation: 'Em 250ml de água morna, esprema meio limão e adicione 1 colher de chá de gengibre ralado. Tome em jejum.',
      checklist: [
        { text: "Acordei e preparei imediatamente" },
        { text: "Água morna (não fervente)" },
        { text: "Suco de 1/2 limão fresco" },
        { text: "1 colher (chá) gengibre ralado" },
        { text: "Tomei em jejum completo" },
        { text: "Aguardei 30 min para café da manhã" }
      ]
    },
    afternoon: {
      title: 'Chá Digestivo',
      description: 'Chá de hortelã com chia',
      preparation: 'Prepare o chá de hortelã e adicione 1 colher de sopa de chia. Deixe hidratar por 10 minutos.',
      checklist: [
        { text: "Preparei chá de hortelã" },
        { text: "Hidratei 1 col.(sopa) chia por 10 min" },
        { text: "Consumi nos intervalos das refeições" },
        { text: "Horário ideal: 14h-16h" }
      ]
    },
    night: {
      title: 'Chá Calmante',
      description: 'Chá verde com exercício de respiração',
      preparation: 'Tome o chá verde 30 minutos antes de dormir. Faça 10 respirações profundas.',
      checklist: [
        { text: "Preparei chá verde suave" },
        { text: "Fiz 5 respirações profundas" },
        { text: "Tomei 1-2h antes de dormir" },
        { text: "Relaxei durante o processo" }
      ]
    },
    ingredients: [
      {
        category: "Ingredientes Necessários Dia 1",
        items: [
          { text: "Limões frescos (2 unidades)" },
          { text: "Gengibre fresco (1 pedaço pequeno)" },
          { text: "Chá de hortelã (1 sachê ou folhas frescas)" },
          { text: "Sementes de chia (2 colheres de sopa)" },
          { text: "Chá verde (1 sachê)" }
        ]
      }
    ]
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
      preparation: 'Bata 2 rodelas de abacaxi, 1 dente de alho pequeno e 1/2 colher de chá de cúrcuma com 200ml de água.',
      checklist: [
        { text: "Preparei em jejum absoluto" },
        { text: "1 fatia média abacaxi (2cm)" },
        { text: "1 dente alho pequeno" },
        { text: "1/2 col.(chá) cúrcuma" },
        { text: "1 pitada pimenta-do-reino" },
        { text: "200ml água" },
        { text: "Bati no liquidificador 1 min" },
        { text: "Tomei imediatamente" }
      ]
    },
    afternoon: {
      title: 'Óleo de Coco',
      description: '1 colher de sopa de óleo de coco',
      preparation: 'Tome 1 colher de sopa de óleo de coco extra virgem puro.',
      checklist: [
        { text: "1 col.(sopa) óleo de coco" },
        { text: "Tomei puro OU misturei na comida" },
        { text: "Se sólido, derreteu normalmente" },
        { text: "Junto com almoço/lanche" }
      ]
    },
    night: {
      title: 'Vitamina Digestiva',
      description: 'Mamão com cúrcuma',
      preparation: 'Bata 1/2 mamão papaia com 1/2 colher de chá de cúrcuma e 150ml de água.',
      checklist: [
        { text: "1 fatia mamão papaia (3cm)" },
        { text: "1/2 col.(chá) cúrcuma" },
        { text: "150ml água de coco" },
        { text: "Bati até ficar cremoso" },
        { text: "Tomei 1h antes de dormir" }
      ]
    },
    ingredients: [
      {
        category: "Ingredientes Necessários Dia 6",
        items: [
          { text: "Abacaxi fresco (1 fatia)" },
          { text: "Alho fresco (1 dente)" },
          { text: "Cúrcuma em pó (1 colher de chá)" },
          { text: "Pimenta-do-reino (1 pitada)" },
          { text: "Óleo de coco extra virgem (1 colher de sopa)" },
          { text: "Mamão papaia (1/2 unidade)" },
          { text: "Água de coco (150ml)" }
        ]
      }
    ]
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
      preparation: 'Bata 1 banana, 1/2 xícara de iogurte natural, 1 colher de mel e 150ml de água.',
      checklist: [
        { text: "200ml kefir/iogurte natural" },
        { text: "1 banana pequena" },
        { text: "1 col.(sopa) biomassa banana verde" },
        { text: "1 col.(sopa) aveia flocos" },
        { text: "1 col.(chá) mel cru" },
        { text: "Bati 1 min até cremoso" },
        { text: "Tomei no café da manhã" }
      ]
    },
    afternoon: {
      title: 'Maçã com Casca',
      description: '1 maçã média com casca',
      preparation: 'Consuma 1 maçã média com casca, mastigando bem.',
      checklist: [
        { text: "1 maçã média com casca" },
        { text: "Lavei bem antes de comer" },
        { text: "Mastiguei muito bem" },
        { text: "Comi devagar, mindfulness" }
      ]
    },
    night: {
      title: 'Linhaça Hidratada',
      description: 'Linhaça com água morna',
      preparation: 'Deixe 1 colher de sopa de linhaça de molho em 200ml de água morna por 2 horas. Tome antes de dormir.',
      checklist: [
        { text: "1 copo água morna (200ml)" },
        { text: "1 col.(sopa) linhaça moída" },
        { text: "Misturei bem com colher" },
        { text: "Deixei descansar 2 min" },
        { text: "Tomei antes de dormir" }
      ]
    },
    ingredients: [
      {
        category: "Ingredientes Necessários Dia 13",
        items: [
          { text: "Kefir ou iogurte natural (200ml)" },
          { text: "Banana fresca (1 unidade)" },
          { text: "Biomassa banana verde (1 colher de sopa)" },
          { text: "Aveia em flocos (1 colher de sopa)" },
          { text: "Mel cru (1 colher de chá)" },
          { text: "Maçã com casca (1 unidade)" },
          { text: "Linhaça dourada moída (1 colher de sopa)" }
        ]
      }
    ]
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
      preparation: 'Bata 2 folhas de couve, 1/2 maçã verde, suco de 1/2 limão com 200ml de água.',
      checklist: [
        { text: "1 folha couve média" },
        { text: "1 punhado espinafre" },
        { text: "1/2 pepino médio" },
        { text: "1/4 abobrinha pequena" },
        { text: "Salsinha a gosto" },
        { text: "300ml água de coco" },
        { text: "Lavei bem todos vegetais" },
        { text: "Bati no liquidificador" },
        { text: "COE o suco" },
        { text: "Tomei imediatamente em jejum" }
      ]
    },
    afternoon: {
      title: 'Água de Coco',
      description: '200ml de água de coco natural',
      preparation: 'Tome 200ml de água de coco natural, de preferência gelada.',
      checklist: [
        { text: "1 copo água de coco (200ml)" },
        { text: "Gelada ou temperatura ambiente" },
        { text: "Entre refeições" }
      ]
    },
    night: {
      title: 'Chá Finalizador',
      description: 'Camomila com mel',
      preparation: 'Prepare o chá de camomila e adicione 1 colher de chá de mel. Tome 30 minutos antes de dormir.',
      checklist: [
        { text: "1 sachê camomila" },
        { text: "1 sachê hortelã (ou folhas)" },
        { text: "1 col.(chá) mel" },
        { text: "200ml água quente" },
        { text: "Preparei chá duplo" },
        { text: "Mexi devagar" },
        { text: "Tomei morno, relaxando" }
      ]
    },
    ingredients: [
      {
        category: "Ingredientes Necessários Dia 19",
        items: [
          { text: "Couve fresca (1 folha)" },
          { text: "Espinafre fresco (1 punhado)" },
          { text: "Pepino (1/2 unidade)" },
          { text: "Abobrinha (1/4 unidade)" },
          { text: "Salsinha (a gosto)" },
          { text: "Água de coco (500ml)" },
          { text: "Camomila (1 sachê)" },
          { text: "Hortelã (1 sachê ou folhas)" },
          { text: "Mel (1 colher de chá)" }
        ]
      }
    ]
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
