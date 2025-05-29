import React, { useState, useEffect } from 'react';
import { CheckCircle, WifiOff, RefreshCw, AlertTriangle } from 'lucide-react';

const PWAStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isPWA, setIsPWA] = useState(false);
  const [swStatus, setSwStatus] = useState<'registered' | 'failed' | 'loading'>('loading');

  useEffect(() => {
    // Verificar se está sendo executado como PWA instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsPWA(isStandalone);

    // Verificar status do Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(() => {
          setSwStatus('registered');
        })
        .catch(() => {
          setSwStatus('failed');
        });
    } else {
      setSwStatus('failed');
    }

    // Event listeners para status online/offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="fixed top-2 right-2 z-50 rounded-full shadow-md">
      <div className="flex items-center gap-1">
        {/* Status Online */}
        <div 
          className={`rounded-full p-1 ${isOnline ? 'bg-green-100' : 'bg-red-100'}`}
          title={isOnline ? 'Online' : 'Offline'}
        >
          {isOnline ? (
            <CheckCircle className="w-4 h-4 text-jade" />
          ) : (
            <WifiOff className="w-4 h-4 text-coral" />
          )}
        </div>

        {/* Status Service Worker */}
        <div 
          className={`rounded-full p-1 ${
            swStatus === 'registered' 
              ? 'bg-green-100' 
              : swStatus === 'failed' 
                ? 'bg-red-100' 
                : 'bg-yellow-100'
          }`}
          title={
            swStatus === 'registered' 
              ? 'PWA ativo' 
              : swStatus === 'failed' 
                ? 'PWA inativo' 
                : 'Carregando PWA...'
          }
        >
          {swStatus === 'registered' ? (
            <CheckCircle className="w-4 h-4 text-jade" />
          ) : swStatus === 'failed' ? (
            <AlertTriangle className="w-4 h-4 text-coral" />
          ) : (
            <RefreshCw className="w-4 h-4 text-yellow-600 animate-spin" />
          )}
        </div>

        {/* Modo instalado */}
        {isPWA && (
          <span className="text-xs bg-jade text-white px-2 py-0.5 rounded-full">
            App
          </span>
        )}
      </div>
    </div>
  );
};

export default PWAStatus;
