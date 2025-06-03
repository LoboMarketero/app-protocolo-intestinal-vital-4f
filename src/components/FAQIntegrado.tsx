import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react'; // Added ArrowLeft

interface FAQIntegradoProps {
  onBack?: () => void;
}

const FAQIntegrado: React.FC<FAQIntegradoProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqData = [
    // DÚVIDAS GERAIS
    {
      id: 1,
      category: 'gerais',
      question: "Preciso seguir dieta junto com o protocolo?",
      answer: "Não é obrigatório! O protocolo funciona com qualquer alimentação, pois age diretamente sobre os parasitas e saúde intestinal. Porém, evitar açúcar refinado, álcool e ultraprocessados potencializa os resultados."
    },
    {
      id: 2,
      category: 'gerais',
      question: "Posso fazer o protocolo se tomo medicamentos?",
      answer: "Sim, é 100% natural e compatível. Mas sempre informe seu médico sobre qualquer suplementação. Em caso de medicamentos para diabetes ou pressão, monitore mais de perto."
    },
    {
      id: 3,
      category: 'gerais',
      question: "E se eu esquecer um dia?",
      answer: "Relaxe! Retome no dia seguinte. O importante é a consistência geral, não a perfeição. Pular 1-2 dias ocasionalmente não compromete os resultados."
    },
    {
      id: 4,
      category: 'gerais',
      question: "É seguro para todas as idades?",
      answer: "Testado em mulheres de 25 a 70 anos. Ingredientes naturais e seguros. Gestantes, lactantes e pessoas com condições específicas devem consultar médico antes."
    },
    // DÚVIDAS SOBRE PREPARAÇÃO
    {
      id: 5,
      category: 'preparacao',
      question: "O sabor do suco anti-parasita é muito forte!",
      answer: "É normal e esperado! O sabor forte indica que está funcionando. Você pode diminuir o alho pela metade ou tomar rapidinho. Com o tempo, você se acostuma."
    },
    {
      id: 6,
      category: 'preparacao',
      question: "Posso preparar as receitas com antecedência?",
      answer: "As receitas da manhã devem ser feitas na hora para máxima potência. O chá pode ser preparado e mantido em garrafa térmica por algumas horas."
    },
    {
      id: 7,
      category: 'preparacao',
      question: "E se eu não encontrar algum ingrediente?",
      answer: "**Substituições possíveis:**\n- Kefir → Iogurte natural\n- Biomassa banana verde → Banana madura extra\n- Mel cru → Tâmaras ou açúcar de coco\n- Água de coco → Água filtrada + pitada de sal"
    },
    {
      id: 8,
      category: 'preparacao',
      question: "Como saber se a linhaça está boa?",
      answer: "Deve estar moída na hora ou há no máximo 2 dias. Se estiver rançosa (cheiro forte), descarte. Prefira moer em casa no liquidificador."
    },
    // DÚVIDAS SOBRE SINTOMAS
    {
      id: 9,
      category: 'sintomas',
      question: "Sinto mal-estar na Fase 2, é normal?",
      answer: "Sim! É sinal de desintoxicação (reação de Herxheimer). Sintomas normais: dor de cabeça leve, cansaço, mudanças no intestino. Beba mais água e diminua as quantidades se necessário."
    },
    {
      id: 10,
      category: 'sintomas',
      question: "Meu intestino mudou, devo me preocupar?",
      answer: "Mudanças no ritmo intestinal são esperadas. Pode haver dias com mais evacuações (eliminação) ou alguns com menos. Mantenha a hidratação e procure médico apenas se houver dor intensa."
    },
    {
      id: 11,
      category: 'sintomas',
      question: "Não estou perdendo peso, o que fazer?",
      answer: "Cada corpo responde diferente. Algumas mulheres perdem peso mais devagar, mas ganham energia e reduzem inchaço primeiro. Continue firme - os resultados virão!"
    },
    {
      id: 12,
      category: 'sintomas',
      question: "Posso sentir mais fome durante o protocolo?",
      answer: "Pode acontecer, especialmente na Fase 2. É sinal que seu metabolismo está acelerando. Coma alimentos naturais quando sentir fome, evitando doces e processados."
    },
    // DÚVIDAS SOBRE ACOMPANHAMENTO
    {
      id: 13,
      category: 'acompanhamento',
      question: "Como vou saber o que fazer em cada fase?",
      answer: "Você recebe guias visuais claros e checklists diários. Tudo muito simples e prático de seguir." // Removed video reference
    },
    {
      id: 14,
      category: 'acompanhamento',
      question: "E se eu tiver dúvidas durante o protocolo?",
      answer: "Você tem acesso ao FAQ completo e pode entrar em contato com nossa equipe de suporte." // Removed video reference
    },
    {
      id: 15,
      category: 'acompanhamento',
      question: "Preciso de acompanhamento médico?",
      answer: "O protocolo é natural e seguro, mas se você tem condições de saúde específicas ou toma medicamentos controlados, consulte seu médico antes de iniciar."
    },
    {
      id: 16,
      category: 'acompanhamento',
      question: "Como mantenho os resultados após os 21 dias?",
      answer: "Continue com água morna e limão pela manhã, inclua probióticos na rotina, mantenha o suco verde 2-3x por semana e escute seu corpo!"
    },
    // DÚVIDAS SOBRE RESULTADOS
    {
      id: 17,
      category: 'resultados',
      question: "Quanto tempo para ver os primeiros resultados?",
      answer: "- **48-72h:** Redução do inchaço\n- **Semana 1:** Mais energia e digestão melhor\n- **Semana 2:** Perda de peso visível\n- **Semana 3:** Transformação completa"
    },
    {
      id: 18,
      category: 'resultados',
      question: "Posso perder mais de 12kg?",
      answer: "O protocolo foi desenvolvido para perda saudável de 5-12kg em 21 dias. Perdas maiores podem acontecer, mas o foco principal é saúde intestinal e bem-estar geral."
    },
    {
      id: 19,
      category: 'resultados',
      question: "Os resultados são permanentes?",
      answer: "Sim, se você mantiver hábitos saudáveis básicos! O protocolo elimina parasitas e restaura seu intestino. Mantendo uma alimentação equilibrada e os rituais de manutenção, os resultados se mantêm."
    },
    {
      id: 20,
      category: 'resultados',
      question: "Minha pele também vai melhorar?",
      answer: "Sim! Um intestino saudável reflete na pele. Muitas mulheres relatam pele mais clara, hidratada e com menos imperfeições após o protocolo."
    }
  ];

  const categories = [
    { key: 'all', label: 'Todas' },
    { key: 'gerais', label: 'Gerais' },
    { key: 'preparacao', label: 'Preparação' },
    { key: 'sintomas', label: 'Sintomas' },
    { key: 'acompanhamento', label: 'Acompanhamento' },
    { key: 'resultados', label: 'Resultados' },
  ];

  const filteredFaqData = faqData.filter(item => 
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderAnswer = (answer: string) => {
    return answer.split('**').map((part, index) => 
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    ).reduce((acc: (string | JSX.Element)[], part) => {
      if (typeof part === 'string') {
        return acc.concat(part.split('\n').flatMap((line, i) => i > 0 ? [<br key={`br-${acc.length}-${i}`} />, line] : [line]));
      }
      return acc.concat(part);
    }, []);
  };


  return (
    <div className="faq-integrado section">
      {onBack && (
        <button 
          onClick={onBack}
          className="mb-4 text-jade hover:text-jade/80 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>
      )}
      <h1 className="text-3xl font-bold text-jade mb-8 text-center">❓ FAQ & Suporte</h1>
      
      <div className="search-section mb-6">
        <input
          type="text"
          placeholder="🔍 Buscar dúvidas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jade focus:border-transparent"
        />
      </div>

      <div className="category-filters flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button 
            key={category.key}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedCategory === category.key ? 'bg-jade text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setSelectedCategory(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="faq-list space-y-3 mb-8">
        {filteredFaqData.length > 0 ? (
          filteredFaqData.map(item => (
            <div key={item.id} className="faq-item card bg-white p-0 overflow-hidden">
              <button
                className="faq-question w-full text-left p-4 flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenQuestion(openQuestion === item.id ? null : item.id)}
              >
                <span className="font-semibold text-gray-800">{item.question}</span>
                <span className={`arrow transform transition-transform duration-200 ${openQuestion === item.id ? 'rotate-90' : ''}`}>▶️</span>
              </button>
              
              {openQuestion === item.id && (
                <div className="faq-answer p-4 border-t border-gray-200">
                  <p className="text-gray-600 whitespace-pre-line">{renderAnswer(item.answer)}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">Nenhuma dúvida encontrada.</p>
        )}
      </div>
      
      {/* Support contact card removed as requested */}
    </div>
  );
};

export default FAQIntegrado;
