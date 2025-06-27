import React from 'react';
import { FaClipboardList, FaUserGraduate } from 'react-icons/fa';

const relatorio = {
  aluno: 'João Silva',
  missao: 'Aventuras no Sistema Solar',
  desafio: 'Qual planeta é conhecido como o Planeta Vermelho?',
  resposta: 'Marte',
  acertou: true,
  progresso: 'Missão concluída',
  modo: 'OfflineBox'
};

export default function RelatorioProfessor({ offline }) {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(26,35,126,0.08)', padding: 40, textAlign: 'center' }}>
      <h2 style={{ color: '#1a237e', marginBottom: 16 }}><FaClipboardList color="#ffd600" /> Relatório do Aluno</h2>
      <div style={{ fontSize: 18, marginBottom: 16 }}><FaUserGraduate color="#2575fc" /> <b>Aluno:</b> {relatorio.aluno}</div>
      <div style={{ fontSize: 17, marginBottom: 8 }}><b>Missão:</b> {relatorio.missao}</div>
      <div style={{ fontSize: 17, marginBottom: 8 }}><b>Desafio:</b> {relatorio.desafio}</div>
      <div style={{ fontSize: 17, marginBottom: 8 }}><b>Resposta:</b> {relatorio.resposta} {relatorio.acertou ? '✅' : '❌'}</div>
      <div style={{ fontSize: 17, marginBottom: 8 }}><b>Progresso:</b> {relatorio.progresso}</div>
      <div style={{ fontSize: 17, marginBottom: 8 }}><b>Modo:</b> {offline ? 'OfflineBox (Desconectado)' : 'Online'}</div>
      <div style={{ marginTop: 32, color: '#388e3c', fontWeight: 500 }}>
        Relatório gerado automaticamente para o professor adaptar o plano de aula!
      </div>
    </div>
  );
} 