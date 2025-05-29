import React from 'react';
import { X, Lock, Sparkles } from 'lucide-react';
import { premiumFeatures } from '../data/premiumFeatures';

interface PremiumModalProps {
  featureId: string;
  onClose: () => void;
  onUpgrade: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ featureId, onClose, onUpgrade }) => {
  const feature = premiumFeatures.find(f => f.id === featureId);

  if (!feature) return null;

  const getFeatureContent = () => {
    switch (featureId) {
      case 'maintenance-guide':
        return {
          preview: [
            '✅ Cardápio completo pós-protocolo',
            '✅ Lista de alimentos permitidos e proibidos',
            '✅ Receitas para manter a saúde intestinal',
            '✅ Protocolo de emergência para recaídas',
            '✅ Guia de suplementação natural'
          ],
          teaser: 'Nunca mais volte aos problemas intestinais! Este guia exclusivo garante que você mantenha todos os benefícios conquistados.'
        };
      case 'extra-recipes':
        return {
          preview: [
            '🥤 5 Smoothies Detox Poderosos',
            '🍵 8 Chás Terapêuticos Especiais',
            '🥗 7 Saladas Probióticas',
            '🍲 5 Sopas Restauradoras',
            '🧃 Shots Matinais Turbo'
          ],
          teaser: 'Acelere seus resultados em até 2x com receitas desenvolvidas pela Dra. Mariana especialmente para potencializar o protocolo.'
        };
      case 'turbo-protocol':
        return {
          preview: [
            '⚡ Protocolo intensivo de 15 dias',
            '⚡ 3x mais potente que o básico',
            '⚡ Suplementação estratégica',
            '⚡ Jejum intermitente otimizado',
            '⚡ Resultados visíveis em 7 dias'
          ],
          teaser: 'Para quem tem pressa! Versão acelerada do protocolo com técnicas avançadas para resultados em tempo recorde.'
        };
      case 'vip-community':
        return {
          preview: [
            '👩‍⚕️ Lives semanais com Dra. Mariana',
            '💬 Grupo exclusivo no WhatsApp',
            '📞 Suporte direto com especialistas',
            '🎁 Conteúdos exclusivos mensais',
            '🏆 Desafios e premiações'
          ],
          teaser: 'Tenha acesso direto à Dra. Mariana e nossa equipe de especialistas. Tire dúvidas, compartilhe resultados e acelere sua transformação!'
        };
      default:
        return { preview: [], teaser: '' };
    }
  };

  const content = getFeatureContent();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-jade flex items-center gap-2">
                <Lock className="w-5 h-5" />
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">O que você vai receber:</h4>
            <div className="space-y-2">
              {content.preview.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-jade mt-0.5">•</span>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-jade/10 rounded-lg p-4 mb-6">
            <p className="text-gray-700 text-sm italic">{content.teaser}</p>
          </div>

          {/* Blur Preview */}
          <div className="relative mb-6">
            <div className="absolute inset-0 backdrop-blur-md bg-white/70 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Lock className="w-8 h-8 text-jade mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">Conteúdo Exclusivo</p>
              </div>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg opacity-50">
              <div className="h-20 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            <p className="text-3xl font-bold text-coral">{feature.price}</p>
            <p className="text-sm text-gray-600 mt-1">
              {feature.planRequired === 'vip' 
                ? '⏰ Assinatura mensal' 
                : '🔄 Pagamento único'}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={onUpgrade}
            className="btn-premium w-full flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {feature.planRequired === 'vip' ? 'Assinar Agora' : 'Desbloquear Agora'}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            {feature.planRequired === 'vip' 
              ? 'Pagamento seguro. Cancele quando quiser.' 
              : 'Pagamento único e seguro. Acesso vitalício.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
