import React, { useState } from 'react';
import { FaPlug, FaSync } from 'react-icons/fa';

export default function OfflineBox({ offline }) {
  const [sync, setSync] = useState(false);

  function sincronizar() {
    setSync(true);
    setTimeout(() => setSync(false), 2000);
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(26,35,126,0.08)', padding: 40, textAlign: 'center' }}>
      <h2 style={{ color: '#1a237e', marginBottom: 16 }}><FaPlug color="#ffd600" /> OfflineBox</h2>
      <div style={{ fontSize: 18, marginBottom: 24 }}>
        {offline ? (
          <span>Você está em modo desconectado. Algumas funções estão indisponíveis.<br />
          Para enviar dados ao professor, insira o pendrive e clique em sincronizar.</span>
        ) : (
          <span>Modo online. O OfflineBox está pronto para uso em regiões sem internet.</span>
        )}
      </div>
      <button
        onClick={sincronizar}
        disabled={!offline || sync}
        style={{
          background: offline ? 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)' : '#bdbdbd',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '14px 32px',
          fontSize: 18,
          fontWeight: 600,
          cursor: offline && !sync ? 'pointer' : 'not-allowed',
          boxShadow: '0 2px 8px rgba(26,35,126,0.08)',
          transition: 'background 0.2s',
          marginTop: 16
        }}
      >
        <FaSync style={{ marginRight: 8, animation: sync ? 'spin 1s linear infinite' : 'none' }} />
        {sync ? 'Sincronizando...' : 'Sincronizar com Pendrive'}
      </button>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      {sync && <div style={{ color: '#388e3c', marginTop: 16 }}>Dados sincronizados com sucesso!</div>}
    </div>
  );
} 