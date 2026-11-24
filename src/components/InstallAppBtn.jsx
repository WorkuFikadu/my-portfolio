import React, { useState, useEffect } from 'react';
import { Download, Check } from 'lucide-react';
import { fireConfetti } from '../utils/confetti';

export default function InstallAppBtn({ className = '', compact = false }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
      fireConfetti();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
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

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleInstall}
        className={`nav-install-compact-btn ${className}`}
        title="Download & Install App on Desktop or Mobile (PWA)"
        aria-label="Download App"
      >
        <div className="nav-app-icon-squircle">
          <img
            src={`${import.meta.env.BASE_URL}app-icon.jpg`}
            alt="Worku App Icon"
            className="nav-app-img"
          />
        </div>
        <span className="nav-app-label">{installed ? 'Installed' : 'App'}</span>
        {installed ? (
          <Check size={13} className="text-emerald" />
        ) : (
          <Download size={13} className="nav-app-dl-icon" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleInstall}
      className={`btn-install-app ${className}`}
      title="Download & Install Portfolio App on Desktop or Mobile"
      aria-label="Download and Install App"
    >
      <div className="install-icon-wrapper portrait-app-icon">
        <img
          src={`${import.meta.env.BASE_URL}app-icon.jpg`}
          alt="Worku Fikadu App Icon"
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
