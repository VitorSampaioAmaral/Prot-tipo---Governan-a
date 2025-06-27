import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Login({ setAluno }) {
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    if (!nome.trim()) {
      setErro('Digite seu nome para entrar!');
      return;
    }
    setAluno({ nome });
    // Não navegue aqui!
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(26,35,126,0.08)', padding: 32, textAlign: 'center' }}>
      <FaSignInAlt color="#1a237e" size={48} style={{ marginBottom: 16 }} />
      <h2 style={{ color: '#1a237e', marginBottom: 24 }}>Login do Aluno</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          style={{ width: '100%', padding: 12, fontSize: 18, borderRadius: 8, border: '1px solid #c5cae9', marginBottom: 16 }}
        />
        <button type="submit" style={{ width: '100%', background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 18, fontWeight: 600, cursor: 'pointer' }}>
          Entrar
        </button>
        {erro && <div style={{ color: '#d32f2f', marginTop: 12 }}>{erro}</div>}
      </form>
    </div>
  );
} 