import React, { useEffect, useState } from 'react';
import { FaChartLine } from 'react-icons/fa';

export default function Trilha() {
  const [progresso, setProgresso] = useState(0);
  useEffect(() => {
    setTimeout(() => setProgresso(40), 400);
  }, []);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ color: '#1a237e', marginBottom: 24 }}><FaChartLine /> Trilha de Aprendizagem</h2>
      <div style={{ fontSize: 18, marginBottom: 16 }}>
        <strong>Progresso:</strong>
        <div style={{ background: '#c5cae9', borderRadius: 8, width: 300, height: 24, margin: '12px auto', overflow: 'hidden', boxShadow: '0 2px 8px rgba(26,35,126,0.08)' }}>
          <div style={{ background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)', width: progresso + '%', height: '100%', borderRadius: 8, transition: 'width 1s cubic-bezier(.4,2,.6,1)' }}></div>
        </div>
        <span style={{ fontWeight: 600, color: '#2575fc' }}>{progresso}% concluído</span>
      </div>
      <div style={{ fontSize: 16, color: '#388e3c', marginTop: 16, fontWeight: 500 }}>
        Continue! Você está indo muito bem. Próxima missão: Explorar a história do Brasil em Realidade Aumentada
      </div>
    </div>
  );
} 