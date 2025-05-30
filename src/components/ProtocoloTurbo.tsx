import React from 'react';
import { useUser } from '../context/UserContext';
import { ArrowLeft, Rocket, Clock, Zap, ChevronRight, Gauge } from 'lucide-react';

interface ProtocoloTurboProps {
  onBack: () => void;
}

const ProtocoloTurbo: React.FC<ProtocoloTurboProps> = ({ onBack }) => {
  const { user } = useUser();

  // Verificar permissão
  if (!user.permissions.turboProtocol) {
    return (
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="card">
          <h2 className="text-2xl font-bold text-jade mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-4">
            Você precisa do plano Premium para acessar o Protocolo Turbo.
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

  const FaseCard = ({ 
    phase, 
    title,
    days,
    description,
    benefits,
    isActive = false
  }: { 
    phase: number;
    title: string;
    days: string;
    description: string;
    benefits: string[];
    isActive?: boolean;
  }) => (
    <div className={`card ${isActive ? 'border-2 border-gold bg-gold/5' : ''} relative`}>
      {isActive && (
        <div className="absolute -top-3 -right-3">
          <span className="bg-gold text-jade px-3 py-1 rounded-full text-xs font-bold shadow-md">
            ATUAL
          </span>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${
          isActive ? 'bg-gold' : 'bg-jade'
        }`}>
          {phase}
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold text-jade text-lg mb-1">{title}</h4>
          <p className="text-gray-500 text-sm mb-2">Dias {days}</p>
          <p className="text-gray-700 mb-3">{description}</p>
          
          <h5 className="font-semibold text-gray-800 mb-2">Benefícios:</h5>
          <ul className="text-gray-600 space-y-1 mb-4">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-jade mt-1 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          
          {isActive && (
            <button className="btn-premium w-full">
              Começar Fase {phase}
            </button>
          )}
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
          <Rocket className="w-6 h-6" />
          Protocolo Turbo 15 Dias
        </h2>
        <p className="text-gray-700">
          Versão acelerada e potencializada para resultados mais rápidos.
        </p>
      </div>

      {/* Comparativo */}
      <div className="card mb-6">
        <h3 className="text-xl font-bold text-jade mb-4 flex items-center gap-2">
          <Gauge className="w-5 h-5" />
          Comparativo Turbo vs. Normal
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Protocolo Normal</h4>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gray-500 mt-1" />
                <span>21 dias para resultados completos</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gray-500 mt-1" />
                <span>Doses padrão de ingredientes ativos</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gray-500 mt-1" />
                <span>3 fases graduais de tratamento</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gray-500 mt-1" />
                <span>Resultados progressivos e sustentáveis</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gold/10 rounded-lg p-4 border border-gold/20">
            <h4 className="font-semibold text-gray-800 mb-2">Protocolo Turbo</h4>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-gold mt-1" />
                <span>Apenas 15 dias para resultados completos</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-gold mt-1" />
                <span>Doses terapêuticas potencializadas</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-gold mt-1" />
                <span>4 fases intensivas + fase pré-eliminação</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-gold mt-1" />
                <span>Timing otimizado para máxima eficácia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Aviso */}
      <div className="card mb-6 bg-coral/10 border border-coral/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-coral/20 mt-1">
            <Clock className="w-5 h-5 text-coral" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-1">Importante: Horários Otimizados</h4>
            <p className="text-gray-700 text-sm">
              Para resultados máximos, siga rigorosamente os horários indicados para cada etapa do protocolo.
              O timing é crucial para a eficácia das doses terapêuticas potencializadas.
            </p>
          </div>
        </div>
      </div>

      {/* Fases */}
      <h3 className="text-xl font-bold text-jade mb-4 flex items-center gap-2">
        <Rocket className="w-5 h-5" />
        Fases do Protocolo Turbo
      </h3>
      
      <div className="space-y-6 mb-8">
        <FaseCard
          phase={0}
          title="Fase Pré-Eliminação"
          days="1-2"
          description="Preparo intensivo do organismo para eliminação acelerada de parasitas."
          benefits={[
            "Limpeza do trato digestivo para potencializar absorção dos ativos",
            "Alcalinização do ambiente intestinal",
            "Preparação da flora intestinal para receber o tratamento"
          ]}
          isActive={true}
        />
        
        <FaseCard
          phase={1}
          title="Fase Eliminação Intensiva"
          days="3-6"
          description="Ataque intensivo contra parasitas com doses terapêuticas aumentadas."
          benefits={[
            "Eliminação rápida de parasitas adultos",
            "Inibição da reprodução parasitária",
            "Desintoxicação acelerada do fígado"
          ]}
        />
        
        <FaseCard
          phase={2}
          title="Fase Varredura Profunda"
          days="7-9"
          description="Varredura completa para eliminar parasitas remanescentes e ovos."
          benefits={[
            "Eliminação de parasitas resistentes à primeira fase",
            "Remoção de biofilmes intestinais",
            "Limpeza de resíduos parasitários"
          ]}
        />
        
        <FaseCard
          phase={3}
          title="Fase Restauração Acelerada"
          days="10-12"
          description="Reconstrução intensiva da flora intestinal e mucosa digestiva."
          benefits={[
            "Restauração acelerada da flora intestinal benéfica",
            "Fortalecimento da barreira intestinal",
            "Suporte intensivo ao sistema imunológico"
          ]}
        />
        
        <FaseCard
          phase={4}
          title="Fase Blindagem Final"
          days="13-15"
          description="Selamento e proteção do sistema digestivo contra novas infestações."
          benefits={[
            "Criação de ambiente hostil para novos parasitas",
            "Fortalecimento da imunidade intestinal de longo prazo",
            "Selamento da permeabilidade intestinal aumentada"
          ]}
        />
      </div>

      {/* Download PDF */}
      <div className="text-center">
        <button className="btn-premium flex items-center gap-2 mx-auto">
          <Rocket className="w-5 h-5" />
          Baixar Cronograma Completo (PDF)
        </button>
      </div>
    </div>
  );
};

export default ProtocoloTurbo;
