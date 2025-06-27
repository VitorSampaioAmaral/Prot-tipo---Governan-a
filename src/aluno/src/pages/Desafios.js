import React, { useEffect } from 'react';
import { FaTasks, FaCheckCircle, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Níveis de maestria infinitos (copiado do Quiz.js)
const niveis = [0, 10, 25, 45, 70, 100, 140, 200];
const nomesMaestria = [
  '🐛 Lagarta Verde',      // Nível 1 (0-9 pts) - Iniciante, pequeno e verde
  '🐸 Sapo Azul',          // Nível 2 (10-24 pts) - Pequeno anfíbio azul
  '🦋 Borboleta Roxa',     // Nível 3 (25-44 pts) - Voa, roxa
  '🦅 Águia Dourada',      // Nível 4 (45-69 pts) - Poderosa, dourada
  '🦁 Leão Vermelho',      // Nível 5 (70-99 pts) - Rei da selva, vermelho
  '🐉 Dragão Prateado',    // Nível 6 (100-139 pts) - Mítico, prateado
  '👑 Fênix Dourada'       // Nível 7 (140+ pts) - Imortal, dourada brilhante
];

const coresMaestria = [
  '#4CAF50',  // Verde - Lagarta
  '#2196F3',  // Azul - Sapo
  '#9C27B0',  // Roxo - Borboleta
  '#FFD700',  // Dourado - Águia
  '#F44336',  // Vermelho - Leão
  '#C0C0C0',  // Prateado - Dragão
  '#FFD700'   // Dourado brilhante - Fênix
];

// Sistema infinito de evolução da Fênix (copiado do Quiz.js)
function obterNivelInfinito(pontos) {
  if (pontos < 140) {
    // Níveis normais 1-7
    let nivel = 1;
    for (let i = 1; i < niveis.length; i++) {
      if (pontos >= niveis[i]) nivel = i + 1;
    }
    return { nivel, nome: nomesMaestria[nivel - 1], cor: coresMaestria[nivel - 1] };
  } else {
    // Sistema infinito da Fênix
    const nivelFenix = Math.floor((pontos - 140) / 50) + 8; // A cada 50 pontos, sobe um nível
    const multiplicador = Math.floor((pontos - 140) / 200) + 1; // A cada 200 pontos, multiplicador aumenta
    
    // Evoluções da Fênix baseadas no nível
    let nomeFenix, corFenix;
    
    if (nivelFenix <= 15) {
      // Fênix Elemental (8-15)
      const elementos = ['🔥 Fênix de Fogo', '⚡ Fênix de Trovão', '❄️ Fênix de Gelo', '🌊 Fênix de Água', '🌪️ Fênix de Vento', '🌍 Fênix de Terra', '✨ Fênix de Luz', '🌑 Fênix de Sombra'];
      nomeFenix = elementos[(nivelFenix - 8) % elementos.length];
      corFenix = ['#FF5722', '#FFC107', '#00BCD4', '#2196F3', '#9C27B0', '#795548', '#FFD700', '#424242'][(nivelFenix - 8) % 8];
    } else if (nivelFenix <= 30) {
      // Fênix Cósmica (16-30)
      const cosmicas = ['🌟 Fênix Estelar', '🌌 Fênix Galáctica', '🌠 Fênix Nebulosa', '💫 Fênix Cometa', '🌙 Fênix Lunar', '☀️ Fênix Solar', '🌍 Fênix Planetária', '🌌 Fênix Interestelar'];
      nomeFenix = cosmicas[(nivelFenix - 16) % cosmicas.length];
      corFenix = ['#E91E63', '#9C27B0', '#3F51B5', '#2196F3', '#00BCD4', '#FF9800', '#4CAF50', '#FF5722'][(nivelFenix - 16) % 8];
    } else if (nivelFenix <= 50) {
      // Fênix Divina (31-50)
      const divinas = ['👼 Fênix Celestial', '😇 Fênix Angelical', '👑 Fênix Real', '⚜️ Fênix Sagrada', '💎 Fênix Cristalina', '🏆 Fênix Campeã', '🎖️ Fênix Heroica', '⭐ Fênix Lendária'];
      nomeFenix = divinas[(nivelFenix - 31) % divinas.length];
      corFenix = ['#FFD700', '#C0C0C0', '#FF6B35', '#4CAF50', '#00BCD4', '#FF9800', '#E91E63', '#9C27B0'][(nivelFenix - 31) % 8];
    } else if (nivelFenix <= 100) {
      // Fênix Primordial (51-100)
      const primordiais = ['🌋 Fênix Primordial', '⚡ Fênix Suprema', '🌟 Fênix Eterna', '🌌 Fênix Infinita', '👑 Fênix Absoluta', '💫 Fênix Transcendental', '🌠 Fênix Universal', '✨ Fênix Definitiva'];
      nomeFenix = primordiais[(nivelFenix - 51) % primordiais.length];
      corFenix = ['#FF5722', '#FFC107', '#FFD700', '#9C27B0', '#E91E63', '#00BCD4', '#4CAF50', '#FF9800'][(nivelFenix - 51) % 8];
    } else {
      // Fênix Suprema (100+)
      const supremas = ['🔥 Fênix Suprema', '⚡ Fênix Definitiva', '🌟 Fênix Eterna', '🌌 Fênix Infinita', '👑 Fênix Absoluta', '💫 Fênix Transcendental', '🌠 Fênix Universal', '✨ Fênix Definitiva'];
      nomeFenix = supremas[(nivelFenix - 101) % supremas.length];
      corFenix = ['#FF5722', '#FFC107', '#FFD700', '#9C27B0', '#E91E63', '#00BCD4', '#4CAF50', '#FF9800'][(nivelFenix - 101) % 8];
    }
    
    // Adiciona multiplicador para níveis muito altos
    if (multiplicador > 1) {
      nomeFenix += ` x${multiplicador}`;
    }
    
    return { nivel: nivelFenix, nome: nomeFenix, cor: corFenix };
  }
}

const quizzes = [
  { id: 'sistema-solar', titulo: 'Sistema Solar', descricao: 'Explore os planetas e curiosidades do nosso sistema.', icone: '🪐' },
  { id: 'matematica-basica', titulo: 'Matemática Básica', descricao: 'Desafios de operações e lógica.', icone: '➗' },
  { id: 'portugues', titulo: 'Português', descricao: 'Gramática, ortografia e interpretação.', icone: '📚' },
  { id: 'ciencias', titulo: 'Ciências', descricao: 'Corpo humano, natureza e experimentos.', icone: '🔬' },
  { id: 'historia', titulo: 'História', descricao: 'Fatos marcantes do Brasil e do mundo.', icone: '🏛️' },
  { id: 'geografia', titulo: 'Geografia', descricao: 'Mapas, estados, clima e sociedade.', icone: '🌎' },
  { id: 'cidadania', titulo: 'Cidadania', descricao: 'Direitos, deveres e convivência.', icone: '🤝' }
];

export default function Desafios({ aluno, maestria, setMaestria }) {
  const navigate = useNavigate();

  // Atualiza maestria ao montar 
  useEffect(() => {
    if (!aluno) return;
    const novaMaestria = {};
    quizzes.forEach(q => {
      const storageKey = `quiz_srs_${q.id}_${aluno?.nome || 'anon'}`;
      try {
        const srs = JSON.parse(localStorage.getItem(storageKey) || '{}');
        // Soma todos os acertos para pontos (igual ao Quiz.js)
        let pontos = 0;
        Object.values(srs).forEach(hist => {
          if (hist.acertou) pontos += 2 * (hist.acertos || 1); // 2 pontos por acerto
        });
        novaMaestria[q.id] = pontos;
      } catch {}
    });
    if (Object.keys(novaMaestria).length > 0) setMaestria(novaMaestria);
  }, [aluno, setMaestria]);

  // Função para obter progresso salvo do quiz
  function getProgressoQuiz(id) {
    const storageKey = `quiz_srs_${id}_${aluno?.nome || 'anon'}`;
    try {
      const srs = JSON.parse(localStorage.getItem(storageKey) || '{}');
      const totalPerguntas = Object.keys(bancoQuizzes[id] || {}).length || (bancoQuizzes[id]?.length ?? 0);
      const respondidas = Object.values(srs).filter(q => q.acertou).length;
      // Se já tem pontos de maestria, nunca mostrar 'Não iniciado'
      if ((maestria[id] || 0) > 0 && respondidas === 0) return { estado: 'Em andamento', pct: 0 };
      if (respondidas === 0) return { estado: 'Não iniciado', pct: 0 };
      if (respondidas >= totalPerguntas && totalPerguntas > 0) return { estado: 'Concluído', pct: 100 };
      return { estado: 'Em andamento', pct: Math.round((respondidas / totalPerguntas) * 100) };
    } catch {
      // Se já tem pontos de maestria, nunca mostrar 'Não iniciado'
      if ((maestria[id] || 0) > 0) return { estado: 'Em andamento', pct: 0 };
      return { estado: 'Não iniciado', pct: 0 };
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(26,35,126,0.08)', padding: 40 }}>
      <h2 style={{ color: '#1a237e', marginBottom: 24 }}><FaTasks color="#ffd600" /> Desafios Disponíveis</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
        {quizzes.map(q => {
          const pontosQuiz = maestria[q.id] || 0;
          const infoNivel = obterNivelInfinito(pontosQuiz);
          const progresso = getProgressoQuiz(q.id);
          return (
            <div key={q.id} style={{ background: '#f5f5f5', borderRadius: 14, boxShadow: '0 2px 8px rgba(26,35,126,0.06)', padding: 28, width: 240, textAlign: 'center', position: 'relative' }}>
              <div style={{ fontSize: 38, marginBottom: 8 }}>{q.icone}</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: '#3949ab', marginBottom: 8 }}>{q.titulo}</div>
              <div style={{ fontSize: 16, color: '#333', marginBottom: 16 }}>{q.descricao}</div>
              <button
                onClick={() => navigate(`/aluno/quiz/${q.id}`)}
                style={{ background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 17, fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}
              >
                Iniciar
              </button>
              <div style={{ marginTop: 8, fontSize: 15, color: '#388e3c', fontWeight: 500 }}>
                Maestria: {pontosQuiz} <FaStar color="#ffd600" />
                {pontosQuiz >= 5 && <FaCheckCircle color="#388e3c" style={{ marginLeft: 6 }} title="Quiz completo!" />}
              </div>
              <div style={{ marginTop: 8, fontSize: 15, color: '#1a237e', fontWeight: 500 }}>
                Nível: {infoNivel.nome}
              </div>
              <div style={{ marginTop: 8, fontSize: 15, color: '#1a237e', fontWeight: 500 }}>
                Estado: {progresso.estado} {progresso.pct > 0 && progresso.pct < 100 ? `- ${progresso.pct}%` : progresso.pct === 100 ? '- 100%' : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 