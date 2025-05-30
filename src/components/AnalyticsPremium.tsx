import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ArrowLeft, BarChart, LineChart, PieChart, TrendingUp, Filter, Calendar, Download, Share2 } from 'lucide-react';

interface AnalyticsPremiumProps {
  onBack: () => void;
}

const AnalyticsPremium: React.FC<AnalyticsPremiumProps> = ({ onBack }) => {
  const { user } = useUser();
  const [timeframe, setTimeframe] = useState<'dia' | 'semana' | 'mes'>('semana');

  // Verificar permissão
  if (!user.permissions.premiumAnalytics) {
    return (
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="card">
          <h2 className="text-2xl font-bold text-jade mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-4">
            Você precisa do plano Premium para acessar o Analytics Premium.
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

  const timeframeLabels = {
    dia: ['8h', '10h', '12h', '14h', '16h', '18h', '20h'],
    semana: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    mes: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']
  };

  const MetricCard = ({
    title,
    value,
    change,
    isPositive,
    icon
  }: {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: React.ReactNode;
  }) => (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <div className="p-2 rounded-full bg-mint/20">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-jade">{value}</span>
        <span className={`text-sm font-medium flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '▲' : '▼'} {change}
        </span>
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
          <BarChart className="w-6 h-6" />
          Analytics Premium
        </h2>
        <p className="text-gray-700">
          Análise detalhada do seu progresso e métricas de saúde intestinal.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-jade" />
          <span className="font-semibold text-gray-700">Período:</span>
        </div>
        
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          <button 
            onClick={() => setTimeframe('dia')}
            className={`px-4 py-2 text-sm font-medium ${
              timeframe === 'dia' 
                ? 'bg-jade text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Dia
          </button>
          <button 
            onClick={() => setTimeframe('semana')}
            className={`px-4 py-2 text-sm font-medium ${
              timeframe === 'semana' 
                ? 'bg-jade text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Semana
          </button>
          <button 
            onClick={() => setTimeframe('mes')}
            className={`px-4 py-2 text-sm font-medium ${
              timeframe === 'mes' 
                ? 'bg-jade text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Mês
          </button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <MetricCard
          title="Índice de Desintoxicação"
          value="73%"
          change="12%"
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5 text-jade" />}
        />
        
        <MetricCard
          title="Saúde Intestinal"
          value="68%"
          change="8%"
          isPositive={true}
          icon={<LineChart className="w-5 h-5 text-jade" />}
        />
        
        <MetricCard
          title="Inflamação"
          value="35%"
          change="20%"
          isPositive={false}
          icon={<PieChart className="w-5 h-5 text-jade" />}
        />
        
        <MetricCard
          title="Eficiência Metabólica"
          value="82%"
          change="5%"
          isPositive={true}
          icon={<ActivityIcon className="w-5 h-5 text-jade" />}
        />
      </div>

      {/* Gráfico Principal */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">Progresso do Protocolo</h3>
          <div className="flex gap-2">
            <button className="p-2 text-gray-500 hover:text-jade rounded-full">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-jade rounded-full">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Gráfico simulado */}
        <div className="relative h-60 mt-2">
          <div className="absolute inset-0">
            {/* Eixo X */}
            <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200"></div>
            {/* Eixo Y */}
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200"></div>
            
            {/* Linha de saúde intestinal */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M0,80 C10,75 20,68 30,60 C40,52 50,40 60,35 C70,30 80,25 90,20 L100,15" 
                fill="none" 
                stroke="#2E7D32" 
                strokeWidth="2"
              />
            </svg>
            
            {/* Linha de desintoxicação */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M0,70 C10,65 20,60 30,55 C40,50 50,42 60,35 C70,28 80,22 90,18 L100,15" 
                fill="none" 
                stroke="#81C784" 
                strokeWidth="2"
                strokeDasharray="4 2"
              />
            </svg>
            
            {/* Linha de inflamação */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M0,30 C10,35 20,45 30,50 C40,55 50,60 60,65 C70,70 80,75 90,78 L100,80" 
                fill="none" 
                stroke="#FF8A65" 
                strokeWidth="2"
                strokeDasharray="2 2"
              />
            </svg>
          </div>
          
          {/* Legenda do eixo X */}
          <div className="absolute left-0 right-0 bottom-0 flex justify-between text-xs text-gray-500 transform translate-y-4">
            {timeframeLabels[timeframe].map((label, idx) => (
              <span key={idx}>{label}</span>
            ))}
          </div>
          
          {/* Legenda do eixo Y */}
          <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between items-start text-xs text-gray-500 transform -translate-x-6">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
        </div>
        
        {/* Legenda */}
        <div className="flex justify-center gap-6 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-jade rounded-full"></div>
            <span className="text-xs text-gray-700">Saúde Intestinal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-mint rounded-full"></div>
            <span className="text-xs text-gray-700">Desintoxicação</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-coral rounded-full"></div>
            <span className="text-xs text-gray-700">Inflamação</span>
          </div>
        </div>
      </div>

      {/* Calendário de Progresso */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-jade" />
            Calendário de Progresso
          </h3>
        </div>
        
        <div className="grid grid-cols-7 gap-2 text-center">
          {/* Cabeçalho do calendário */}
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, idx) => (
            <div key={idx} className="text-xs font-semibold text-gray-500 p-2">
              {day}
            </div>
          ))}
          
          {/* Dias anteriores (cinza) */}
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="p-2 rounded-md bg-gray-100 text-gray-400 text-sm">
              {idx + 27}
            </div>
          ))}
          
          {/* Dias do mês atual */}
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="p-2 rounded-md bg-jade/10 text-jade border border-jade text-sm">
              {idx + 1}
            </div>
          ))}
          
          {/* Dia atual (destacado) */}
          <div className="p-2 rounded-md bg-jade text-white text-sm font-bold">
            4
          </div>
          
          {/* Dias futuros */}
          {[...Array(24)].map((_, idx) => (
            <div key={idx} className="p-2 rounded-md bg-gray-50 text-gray-700 text-sm">
              {idx + 5}
            </div>
          ))}
        </div>
      </div>

      {/* Relatório Detalhado */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">Relatório Detalhado</h3>
          <button className="flex items-center gap-1 text-jade text-sm font-medium">
            <Download className="w-4 h-4" />
            PDF
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">Relatório Semanal</h4>
              <p className="text-xs text-gray-600">Inclui todas as métricas e progresso detalhado</p>
            </div>
            <button className="text-jade hover:text-jade/80">
              <Download className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">Histórico Completo</h4>
              <p className="text-xs text-gray-600">Desde o início do protocolo</p>
            </div>
            <button className="text-jade hover:text-jade/80">
              <Download className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gold/10 rounded-lg border border-gold/20">
            <div>
              <h4 className="font-semibold text-gray-800">Análise Comparativa</h4>
              <p className="text-xs text-gray-600">Seus resultados vs. média de usuários semelhantes</p>
            </div>
            <button className="text-jade hover:text-jade/80">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Ícone customizado para atividade metabólica
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

export default AnalyticsPremium;
