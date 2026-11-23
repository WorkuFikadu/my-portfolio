import React, { useState, useEffect } from 'react';
import { Download, Check, Sparkles } from 'lucide-react';
import { fireConfetti } from '../utils/confetti';

export default function InstallAppBtn({ className = '' }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setDeferredPrompt(null);
      fireConfetti();
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        fireConfetti();
        setInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback instruction if already installable or in browser
      alert("To install this app on your phone or desktop:\n\n1. In Chrome/Edge: Click the install icon (⬇) in the browser address bar.\n2. On iPhone/Safari: Tap 'Share' and choose 'Add to Home Screen'.\n3. On Android: Tap browser menu (⋮) and tap 'Install App' or 'Add to Home screen'.");
    }
  };

  return (
    <button 
      onClick={handleInstall} 
      className={`btn-install-app ${className}`}
      title="Download & Install Portfolio App on Desktop or Mobile"
      aria-label="Download and Install App"
    >
      <div className="install-icon-wrapper">
        <img 
          src={`${import.meta.env.BASE_URL}favicon.svg`} 
          alt="App Icon" 
          className="app-download-icon-img"
        />
      </div>
      <span className="install-text-wrap">
        <span className="install-label">
          {installed ? 'App Installed' : 'Install App'}
        </span>
        <span className="install-sub">PWA Offline Ready</span>
      </span>
      {installed ? (
        <Check size={16} className="text-emerald" />
      ) : (
        <Download size={16} className="install-dl-arrow" />
      )}
    </button>
  );
}
