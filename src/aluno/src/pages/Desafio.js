import React, { useState } from 'react';
import { FaRobot, FaCheckCircle, FaTimesCircle, FaArrowRight, FaTrophy } from 'react-icons/fa';

// 6 perguntas múltipla escolha (fáceis ao difícil) abc
const perguntas = [
  {
    tipo: 'multipla',
    enunciado: 'Qual planeta é o mais próximo do Sol?',
    opcoes: ['Vênus', 'Terra', 'Mercúrio', 'Marte'],
    correta: 2,
    dica: 'É o menor planeta do Sistema Solar.'
  },
  {
    tipo: 'multipla',
    enunciado: 'Qual planeta é conhecido como o Planeta Vermelho?',
    opcoes: ['Vênus', 'Marte', 'Júpiter', 'Saturno'],
    correta: 1,
    dica: 'É o quarto planeta a partir do Sol.'
  },
  {
    tipo: 'multipla',
    enunciado: 'Qual planeta possui o maior número de luas?',
    opcoes: ['Terra', 'Júpiter', 'Saturno', 'Netuno'],
    correta: 1,
    dica: 'É o maior planeta do Sistema Solar.'
  },
  {
    tipo: 'multipla',
    enunciado: 'Qual planeta tem os anéis mais visíveis?',
    opcoes: ['Saturno', 'Urano', 'Netuno', 'Júpiter'],
    correta: 0,
    dica: 'Seus anéis são famosos e facilmente vistos.'
  },
  {
    tipo: 'multipla',
    enunciado: 'Qual planeta é chamado de gigante gasoso e tem uma Grande Mancha Vermelha?',
    opcoes: ['Saturno', 'Júpiter', 'Urano', 'Netuno'],
    correta: 1,
    dica: 'É o maior planeta do Sistema Solar.'
  },
  {
    tipo: 'multipla',
    enunciado: 'Qual planeta foi rebaixado a planeta anão em 2006?',
    opcoes: ['Plutão', 'Netuno', 'Mercúrio', 'Vênus'],
    correta: 0,
    dica: 'Era considerado o nono planeta.'
  },
  // Quiz 2: Verdadeiro ou Falso
  {
    tipo: 'vf',
    enunciado: 'A Terra é o terceiro planeta a partir do Sol.',
    correta: true,
    dica: 'Lembre-se da ordem: Mercúrio, Vênus, Terra...'
  },
  // Quiz 3: Associação
  {
    tipo: 'associacao',
    enunciado: 'Associe o planeta ao seu apelido:',
    pares: [
      { planeta: 'Marte', apelido: 'Planeta Vermelho' },
      { planeta: 'Júpiter', apelido: 'Gigante Gasoso' },
      { planeta: 'Saturno', apelido: 'Planeta dos Anéis' }
    ],
    dica: 'Pense nas características marcantes de cada planeta.'
  },
  // Quiz 4: Completar lacuna
  {
    tipo: 'lacuna',
    enunciado: 'O planeta _______ é conhecido por seus anéis impressionantes.',
    correta: 'Saturno',
    dica: 'Seus anéis são facilmente vistos da Terra.'
  },
  // Quiz 5: Ordenar eventos
  {
    tipo: 'ordenar',
    enunciado: 'Ordene os planetas do Sol até Marte:',
    opcoes: ['Terra', 'Marte', 'Vênus', 'Mercúrio'],
    correta: ['Mercúrio', 'Vênus', 'Terra', 'Marte'],
    dica: 'Comece pelo mais próximo do Sol.'
  },
  // Quiz 6: Múltipla escolha difícil
  {
    tipo: 'multipla',
    enunciado: 'Qual planeta tem o dia mais longo (rotação mais lenta)?',
    opcoes: ['Vênus', 'Terra', 'Marte', 'Júpiter'],
    correta: 0,
    dica: 'Seu dia dura mais que seu ano!'
  }
];

