import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ArrowLeft, BrainCircuit, MessageSquare, BarChart3, Sparkles, Clipboard, Send, User } from 'lucide-react';

interface CoachVirtualProps {
  onBack: () => void;
}

const CoachVirtual: React.FC<CoachVirtualProps> = ({ onBack }) => {
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{text: string, isUser: boolean, time: string}[]>([
    {
      text: "Olá, Maria! Sou sua Coach Virtual do Protocolo Vital 4F. Analisei seus dados e estou aqui para ajudar. O que gostaria de saber hoje?",
      isUser: false,
      time: "10:00"
    }
  ]);

  // Verificar permissão
  if (!user.permissions.virtualCoach) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card">
          <h2 className="text-2xl font-bold text-jade mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-4">
            Você precisa do plano Premium para acessar o Coach Virtual.
          </p>
          <button 
            onClick={onBack}
            className="btn-primary"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Adiciona mensagem do usuário
    const newUserMessage = {
      text: message,
      isUser: true,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setChatMessages(prev => [...prev, newUserMessage]);
    setMessage('');
    
    // Simula resposta da IA após um pequeno delay
    setTimeout(() => {
      let aiResponse = "";
      
      // Respostas baseadas em palavras-chave simples para demonstração
      if (message.toLowerCase().includes("progresso")) {
        aiResponse = "Analisando seu progresso no Dia 3: Você está no caminho certo! Seus sintomas de inchaço reduziram 20% em comparação com o Dia 1. Recomendo aumentar a ingestão de água em 500ml para potencializar os resultados.";
      } 
      else if (message.toLowerCase().includes("dor") || message.toLowerCase().includes("sintoma")) {
        aiResponse = "Sintomas como dores abdominais são comuns durante a fase de eliminação. Sugiro adicionar um chá de camomila à noite para aliviar o desconforto. Se persistir por mais de 48h, podemos ajustar seu protocolo.";
      }
      else if (message.toLowerCase().includes("receita") || message.toLowerCase().includes("comida")) {
        aiResponse = "Com base no seu perfil, recomendo substituir o suco da manhã por uma versão mais concentrada: adicione 1/2 colher de chá extra de gengibre e uma folha de couve adicional para acelerar a desintoxicação.";
      }
      else if (message.toLowerCase().includes("resultado")) {
        aiResponse = "Análise preditiva: Mantendo a consistência atual, você deve notar uma redução significativa nos sintomas até o Dia 7. Usuários com perfil semelhante ao seu relataram melhora de 65% neste estágio do protocolo.";
      }
      else {
        aiResponse = "Obrigada pela sua mensagem. Com base nos seus dados e progresso atual, recomendo manter a consistência no protocolo, especialmente nos horários das ingestões. Notei que seu melhor período para o chá da tarde é entre 14h-15h, quando seu metabolismo está mais receptivo.";
      }
      
      const newAiMessage = {
        text: aiResponse,
        isUser: false,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setChatMessages(prev => [...prev, newAiMessage]);
    }, 1000);
  };

  const InsightCard = ({
    title,
    value,
    description,
    trend,
    icon
  }: {
    title: string;
    value: string;
    description: string;
    trend: 'up' | 'down' | 'neutral';
    icon: React.ReactNode;
  }) => (
    <div className="card">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-mint/20">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <div className="flex items-center gap-2 my-1">
            <span className="text-xl font-bold text-jade">{value}</span>
            {trend === 'up' && <span className="text-green-500 text-xs">▲ Melhorando</span>}
            {trend === 'down' && <span className="text-red-500 text-xs">▼ Atenção</span>}
            {trend === 'neutral' && <span className="text-gray-500 text-xs">► Estável</span>}
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-jade hover:text-jade/80"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <span className="badge badge-premium">PREMIUM</span>
      </div>

      {/* Title */}
      <div className="card mb-6 bg-gradient-to-r from-gold/20 to-yellow-400/20">
        <h2 className="text-2xl font-bold text-jade mb-2 flex items-center gap-2">
          <BrainCircuit className="w-6 h-6" />
          Coach Virtual
        </h2>
        <p className="text-gray-700">
          Análises personalizadas e recomendações adaptativas para maximizar seus resultados.
        </p>
      </div>

      {/* Insights */}
      <h3 className="text-xl font-bold text-jade mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5" />
        Seus Insights Personalizados
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InsightCard
          title="Índice de Desintoxicação"
          value="73%"
          description="Acima da média para o Dia 3 do protocolo"
          trend="up"
          icon={<BarChart3 className="w-5 h-5 text-jade" />}
        />
        
        <InsightCard
          title="Aderência ao Protocolo"
          value="89%"
          description="Excelente consistência nos horários"
          trend="up"
          icon={<Clipboard className="w-5 h-5 text-jade" />}
        />
        
        <InsightCard
          title="Hidratação Diária"
          value="1.2L"
          description="Abaixo da meta recomendada de 2L"
          trend="down"
          icon={<Droplet className="w-5 h-5 text-jade" />}
        />
        
        <InsightCard
          title="Progresso Intestinal"
          value="Fase 1"
          description="Progredindo conforme o esperado"
          trend="neutral"
          icon={<ActivityIcon className="w-5 h-5 text-jade" />}
        />
      </div>

      {/* Recomendações */}
      <div className="card mb-6">
        <h3 className="text-lg font-bold text-jade mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Recomendações Adaptativas
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-full bg-gold/20 mt-0.5">
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Aumente a hidratação</span> - 
              Adicione 500ml de água com limão antes das 10h para otimizar a fase de eliminação.
            </p>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-full bg-gold/20 mt-0.5">
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Horário otimizado</span> - 
              Seu organismo responde melhor ao chá da tarde quando consumido entre 14h e 15h.
            </p>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-full bg-gold/20 mt-0.5">
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Potencialize o suco matinal</span> - 
              Adicione 1/2 colher de chá extra de gengibre para melhorar os resultados.
            </p>
          </div>
        </div>
      </div>

      {/* Chat */}
      <h3 className="text-xl font-bold text-jade mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        Converse com sua Coach
      </h3>
      
      <div className="card mb-4 p-0 overflow-hidden">
        <div className="bg-jade text-white p-3 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5" />
          <span className="font-semibold">Coach Virtual Premium</span>
        </div>
        
        <div className="p-4 max-h-[300px] overflow-y-auto">
          {chatMessages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.isUser 
                    ? 'bg-mint/10 text-gray-800' 
                    : 'bg-jade/10 text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {!msg.isUser && <BrainCircuit className="w-4 h-4 text-jade" />}
                  {msg.isUser && <User className="w-4 h-4 text-jade" />}
                  <span className="font-semibold text-xs">
                    {msg.isUser ? 'Você' : 'Coach IA'}
                  </span>
                  <span className="text-gray-500 text-xs ml-auto">{msg.time}</span>
                </div>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua dúvida ou sintoma..."
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-jade"
            />
            <button 
              onClick={handleSendMessage}
              className="p-2 bg-jade text-white rounded-lg hover:bg-jade/90"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Sua coach responderá com base em seu progresso e histórico.
          </p>
        </div>
      </div>
    </div>
  );
};

// Ícone customizado para atividade intestinal
const ActivityIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

// Componente para ícone de gota d'água
const Droplet = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

export default CoachVirtual;
