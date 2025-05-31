import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { planDetails } from '../data/premiumFeatures';
import { ArrowLeft, Check, Star, Crown, Sparkles, Users, X } from 'lucide-react';

interface UpgradePageProps {
  onBack: () => void;
}

const checkoutLinks = {
  essencialToCompleto: "https://pay.risepay.com.br/Pay/38958f1f2bc743a790c0e0faa1891479",
  essencialToPremium: "https://pay.risepay.com.br/Pay/0158418f83414ba298bd72d923f32ec9",
  completoToPremium: "https://pay.risepay.com.br/Pay/f35974bb839246bfbc49359c49e61f5f",
  comunidadeVip: "https://pay.risepay.com.br/Pay/ebcbb5c36d1f466ba3d6435ccfe1bafa",
};

const UpgradePage: React.FC<UpgradePageProps> = ({ onBack }) => {
  const { authUser, userProfile, permissions } = useUser();
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null); // Kept for potential future use, not for VIP cancellation

  // Add a guard for authUser, userProfile and permissions for safety
  if (!authUser || !userProfile || !permissions) {
    return <div className="p-4 text-center">Carregando dados...</div>;
  }

  // Removed handleCancelVip as it's out of scope and causing TS errors.
  // Cancellation should be handled via RisePay or a dedicated backend flow.

  const PlanCard = ({
    planKey,
    recommended = false,
    upgradePrice
  }: { 
    planKey: 'essencial' | 'completo' | 'premium';
    recommended?: boolean;
    upgradePrice?: string;
  }) => {
    const plan = planDetails[planKey];
    const isCurrentPlan = userProfile.plan === planKey; 
    const canUpgrade = planKey !== 'essencial' && !isCurrentPlan && 
                      (planKey === 'completo' || (planKey === 'premium' && userProfile.plan !== 'premium')); 

    return (
      <div className={`card relative ${recommended ? 'border-2 border-gold shadow-2xl' : ''} ${isCurrentPlan ? 'bg-jade/5 border-jade' : ''}`}>
        {recommended && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-gold text-jade px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              MAIS POPULAR
            </span>
          </div>
        )}

        <div className="text-center mb-4">
          <div className="mb-2">
            {planKey === 'essencial' && <Sparkles className="w-8 h-8 text-jade mx-auto" />}
            {planKey === 'completo' && <Star className="w-8 h-8 text-gold mx-auto" />}
            {planKey === 'premium' && <Crown className="w-8 h-8 text-gold mx-auto" />}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
          
          {!isCurrentPlan && (
            <>
              <p className="text-2xl font-bold text-coral mt-2">{upgradePrice || plan.price}</p>
              <p className="text-xs text-gray-600">
                {planKey !== 'essencial' ? '🔄 Pagamento único' : ''}
              </p>
            </>
          )}
          
          {isCurrentPlan && (
            <p className="text-sm text-jade font-semibold mt-2">
              PLANO ATUAL
            </p>
          )}
        </div>

        <div className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-jade flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {canUpgrade && (
          <button
            onClick={() => {
              let url = '';
              if (userProfile.plan === 'essencial' && planKey === 'completo') {
                url = checkoutLinks.essencialToCompleto;
              } else if (userProfile.plan === 'essencial' && planKey === 'premium') {
                url = checkoutLinks.essencialToPremium;
              } else if (userProfile.plan === 'completo' && planKey === 'premium') {
                url = checkoutLinks.completoToPremium;
              }
              if (url) {
                window.location.href = url;
              }
            }}
            className={`w-full ${planKey === 'premium' ? 'btn-premium' : 'btn-secondary'}`}
          >
            Ativar {plan.name}
          </button>
        )}

        {isCurrentPlan && (
          <div className="text-center text-jade font-semibold">
            Plano Ativo ✓
          </div>
        )}
      </div>
    );
  };

  const renderUpgradePlans = () => {
    // Determinar qué planes mostrar según el plan actual
    switch(userProfile.plan) { 
      case 'premium':
        // Si ya tiene premium, no mostrar opciones de downgrade
        return (
          <div className="card bg-jade/10 border-jade p-6 text-center">
            <Crown className="w-10 h-10 text-gold mx-auto mb-3" />
            <h3 className="text-xl font-bold text-jade mb-2">Você já possui o Plano Premium!</h3>
            <p className="text-gray-700">
              Você tem acesso a todos os recursos exclusivos do Protocolo Intestinal Vital 4F.
            </p>
          </div>
        );

      case 'completo':
        // Si tiene completo, mostrar solo upgrade a premium
        return (
          <div className="grid gap-6">
            <PlanCard 
              planKey="premium" 
              recommended={true}
              upgradePrice={planDetails.premium.upgradeFromCompleto}
            />
          </div>
        );

      default: // 'essencial'
        // Si tiene essencial, mostrar upgrade a completo y premium
        return (
          <div className="grid gap-6">
            <PlanCard 
              planKey="completo" 
              recommended={true}
              upgradePrice={planDetails.completo.upgradeFromEssencial}
            />
            <PlanCard 
              planKey="premium"
              upgradePrice={planDetails.premium.upgradeFromEssencial}
            />
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-jade hover:text-jade/80"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-jade mb-2">
          Fazer Upgrade
        </h1>
        <p className="text-gray-600">
          Desbloqueie funcionalidades exclusivas e acelere seus resultados
        </p>
      </div>

      {/* Plans */}
      <div className="mb-8">
        {renderUpgradePlans()}
      </div>

      {/* VIP Community */}
      <div className="card bg-gradient-to-r from-gold/20 to-yellow-400/20 border-gold/30">
        <div className="text-center">
          <h3 className="text-xl font-bold text-jade mb-2 flex items-center justify-center gap-2">
            <Users className="w-6 h-6" />
            Comunidade VIP
          </h3>
          <p className="text-gray-700 mb-4">
            Acesso direto à Dra. Mariana e equipe de especialistas
          </p>
          <p className="text-2xl font-bold text-coral mb-4">R$ 37/mês</p>
          
          {permissions.canAccessVIPCommunity ? ( // Changed user.permissions to permissions and used correct prop name
            <div className="space-y-2">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-1">
                <Check className="w-4 h-4" />
                Assinatura Ativa
              </div>
              {/* VIP Cancellation button removed as its functionality is out of scope and was causing errors */}
            </div>
          ) : (
            <>
              <button 
                onClick={() => window.location.href = checkoutLinks.comunidadeVip}
                className="btn-premium"
              >
                Assinar Comunidade VIP
              </button>
              <p className="text-xs text-gray-600 mt-2">
                Cancele quando quiser. Sem fidelidade.
              </p>
            </>
          )}
        </div>
      </div>
      
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-md shadow-2xl text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Sucesso!</h3>
            <p className="text-gray-700">{showSuccessMessage}</p>
          </div>
        </div>
      )}

      {/* Guarantee */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          🔒 Pagamento 100% seguro | 🏆 Garantia de 7 dias
        </p>
      </div>
    </div>
  );
};

export default UpgradePage;
