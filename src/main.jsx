import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './App.css';
import './features.css';
import './graphics.css';
import './services.css';
import './projects.css';
import './responsive.css';
import './installApp.css';
import './proFeatures.css';
import './security.css';
import './header.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
