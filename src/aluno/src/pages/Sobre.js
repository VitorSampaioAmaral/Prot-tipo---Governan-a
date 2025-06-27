import React from 'react';
import { FaLightbulb, FaGlobeAmericas, FaUserGraduate, FaLock, FaUniversalAccess } from 'react-icons/fa';

export default function Sobre() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(26,35,126,0.08)', padding: 40, textAlign: 'center' }}>
      <h2 style={{ color: '#1a237e', marginBottom: 24 }}><FaLightbulb color="#ffd600" /> Sobre o ProFuturo</h2>
      <p style={{ fontSize: 19, color: '#333', marginBottom: 32, lineHeight: 1.7 }}>
        <strong>ProFuturo</strong> é uma plataforma inovadora de microlearning que acredita no poder da educação personalizada, acessível e divertida.<br /><br />
        <FaUserGraduate color="#2575fc" /> <b>Para o aluno:</b> trilhas de aprendizagem adaptativas, missões gamificadas e experiências imersivas em realidade aumentada e virtual. Aqui, cada jornada é única, respeitando o ritmo, o contexto e o sonho de cada estudante.<br /><br />
        <FaGlobeAmericas color="#388e3c" /> <b>Para todos os lugares:</b> com a versão <b>OfflineBox</b>, a educação chega até as regiões mais remotas, sem depender de internet. O conhecimento viaja em tablets, pendrives e sorrisos.<br /><br />
        <FaLock color="#3949ab" /> <b>Segurança e privacidade:</b> dados protegidos, anonimização, consentimento e respeito à LGPD.<br /><br />
        <FaUniversalAccess color="#ff7043" /> <b>Inclusão:</b> acessibilidade total, design para todos, sem barreiras.<br /><br />
        <b>ProFuturo é mais do que tecnologia. É ponte, é oportunidade, é futuro.</b><br /><br />
        <span style={{ color: '#6a11cb', fontWeight: 600, fontSize: 20 }}>
          Juntos, vamos transformar vidas através da educação!
        </span>
      </p>
      <div style={{ marginTop: 32, color: '#757575', fontSize: 15 }}>
        <b>Tecnologias:</b> React, Node.js, MongoDB, Firebase, Python (IA), WebXR, Raspberry Pi, AES-256, LGPD, WCAG 2.1.
      </div>
    </div>
  );
} 