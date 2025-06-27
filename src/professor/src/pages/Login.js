import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGraduationCap, FaArrowRight, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

export default function Login({ setProfessor }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    turma: ''
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [etapa, setEtapa] = useState(0); // 0: turma, 1: email, 2: senha, 3: resumo

  const turmas = [
    'Turma A - 5º Ano',
    'Turma B - 6º Ano', 
    'Turma C - 7º Ano',
    'Turma D - 8º Ano',
    'Turma E - 9º Ano'
  ];

  const avancar = () => {
    setErro('');
    if (etapa === 0 && !formData.turma) {
      setErro('Selecione uma turma.');
      return;
    }
    if (etapa === 1 && !formData.email) {
      setErro('Digite seu email.');
      return;
    }
    if (etapa === 2 && !formData.senha) {
      setErro('Digite sua senha.');
      return;
    }
    setEtapa(e => e + 1);
  };

  const voltar = () => {
    setErro('');
    setEtapa(e => Math.max(0, e - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    setTimeout(() => {
      if (formData.email && formData.senha && formData.turma) {
        const professor = {
          id: 1,
          nome: 'Prof. Maria Silva',
          email: formData.email,
          turma: formData.turma,
          avatar: '👩‍🏫'
        };
        localStorage.setItem('professor', JSON.stringify(professor));
        setProfessor(professor);
        navigate('/professor/dashboard');
      } else {
        setErro('Preencha todos os campos.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: 16,
        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
        padding: '24px',
        width: '100%',
        maxWidth: 340,
        textAlign: 'center',
        minWidth: 0
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 18 }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: 54,
            height: 54,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px',
            fontSize: 22
          }}>
            👨‍🏫
          </div>
          <h1 style={{
            color: '#1a237e',
            margin: 0,
            fontSize: 20,
            fontWeight: 700
          }}>
            ProFuturo
          </h1>
          <p style={{
            color: '#666',
            margin: '3px 0 0 0',
            fontSize: 13
          }}>
            Área do Professor
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          {/* Etapa 0: Turma */}
          {etapa === 0 && (
            <>
              <label style={{
                display: 'block',
                marginBottom: 6,
                color: '#333',
                fontWeight: 600,
                fontSize: 13
              }}>
                <FaGraduationCap style={{ marginRight: 6 }} />
                Turma
              </label>
              <select
                value={formData.turma}
                onChange={e => setFormData({ ...formData, turma: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 14,
                  marginBottom: 14,
                  background: 'white'
                }}
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              >
                <option value="">Selecione sua turma</option>
                {turmas.map((turma, index) => (
                  <option key={index} value={turma}>{turma}</option>
                ))}
              </select>
              {erro && <div style={{ color: '#c62828', fontSize: 13, marginBottom: 10 }}>{erro}</div>}
              <button type="button" onClick={avancar} style={btnAvancarStyle}>
                Próximo <FaArrowRight style={{ marginLeft: 6 }} />
              </button>
            </>
          )}

          {/* Etapa 1: Email */}
          {etapa === 1 && (
            <>
              <label style={{
                display: 'block',
                marginBottom: 6,
                color: '#333',
                fontWeight: 600,
                fontSize: 13
              }}>
                <FaUser style={{ marginRight: 6 }} />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 14,
                  marginBottom: 14
                }}
                placeholder="seu@email.com"
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
              {erro && <div style={{ color: '#c62828', fontSize: 13, marginBottom: 10 }}>{erro}</div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <button type="button" onClick={voltar} style={btnVoltarStyle}>
                  <FaArrowLeft style={{ marginRight: 6 }} /> Voltar
                </button>
                <button type="button" onClick={avancar} style={btnAvancarStyle}>
                  Próximo <FaArrowRight style={{ marginLeft: 6 }} />
                </button>
              </div>
            </>
          )}

          {/* Etapa 2: Senha */}
          {etapa === 2 && (
            <>
              <label style={{
                display: 'block',
                marginBottom: 6,
                color: '#333',
                fontWeight: 600,
                fontSize: 13
              }}>
                <FaLock style={{ marginRight: 6 }} />
                Senha
              </label>
              <div style={{ position: 'relative', marginBottom: 14 }}>
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={formData.senha}
                  onChange={e => setFormData({ ...formData, senha: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    paddingRight: '38px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14
                  }}
                  placeholder="••••••••"
                  onFocus={e => e.target.style.borderColor = '#667eea'}
                  onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  style={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {erro && <div style={{ color: '#c62828', fontSize: 13, marginBottom: 10 }}>{erro}</div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <button type="button" onClick={voltar} style={btnVoltarStyle}>
                  <FaArrowLeft style={{ marginRight: 6 }} /> Voltar
                </button>
                <button type="button" onClick={avancar} style={btnAvancarStyle}>
                  Próximo <FaArrowRight style={{ marginLeft: 6 }} />
                </button>
              </div>
            </>
          )}

          {/* Etapa 3: Resumo e login */}
          {etapa === 3 && (
            <>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <FaCheckCircle style={{ color: '#4CAF50', fontSize: 32, marginBottom: 6 }} />
                <div style={{ fontWeight: 600, color: '#1a237e', fontSize: 16, marginBottom: 2 }}>Confirme seus dados</div>
                <div style={{ fontSize: 13, color: '#333', marginBottom: 6 }}>
                  <strong>Turma:</strong> {formData.turma}<br />
                  <strong>Email:</strong> {formData.email}
                </div>
              </div>
              {erro && <div style={{ color: '#c62828', fontSize: 13, marginBottom: 10 }}>{erro}</div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <button type="button" onClick={voltar} style={btnVoltarStyle}>
                  <FaArrowLeft style={{ marginRight: 6 }} /> Voltar
                </button>
                <button type="submit" disabled={loading} style={btnAvancarStyle}>
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </div>
            </>
          )}
        </form>

        {/* Informações adicionais */}
        <div style={{
          marginTop: 18,
          padding: '12px',
          background: '#f8f9fa',
          borderRadius: 8,
          fontSize: 12,
          color: '#666'
        }}>
          <p style={{ margin: '0 0 6px 0' }}>
            <strong>Dados de teste:</strong>
          </p>
          <p style={{ margin: '3px 0', fontSize: 11 }}>
            Email: professor@profuturo.com
          </p>
          <p style={{ margin: '3px 0', fontSize: 11 }}>
            Senha: 123456
          </p>
        </div>
      </div>
    </div>
  );
}

const btnAvancarStyle = {
  width: '100%',
  padding: '10px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.18)'
};

const btnVoltarStyle = {
  width: '100%',
  padding: '10px',
  background: '#e0e0e0',
  color: '#333',
  border: 'none',
  borderRadius: 8,
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease'
}; 