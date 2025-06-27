import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import OfflineBanner from './components/OfflineBanner';
import Login from './pages/Login';
import Home from './pages/Home';
import Desafios from './pages/Desafios';
import Quiz from './pages/Quiz';
import Perfil from './pages/Perfil';
import RelatorioProfessor from './pages/RelatorioProfessor';
import OfflineBox from './pages/OfflineBox';
import Missoes from './pages/Missoes';
import Trilha from './pages/Trilha';

export default function App() {
  const [aluno, setAluno] = useState(null);
  const [offline, setOffline] = useState(false);
  const [maestria, setMaestria] = useState({}); // {quizId: pontos}

  return (
    <Routes>
      <Route path="/" element={aluno ? <Navigate to="/aluno/home" /> : <Login setAluno={setAluno} />} />
      <Route path="login" element={aluno ? <Navigate to="/aluno/home" /> : <Login setAluno={setAluno} />} />
      <Route path="home" element={aluno ? <Home aluno={aluno} /> : <Navigate to="/aluno/login" />} />
      <Route path="desafios" element={aluno ? <Desafios aluno={aluno} maestria={maestria} setMaestria={setMaestria} /> : <Navigate to="/aluno/login" />} />
      <Route path="quiz" element={aluno ? <Quiz aluno={aluno} offline={offline} maestria={maestria} setMaestria={setMaestria} /> : <Navigate to="/aluno/login" />} />
      <Route path="quiz/:id" element={aluno ? <Quiz aluno={aluno} offline={offline} maestria={maestria} setMaestria={setMaestria} /> : <Navigate to="/aluno/login" />} />
      <Route path="relatorio" element={<RelatorioProfessor offline={offline} />} />
      <Route path="offlinebox" element={<OfflineBox offline={offline} />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="missoes" element={aluno ? <Missoes /> : <Navigate to="/aluno/login" />} />
      <Route path="trilha" element={aluno ? <Trilha /> : <Navigate to="/aluno/login" />} />
    </Routes>
  );
} 