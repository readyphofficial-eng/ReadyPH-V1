import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PetCompanion } from './components/PetCompanion';
import './index.css';
import './pwa.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <App />
      <PetCompanion />
    </>
  </StrictMode>
);
