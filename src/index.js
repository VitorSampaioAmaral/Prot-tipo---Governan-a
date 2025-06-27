import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Unificador from './Unificador';

// Importação dinâmica dos módulos (agora dentro de src)
const ProfessorApp = React.lazy(() => import('./professor/src/App'));
const AlunoApp = React.lazy(() => import('./aluno/src/App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Unificador />} />
          <Route path="/professor/*" element={<ProfessorApp />} />
          <Route path="/aluno/*" element={<AlunoApp />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>
); 