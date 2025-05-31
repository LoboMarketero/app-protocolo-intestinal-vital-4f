import React from 'react';
import { DownloadCloud } from 'lucide-react'; // Using an icon

const AppDownloadButton: React.FC = () => { // Renamed component
  // This button should trigger PWA installation or guide to store.
  // For now, it's a placeholder visually.
  // Style changed to be more prominent, like btn-primary
  return (
    <button 
      className="w-full bg-jade hover:bg-jade/90 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
      // Style similar to btn-primary, added w-full and justify-center
    >
      <DownloadCloud className="w-5 h-5" /> {/* Icon size increased slightly */}
      <span className="uppercase">Baixar App</span> {/* Text is already uppercase */}
    </button>
  );
};

export default AppDownloadButton; // Exporting renamed component
