import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/main.css';
// Import du Provider Redux
import { Provider } from 'react-redux';
import { store } from './app/store';

// On englobe l'application dans le Provider pour donner accès au store Redux à tous les composants
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
