import React from 'react';

interface LockedPreviewProps {
  componentName: string;
  onUpgradeClick?: () => void; // Optional prop for upgrade action
}

const LockedPreview: React.FC<LockedPreviewProps> = ({ componentName, onUpgradeClick }) => {
  return (
    <div className="locked-preview-card section text-center p-8 my-6">
      <span className="text-4xl mb-4 block" role="img" aria-label="lock">🔒</span>
      <h3 className="text-2xl font-semibold text-jade mb-2">Recurso Bloqueado</h3>
      <p className="text-gray-600 mb-4">
        O recurso <strong className="text-gray-700">{componentName}</strong> está disponível em planos superiores.
      </p>
      <button 
        className="btn-primary"
        onClick={onUpgradeClick}
      >
        FAZER UPGRADE AGORA
      </button>
      <p className="text-sm text-gray-500 mt-3">
        Desbloqueie este e outros recursos premium para potencializar seus resultados!
      </p>
    </div>
  );
};

export default LockedPreview;
