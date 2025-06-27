import React from 'react';
import { 
  FaUsers, 
  FaChartLine, 
  FaTrophy, 
  FaBookOpen, 
  FaLightbulb, 
  FaStar,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

export default function Dashboard({ professor }) {
  // Dados simulados da turma
  const dadosTurma = {
    totalAlunos: 28,
    alunosAtivos: 25,
    mediaGeral: 8.2,
    crescimento: 12.5,
    missoesCompletas: 156,
    tempoMedio: '45 min',
    topicoDestaque: 'Matemática Básica',
    alunosDestaque: [
      { nome: 'João Silva', avatar: '👦', pontos: 245, nivel: '🦁 Leão Vermelho' },
      { nome: 'Maria Santos', avatar: '👧', pontos: 198, nivel: '🦅 Águia Dourada' },
      { nome: 'Pedro Costa', avatar: '👦', pontos: 187, nivel: '🦅 Águia Dourada' }
    ],
    atividadesRecentes: [
      { aluno: 'Ana Oliveira', atividade: 'Completou quiz Sistema Solar', tempo: '2 min atrás', tipo: 'sucesso' },
      { aluno: 'Carlos Lima', atividade: 'Iniciou missão Matemática', tempo: '5 min atrás', tipo: 'info' },
      { aluno: 'Julia Ferreira', atividade: 'Alcançou nível Dragão', tempo: '10 min atrás', tipo: 'sucesso' },
      { aluno: 'Lucas Rocha', atividade: 'Precisa de ajuda em História', tempo: '15 min atrás', tipo: 'alerta' }
    ],
    estatisticas: {
      matematica: { media: 8.5, alunos: 22, cor: '#FF5722' },
      portugues: { media: 7.8, alunos: 25, cor: '#2196F3' },
      ciencias: { media: 8.9, alunos: 20, cor: '#4CAF50' },
      historia: { media: 7.2, alunos: 18, cor: '#9C27B0' },
      geografia: { media: 8.1, alunos: 23, cor: '#FF9800' },
      cidadania: { media: 8.7, alunos: 26, cor: '#795548' }
    }
  };

  const Card = ({ titulo, valor, icone, cor, subtitulo, tendencia }) => (
    <div style={{
      background: 'white',
      borderRadius: 15,
      padding: '25px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'translateY(-5px)';
      e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    }}>
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
              color: tendencia > 0 ? '#4CAF50' : '#F44336',
              fontSize: 14,
              fontWeight: 600
            }}>
              {tendencia > 0 ? <FaArrowUp /> : <FaArrowDown />}
              {Math.abs(tendencia)}%
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

  const AlunoCard = ({ aluno }) => (
    <div style={{
      background: 'white',
      borderRadius: 12,
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      border: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }}>
      <div style={{ fontSize: 24 }}>{aluno.avatar}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, color: '#333', marginBottom: 4 }}>
          {aluno.nome}
        </div>
        <div style={{ fontSize: 14, color: '#666' }}>
          {aluno.pontos} pts • {aluno.nivel}
        </div>
      </div>
      <FaTrophy style={{ color: '#FFD700', fontSize: 20 }} />
    </div>
  );

  const AtividadeCard = ({ atividade }) => {
    const getIcone = (tipo) => {
      switch (tipo) {
        case 'sucesso': return <FaCheckCircle style={{ color: '#4CAF50' }} />;
        case 'alerta': return <FaExclamationTriangle style={{ color: '#FF9800' }} />;
        default: return <FaClock style={{ color: '#2196F3' }} />;
      }
    };

    return (
      <div style={{
        background: 'white',
        borderRadius: 10,
        padding: '12px 15px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8
      }}>
        {getIcone(atividade.tipo)}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#333', marginBottom: 2 }}>
            <strong>{atividade.aluno}</strong> {atividade.atividade}
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>
            {atividade.tempo}
          </div>
        </div>
      </div>
    );
  };

  // Helper para media query inline
  const isMobile = window.innerWidth <= 800;

  return (
    <div style={{
      padding: 'clamp(6px, 2vw, 18px)',
      maxWidth: 1100,
      margin: '0 auto',
      minHeight: '100vh',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Cards principais */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: 'clamp(6px, 2vw, 14px)', 
        marginBottom: 'clamp(10px, 2vw, 18px)',
        width: '100%',
        justifyItems: 'center'
      }}>
        <Card 
          titulo="Total de Alunos"
          valor={dadosTurma.totalAlunos}
          icone={<FaUsers />}
          cor="#667eea"
          subtitulo={`${dadosTurma.alunosAtivos} ativos`}
        />
        <Card 
          titulo="Média Geral"
          valor={dadosTurma.mediaGeral}
          icone={<FaChartLine />}
          cor="#4CAF50"
          subtitulo="da turma"
          tendencia={dadosTurma.crescimento}
        />
        <Card 
          titulo="Missões Completas"
          valor={dadosTurma.missoesCompletas}
          icone={<FaTrophy />}
          cor="#FF9800"
          subtitulo="este mês"
        />
        <Card 
          titulo="Tempo Médio"
          valor={dadosTurma.tempoMedio}
          icone={<FaClock />}
          cor="#9C27B0"
          subtitulo="por sessão"
        />
      </div>

      {/* Linha: Insights e Desempenho */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
        gap: 'clamp(10px, 2vw, 18px)',
        marginBottom: 'clamp(10px, 2vw, 18px)',
        alignItems: 'stretch',
        width: '100%',
        justifyItems: 'center'
      }}>
        {/* Insights da Semana (esquerda) */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 12,
          padding: 'clamp(8px, 2vw, 16px)',
          color: 'white',
          maxWidth: isMobile ? '100%' : 500,
          width: '100%',
          marginBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: 'clamp(12px, 3vw, 16px)' }}>
            💡 Insights da Semana
          </h3>
          <div style={{ display: 'grid', gap: 'clamp(6px, 2vw, 12px)' }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>
                🎯 Tópico em Destaque
              </div>
              <div style={{ opacity: 0.9 }}>
                {dadosTurma.topicoDestaque} está sendo o mais acessado pelos alunos
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>
                📈 Crescimento
              </div>
              <div style={{ opacity: 0.9 }}>
                {dadosTurma.crescimento}% de melhoria na média geral da turma
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>
                ⏰ Engajamento
              </div>
              <div style={{ opacity: 0.9 }}>
                Alunos passam em média {dadosTurma.tempoMedio} por sessão
              </div>
            </div>
          </div>
        </div>
        {/* Desempenho por matéria (direita) */}
        <div style={{
          background: 'white',
          borderRadius: 12,
          padding: 'clamp(8px, 2vw, 16px)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          border: '1px solid #f0f0f0',
          maxWidth: isMobile ? '100%' : 340,
          width: '100%',
          marginBottom: 0
        }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#1a237e', fontSize: 'clamp(13px, 3vw, 17px)' }}>
            Desempenho por Matéria
          </h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {Object.entries(dadosTurma.estatisticas).map(([materia, dados]) => (
              <div key={materia} style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <div style={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  background: dados.cor 
                }} />
                <div style={{ flex: 1, fontWeight: 600, textTransform: 'capitalize' }}>
                  {materia}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, color: '#1a237e' }}>
                    {dados.media}/10
                  </div>
                  <div style={{ fontSize: 12, color: '#666' }}>
                    {dados.alunos} alunos
                  </div>
                </div>
                <div style={{
                  width: 100,
                  height: 8,
                  background: '#f0f0f0',
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${dados.media * 10}%`,
                    height: '100%',
                    background: dados.cor,
                    borderRadius: 4
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer: Atividades Recentes e Top Alunos */}
      <div style={{
        width: '100%',
        maxWidth: isMobile ? '100%' : 700,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
        gap: 'clamp(10px, 2vw, 18px)'
      }}>
        {/* Atividades Recentes */}
        <div style={{
          background: 'white',
          borderRadius: 12,
          padding: 'clamp(8px, 2vw, 16px)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          border: '1px solid #f0f0f0',
          width: '100%',
          marginBottom: isMobile ? 'clamp(10px, 2vw, 18px)' : 0
        }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#1a237e', fontSize: 'clamp(13px, 3vw, 17px)' }}>
            📊 Atividades Recentes
          </h3>
          <div style={{ display: 'grid', gap: 'clamp(4px, 1vw, 7px)' }}>
            {dadosTurma.atividadesRecentes.map((atividade, index) => (
              <AtividadeCard key={index} atividade={atividade} />
            ))}
          </div>
        </div>
        {/* Top Alunos */}
        <div style={{
          background: 'white',
          borderRadius: 12,
          padding: 'clamp(8px, 2vw, 16px)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          border: '1px solid #f0f0f0',
          width: '100%'
        }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#1a237e', fontSize: 'clamp(13px, 3vw, 17px)' }}>
            🏆 Top Alunos
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 1vw, 9px)' }}>
            {dadosTurma.alunosDestaque.map((aluno, index) => (
              <AlunoCard key={index} aluno={aluno} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 