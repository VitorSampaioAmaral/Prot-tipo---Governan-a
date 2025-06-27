import React from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaGraduationCap } from 'react-icons/fa';

export default function Trilhas({ professor }) {
  const trilhas = [
    { id: 1, titulo: 'Fundamentos da Matemática', materia: 'Matemática', etapas: 5, status: 'ativa' },
    { id: 2, titulo: 'História do Brasil', materia: 'História', etapas: 8, status: 'ativa' },
    { id: 3, titulo: 'Ciências Naturais', materia: 'Ciências', etapas: 6, status: 'rascunho' }
  ];

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
            🎓 Trilhas de Aprendizado
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
            <FaPlus />
            Criar Trilha
          </button>
        </div>

        <div style={{ display: 'grid', gap: 'clamp(8px, 2vw, 15px)' }}>
          {trilhas.map(trilha => (
            <div key={trilha.id} style={{
              background: '#f8f9fa',
              borderRadius: 10,
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: 15
            }}>
              <FaGraduationCap style={{ fontSize: 24, color: '#9C27B0' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{trilha.titulo}</h3>
                <div style={{ color: '#666', fontSize: 14 }}>
                  {trilha.materia} • {trilha.etapas} etapas
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