import React from 'react';
import { HelmetProvider } from 'react-helmet-async'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { Toaster } from 'react-hot-toast';

import App from './App.jsx'
import { store, persistor } from './redux/store.js';

import "modern-normalize";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
          <HelmetProvider>
            <App />
            <Toaster />
          </HelmetProvider>
        </BrowserRouter>
      </PersistGate>  
    </Provider>
  </React.StrictMode>
)
