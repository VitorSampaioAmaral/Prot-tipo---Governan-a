import React, { useState } from 'react';
import { 
  FaChartBar, 
  FaChartLine, 
  FaChartPie, 
  FaDownload, 
  FaCalendar,
  FaFilter,
  FaTrophy,
  FaUsers,
  FaClock,
  FaStar
} from 'react-icons/fa';

export default function Desempenho({ professor }) {
  const [periodo, setPeriodo] = useState('mes');
  const [materia, setMateria] = useState('todas');

  // Dados simulados de desempenho
  const dadosDesempenho = {
    periodo: {
      semana: { alunos: 25, media: 8.1, crescimento: 5.2, missoes: 89 },
      mes: { alunos: 28, media: 8.2, crescimento: 12.5, missoes: 156 },
      trimestre: { alunos: 28, media: 8.4, crescimento: 18.7, missoes: 423 }
    },
    materias: {
      matematica: { media: 8.5, alunos: 22, cor: '#FF5722', tendencia: '+15%' },
      portugues: { media: 7.8, alunos: 25, cor: '#2196F3', tendencia: '+8%' },
      ciencias: { media: 8.9, alunos: 20, cor: '#4CAF50', tendencia: '+22%' },
      historia: { media: 7.2, alunos: 18, cor: '#9C27B0', tendencia: '+5%' },
      geografia: { media: 8.1, alunos: 23, cor: '#FF9800', tendencia: '+12%' },
      cidadania: { media: 8.7, alunos: 26, cor: '#795548', tendencia: '+18%' }
    },
    evolucao: [
      { mes: 'Jan', media: 7.2, missoes: 45 },
      { mes: 'Fev', media: 7.5, missoes: 52 },
      { mes: 'Mar', media: 7.8, missoes: 61 },
      { mes: 'Abr', media: 8.1, missoes: 73 },
      { mes: 'Mai', media: 8.3, missoes: 89 },
      { mes: 'Jun', media: 8.2, missoes: 156 }
    ],
    niveis: [
      { nivel: '🐛 Lagarta Verde', alunos: 3, cor: '#4CAF50' },
      { nivel: '🐸 Sapo Azul', alunos: 5, cor: '#2196F3' },
      { nivel: '🦋 Borboleta Roxa', alunos: 8, cor: '#9C27B0' },
      { nivel: '🦅 Águia Dourada', alunos: 7, cor: '#FFD700' },
      { nivel: '🦁 Leão Vermelho', alunos: 3, cor: '#F44336' },
      { nivel: '🐉 Dragão Prateado', alunos: 1, cor: '#C0C0C0' },
      { nivel: '👑 Fênix Dourada', alunos: 1, cor: '#FFD700' }
    ],
    topAlunos: [
      { nome: 'João Silva', pontos: 245, nivel: '🦁 Leão Vermelho', media: 8.5 },
      { nome: 'Maria Santos', pontos: 198, nivel: '🦅 Águia Dourada', media: 8.3 },
      { nome: 'Pedro Costa', pontos: 187, nivel: '🦅 Águia Dourada', media: 8.1 },
      { nome: 'Ana Oliveira', pontos: 156, nivel: '🦋 Borboleta Roxa', media: 7.8 },
      { nome: 'Carlos Lima', pontos: 134, nivel: '🦋 Borboleta Roxa', media: 7.2 }
    ]
  };

  const Card = ({ titulo, valor, icone, cor, subtitulo, tendencia }) => (
    <div style={{
      background: 'white',
      borderRadius: 15,
      padding: '25px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0',
      transition: 'transform 0.2s ease'
    }}
    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ color: '#666', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            {titulo}
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1a237e', marginBottom: 5 }}>
            {valor}
          </div>
          {subtitulo && (
            <div style={{ fontSize: 14, color: '#666' }}>
              {subtitulo}
            </div>
          )}
          {tendencia && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 5, 
              marginTop: 8,
              color: tendencia.includes('+') ? '#4CAF50' : '#F44336',
              fontSize: 14,
              fontWeight: 600
            }}>
              {tendencia}
            </div>
          )}
        </div>
        <div style={{
          background: `linear-gradient(135deg, ${cor}20, ${cor}40)`,
          color: cor,
          width: 60,
          height: 60,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24
        }}>
          {icone}
        </div>
      </div>
    </div>
  );

  const GraficoEvolucao = () => (
    <div style={{
      background: 'white',
      borderRadius: 15,
      padding: '25px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#1a237e', fontSize: 20 }}>
        📈 Evolução da Turma
      </h3>
      <div style={{ display: 'flex', alignItems: 'end', gap: 20, height: 200, paddingTop: 20 }}>
        {dadosDesempenho.evolucao.map((item, index) => (
          <div key={index} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              height: `${(item.media / 10) * 150}px`,
              borderRadius: '8px 8px 0 0',
              marginBottom: 10,
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: -25,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'white',
                padding: '4px 8px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                color: '#1a237e',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                {item.media}
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#666' }}>
              {item.mes}
            </div>
            <div style={{ fontSize: 12, color: '#999' }}>
              {item.missoes} missões
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const GraficoNiveis = () => (
    <div style={{
      background: 'white',
      borderRadius: 15,
      padding: '25px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#1a237e', fontSize: 20 }}>
        🏆 Distribuição por Níveis
      </h3>
      <div style={{ display: 'grid', gap: 15 }}>
        {dadosDesempenho.niveis.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <div style={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              background: item.cor 
            }} />
            <div style={{ flex: 1, fontSize: 14 }}>
              {item.nivel}
            </div>
            <div style={{ 
              width: 60, 
              textAlign: 'right',
              fontWeight: 600,
              color: '#1a237e'
            }}>
              {item.alunos} alunos
            </div>
            <div style={{
              width: 100,
              height: 8,
              background: '#f0f0f0',
              borderRadius: 4,
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(item.alunos / 28) * 100}%`,
                height: '100%',
                background: item.cor,
                borderRadius: 4
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
            📊 Relatórios de Desempenho
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
            <FaDownload />
            Exportar Relatório
          </button>
        </div>

        {/* Filtros */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>
              <FaCalendar style={{ marginRight: 8 }} />
              Período
            </label>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: 10,
                fontSize: 14,
                background: 'white'
              }}
            >
              <option value="semana">Última Semana</option>
              <option value="mes">Último Mês</option>
              <option value="trimestre">Último Trimestre</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>
              <FaFilter style={{ marginRight: 8 }} />
              Matéria
            </label>
            <select
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: 10,
                fontSize: 14,
                background: 'white'
              }}
            >
              <option value="todas">Todas as Matérias</option>
              <option value="matematica">Matemática</option>
              <option value="portugues">Português</option>
              <option value="ciencias">Ciências</option>
              <option value="historia">História</option>
              <option value="geografia">Geografia</option>
              <option value="cidadania">Cidadania</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards principais */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: 'clamp(10px, 3vw, 25px)', 
        marginBottom: 'clamp(16px, 4vw, 30px)'
      }}>
        <Card 
          titulo="Alunos Ativos"
          valor={dadosDesempenho.periodo[periodo].alunos}
          icone={<FaUsers />}
          cor="#667eea"
          subtitulo="participando ativamente"
        />
        <Card 
          titulo="Média Geral"
          valor={dadosDesempenho.periodo[periodo].media}
          icone={<FaChartLine />}
          cor="#4CAF50"
          subtitulo="da turma"
          tendencia={`+${dadosDesempenho.periodo[periodo].crescimento}%`}
        />
        <Card 
          titulo="Missões Completas"
          valor={dadosDesempenho.periodo[periodo].missoes}
          icone={<FaTrophy />}
          cor="#FF9800"
          subtitulo="no período"
        />
        <Card 
          titulo="Tempo Médio"
          valor="45 min"
          icone={<FaClock />}
          cor="#9C27B0"
          subtitulo="por sessão"
        />
      </div>

      {/* Gráficos */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(10px, 3vw, 30px)', marginBottom: 'clamp(16px, 4vw, 30px)' }}>
        <GraficoEvolucao />
        <GraficoNiveis />
      </div>

      {/* Desempenho por matéria */}
      <div style={{
        background: 'white',
        borderRadius: 15,
        padding: 'clamp(12px, 3vw, 25px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0',
        marginBottom: 'clamp(16px, 4vw, 30px)',
        maxWidth: '100%'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#1a237e', fontSize: 20 }}>
          📚 Desempenho por Matéria
        </h3>
        <div style={{ display: 'grid', gap: 15 }}>
          {Object.entries(dadosDesempenho.materias).map(([materia, dados]) => (
            <div key={materia} style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <div style={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                background: dados.cor 
              }} />
              <div style={{ flex: 1, fontWeight: 600, textTransform: 'capitalize', fontSize: 16 }}>
                {materia}
              </div>
              <div style={{ textAlign: 'right', marginRight: 15 }}>
                <div style={{ fontWeight: 600, color: '#1a237e', fontSize: 16 }}>
                  {dados.media}/10
                </div>
                <div style={{ fontSize: 12, color: '#666' }}>
                  {dados.alunos} alunos
                </div>
              </div>
              <div style={{ 
                color: dados.tendencia.includes('+') ? '#4CAF50' : '#F44336',
                fontWeight: 600,
                fontSize: 14,
                width: 60,
                textAlign: 'right'
              }}>
                {dados.tendencia}
              </div>
              <div style={{
                width: 120,
                height: 10,
                background: '#f0f0f0',
                borderRadius: 5,
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${dados.media * 10}%`,
                  height: '100%',
                  background: dados.cor,
                  borderRadius: 5
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top alunos */}
      <div style={{
        background: 'white',
        borderRadius: 15,
        padding: 'clamp(12px, 3vw, 25px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0',
        maxWidth: '100%'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#1a237e', fontSize: 20 }}>
          🏆 Top 5 Alunos
        </h3>
        <div style={{ display: 'grid', gap: 15 }}>
          {dadosDesempenho.topAlunos.map((aluno, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 15,
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: 10,
              border: index === 0 ? '2px solid #FFD700' : '1px solid #e0e0e0'
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: index === 0 ? '#FFD700' : '#667eea',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 18
              }}>
                {index + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#333', marginBottom: 4 }}>
                  {aluno.nome}
                </div>
                <div style={{ fontSize: 14, color: '#666' }}>
                  {aluno.pontos} pts • {aluno.nivel}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, color: '#1a237e', fontSize: 16 }}>
                  {aluno.media}/10
                </div>
                <div style={{ fontSize: 12, color: '#666' }}>
                  Média Geral
                </div>
              </div>
              {index === 0 && (
                <FaTrophy style={{ color: '#FFD700', fontSize: 24 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 