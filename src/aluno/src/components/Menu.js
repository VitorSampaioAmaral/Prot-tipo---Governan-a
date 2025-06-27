import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTasks, FaQuestion, FaClipboardList, FaPlug, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const menuStyle = {
  width: '220px',
  background: 'rgba(26,35,126,0.95)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 0',
  minHeight: '100vh',
  fontFamily: 'Poppins, Arial, sans-serif',
  boxShadow: '2px 0 16px rgba(26,35,126,0.08)'
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '16px 32px',
  fontSize: '18px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  borderLeft: '4px solid transparent',
  transition: 'background 0.2s, border-color 0.2s',
};

const activeStyle = {
  background: 'rgba(57,73,171,0.95)',
  borderLeft: '4px solid #ffd600',
  borderRadius: '0 20px 20px 0',
};

export default function Menu({ aluno, offline, setOffline }) {
  const navigate = useNavigate();
  return (
    <nav style={menuStyle}>
      <div style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 32, textAlign: 'center', letterSpacing: 1 }}>
        ProFuturo
      </div>
      <NavLink to="/desafios" style={linkStyle} activeStyle={activeStyle}>
        <FaTasks /> Acessar Desafios
      </NavLink>
      <NavLink to="/relatorio" style={linkStyle} activeStyle={activeStyle}>
        <FaClipboardList /> Relatório Professor
      </NavLink>
      <NavLink to="/offlinebox" style={linkStyle} activeStyle={activeStyle}>
        <FaPlug /> OfflineBox
      </NavLink>
      <button
        onClick={() => setOffline(o => !o)}
        style={{ ...linkStyle, background: offline ? '#ffd600' : 'transparent', color: offline ? '#1a237e' : '#fff', margin: '16px 32px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}
      >
        {offline ? 'Modo Offline Ativo' : 'Ativar Modo Offline'}
      </button>
      <div style={{ flex: 1 }} />
      {aluno ? (
        <button
          onClick={() => { window.location.href = '/login'; }}
          style={{ ...linkStyle, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
        >
          <FaSignOutAlt /> Sair
        </button>
      ) : (
        <NavLink to="/login" style={linkStyle} activeStyle={activeStyle}>
          <FaSignInAlt /> Login
        </NavLink>
      )}
    </nav>
  );
} 