function BarraProgresso({ atual, total }) {
  const pct = Math.round((atual / total) * 100);
  return (
    <div style={{ margin: '24px 0' }}>
      <div style={{ background: '#c5cae9', borderRadius: 8, width: 320, height: 18, margin: '0 auto', overflow: 'hidden', boxShadow: '0 2px 8px rgba(26,35,126,0.08)' }}>
        <div style={{ background: 'linear-gradient(90deg, #6a11cb 0%, #ffd600 100%)', width: pct + '%', height: '100%', borderRadius: 8, transition: 'width 0.7s cubic-bezier(.4,2,.6,1)' }}></div>
      </div>
      <div style={{ textAlign: 'center', color: '#2575fc', fontWeight: 600, marginTop: 4 }}>{pct}% concluído</div>
    </div>
  );
}

export default function Desafio() {
  const [etapa, setEtapa] = useState(0);
  const [resposta, setResposta] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [acertos, setAcertos] = useState(0);
  const total = perguntas.length;
  const atual = etapa + 1;
  const p = perguntas[etapa];

  function avancar(acertou) {
    setResposta(null);
    setFeedback('');
    setEtapa(e => e + 1);
    if (acertou) setAcertos(a => a + 1);
  }

  // Renderização dos tipos de quiz
  function renderQuiz() {
    if (p.tipo === 'multipla') {
      return (
        <>
          <div style={{ fontSize: 18, marginBottom: 24 }}>{p.enunciado}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            {p.opcoes.map((op, i) => (
              <button
                key={i}
                disabled={resposta !== null}
                onClick={() => {
                  setResposta(i);
                  setTimeout(() => {
                    if (i === p.correta) {
                      setFeedback('Parabéns! Você acertou!');
                    } else {
                      setFeedback('Tente novamente! Dica: ' + p.dica);
                    }
                  }, 500);
                }}
                style={{
                  background: resposta === i ? (i === p.correta ? '#388e3c' : '#d32f2f') : 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 0',
                  fontSize: 18,
                  fontWeight: 600,
                  cursor: resposta !== null ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px rgba(26,35,126,0.08)',
                  transition: 'background 0.2s'
                }}
              >
                {op}
                {resposta !== null && i === p.correta && <FaCheckCircle style={{ marginLeft: 8 }} />}
                {resposta !== null && resposta === i && resposta !== p.correta && <FaTimesCircle style={{ marginLeft: 8 }} />}
              </button>
            ))}
          </div>
        </>
      );
    }
    if (p.tipo === 'vf') {
      return (
        <>
          <div style={{ fontSize: 18, marginBottom: 24 }}>{p.enunciado}</div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
            {[true, false].map((val, i) => (
              <button
                key={i}
                disabled={resposta !== null}
                onClick={() => {
                  setResposta(val);
                  setTimeout(() => {
                    if (val === p.correta) {
                      setFeedback('Correto!');
                    } else {
                      setFeedback('Não! ' + p.dica);
                    }
                  }, 500);
                }}
                style={{
                  background: resposta === val ? (val === p.correta ? '#388e3c' : '#d32f2f') : 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 32px',
                  fontSize: 18,
                  fontWeight: 600,
                  cursor: resposta !== null ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px rgba(26,35,126,0.08)',
                  transition: 'background 0.2s'
                }}
              >
                {val ? 'Verdadeiro' : 'Falso'}
                {resposta !== null && val === p.correta && <FaCheckCircle style={{ marginLeft: 8 }} />}
                {resposta !== null && resposta === val && resposta !== p.correta && <FaTimesCircle style={{ marginLeft: 8 }} />}
              </button>
            ))}
          </div>
        </>
      );
    }
    if (p.tipo === 'associacao') {
      return (
        <>
          <div style={{ fontSize: 18, marginBottom: 24 }}>{p.enunciado}</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 17, marginBottom: 16 }}>
            <li>Marte — <b>Planeta Vermelho</b></li>
            <li>Júpiter — <b>Gigante Gasoso</b></li>
            <li>Saturno — <b>Planeta dos Anéis</b></li>
          </ul>
          <div style={{ color: '#388e3c', fontWeight: 500 }}>Muito bem! Você associou corretamente!</div>
        </>
      );
    }
    if (p.tipo === 'lacuna') {
      return (
        <>
          <div style={{ fontSize: 18, marginBottom: 24 }}>{p.enunciado.replace('_______', resposta || '_______')}</div>
          <input
            type="text"
            value={resposta || ''}
            disabled={feedback}
            onChange={e => setResposta(e.target.value)}
            style={{ width: 200, padding: 10, fontSize: 18, borderRadius: 8, border: '1px solid #c5cae9', marginBottom: 16, textAlign: 'center' }}
          />
          <br />
          <button
            disabled={feedback || !resposta}
            onClick={() => {
              if ((resposta || '').trim().toLowerCase() === p.correta.toLowerCase()) {
                setFeedback('Correto! Saturno é famoso por seus anéis.');
              } else {
                setFeedback('Tente novamente! Dica: ' + p.dica);
              }
            }}
            style={{
              background: feedback ? '#bdbdbd' : 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 32px',
              fontSize: 18,
              fontWeight: 600,
              cursor: feedback ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(26,35,126,0.08)',
              transition: 'background 0.2s'
            }}
          >
            Verificar
          </button>
        </>
      );
    }
    if (p.tipo === 'ordenar') {
      // Simulação: mostra a ordem correta e feedback
      return (
        <>
          <div style={{ fontSize: 18, marginBottom: 24 }}>{p.enunciado}</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 17, marginBottom: 16 }}>
            <li>1. Mercúrio</li>
            <li>2. Vênus</li>
            <li>3. Terra</li>
            <li>4. Marte</li>
          </ul>
          <div style={{ color: '#388e3c', fontWeight: 500 }}>Parabéns! Você ordenou corretamente!</div>
        </>
      );
    }
    return null;
  }

  // Mensagens motivacionais
  const motivacional = [
    'Ótimo começo! Continue assim!',
    'Você está indo muito bem!',
    'Metade do caminho! Não desista!',
    'Falta pouco para completar!',
    'Quase lá! Continue focado!',
    'Última etapa! Mostre seu conhecimento!'
  ];

  if (etapa >= total) {
    return (
      <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(26,35,126,0.08)', padding: 40, textAlign: 'center' }}>
        <FaTrophy color="#ffd600" size={48} style={{ marginBottom: 16 }} />
        <h2 style={{ color: '#1a237e', marginBottom: 16 }}>Parabéns! Você concluiu todos os desafios!</h2>
        <div style={{ fontSize: 20, color: '#388e3c', marginBottom: 16 }}>Acertos: {acertos} de {total}</div>
        <div style={{ fontSize: 17, color: '#2575fc', fontWeight: 500 }}>Continue aprendendo e desbloqueie novas missões!</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(26,35,126,0.08)', padding: 40, textAlign: 'center' }}>
      <h2 style={{ color: '#1a237e', marginBottom: 16 }}><FaRobot color="#ffd600" /> Quiz ProFuturo</h2>
      <BarraProgresso atual={atual - 1} total={total} />
      {renderQuiz()}
      {feedback && (
        <div style={{ fontSize: 16, color: feedback.startsWith('Parabéns') || feedback.startsWith('Correto') ? '#388e3c' : '#d32f2f', fontWeight: 500, marginTop: 16 }}>{feedback}</div>
      )}
      {feedback && (
        <button
          style={{
            background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: 24
          }}
          onClick={() => avancar(feedback.startsWith('Parabéns') || feedback.startsWith('Correto') || feedback.startsWith('Muito bem') || feedback.startsWith('Parabéns'))}
        >
          Próximo <FaArrowRight style={{ marginLeft: 8 }} />
        </button>
      )}
      <div style={{ marginTop: 32, color: '#3949ab', fontWeight: 500, fontSize: 16 }}>
        {motivacional[Math.min(etapa, motivacional.length - 1)]}
      </div>
    </div>
  );
} 