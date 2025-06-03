import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ArrowLeft, BookOpen, Calendar, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Utensils } from 'lucide-react';
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

  // State for expanded recipe section
  const [showAllRecipes, setShowAllRecipes] = useState(false);
  // State for checklist items
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Handle toggle checklist item
  const handleToggleItem = (section: string, itemIndex: number) => {
    const itemKey = `${section}-${itemIndex}`;
    setCheckedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  // Checklist component
  const Checklist = ({ 
    section, 
    items 
  }: { 
    section: string;
    items: string[];
  }) => (
    <div className="mt-3">
      <h6 className="text-sm font-semibold text-gray-700 mb-2">Checklist:</h6>
      <ul className="space-y-2">
        {items.map((item, index) => {
          const itemKey = `${section}-${index}`;
          const isChecked = checkedItems[itemKey] || false;
          
          return (
            <li key={index} className="flex items-start gap-2">
              <button 
                onClick={() => handleToggleItem(section, index)}
                className="mt-0.5 flex-shrink-0"
              >
                {isChecked ? (
                  <CheckCircle2 className="w-4 h-4 text-jade" />
                ) : (
                  <div className="w-4 h-4 border border-gray-400 rounded-full" />
                )}
              </button>
              <span className={`text-sm ${isChecked ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 pb-16">
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
          <Utensils className="w-5 h-5" />
          15 Receitas Anti-reinfestação
        </h3>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Suco Verde Preventivo</h4>
            <p className="text-gray-600 text-sm mb-2">
              Couve + pepino + limão + gengibre + hortelã. Tome 2x por semana.
            </p>
            <Checklist 
              section="recipe-1" 
              items={[
                "Lave bem todos os ingredientes",
                "Bata no liquidificador com 200ml de água filtrada",
                "Consuma imediatamente em jejum"
              ]} 
            />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Chá de Losna</h4>
            <p className="text-gray-600 text-sm mb-2">
              Poderoso agente antiparasitário. Tome 1x por semana antes de dormir.
            </p>
            <Checklist 
              section="recipe-2" 
              items={[
                "Use 1 colher de chá da erva seca para cada 200ml de água",
                "Deixe em infusão por 5-7 minutos",
                "Beba sem adoçar para maior eficácia"
              ]} 
            />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Shot de Alho e Cúrcuma</h4>
            <p className="text-gray-600 text-sm mb-2">
              1 dente de alho + 1 colher de cúrcuma + limão. Tome 1x por semana.
            </p>
            <Checklist 
              section="recipe-3" 
              items={[
                "Amasse bem o alho e misture com a cúrcuma",
                "Adicione o suco de limão e uma pitada de pimenta-do-reino",
                "Tome de uma vez como um shot"
              ]} 
            />
          </div>
          
          {showAllRecipes && (
            <>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Kefir de Água</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Bebida fermentada rica em probióticos. Consuma diariamente.
                </p>
                <Checklist 
                  section="recipe-4" 
                  items={[
                    "Adicione 3 colheres de grãos de kefir em 1L de água com açúcar mascavo",
                    "Deixe fermentar por 24-48h em temperatura ambiente",
                    "Coe e consuma 200ml por dia"
                  ]} 
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Salada Anti-parasitária</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Rica em enzimas e compostos antiparasitários. Coma 2x por semana.
                </p>
                <Checklist 
                  section="recipe-5" 
                  items={[
                    "Combine folhas verdes amargas (rúcula, agrião) com sementes de abóbora",
                    "Adicione alho e cebola roxa picados",
                    "Tempere com azeite, limão e orégano"
                  ]} 
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Chá de Artemísia</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Conhecido por sua potência antiparasitária. Use com moderação, 1x por semana.
                </p>
                <Checklist 
                  section="recipe-6" 
                  items={[
                    "Use 1/2 colher de chá da erva para 200ml de água",
                    "Não consuma por mais de 7 dias seguidos",
                    "Evite durante a gravidez"
                  ]} 
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Mingau de Aveia com Canela</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Rico em fibras e com propriedades antiparasitárias da canela.
                </p>
                <Checklist 
                  section="recipe-7" 
                  items={[
                    "Cozinhe 1/2 xícara de aveia em leite vegetal",
                    "Adicione 1 colher de chá de canela e 1/2 colher de cravo em pó",
                    "Consuma em jejum 1-2x por semana"
                  ]} 
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Caldo Desintoxicante</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Ajuda a eliminar toxinas e fortalecer o sistema digestivo.
                </p>
                <Checklist 
                  section="recipe-8" 
                  items={[
                    "Ferva cenoura, aipo, cebola e alho em 1L de água por 30 minutos",
                    "Adicione um punhado de salsa fresca no final",
                    "Consuma quente 3x por semana"
                  ]} 
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Chucrute Caseiro</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Alimento fermentado rico em probióticos que fortalecem a flora intestinal.
                </p>
                <Checklist 
                  section="recipe-9" 
                  items={[
                    "Rale 1 repolho e misture com 2 colheres de sal marinho",
                    "Amasse até liberar o suco e coloque em pote de vidro",
                    "Fermente por 7 dias e consuma 1 colher por refeição"
                  ]} 
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Tempero Antiparasitário</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Mistura de especiarias para usar diariamente nas refeições.
                </p>
                <Checklist 
                  section="recipe-10" 
                  items={[
                    "Misture partes iguais de cúrcuma, gengibre em pó, cominho e pimenta preta",
                    "Adicione um pouco de pimenta caiena para potencializar",
                    "Use em todas as refeições quentes"
                  ]} 
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Smoothie de Mamão com Sementes</h4>
                <p className="text-gray-600 text-sm mb-2">
                  As sementes de mamão têm propriedades vermífugas naturais.
                </p>
                <Checklist 
                  section="recipe-11" 
                  items={[
                    "Bata 1 mamão com 1 colher de suas sementes secas e moídas",
                    "Adicione 1 colher de óleo de coco e canela a gosto",
                    "Consuma em jejum 1x por semana"
                  ]} 
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Água de Coco com Limão</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Hidratante e alcalinizante, cria um ambiente intestinal desfavorável aos parasitas.
                </p>
                <Checklist 
                  section="recipe-12" 
                  items={[
                    "Misture 300ml de água de coco com suco de 1/2 limão",
                    "Adicione 1 colher de chá de vinagre de maçã orgânico",
                    "Beba 30 minutos antes do café da manhã, 3x por semana"
                  ]} 
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Óleo de Coco Potencializado</h4>
                <p className="text-gray-600 text-sm mb-2">
                  O óleo de coco contém ácido láurico com propriedades antiparasitárias.
                </p>
                <Checklist 
                  section="recipe-13" 
                  items={[
                    "Misture 1 colher de óleo de coco com 1 gota de óleo essencial de orégano",
                    "Adicione uma pitada de cúrcuma",
                    "Consuma em jejum 2x por semana (não exceda a dose do óleo essencial)"
                  ]} 
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Sopa de Abóbora com Gengibre</h4>
                <p className="text-gray-600 text-sm mb-2">
                  As sementes de abóbora têm propriedades anti-helmínticas tradicionais.
                </p>
                <Checklist 
                  section="recipe-14" 
                  items={[
                    "Cozinhe abóbora com gengibre, alho e cebola",
                    "Bata tudo e finalize com azeite e sementes de abóbora tostadas",
                    "Consuma 2x por semana no jantar"
                  ]} 
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Vitamina de Abacate Antiparasitária</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Combinação de gorduras saudáveis com ervas antiparasitárias.
                </p>
                <Checklist 
                  section="recipe-15" 
                  items={[
                    "Bata 1/2 abacate com leite vegetal, 1 tâmara e 1 colher de hortelã fresca",
                    "Adicione 1 colher de chá de sementes de abóbora moídas",
                    "Consuma como lanche 2x por semana"
                  ]} 
                />
              </div>
            </>
          )}
          
          <button 
            onClick={() => setShowAllRecipes(!showAllRecipes)}
            className="text-jade font-semibold flex items-center gap-1"
          >
            {showAllRecipes ? 'Mostrar menos' : 'Ver todas as 15 receitas'}
            {showAllRecipes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
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
            <p className="text-gray-600 text-sm mb-2">
              Foco em eliminar toxinas do corpo com sucos e alimentos desintoxicantes.
            </p>
            <Checklist 
              section="semana-1" 
              items={[
                "Tome o Suco Verde Preventivo em jejum (3 dias)",
                "Consuma pelo menos 2L de água por dia",
                "Evite completamente açúcar refinado, álcool e processados",
                "Inclua chá de dente-de-leão diariamente"
              ]} 
            />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Semana 2: Fortalecimento Intestinal</h4>
            <p className="text-gray-600 text-sm mb-2">
              Consumo de prebióticos e probióticos para fortalecer a flora intestinal.
            </p>
            <Checklist 
              section="semana-2" 
              items={[
                "Adicione 1 colher de kefir ou iogurte natural nas refeições",
                "Consuma alimentos fermentados diariamente (kimchi, chucrute)",
                "Inclua fibras solúveis como aveia, chia e maçã",
                "Tome caldo de osso 2-3 vezes na semana"
              ]} 
            />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Semana 3: Proteção Anti-parasitária</h4>
            <p className="text-gray-600 text-sm mb-2">
              Alimentos e ervas com propriedades antiparasitárias.
            </p>
            <Checklist 
              section="semana-3" 
              items={[
                "Tome o Shot de Alho e Cúrcuma em jejum (2 dias)",
                "Consuma alho cru diariamente (1 dente)",
                "Adicione sementes de abóbora nas refeições",
                "Beba chá de losna antes de dormir (2 noites)",
                "Use o tempero antiparasitário em todas as refeições"
              ]} 
            />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Semana 4: Manutenção e Equilíbrio</h4>
            <p className="text-gray-600 text-sm mb-2">
              Consolidação dos resultados e balanço nutricional.
            </p>
            <Checklist 
              section="semana-4" 
              items={[
                "Pratique jejum intermitente leve (12h) por 2 dias",
                "Faça uma refeição rica em vegetais amargos (rúcula, chicória)",
                "Tome água de coco com limão em jejum (3 dias)",
                "Consuma uma porção de fígado orgânico ou vegetais de folhas escuras",
                "Faça um dia de desintoxicação apenas com vegetais e frutas"
              ]} 
            />
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
            <p className="text-gray-600 text-sm mb-2">
              Chá de dente-de-leão pela manhã + Suco verde no almoço
            </p>
            <Checklist 
              section="segunda" 
              items={[
                "Prepare o chá de dente-de-leão com água filtrada (não fervente)",
                "Adicione gengibre ao suco verde para potencializar",
                "Evite alimentos processados durante todo o dia",
                "Beba pelo menos 2L de água"
              ]} 
            />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Quarta-feira: Fortalecimento</h4>
            <p className="text-gray-600 text-sm mb-2">
              Kefir ou iogurte caseiro no café + Alho e cebola nas refeições
            </p>
            <Checklist 
              section="quarta" 
              items={[
                "Consuma o kefir/iogurte com sementes de chia e linhaça",
                "Pique o alho 10 minutos antes de usar para ativar a alicina",
                "Adicione 1 colher de chá de cúrcuma no almoço",
                "Prepare um chá digestivo de erva-doce após o jantar"
              ]} 
            />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Sexta-feira: Proteção</h4>
            <p className="text-gray-600 text-sm mb-2">
              Shot antiparasita pela manhã + Salada com sementes de abóbora no almoço
            </p>
            <Checklist 
              section="sexta" 
              items={[
                "Tome o shot em jejum e aguarde 30 minutos para o café",
                "Torre levemente as sementes de abóbora antes de usar",
                "Adicione vinagre de maçã à salada para acidificar",
                "Evite alimentos açucarados durante todo o dia"
              ]} 
            />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">Domingo: Equilíbrio</h4>
            <p className="text-gray-600 text-sm mb-2">
              Jejum intermitente leve (12h) + Caldo de osso no almoço
            </p>
            <Checklist 
              section="domingo" 
              items={[
                "Termine o jantar até 20h no sábado para iniciar o jejum",
                "Prepare o caldo de osso com ervas amargas e alho",
                "Inclua vegetais fermentados como acompanhamento",
                "Beba chá de camomila antes de dormir para auxiliar o descanso digestivo"
              ]} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuiaManutencao;
