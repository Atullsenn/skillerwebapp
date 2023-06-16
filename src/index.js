import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from "./ScrollToTop";
import { IsLoginAuthenticateProvider } from "./Contexts/LoginContext";
import { IsToastProvider } from './Contexts/ToastContext';
import { IsToggleTypeProvider } from "./Contexts/IsToggleContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <IsLoginAuthenticateProvider>
    <IsToastProvider>
      <IsToggleTypeProvider>
        <BrowserRouter basename="/design_website/skillerwebnmob">
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </IsToggleTypeProvider>
    </IsToastProvider>
  </IsLoginAuthenticateProvider>
);

reportWebVitals();