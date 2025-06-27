import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaTasks, FaUserCircle, FaMapSigns, FaChartLine } from 'react-icons/fa';

export default function Home({ aluno }) {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 32 }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 18,
        color: 'white',
        padding: 32,
        textAlign: 'center',
        marginBottom: 32,
        boxShadow: '0 4px 24px rgba(26,35,126,0.10)'
      }}>
        <h2 style={{ fontWeight: 800, fontSize: 28, marginBottom: 8 }}>
          Olá{aluno && aluno.nome ? `, ${aluno.nome}` : ''}! 👋
        </h2>
        <div style={{ fontSize: 18, marginBottom: 8 }}>
          Bem-vindo(a) à sua jornada ProFuturo!
        </div>
        <div style={{ fontSize: 15, opacity: 0.9 }}>
          Continue aprendendo, completando desafios e conquistando novas missões!
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 18 }}>
        <CardHome
          icon={<FaTrophy size={32} color="#FFD600" />}
          title="Desafios"
          desc="Testar conhecimentos"
          onClick={() => navigate('/aluno/desafios')}
        />
        <CardHome
          icon={<FaTasks size={32} color="#4CAF50" />}
          title="Missões"
          desc="Conquiste recompensas"
          onClick={() => navigate('/aluno/missoes')}
        />
        <CardHome
          icon={<FaMapSigns size={32} color="#2196F3" />}
          title="Trilha"
          desc="Veja seu progresso"
          onClick={() => navigate('/aluno/trilha')}
        />
        <CardHome
          icon={<FaUserCircle size={32} color="#764ba2" />}
          title="Perfil"
          desc="Suas conquistas"
          onClick={() => navigate('/aluno/perfil')}
        />
      </div>
      <div style={{ marginTop: 36, textAlign: 'center', color: '#1a237e', fontWeight: 600, fontSize: 17 }}>
        <FaChartLine style={{ marginRight: 8, color: '#4CAF50' }} />
        Continue avançando! Cada desafio completado te leva mais longe.
      </div>
    </div>
  );
}

function CardHome({ icon, title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: '#fff',
        border: 'none',
        borderRadius: 14,
        boxShadow: '0 2px 12px rgba(26,35,126,0.08)',
        padding: 24,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        fontSize: 16,
        fontWeight: 600
      }}
    >
      {icon}
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{title}</div>
      <div style={{ fontSize: 14, color: '#666', fontWeight: 400 }}>{desc}</div>
    </button>
  );
} 