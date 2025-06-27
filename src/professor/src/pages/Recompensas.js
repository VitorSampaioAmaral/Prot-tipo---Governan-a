import React from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaGift } from 'react-icons/fa';

export default function Recompensas({ professor }) {
  const recompensas = [
    { id: 1, titulo: 'Medalha de Ouro', tipo: 'Conquista', pontos: 100, status: 'ativa' },
    { id: 2, titulo: 'Certificado de Excelência', tipo: 'Certificado', pontos: 200, status: 'ativa' },
    { id: 3, titulo: 'Badge Especial', tipo: 'Badge', pontos: 50, status: 'rascunho' }
  ];

  return (
    <div style={{ padding: '30px' }}>
      <div style={{
        background: 'white',
        borderRadius: 15,
        padding: '25px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: '#1a237e' }}>
            🎁 Sistema de Recompensas
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
            Criar Recompensa
          </button>
        </div>

        <div style={{ display: 'grid', gap: 15 }}>
          {recompensas.map(recompensa => (
            <div key={recompensa.id} style={{
              background: '#f8f9fa',
              borderRadius: 10,
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: 15
            }}>
              <FaGift style={{ fontSize: 24, color: '#E91E63' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{recompensa.titulo}</h3>
                <div style={{ color: '#666', fontSize: 14 }}>
                  {recompensa.tipo} • {recompensa.pontos} pontos
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ background: '#4CAF50', color: 'white', border: 'none', borderRadius: 5, padding: '8px', cursor: 'pointer' }}>
                  <FaEdit />
                </button>
                <button style={{ background: '#FF9800', color: 'white', border: 'none', borderRadius: 5, padding: '8px', cursor: 'pointer' }}>
                  <FaEye />
                </button>
                <button style={{ background: '#F44336', color: 'white', border: 'none', borderRadius: 5, padding: '8px', cursor: 'pointer' }}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 