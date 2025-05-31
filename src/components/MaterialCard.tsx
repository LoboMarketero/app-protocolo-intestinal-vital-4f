import React from 'react';
// import { useUser } from '../context/UserContext'; // To get userPlan
// import { Plan } from '../types'; // Assuming Plan type is defined

type Plan = 'essencial' | 'completo' | 'premium' | 'vipCommunity'; // Simplified Plan type

interface MaterialPreview {
  items?: string[];
  categories?: string[];
  recipePreview?: string;
  features?: string[];
  content?: string;
}

interface MaterialCardProps {
  title: string;
  description: string;
  requiredPlan: Plan;
  userPlan: Plan; // This will likely come from UserContext
  upgradePrice: string;
  preview: MaterialPreview;
  // openPreviewModal: (title: string, preview: MaterialPreview) => void; // Will be passed as prop or handled by context
}

// Placeholder for access check logic
const checkAccess = (userPlan: Plan, requiredPlan: Plan): boolean => {
  if (requiredPlan === 'essencial') return true;
  if (requiredPlan === 'completo') return userPlan === 'completo' || userPlan === 'premium';
  if (requiredPlan === 'premium') return userPlan === 'premium';
  return false; // Default case
};

// Placeholder for modal opening function
const openPreviewModal = (title: string, preview: MaterialPreview) => {
  console.log(`Opening preview modal for: ${title}`, preview);
  // Actual implementation would involve a modal state management (e.g., Context API or local state in parent)
  alert(`Preview: ${title}\n${JSON.stringify(preview, null, 2)}`);
};

const MaterialCard: React.FC<MaterialCardProps> = ({
  title,
  description,
  requiredPlan,
  userPlan,
  upgradePrice,
  preview,
}) => {
  // const { user } = useUser(); // To get userPlan
  // const actualUserPlan = user.plan; // Example
  const actualUserPlan = userPlan; // Using prop for now

  const hasAccess = checkAccess(actualUserPlan, requiredPlan);

  return (
    <div className={`material-card section ${hasAccess ? 'unlocked' : 'locked premium-card'}`}>
      <div className="card-header flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-jade">{title}</h3>
        {!hasAccess && <span className="lock-icon text-2xl">🔒</span>}
      </div>
      
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      
      {hasAccess ? (
        <button className="btn-primary w-full">
          ACESSAR CONTEÚDO
        </button>
      ) : (
        <div className="preview-section space-y-3">
          <button 
            className="btn-secondary w-full"
            onClick={() => openPreviewModal(title, preview)}
          >
            👁️ VER PREVIEW
          </button>
          <button className="btn-premium w-full">
            DESBLOQUEAR - {upgradePrice}
          </button>
        </div>
      )}
    </div>
  );
};

export default MaterialCard;
