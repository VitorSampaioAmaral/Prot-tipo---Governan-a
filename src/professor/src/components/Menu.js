import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaGraduationCap,
  FaClipboardList,
  FaLightbulb,
  FaBookOpen,
  FaUserGraduate
} from 'react-icons/fa';

export default function Menu({ professor }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Dashboard', desc: 'Visão geral da turma' },
    { path: '/alunos', icon: FaUsers, label: 'Alunos', desc: 'Gerenciar estudantes' },
    { path: '/desempenho', icon: FaChartBar, label: 'Desempenho', desc: 'Relatórios e análises' },
    { path: '/conteudo', icon: FaBookOpen, label: 'Conteúdo', desc: 'Curadoria de materiais' },
    { path: '/missoes', icon: FaLightbulb, label: 'Missões', desc: 'Criar desafios' },
    { path: '/trilhas', icon: FaGraduationCap, label: 'Trilhas', desc: 'Sequências de aprendizado' },
    { path: '/recompensas', icon: FaClipboardList, label: 'Recompensas', desc: 'Sistema de gamificação' },
    { path: '/configuracoes', icon: FaCog, label: 'Configurações', desc: 'Preferências da turma' }
  ];

  const itemAtivo = menuItems.find(item => item.path === location.pathname);

  return (
    <>
      {/* Menu mobile toggle */}
      <div style={{ 
        position: 'fixed', 
        top: 20, 
        left: 20, 
        zIndex: 1000,
        display: 'none',
        '@media (max-width: 768px)': { display: 'block' }
      }}>
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '50%',
            width: 50,
            height: 50,
            color: 'white',
            fontSize: 20,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {menuAberto ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Overlay para mobile */}
      {menuAberto && (
        <div 
          onClick={() => setMenuAberto(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
        />
      )}

      {/* Menu lateral */}
      <div style={{
        position: 'fixed',
        left: menuAberto ? 0 : '-300px',
        top: 0,
        width: 300,
        height: '100vh',
        background: 'linear-gradient(180deg, #1a237e 0%, #3949ab 50%, #5c6bc0 100%)',
        color: 'white',
        zIndex: 1000,
        transition: 'left 0.3s ease',
        boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
        overflowY: 'auto'
      }}>
        {/* Header do menu */}
        <div style={{ 
          padding: '30px 20px', 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
            👨‍🏫 ProFuturo
          </div>
          <div style={{ fontSize: 14, opacity: 0.8 }}>
            Área do Professor
          </div>
          {professor && (
            <div style={{ 
              marginTop: 15, 
              padding: '10px', 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: 8,
              fontSize: 14
            }}>
              <div style={{ fontWeight: 600 }}>{professor.nome}</div>
              <div style={{ opacity: 0.8 }}>{professor.turma}</div>
            </div>
          )}
        </div>

        {/* Itens do menu */}
        <nav style={{ padding: '20px 0' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const ativo = location.pathname === item.path;
            
            return (
              <div
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMenuAberto(false);
                }}
                style={{
                  padding: '15px 25px',
                  cursor: 'pointer',
                  background: ativo ? 'rgba(255,255,255,0.15)' : 'transparent',
                  borderLeft: ativo ? '4px solid #ffd600' : '4px solid transparent',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15,
                  ':hover': {
                    background: 'rgba(255,255,255,0.1)'
                  }
                }}
                onMouseEnter={(e) => {
                  if (!ativo) e.target.style.background = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  if (!ativo) e.target.style.background = 'transparent';
                }}
              >
                <Icon style={{ 
                  fontSize: 20, 
                  color: ativo ? '#ffd600' : 'rgba(255,255,255,0.8)' 
                }} />
                <div>
                  <div style={{ 
                    fontWeight: ativo ? 600 : 400,
                    color: ativo ? '#ffd600' : 'white'
                  }}>
                    {item.label}
                  </div>
                  <div style={{ 
                    fontSize: 12, 
                    opacity: 0.7,
                    marginTop: 2
                  }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer do menu */}
        <div style={{ 
          padding: '20px', 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          marginTop: 'auto'
        }}>
          <button
            onClick={() => {
              // Logout logic here
              navigate('/login');
            }}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8,
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition: 'all 0.2s ease',
              ':hover': {
                background: 'rgba(255,255,255,0.2)'
              }
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
          >
            <FaSignOutAlt />
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo principal com margem para o menu */}
      <div style={{ 
        marginLeft: 300,
        minHeight: '100vh',
        background: '#f5f7fa',
        '@media (max-width: 768px)': { marginLeft: 0 }
      }}>
        {/* Header da página */}
        <header style={{
          background: 'white',
          padding: '20px 30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ 
                margin: 0, 
                color: '#1a237e', 
                fontSize: 28,
                fontWeight: 700
              }}>
                {itemAtivo ? itemAtivo.label : 'Dashboard'}
              </h1>
              <p style={{ 
                margin: '5px 0 0 0', 
                color: '#666', 
                fontSize: 16 
              }}>
                {itemAtivo ? itemAtivo.desc : 'Visão geral da turma'}
              </p>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 15 
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 600
              }}>
                {professor?.turma || 'Turma A'}
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
} 