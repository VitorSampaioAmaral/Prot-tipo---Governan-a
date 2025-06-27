import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Alunos from './pages/Alunos';
import Desempenho from './pages/Desempenho';
import Conteudo from './pages/Conteudo';
import Missoes from './pages/Missoes';
import Trilhas from './pages/Trilhas';
import Recompensas from './pages/Recompensas';
import Configuracoes from './pages/Configuracoes';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/alunos" element={<Alunos />} />
      <Route path="/desempenho" element={<Desempenho />} />
      <Route path="/conteudo" element={<Conteudo />} />
      <Route path="/missoes" element={<Missoes />} />
      <Route path="/trilhas" element={<Trilhas />} />
      <Route path="/recompensas" element={<Recompensas />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
    </Routes>
  );
} 