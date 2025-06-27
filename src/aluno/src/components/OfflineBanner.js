import React from 'react';
import { FaPlug } from 'react-icons/fa';

export default function OfflineBanner() {
  return (
    <div style={{
      background: '#ffd600',
      color: '#1a237e',
      padding: '12px 0',
      textAlign: 'center',
      fontWeight: 600,
      fontSize: 16,
      borderRadius: 8,
      marginBottom: 24,
      boxShadow: '0 2px 8px rgba(26,35,126,0.08)'
    }}>
      <FaPlug style={{ marginRight: 8 }} /> Modo OfflineBox ativado: funcionalidades limitadas e aguardando sincronização.
    </div>
  );
} 