import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const PWAInstall: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Detectar se o app já está instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    // Interceptar o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenir que o Chrome mostre o prompt automaticamente
      e.preventDefault();
      // Armazenar o evento para uso posterior
      setDeferredPrompt(e);
      // Mostrar o botão de instalação
      setShowInstallButton(true);
    };

    // Não mostrar o botão se o app já estiver instalado
    if (!isStandalone) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Mostrar o prompt de instalação
    deferredPrompt.prompt();
    
    // Aguardar a resposta do usuário
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Usuário ${outcome === 'accepted' ? 'aceitou' : 'recusou'} a instalação`);
    
    // Limpar o deferredPrompt depois que for usado
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) return null;

  return (
    <div className="fixed bottom-24 right-4 z-40 animate-bounce-gentle">
      <button
        onClick={handleInstallClick}
        className="bg-white shadow-lg rounded-full p-3 flex items-center justify-center text-jade border border-jade/20"
        aria-label="Instalar aplicativo"
      >
        <Download className="w-6 h-6" />
      </button>
      <div className="absolute -top-10 right-0 bg-jade text-white text-xs py-1 px-2 rounded whitespace-nowrap shadow-md">
        Instalar App
        <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-jade"></div>
      </div>
    </div>
  );
};

export default PWAInstall;
