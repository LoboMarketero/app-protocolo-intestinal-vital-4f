import React from 'react';
import { useUser } from '../context/UserContext';
import { ArrowLeft, BookOpen, Calendar, List, AlertCircle } from 'lucide-react';
import LockedPreview from './LockedPreview'; // Import LockedPreview

interface GuiaManutencaoProps {
  onBack: () => void;
}

const GuiaManutencao: React.FC<GuiaManutencaoProps> = ({ onBack }) => {
  const { permissions } = useUser(); // Correctly destructure permissions

  // Verificar permissão
  if (!permissions.canAccessMaintenanceGuide) { // Correct permission check
    return (
      <div className="container mx-auto px-4 py-8 pb-24">
        <LockedPreview 
          componentName="GUIA MANUTENÇÃO" 
          onUpgradeClick={onBack} // Pass onBack to onUpgradeClick
        />
      </div>
    );
  }

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
        <span className="badge badge-completo">COMPLETO</span>
      </div>

      {/* Title */}
      <div className="card mb-6 bg-gradient-to-r from-jade/10 to-mint/10">
        <h2 className="text-2xl font-bold text-jade mb-2 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Guia de Manutenção
        </h2>
        <p className="text-gray-700">
          Mantenha seus resultados para sempre com este guia exclusivo de manutenção.
        </p>
      </div>

      {/* Receitas Anti-reinfestação */}
      <div className="card mb-6">
        <h3 className="text-xl font-bold text-jade mb-4 flex items-center gap-2">
          <List className="w-5 h-5" />
          15 Receitas Anti-reinfestação
        </h3>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Suco Verde Preventivo</h4>
            <p className="text-gray-600 text-sm">
              Couve + pepino + limão + gengibre + hortelã. Tome 2x por semana.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Chá de Losna</h4>
            <p className="text-gray-600 text-sm">
              Poderoso agente antiparasitário. Tome 1x por semana antes de dormir.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Shot de Alho e Cúrcuma</h4>
            <p className="text-gray-600 text-sm">
              1 dente de alho + 1 colher de cúrcuma + limão. Tome 1x por semana.
            </p>
          </div>
          
          <button className="text-jade font-semibold flex items-center gap-1">
            Ver todas as 15 receitas
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>

      {/* Cronograma Mensal */}
      <div className="card mb-6">
        <h3 className="text-xl font-bold text-jade mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Cronograma Mensal de Prevenção
        </h3>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Semana 1: Desintoxicação</h4>
            <p className="text-gray-600 text-sm">
              Foco em eliminar toxinas do corpo com sucos e alimentos desintoxicantes.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Semana 2: Fortalecimento Intestinal</h4>
            <p className="text-gray-600 text-sm">
              Consumo de prebióticos e probióticos para fortalecer a flora intestinal.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Semana 3: Proteção Anti-parasitária</h4>
            <p className="text-gray-600 text-sm">
              Alimentos e ervas com propriedades antiparasitárias.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Semana 4: Manutenção e Equilíbrio</h4>
            <p className="text-gray-600 text-sm">
              Consolidação dos resultados e balanço nutricional.
            </p>
          </div>
        </div>
      </div>

      {/* Sinais de Alerta */}
      <div className="card mb-6">
        <h3 className="text-xl font-bold text-jade mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Sinais de Alerta para Parasitas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-coral/10 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Sinais Digestivos</h4>
            <ul className="text-gray-600 text-sm list-disc list-inside">
              <li>Inchaço abdominal repentino</li>
              <li>Diarreia ou constipação persistente</li>
              <li>Gases excessivos</li>
              <li>Náuseas após refeições</li>
            </ul>
          </div>
          
          <div className="bg-coral/10 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Sinais Sistêmicos</h4>
            <ul className="text-gray-600 text-sm list-disc list-inside">
              <li>Fadiga inexplicável</li>
              <li>Coceira anal ou vaginal</li>
              <li>Insônia ou sono perturbado</li>
              <li>Irritabilidade acentuada</li>
            </ul>
          </div>
          
          <div className="bg-coral/10 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Sinais Nutricionais</h4>
            <ul className="text-gray-600 text-sm list-disc list-inside">
              <li>Perda de peso inexplicável</li>
              <li>Compulsão por doces</li>
              <li>Fome logo após comer</li>
              <li>Deficiências vitamínicas</li>
            </ul>
          </div>
          
          <div className="bg-coral/10 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Sinais Emergenciais</h4>
            <ul className="text-gray-600 text-sm list-disc list-inside">
              <li>Sangue nas fezes</li>
              <li>Febre persistente</li>
              <li>Dor abdominal intensa</li>
              <li>Vômitos intensos</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Protocolo Semanal */}
      <div className="card">
        <h3 className="text-xl font-bold text-jade mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Protocolo Semanal de Manutenção
        </h3>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Segunda-feira: Desintoxicação</h4>
            <p className="text-gray-600 text-sm">
              Chá de dente-de-leão pela manhã + Suco verde no almoço
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Quarta-feira: Fortalecimento</h4>
            <p className="text-gray-600 text-sm">
              Kefir ou iogurte caseiro no café + Alho e cebola nas refeições
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Sexta-feira: Proteção</h4>
            <p className="text-gray-600 text-sm">
              Shot antiparasita pela manhã + Salada com sementes de abóbora no almoço
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Domingo: Equilíbrio</h4>
            <p className="text-gray-600 text-sm">
              Jejum intermitente leve (12h) + Caldo de osso no almoço
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuiaManutencao;
