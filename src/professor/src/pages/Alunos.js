import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaTrophy, 
  FaChartLine,
  FaUserGraduate,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

export default function Alunos({ professor }) {
  const [filtro, setFiltro] = useState('');
  const [filtroNivel, setFiltroNivel] = useState('todos');
  const [ordenacao, setOrdenacao] = useState('nome');

  // Dados simulados dos alunos
  const alunos = [
    {
      id: 1,
      nome: 'João Silva',
      avatar: '👦',
      email: 'joao.silva@email.com',
      turma: '5º Ano A',
      pontos: 245,
      nivel: '🦁 Leão Vermelho',
      ultimaAtividade: '2 horas atrás',
      status: 'ativo',
      desempenho: {
        matematica: 8.5,
        portugues: 7.8,
        ciencias: 9.2,
        historia: 6.5,
        geografia: 8.1,
        cidadania: 8.7
      },
      missoesCompletas: 23,
      tempoTotal: '45h 30min'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      avatar: '👧',
      email: 'maria.santos@email.com',
      turma: '5º Ano A',
      pontos: 198,
      nivel: '🦅 Águia Dourada',
      ultimaAtividade: '1 hora atrás',
      status: 'ativo',
      desempenho: {
        matematica: 9.1,
        portugues: 8.3,
        ciencias: 8.7,
        historia: 7.8,
        geografia: 8.9,
        cidadania: 9.0
      },
      missoesCompletas: 19,
      tempoTotal: '38h 15min'
    },
    {
      id: 3,
      nome: 'Pedro Costa',
      avatar: '👦',
      email: 'pedro.costa@email.com',
      turma: '5º Ano A',
      pontos: 187,
      nivel: '🦅 Águia Dourada',
      ultimaAtividade: '30 min atrás',
      status: 'ativo',
      desempenho: {
        matematica: 7.2,
        portugues: 8.9,
        ciencias: 7.8,
        historia: 8.1,
        geografia: 7.5,
        cidadania: 8.3
      },
      missoesCompletas: 17,
      tempoTotal: '32h 45min'
    },
    {
      id: 4,
      nome: 'Ana Oliveira',
      avatar: '👧',
      email: 'ana.oliveira@email.com',
      turma: '5º Ano A',
      pontos: 156,
      nivel: '🦋 Borboleta Roxa',
      ultimaAtividade: '3 horas atrás',
      status: 'ativo',
      desempenho: {
        matematica: 6.8,
        portugues: 7.5,
        ciencias: 8.2,
        historia: 6.9,
        geografia: 7.1,
        cidadania: 7.8
      },
      missoesCompletas: 14,
      tempoTotal: '28h 20min'
    },
    {
      id: 5,
      nome: 'Carlos Lima',
      avatar: '👦',
      email: 'carlos.lima@email.com',
      turma: '5º Ano A',
      pontos: 134,
      nivel: '🦋 Borboleta Roxa',
      ultimaAtividade: '1 dia atrás',
      status: 'inativo',
      desempenho: {
        matematica: 5.9,
        portugues: 6.2,
        ciencias: 7.1,
        historia: 5.5,
        geografia: 6.8,
        cidadania: 6.1
      },
      missoesCompletas: 11,
      tempoTotal: '22h 10min'
    }
  ];

  // Filtros e ordenação
  const alunosFiltrados = alunos
    .filter(aluno => 
      aluno.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      aluno.email.toLowerCase().includes(filtro.toLowerCase())
    )
    .filter(aluno => 
      filtroNivel === 'todos' || 
      (filtroNivel === 'ativo' && aluno.status === 'ativo') ||
      (filtroNivel === 'inativo' && aluno.status === 'inativo')
    )
    .sort((a, b) => {
      switch (ordenacao) {
        case 'nome':
          return a.nome.localeCompare(b.nome);
        case 'pontos':
          return b.pontos - a.pontos;
        case 'ultimaAtividade':
          return new Date(b.ultimaAtividade) - new Date(a.ultimaAtividade);
        default:
          return 0;
      }
    });

  const getStatusColor = (status) => {
    return status === 'ativo' ? '#4CAF50' : '#F44336';
  };

  const getMediaGeral = (desempenho) => {
    const valores = Object.values(desempenho);
    return (valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(1);
  };

  const AlunoCard = ({ aluno }) => {
    const [expandido, setExpandido] = useState(false);
    const mediaGeral = getMediaGeral(aluno.desempenho);

    return (
      <div style={{
        background: 'white',
        borderRadius: 15,
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0',
        marginBottom: 15,
        transition: 'all 0.3s ease',
        maxWidth: '100%'
      }}>
        {/* Cabeçalho do card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <div style={{ fontSize: 32 }}>{aluno.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
              <h3 style={{ margin: 0, color: '#1a237e', fontSize: 18 }}>
                {aluno.nome}
              </h3>
              <div style={{
                background: getStatusColor(aluno.status),
                color: 'white',
                padding: '2px 8px',
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 600
              }}>
                {aluno.status}
              </div>
            </div>
            <div style={{ color: '#666', fontSize: 14, marginBottom: 5 }}>
              {aluno.email}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15, fontSize: 14 }}>
              <span style={{ color: '#1a237e', fontWeight: 600 }}>
                {aluno.pontos} pts
              </span>
              <span style={{ color: '#666' }}>
                {aluno.nivel}
              </span>
              <span style={{ color: '#666' }}>
                Média: {mediaGeral}/10
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setExpandido(!expandido)}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              {expandido ? 'Ocultar' : 'Detalhes'}
            </button>
            <button
              style={{
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              <FaEdit />
            </button>
          </div>
        </div>

        {/* Conteúdo expandido */}
        {expandido && (
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #f0f0f0' }}>
            {/* Estatísticas rápidas */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: 15, 
              marginBottom: 20 
            }}>
              <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: 10 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1a237e' }}>
                  {aluno.missoesCompletas}
                </div>
                <div style={{ fontSize: 12, color: '#666' }}>Missões</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: 10 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1a237e' }}>
                  {aluno.tempoTotal}
                </div>
                <div style={{ fontSize: 12, color: '#666' }}>Tempo Total</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: 10 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1a237e' }}>
                  {mediaGeral}
                </div>
                <div style={{ fontSize: 12, color: '#666' }}>Média Geral</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: 10 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1a237e' }}>
                  {aluno.ultimaAtividade}
                </div>
                <div style={{ fontSize: 12, color: '#666' }}>Última Atividade</div>
              </div>
            </div>

            {/* Desempenho por matéria */}
            <div>
              <h4 style={{ margin: '0 0 15px 0', color: '#1a237e' }}>
                📊 Desempenho por Matéria
              </h4>
              <div style={{ display: 'grid', gap: 10 }}>
                {Object.entries(aluno.desempenho).map(([materia, nota]) => (
                  <div key={materia} style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                    <div style={{ 
                      width: 80, 
                      fontWeight: 600, 
                      textTransform: 'capitalize',
                      fontSize: 14
                    }}>
                      {materia}
                    </div>
                    <div style={{
                      flex: 1,
                      height: 8,
                      background: '#f0f0f0',
                      borderRadius: 4,
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${nota * 10}%`,
                        height: '100%',
                        background: nota >= 8 ? '#4CAF50' : nota >= 6 ? '#FF9800' : '#F44336',
                        borderRadius: 4
                      }} />
                    </div>
                    <div style={{ 
                      width: 40, 
                      textAlign: 'right',
                      fontWeight: 600,
                      color: nota >= 8 ? '#4CAF50' : nota >= 6 ? '#FF9800' : '#F44336'
                    }}>
                      {nota}/10
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: 'clamp(10px, 4vw, 30px)' }}>
      {/* Header com filtros */}
      <div style={{
        background: 'white',
        borderRadius: 15,
        padding: 'clamp(12px, 3vw, 25px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0',
        marginBottom: 'clamp(16px, 4vw, 25px)',
        maxWidth: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: '#1a237e' }}>
            👥 Gerenciar Alunos ({alunosFiltrados.length})
          </h2>
          <button style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '12px 20px',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <FaPlus />
            Adicionar Aluno
          </button>
        </div>

        {/* Filtros */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 20 }}>
          {/* Busca */}
          <div style={{ position: 'relative' }}>
            <FaSearch style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666'
            }} />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                border: '2px solid #e0e0e0',
                borderRadius: 10,
                fontSize: 14,
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Filtro de status */}
          <select
            value={filtroNivel}
            onChange={(e) => setFiltroNivel(e.target.value)}
            style={{
              padding: '12px',
              border: '2px solid #e0e0e0',
              borderRadius: 10,
              fontSize: 14,
              background: 'white'
            }}
          >
            <option value="todos">Todos os status</option>
            <option value="ativo">Ativos</option>
            <option value="inativo">Inativos</option>
          </select>

          {/* Ordenação */}
          <select
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            style={{
              padding: '12px',
              border: '2px solid #e0e0e0',
              borderRadius: 10,
              fontSize: 14,
              background: 'white'
            }}
          >
            <option value="nome">Ordenar por Nome</option>
            <option value="pontos">Ordenar por Pontos</option>
            <option value="ultimaAtividade">Ordenar por Atividade</option>
          </select>
        </div>
      </div>

      {/* Lista de alunos */}
      <div style={{ display: 'grid', gap: 'clamp(10px, 3vw, 20px)' }}>
        {alunosFiltrados.length > 0 ? (
          alunosFiltrados.map(aluno => (
            <AlunoCard key={aluno.id} aluno={aluno} />
          ))
        ) : (
          <div style={{
            background: 'white',
            borderRadius: 15,
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0'
          }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>👥</div>
            <h3 style={{ color: '#1a237e', marginBottom: 10 }}>
              Nenhum aluno encontrado
            </h3>
            <p style={{ color: '#666' }}>
              Tente ajustar os filtros de busca ou adicionar novos alunos.
            </p>
          </div>
        )}
      </div>

      {/* Estatísticas da turma */}
      <div style={{ marginTop: 'clamp(16px, 4vw, 30px)' }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 15,
          padding: 'clamp(12px, 3vw, 25px)',
          color: 'white',
          maxWidth: '100%'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: 'clamp(15px, 4vw, 20px)' }}>
            📈 Resumo da Turma
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'clamp(8px, 2vw, 20px)' }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 5 }}>
                {alunos.length}
              </div>
              <div style={{ opacity: 0.9 }}>Total de Alunos</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 5 }}>
                {alunos.filter(a => a.status === 'ativo').length}
              </div>
              <div style={{ opacity: 0.9 }}>Alunos Ativos</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 5 }}>
                {(alunos.reduce((acc, aluno) => acc + aluno.pontos, 0) / alunos.length).toFixed(0)}
              </div>
              <div style={{ opacity: 0.9 }}>Média de Pontos</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 5 }}>
                {alunos.reduce((acc, aluno) => acc + aluno.missoesCompletas, 0)}
              </div>
              <div style={{ opacity: 0.9 }}>Missões Completas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 