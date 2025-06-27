import React from 'react';
import { FaRocket, FaQuestion } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Missao({ aluno, offline }) {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(26,35,126,0.08)', padding: 40, textAlign: 'center' }}>
      <h2 style={{ color: '#1a237e', marginBottom: 16 }}><FaRocket color="#ffd600" /> Aventuras no Sistema Solar</h2>
      <p style={{ fontSize: 18, color: '#333', marginBottom: 24 }}>
        Olá, <b>{aluno?.nome || 'aluno'}</b>! Prepare-se para uma jornada incrível pelos planetas do Sistema Solar.<br />
        Descubra curiosidades e complete desafios para ganhar recompensas!
      </p>
      <div style={{ margin: '32px 0' }}>
        <button
          disabled={offline}
          style={{
            background: offline ? '#bdbdbd' : 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '16px 32px',
            fontSize: 20,
            fontWeight: 600,
            cursor: offline ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px rgba(26,35,126,0.08)',
            transition: 'background 0.2s'
          }}
          onClick={() => navigate('/desafio')}
        >
          <FaQuestion style={{ marginRight: 8 }} /> Iniciar Quiz
        </button>
      </div>
      <div style={{ fontSize: 16, color: '#388e3c', fontWeight: 500 }}>
        Complete a missão para desbloquear novos desafios!
      </div>
    </div>
  );
} 