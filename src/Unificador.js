import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unificador() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }}>
      <div style={{
        background: 'white',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        padding: '36px 28px',
        maxWidth: 350,
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: '#1a237e',
          fontWeight: 800,
          fontSize: 28,
          marginBottom: 10
        }}>
          ProFuturo
        </h1>
        <p style={{ color: '#666', fontSize: 15, marginBottom: 30 }}>
          Escolha como deseja acessar a plataforma:
        </p>
        <button
          onClick={() => navigate('/professor/login')}
          style={btnStyle('#667eea')}
        >
          👩‍🏫 Área do Professor
        </button>
        <button
          onClick={() => navigate('/aluno/login')}
          style={btnStyle('#4CAF50')}
        >
          👦 Área do Aluno
        </button>
        <button
          onClick={() => window.open('/offlinebox', '_blank')}
          style={btnStyle('#FF9800')}
        >
          📦 OfflineBox
        </button>
      </div>
    </div>
  );
}

function btnStyle(color) {
  return {
    width: '100%',
    padding: '14px',
    margin: '10px 0',
    background: color,
    color: 'white',
    border: 'none',
    borderRadius: 8,
    fontSize: 17,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
  };
} 