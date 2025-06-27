import React from 'react';
import { FaSave, FaCog, FaUsers, FaBell, FaShieldAlt } from 'react-icons/fa';

export default function Configuracoes({ professor }) {
  return (
    <div style={{ padding: 'clamp(10px, 4vw, 30px)' }}>
      <div style={{
        background: 'white',
        borderRadius: 15,
        padding: 'clamp(12px, 3vw, 25px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0',
        maxWidth: '100%'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 'clamp(6px, 2vw, 20px)' }}>
          <h2 style={{ margin: 0, color: '#1a237e', fontSize: 'clamp(16px, 4vw, 22px)' }}>
            ⚙️ Configurações da Turma
          </h2>
          <button style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)',
            cursor: 'pointer',
            fontSize: 'clamp(13px, 3vw, 14px)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: '100%',
            maxWidth: 220
          }}>
            <FaSave />
            Salvar Alterações
          </button>
        </div>

        <div style={{ display: 'grid', gap: 'clamp(10px, 3vw, 20px)' }}>
          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: 10 }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333', display: 'flex', alignItems: 'center', gap: 10 }}>
              <FaUsers />
              Informações da Turma
            </h3>
            <div style={{ display: 'grid', gap: 15 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Nome da Turma</label>
                <input 
                  type="text" 
                  defaultValue="5º Ano A" 
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: 5 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Descrição</label>
                <textarea 
                  defaultValue="Turma do 5º ano do ensino fundamental"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: 5, height: 80 }}
                />
              </div>
            </div>
          </div>

          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: 10 }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333', display: 'flex', alignItems: 'center', gap: 10 }}>
              <FaBell />
              Notificações
            </h3>
            <div style={{ display: 'grid', gap: 10 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" defaultChecked />
                Receber notificações de atividades dos alunos
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" defaultChecked />
                Alertas de baixo desempenho
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" />
                Relatórios semanais automáticos
              </label>
            </div>
          </div>

          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: 10 }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333', display: 'flex', alignItems: 'center', gap: 10 }}>
              <FaShieldAlt />
              Privacidade e Segurança
            </h3>
            <div style={{ display: 'grid', gap: 10 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" defaultChecked />
                Permitir que alunos vejam o ranking da turma
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" defaultChecked />
                Compartilhar progresso com pais/responsáveis
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" />
                Modo de avaliação anônima
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 