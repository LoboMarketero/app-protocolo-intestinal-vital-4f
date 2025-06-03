import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ArrowLeft, CheckCircle, Download, Calendar, FileText, ShoppingBag } from 'lucide-react';

// Define our simplified material card component for this specific use case
interface MaterialCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isPremium: boolean;
  onClick?: () => void;
}

// Simplified card component for our use case
const SupportMaterialCard: React.FC<MaterialCardProps> = ({
  title,
  description,
  icon,
  isPremium,
  onClick
}) => {
  return (
    <div 
      className="card cursor-pointer hover:shadow-xl transition-all" 
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 mt-1">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-jade-700 mb-1">
            {title} {isPremium && <span>🔒</span>}
          </h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

interface MateriaisApoioProps {
  onBack: () => void;
}

type MaterialTab = 'checklists' | 'compras' | 'calendario' | 'infograficos';

const MateriaisApoio: React.FC<MateriaisApoioProps> = ({ onBack }) => {
  const { permissions } = useUser();
  const [activeTab, setActiveTab] = useState<MaterialTab>('checklists');
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState<string>('');

  // Material de apoio para as diferentes fases
  const materiaisDeApoio: MaterialCardProps[] = [
    {
      id: 'checklist-fase1',
      title: 'Fase 1: Preparação',
      description: 'Checklist completo para os dias 1-5',
      icon: <CheckCircle className="w-6 h-6 text-jade-600" />,
      isPremium: false,
    },
    {
      id: 'checklist-fase2',
      title: 'Fase 2: Eliminação',
      description: 'Checklist completo para os dias 6-12',
      icon: <CheckCircle className="w-6 h-6 text-jade-600" />,
      isPremium: false,
    },
    {
      id: 'checklist-fase3',
      title: 'Fase 3: Restauração',
      description: 'Checklist completo para os dias 13-18',
      icon: <CheckCircle className="w-6 h-6 text-jade-600" />,
      isPremium: false,
    },
    {
      id: 'checklist-fase4',
      title: 'Fase 4: Fortalecimento',
      description: 'Checklist completo para os dias 19-21',
      icon: <CheckCircle className="w-6 h-6 text-jade-600" />,
      isPremium: false,
    },
  ];

  // Datos detallados para los checklists
  const detailedChecklistData: Record<string, string[]> = {
    'checklist-fase1': [
      '✓ Elimine açúcares refinados da dieta',
      '✓ Prepare 1L de chá antiparasitário pela manhã',
      '✓ Consuma vegetais de folhas verdes em todas as refeições',
      '✓ Tome 2 cápsulas do suplemento probiótico',
      '✓ Beba 2L de água filtrada ao longo do dia',
      '✓ Evite todos os alimentos processados',
      '✓ Tome banho de imersão com sal marinho (Dia 3)',
      '✓ Prepare o suco verde detox todas as manhãs',
      '✓ Evite lácteos e glúten durante toda a fase',
      '✓ Faça a limpeza do intestino com água morna e limão em jejum'
    ],
    'checklist-fase2': [
      '✓ Tome a infusão antiparasitária 3x ao dia',
      '✓ Consuma alho cru no café da manhã',
      '✓ Adicione sementes de abóbora nas refeições',
      '✓ Tome o shake proteico com cúrcuma',
      '✓ Consuma papaia com sementes em jejum',
      '✓ Aplique compressas mornas no abdômen antes de dormir',
      '✓ Realize a respiração profunda por 10 minutos',
      '✓ Adicione óleo de coco a todas as refeições',
      '✓ Tome a mistura de bentonita pela manhã',
      '✓ Evite todos os açúcares e carboidratos refinados',
      '✓ Consuma o caldo desintoxicante à noite',
      '✓ Adicione canela e cravo às bebidas'
    ],
    'checklist-fase3': [
      '✓ Tome o kefir ou kombucha em jejum',
      '✓ Adicione 2 colheres de psyllium à água',
      '✓ Consuma iogurte natural sem açúcar',
      '✓ Tome a cápsula de enzimas digestivas antes das refeições',
      '✓ Adicione prebióticos (cebola, alho, aspargos) às refeições',
      '✓ Consuma alimentos fermentados diariamente',
      '✓ Beba o chá de gengibre e hortelã após as refeições',
      '✓ Tome 1 colher de vinagre de maçã em água morna',
      '✓ Adicione sementes de chia ao café da manhã',
      '✓ Aplique a automassagem abdominal por 5 minutos'
    ],
    'checklist-fase4': [
      '✓ Tome a infusão de ervas fortalecedoras',
      '✓ Adicione gergelim e linhaça às refeições',
      '✓ Consuma um ovo cozido no café da manhã',
      '✓ Tome caldo de osso ou alternativa vegetal',
      '✓ Adicione gengibre às refeições',
      '✓ Mantenha a hidratação com água de coco',
      '✓ Faça o exercício de respiração diafragmática',
      '✓ Tome o suplemento de zinco (se recomendado)',
      '✓ Consuma nozes e sementes como lanche',
      '✓ Tome chá de camomila antes de dormir'
    ]
  };

  // Datos para la lista de compras organizados por fase
  const shoppingListByPhase = [
    {
      phase: 'Fase 1: Preparação (Dias 1-5)',
      items: [
        { category: 'Vegetais', items: ['Folhas verdes variadas', 'Brócolis', 'Couve', 'Pepino', 'Abobrinha'] },
        { category: 'Frutas', items: ['Limão', 'Maçã verde', 'Abacate'] },
        { category: 'Chás e Ervas', items: ['Chá verde', 'Hortelã', 'Alecrim', 'Boldo'] },
        { category: 'Suplementos', items: ['Probiótico', 'Cápsulas de alho'] },
        { category: 'Outros', items: ['Sal marinho', 'Água filtrada', 'Óleos essenciais (opcional)'] }
      ],
      averageCost: 'R$ 120-150'
    },
    {
      phase: 'Fase 2: Eliminação (Dias 6-12)',
      items: [
        { category: 'Vegetais', items: ['Alho fresco', 'Cebola', 'Cenoura', 'Beterraba', 'Couve-flor'] },
        { category: 'Frutas', items: ['Mamão papaia', 'Coco fresco', 'Limão'] },
        { category: 'Sementes', items: ['Sementes de abóbora', 'Sementes de girassol'] },
        { category: 'Suplementos', items: ['Argila bentonita', 'Cúrcuma em pó'] },
        { category: 'Especiarias', items: ['Canela', 'Cravo', 'Gengibre fresco'] },
        { category: 'Outros', items: ['Óleo de coco', 'Água filtrada', 'Vinagre de maçã'] }
      ],
      averageCost: 'R$ 150-180'
    },
    {
      phase: 'Fase 3: Restauração (Dias 13-18)',
      items: [
        { category: 'Probióticos', items: ['Kefir', 'Kombucha', 'Iogurte natural sem açúcar'] },
        { category: 'Prebióticos', items: ['Cebola', 'Alho', 'Aspargos', 'Banana verde'] },
        { category: 'Fermentados', items: ['Kimchi', 'Chucrute', 'Picles natural'] },
        { category: 'Suplementos', items: ['Psyllium', 'Enzimas digestivas'] },
        { category: 'Outros', items: ['Sementes de chia', 'Água filtrada', 'Vinagre de maçã'] }
      ],
      averageCost: 'R$ 130-160'
    },
    {
      phase: 'Fase 4: Fortalecimento (Dias 19-21)',
      items: [
        { category: 'Proteínas', items: ['Ovos', 'Frango orgânico', 'Peixes de água fria'] },
        { category: 'Sementes', items: ['Gergelim', 'Linhaça', 'Nozes variadas'] },
        { category: 'Vegetais', items: ['Gengibre', 'Cenoura', 'Batata doce'] },
        { category: 'Bebidas', items: ['Água de coco', 'Chá de camomila'] },
        { category: 'Suplementos', items: ['Zinco (se recomendado)', 'Magnésio'] }
      ],
      averageCost: 'R$ 100-130'
    }
  ];

  // Datos para el calendario de acompañamiento
  const calendarInfo = {
    title: 'Calendário de Acompanhamento',
    description: 'Acompanhe seu progresso marcando cada dia completado no protocolo.',
    weeks: [
      {
        week: 'Semana 1',
        days: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'],
        phase: 'Fase 1 → Fase 2',
        milestone: 'Final da Fase 1: Primeira desintoxicação completa'
      },
      {
        week: 'Semana 2',
        days: ['Dia 8', 'Dia 9', 'Dia 10', 'Dia 11', 'Dia 12', 'Dia 13', 'Dia 14'],
        phase: 'Fase 2 → Fase 3',
        milestone: 'Final da Fase 2: Eliminação parasitária ativa concluída'
      },
      {
        week: 'Semana 3',
        days: ['Dia 15', 'Dia 16', 'Dia 17', 'Dia 18', 'Dia 19', 'Dia 20', 'Dia 21'],
        phase: 'Fase 3 → Fase 4',
        milestone: 'Protocolo Completo! Intestino renovado e fortalecido'
      }
    ]
  };

  // Datos para infográficos educativos
  const infographics = [
    {
      id: 'info-parasitas',
      title: 'Principais Parasitas Intestinais',
      description: 'Conheça os 7 parasitas mais comuns e seus sintomas',
      icon: <FileText className="w-6 h-6 text-jade-600" />,
      isPremium: false
    },
    {
      id: 'info-sinais',
      title: 'Sinais de Infestação',
      description: '12 sinais que você pode ter parasitas intestinais',
      icon: <FileText className="w-6 h-6 text-jade-600" />,
      isPremium: false
    },
    {
      id: 'info-alimentos',
      title: 'Alimentos Antiparasitários',
      description: 'Os 15 alimentos mais potentes contra parasitas',
      icon: <FileText className="w-6 h-6 text-jade-600" />,
      isPremium: false
    },
    {
      id: 'info-metabolismo',
      title: 'Parasitas e Metabolismo',
      description: 'Como a infestação parasitária afeta seu peso',
      icon: <FileText className="w-6 h-6 text-jade-600" />,
      isPremium: false
    },
    {
      id: 'info-flora',
      title: 'Restauração da Flora Intestinal',
      description: 'Guia completo para reconstruir seu microbioma',
      icon: <FileText className="w-6 h-6 text-jade-600" />,
      isPremium: false
    }
  ];

  const handleChecklistClick = (id: string) => {
    setSelectedChecklist(id);
    setShowChecklistModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-jade-600" />
        </button>
        <h1 className="text-2xl font-bold text-jade-700">Materiais de Apoio</h1>
      </div>

      {/* Tabs para navegação entre os diferentes tipos de materiais */}
      <div className="flex overflow-x-auto mb-6 pb-2 gap-2">
        <button 
          className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'checklists' ? 'bg-jade-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setActiveTab('checklists')}
        >
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Checklists</span>
          </div>
        </button>
        <button 
          className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'compras' ? 'bg-jade-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setActiveTab('compras')}
        >
          <div className="flex items-center">
            <ShoppingBag className="w-4 h-4 mr-2" />
            <span>Lista de Compras</span>
          </div>
        </button>
        <button 
          className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'calendario' ? 'bg-jade-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setActiveTab('calendario')}
        >
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Calendário</span>
          </div>
        </button>
        <button 
          className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'infograficos' ? 'bg-jade-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setActiveTab('infograficos')}
        >
          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            <span>Infográficos</span>
          </div>
        </button>
      </div>

      {/* Conteúdo baseado na tab ativa */}
      <div className="space-y-4">
        {activeTab === 'checklists' && (
          <>
            <p className="text-gray-600 mb-4">
              Checklists detalhados para cada fase do protocolo. Clique em um item para ver a lista completa.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materiaisDeApoio.map((material) => (
                <SupportMaterialCard 
                  key={material.id}
                  {...material}
                  onClick={() => handleChecklistClick(material.id)}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === 'compras' && (
          <>
            <p className="text-gray-600 mb-4">
              Lista de compras organizada por fase do protocolo para facilitar seu planejamento.
            </p>
            <div className="space-y-6">
              {shoppingListByPhase.map((phase, index) => (
                <div key={index} className="card">
                  <h3 className="text-xl font-bold text-jade-700 mb-2">{phase.phase}</h3>
                  <p className="text-gray-600 mb-4">Custo médio estimado: {phase.averageCost}</p>
                  
                  <div className="space-y-4">
                    {phase.items.map((category, catIndex) => (
                      <div key={catIndex}>
                        <h4 className="font-semibold text-jade-600">{category.category}</h4>
                        <ul className="list-disc pl-5 mt-1">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-gray-600">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <button className="btn-secondary flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar lista em PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'calendario' && (
          <div className="card">
            <h2 className="text-xl font-bold text-jade-700 mb-2">{calendarInfo.title}</h2>
            <p className="text-gray-600 mb-6">{calendarInfo.description}</p>
            
            <div className="space-y-8">
              {calendarInfo.weeks.map((week, weekIndex) => (
                <div key={weekIndex}>
                  <h3 className="text-lg font-semibold text-jade-600 mb-2">
                    {week.week} <span className="text-sm font-normal text-gray-500">({week.phase})</span>
                  </h3>
                  
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {week.days.map((day, dayIndex) => (
                      <div 
                        key={dayIndex} 
                        className="p-2 border rounded text-center cursor-pointer hover:bg-jade-50"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-mint-50 p-3 rounded-lg">
                    <p className="text-jade-700 text-sm font-medium">{week.milestone}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button className="btn-secondary flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Baixar calendário em PDF
              </button>
            </div>
          </div>
        )}

        {activeTab === 'infograficos' && (
          <>
            <p className="text-gray-600 mb-4">
              Infográficos educacionais sobre parasitas intestinais e sua eliminação.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {infographics.map((info) => (
                <SupportMaterialCard 
                  key={info.id}
                  id={info.id}
                  title={info.title}
                  description={info.description}
                  icon={info.icon}
                  isPremium={info.isPremium}
                  onClick={() => console.log(`Clicked on ${info.id}`)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal para exibir os checklists detalhados */}
      {showChecklistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-jade-700">
                  {materiaisDeApoio.find(m => m.id === selectedChecklist)?.title}
                </h3>
                <button onClick={() => setShowChecklistModal(false)}>
                  <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-2">
                {detailedChecklistData[selectedChecklist]?.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-2">
                      <CheckCircle className="w-5 h-5 text-jade-600" />
                    </div>
                    <p className="text-gray-700">{item.replace('✓ ', '')}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  className="btn-secondary flex items-center mr-2"
                  onClick={() => setShowChecklistModal(false)}
                >
                  Fechar
                </button>
                <button className="btn-primary flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MateriaisApoio;
