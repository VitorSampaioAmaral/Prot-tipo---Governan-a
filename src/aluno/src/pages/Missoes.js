import React, { useState } from 'react';
import { FaCheckCircle, FaLock, FaArrowRight } from 'react-icons/fa';

const missoes = [
  {
    titulo: 'Resolver desafios de matemática do 7º ano',
    status: 'em andamento',
    descricao: 'Complete 5 exercícios para desbloquear a próxima missão.',
    cor: '#ffd600',
    icone: <FaCheckCircle color="#388e3c" size={28} />,
    feedback: 'Parabéns! Você está avançando na matemática!'
  },
  {
    titulo: 'Explorar a história do Brasil em Realidade Aumentada',
    status: 'bloqueada',
    descricao: 'Desbloqueie completando a missão anterior.',
    cor: '#bdbdbd',
    icone: <FaLock color="#757575" size={28} />,
    feedback: 'Continue! Você está perto de desbloquear esta missão.'
  },
  {
    titulo: 'Jogo de ciências sobre ecossistemas locais',
    status: 'bloqueada',
    descricao: 'Desbloqueie completando a missão anterior.',
    cor: '#bdbdbd',
    icone: <FaLock color="#757575" size={28} />,
    feedback: 'Complete as missões anteriores para liberar esta!'
  }
];

export default function Missoes() {
  const [index, setIndex] = useState(0);
  const missao = missoes[index];

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ color: '#1a237e', marginBottom: 24 }}>Minhas Missões</h2>
      <div style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 24px rgba(26,35,126,0.08)',
        padding: 32,
        marginBottom: 24,
        transition: 'box-shadow 0.3s',
        minHeight: 220
      }}>
        <div style={{ marginBottom: 12 }}>{missao.icone}</div>
        <div style={{ fontSize: 22, fontWeight: 600, color: missao.status === 'em andamento' ? '#388e3c' : '#757575' }}>{missao.titulo}</div>
        <div style={{ fontSize: 16, color: '#333', margin: '12px 0' }}>{missao.descricao}</div>
        <div style={{ fontSize: 15, color: '#3949ab', marginTop: 16 }}>{missao.feedback}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        {missoes.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              border: 'none',
              background: i === index ? '#ffd600' : '#bdbdbd',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            aria-label={`Selecionar missão ${i + 1}`}
          />
        ))}
      </div>
      <div style={{ marginTop: 32, fontSize: 16, color: '#1a237e', fontWeight: 500 }}>
        Complete missões para ganhar recompensas e subir no ranking!
      </div>
      <div style={{ marginTop: 16 }}>
        <button style={{
          background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 32px',
          fontSize: 17,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(26,35,126,0.08)',
          transition: 'background 0.2s'
        }}>
          Continuar Missão <FaArrowRight style={{ marginLeft: 8 }} />
        </button>
      </div>
    </div>
  );
} 