import React from 'react';
import { FaMedal, FaCoins, FaTrophy } from 'react-icons/fa';

export default function Recompensas() {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ color: '#1a237e', marginBottom: 24 }}>Recompensas</h2>
      <div style={{ fontSize: 22, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <FaCoins color="#ffd600" size={28} className="coin-spin" />
        <strong>Moedas:</strong> 120
      </div>
      <div style={{ fontSize: 20, marginBottom: 16 }}>
        <strong>Conquistas:</strong>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ margin: '8px 0' }}><FaMedal color="#ffd600" /> Matemático Iniciante</li>
          <li style={{ margin: '8px 0' }}><FaMedal color="#ffd600" /> Explorador da História</li>
        </ul>
      </div>
      <div style={{ fontSize: 20, marginBottom: 8 }}>
        <strong>Ranking:</strong>
      </div>
      <ol style={{ fontSize: 18, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(26,35,126,0.08)', padding: 16, display: 'inline-block' }}>
        <li><FaTrophy color="#ffd600" /> João (Você) - 120 pts</li>
        <li>Maria - 100 pts</li>
        <li>Carlos - 80 pts</li>
      </ol>
      <style>{`
        .coin-spin {
          animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 