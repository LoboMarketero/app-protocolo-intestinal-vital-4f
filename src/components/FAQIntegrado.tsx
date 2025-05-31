import React, { useState } from 'react';

interface FAQIntegradoProps {
  onBack?: () => void;
}

const FAQIntegrado: React.FC<FAQIntegradoProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      category: 'planos',
      question: "Qual a diferença entre os planos?",
      answer: `
        **Plano Essencial (R$ 47):** Protocolo básico de 21 dias + vídeos + tracker básico
        
        **Plano Completo (R$ 87):** Tudo do Essencial + Guia Manutenção + 25 Receitas Extras + Tracker Avançado + Análises Premium
        
        **Plano Premium (R$ 127):** Tudo do Completo + Protocolo Turbo (15 dias) + Coach Virtual + 1 mês grátis Comunidade VIP
        
        **Comunidade VIP (R$ 37/mês):** Disponível para todos os planos - Suporte direto Dra. Mariana + Grupo Telegram + Lives exclusivas
      `
    },
    {
      id: 2,
      category: 'planos',
      question: "Posso fazer upgrade depois?",
      answer: "Sim! Dentro da app você pode fazer upgrade a qualquer momento pagando apenas a diferença. Upgrade Essencial→Completo: +R$ 40. Upgrade Essencial→Premium: +R$ 80."
    },
    {
      id: 3,
      category: 'protocolo',
      question: "Preciso seguir dieta junto com o protocolo?",
      answer: "Não é obrigatório! O protocolo funciona com qualquer alimentação, pois age diretamente sobre os parasitas. Evitar açúcar, álcool e ultraprocessados potencializa os resultados."
    },
    {
      id: 4,
      category: 'seguranca',
      question: "É seguro para todas as idades?",
      answer: "Sim, foi testado em mulheres de 25 a 70 anos. Os ingredientes são naturais e seguros. Gestantes, lactantes e pessoas com condições específicas devem consultar médico."
    },
    {
      id: 5,
      category: 'comunidade',
      question: "Como funciona a Comunidade VIP?",
      answer: "É um grupo privado no Telegram com suporte direto da Dra. Mariana, 3 lives exclusivas por mês, resposta prioritária em 24h e desafios mensais. Cancele quando quiser."
    }
  ];

  const filteredFaqData = faqData.filter(item => 
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Helper to render markdown-like bold text
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
          ← Voltar
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
        <button 
          className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedCategory === 'all' ? 'bg-jade text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setSelectedCategory('all')}
        >
          Todas
        </button>
        <button 
          className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedCategory === 'planos' ? 'bg-jade text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setSelectedCategory('planos')}
        >
          Planos
        </button>
        <button 
          className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedCategory === 'protocolo' ? 'bg-jade text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setSelectedCategory('protocolo')}
        >
          Protocolo
        </button>
        <button 
          className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedCategory === 'seguranca' ? 'bg-jade text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setSelectedCategory('seguranca')}
        >
          Segurança
        </button>
         <button 
          className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedCategory === 'comunidade' ? 'bg-jade text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setSelectedCategory('comunidade')}
        >
          Comunidade
        </button>
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

      <div className="support-section card bg-mint/10 p-6 text-center">
        <h3 className="text-xl font-semibold text-jade mb-3">💬 Não achou sua dúvida?</h3>
        <button className="btn-primary mb-4">
          FALAR COM SUPORTE
        </button>
        
        <div className="contact-info text-sm text-gray-700">
          <p className="font-semibold mb-1">📞 Contatos:</p>
          <p>WhatsApp: (11) 9999-9999</p>
          <p>Email: suporte@protocolovital4f.com</p>
        </div>
      </div>
    </div>
  );
};

export default FAQIntegrado;
