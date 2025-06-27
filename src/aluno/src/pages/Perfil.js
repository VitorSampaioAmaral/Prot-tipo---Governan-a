import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

export default function Perfil() {
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(26,35,126,0.08)', padding: 32, marginBottom: 24 }}>
        <FaUserCircle color="#1a237e" size={64} style={{ marginBottom: 16 }} />
        <h2 style={{ color: '#1a237e', marginBottom: 8 }}>João Silva</h2>
        <div style={{ fontSize: 18, marginBottom: 8 }}><strong>Idade:</strong> 13 anos</div>
        <div style={{ fontSize: 18, marginBottom: 8 }}><strong>Escola:</strong> Escola Municipal do Interior do Pará</div>
        <div style={{ fontSize: 18, marginBottom: 8 }}><strong>Turma:</strong> 7º ano</div>
        <div style={{ fontSize: 18, marginBottom: 8 }}><strong>Missões concluídas:</strong> 1</div>
        <div style={{ fontSize: 18, marginBottom: 8 }}><strong>Recompensas:</strong> 2 conquistas</div>
      </div>
      <div style={{ fontSize: 16, color: '#388e3c', fontWeight: 500 }}>
        Parabéns, João! Continue se dedicando e conquiste novas missões!
      </div>
    </div>
  );
} 