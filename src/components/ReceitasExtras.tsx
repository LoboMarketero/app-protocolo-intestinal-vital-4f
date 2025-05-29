import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ArrowLeft, Utensils, Coffee, Droplet, Apple } from 'lucide-react';

interface ReceitasExtrasProps {
  onBack: () => void;
}

const ReceitasExtras: React.FC<ReceitasExtrasProps> = ({ onBack }) => {
  const { user } = useUser();
  const [filterCategory, setFilterCategory] = useState('todos');
  const [showAllRecipes, setShowAllRecipes] = useState(false);

  // Verificar permissão
  if (!user.permissions.extraRecipes) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card">
          <h2 className="text-2xl font-bold text-jade mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-4">
            Você precisa do plano Completo ou Premium para acessar as Receitas Extras.
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

  const ReceitaCard = ({ 
    title, 
    description, 
    ingredients, 
    preparation,
    icon
  }: { 
    title: string;
    description: string;
    ingredients: string[];
    preparation: string;
    icon: React.ReactNode;
  }) => (
    <div className="card">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-mint/20">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-jade mb-1">{title}</h4>
          <p className="text-gray-700 text-sm mb-3">{description}</p>
          
          <div className="mb-3">
            <h5 className="font-semibold text-gray-800 mb-1 text-sm">Ingredientes:</h5>
            <ul className="text-gray-600 text-sm list-disc list-inside">
              {ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-800 mb-1 text-sm">Modo de Preparo:</h5>
            <p className="text-gray-600 text-sm">
              {preparation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Definir recetas adicionales para mostrar cuando showAllRecipes es true
  const additionalRecipes = [
    {
      title: "Sopa Detox de Legumes",
      description: "Nutritiva e purificante, ideal para a fase de restauração.",
      ingredients: [
        "2 cenouras médias picadas",
        "1 abobrinha picada",
        "1 cebola pequena picada",
        "2 dentes de alho amassados",
        "1 colher de chá de cúrcuma",
        "1 colher de chá de gengibre ralado",
        "1 litro de água filtrada ou caldo de legumes",
        "Salsa fresca picada a gosto"
      ],
      preparation: "Refogue a cebola e o alho em um fio de azeite. Adicione os demais vegetais e temperos, cubra com água e deixe cozinhar por 20-25 minutos. Bata no liquidificador e sirva quente com salsa picada.",
      icon: <Utensils className="w-6 h-6 text-jade" />,
      category: "sopas"
    },
    {
      title: "Chá Digestivo Pós-Refeição",
      description: "Auxilia na digestão e combate o inchaço abdominal.",
      ingredients: [
        "1 colher de chá de erva-doce",
        "1 colher de chá de hortelã desidratada",
        "1 pedaço pequeno de casca de gengibre",
        "1 anis estrelado",
        "1 pau de canela pequeno",
        "250ml de água filtrada fervente"
      ],
      preparation: "Coloque todos os ingredientes em uma xícara e adicione a água fervente. Tampe e deixe em infusão por 5-7 minutos. Coe e beba após as refeições principais.",
      icon: <Coffee className="w-6 h-6 text-jade" />,
      category: "chas"
    },
    {
      title: "Tônico Matinal Energizante",
      description: "Desperta o metabolismo e fornece energia sustentável.",
      ingredients: [
        "Suco de 1 limão",
        "1 colher de chá de mel puro (opcional)",
        "1 colher de chá de vinagre de maçã orgânico",
        "1 pitada de canela em pó",
        "1 pitada de pimenta caiena",
        "200ml de água morna"
      ],
      preparation: "Misture todos os ingredientes e beba logo ao acordar, 30 minutos antes do café da manhã para estimular o sistema digestivo.",
      icon: <Droplet className="w-6 h-6 text-jade" />,
      category: "shots"
    },
    {
      title: "Vitamina Anti-inflamatória",
      description: "Reduz a inflamação intestinal e fortalece o sistema imunológico.",
      ingredients: [
        "1 banana",
        "1 fatia média de abacaxi",
        "1 colher de sobremesa de cúrcuma fresca ralada",
        "1 colher de sobremesa de gengibre fresco ralado",
        "1 colher de chá de canela em pó",
        "1 colher de sopa de semente de linhaça dourada",
        "200ml de leite vegetal (amêndoas, coco ou aveia)"
      ],
      preparation: "Bata todos os ingredientes no liquidificador até obter uma mistura homogênea. Consuma imediatamente para aproveitar todas as propriedades.",
      icon: <Coffee className="w-6 h-6 text-jade" />,
      category: "smoothies"
    },
    {
      title: "Água Alcalina Energizada",
      description: "Equilibra o pH do corpo e promove a desintoxicação celular.",
      ingredients: [
        "1 litro de água filtrada",
        "1 colher de chá de bicarbonato de sódio",
        "Suco de meio limão",
        "1 pitada de sal do Himalaia",
        "5 folhas de hortelã fresca"
      ],
      preparation: "Dissolva o bicarbonato e o sal na água. Adicione o suco de limão e as folhas de hortelã. Deixe na geladeira por pelo menos 1 hora antes de consumir. Beba ao longo do dia.",
      icon: <Droplet className="w-6 h-6 text-jade" />,
      category: "aguas"
    },
    {
      title: "Mix de Sementes Funcionais",
      description: "Blend nutritivo para adicionar às refeições e potencializar o protocolo.",
      ingredients: [
        "2 colheres de sopa de semente de chia",
        "2 colheres de sopa de linhaça dourada moída",
        "2 colheres de sopa de sementes de abóbora",
        "2 colheres de sopa de sementes de girassol",
        "1 colher de sopa de sementes de gergelim",
        "1 colher de chá de cúrcuma em pó"
      ],
      preparation: "Triture levemente as sementes maiores. Misture todos os ingredientes e armazene em um pote de vidro. Consuma 1-2 colheres de sobremesa por dia, adicionando em sucos, vitaminas, saladas ou iogurtes.",
      icon: <Apple className="w-6 h-6 text-jade" />,
      category: "outros"
    },
    {
      title: "Suco Verde Básico",
      description: "Versão simplificada para iniciantes no protocolo.",
      ingredients: [
        "1 maçã verde",
        "1/2 pepino",
        "1 folha de couve",
        "Suco de 1/2 limão",
        "1 colher de chá de gengibre ralado",
        "200ml de água de coco"
      ],
      preparation: "Bata todos os ingredientes no liquidificador. Coe se preferir e beba imediatamente, preferencialmente em jejum.",
      icon: <Coffee className="w-6 h-6 text-jade" />,
      category: "sucos"
    },
    {
      title: "Kefir Probiótico",
      description: "Bebida fermentada rica em probióticos para restaurar a flora intestinal.",
      ingredients: [
        "2 colheres de sopa de grãos de kefir",
        "500ml de leite (vegetal ou animal)",
        "1 colher de chá de mel puro (opcional)",
        "Frutas frescas a gosto (opcional)"
      ],
      preparation: "Coloque os grãos de kefir em um pote de vidro e adicione o leite. Cubra com um pano limpo e deixe fermentar por 24 horas em temperatura ambiente. Coe, separe os grãos para nova fermentação e consuma o kefir puro ou com frutas.",
      icon: <Droplet className="w-6 h-6 text-jade" />,
      category: "probioticos"
    },
    {
      title: "Mingau Desintoxicante",
      description: "Café da manhã nutritivo que apoia o processo de limpeza intestinal.",
      ingredients: [
        "1/2 xícara de aveia em flocos",
        "1 xícara de leite vegetal",
        "1 colher de chá de canela em pó",
        "1/2 colher de chá de cúrcuma em pó",
        "1 colher de sopa de sementes de chia",
        "1 colher de sobremesa de óleo de coco",
        "1/2 maçã ralada"
      ],
      preparation: "Cozinhe a aveia no leite vegetal por 3-5 minutos. Adicione os demais ingredientes, misture bem e deixe descansar por 5 minutos antes de consumir.",
      icon: <Apple className="w-6 h-6 text-jade" />,
      category: "outros"
    },
    {
      title: "Kombucha Caseira",
      description: "Bebida probiótica fermentada que auxilia na saúde digestiva.",
      ingredients: [
        "1 SCOBY (cultura de kombucha)",
        "1 litro de chá verde ou preto resfriado",
        "1/2 xícara de açúcar orgânico",
        "1/2 xícara de kombucha madura (de uma fermentação anterior)"
      ],
      preparation: "Dissolva o açúcar no chá ainda quente. Deixe esfriar completamente. Adicione o SCOBY e a kombucha madura. Cubra com um pano limpo e deixe fermentar por 7-10 dias. Engarrafe e refrigere antes de consumir.",
      icon: <Droplet className="w-6 h-6 text-jade" />,
      category: "probioticos"
    }
  ];

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
          <Utensils className="w-6 h-6" />
          15 Receitas Extras
        </h2>
        <p className="text-gray-700">
          Acelere seus resultados com essas receitas exclusivas potencializadas.
        </p>
      </div>

      {/* Categorias */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setFilterCategory('todos')}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            filterCategory === 'todos' 
              ? 'bg-jade text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Todos
        </button>
        <button 
          onClick={() => setFilterCategory('sucos')}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            filterCategory === 'sucos' 
              ? 'bg-jade text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Sucos Verdes
        </button>
        <button 
          onClick={() => setFilterCategory('shots')}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            filterCategory === 'shots' 
              ? 'bg-jade text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Shots
        </button>
        <button 
          onClick={() => setFilterCategory('smoothies')}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            filterCategory === 'smoothies' 
              ? 'bg-jade text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Smoothies
        </button>
        <button 
          onClick={() => setFilterCategory('aguas')}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            filterCategory === 'aguas' 
              ? 'bg-jade text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Águas
        </button>
      </div>

      {/* Receitas */}
      <div className="space-y-6">
        <ReceitaCard
          title="Suco Verde Turbinado"
          description="Potente desintoxicante com ação antiparasitária reforçada."
          ingredients={[
            "1 maçã verde",
            "1 pepino",
            "2 folhas de couve",
            "Suco de 1 limão",
            "1 colher de chá de spirulina",
            "1 colher de chá de clorofila",
            "1 pedaço pequeno de gengibre"
          ]}
          preparation="Bata todos os ingredientes no liquidificador com 200ml de água filtrada. 
                      Coe se preferir e beba imediatamente em jejum."
          icon={<Coffee className="w-6 h-6 text-jade" />}
        />
        
        <ReceitaCard
          title="Shot Potencializado"
          description="Concentrado de nutrientes para eliminar parasitas rapidamente."
          ingredients={[
            "1 dente de alho",
            "1 colher de chá de cúrcuma",
            "1 colher de chá de gengibre ralado",
            "1 pitada de pimenta caiena",
            "Suco de meio limão",
            "1 colher de chá de mel orgânico (opcional)"
          ]}
          preparation="Misture todos os ingredientes e bata no liquidificador com 50ml de água. 
                      Tome de uma vez como um shot, preferencialmente em jejum pela manhã."
          icon={<Droplet className="w-6 h-6 text-jade" />}
        />
        
        <ReceitaCard
          title="Smoothie Termogênico"
          description="Acelera o metabolismo e ajuda na eliminação de toxinas."
          ingredients={[
            "1 banana congelada",
            "1/2 abacate pequeno",
            "1 colher de sobremesa de canela",
            "1 colher de chá de gengibre ralado",
            "1 colher de sobremesa de óleo de coco",
            "1 colher de chá de semente de chia",
            "200ml de leite de amêndoas"
          ]}
          preparation="Bata todos os ingredientes no liquidificador até obter uma consistência cremosa. 
                      Consuma como café da manhã ou lanche entre as refeições."
          icon={<Coffee className="w-6 h-6 text-jade" />}
        />
        
        <ReceitaCard
          title="Água Saborizada Detox"
          description="Hidratação potente com propriedades depurativas."
          ingredients={[
            "1 litro de água filtrada",
            "1/2 pepino fatiado",
            "5 folhas de hortelã",
            "1 limão fatiado",
            "1 colher de chá de semente de chia",
            "1 ramo de alecrim"
          ]}
          preparation="Coloque todos os ingredientes em uma jarra e deixe repousar por pelo menos 2 horas 
                      na geladeira. Beba ao longo do dia para manter o corpo hidratado e auxiliar na eliminação de toxinas."
          icon={<Droplet className="w-6 h-6 text-jade" />}
        />
        
        <ReceitaCard
          title="Salada Anti-Parasitária"
          description="Combinação poderosa de vegetais e sementes contra parasitas intestinais."
          ingredients={[
            "Folhas verdes variadas (rúcula, agrião, espinafre)",
            "1/4 de cebola roxa fatiada",
            "1 dente de alho picado",
            "2 colheres de sopa de sementes de abóbora",
            "1 colher de sopa de sementes de girassol",
            "Azeite de oliva extravirgem",
            "1 colher de chá de orégano",
            "Suco de limão a gosto"
          ]}
          preparation="Misture todos os vegetais em uma tigela. Adicione as sementes e tempere com alho, 
                      orégano, azeite e limão. Consuma diariamente no almoço para fortalecer o organismo."
          icon={<Apple className="w-6 h-6 text-jade" />}
        />
        
        {/* Mostrar recetas adicionales si showAllRecipes es true */}
        {showAllRecipes && additionalRecipes.map((recipe, index) => (
          <ReceitaCard
            key={index}
            title={recipe.title}
            description={recipe.description}
            ingredients={recipe.ingredients}
            preparation={recipe.preparation}
            icon={recipe.icon}
          />
        ))}
        
        {/* Botão Ver Mais */}
        <div className="text-center">
          <button 
            onClick={() => setShowAllRecipes(!showAllRecipes)}
            className="btn-secondary"
          >
            {showAllRecipes ? 'Mostrar menos' : 'Ver todas receitas'}
          </button>
          <p className="text-gray-500 text-sm mt-2">
            Mostrando {showAllRecipes ? '15' : '5'} de 15 receitas
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReceitasExtras;
