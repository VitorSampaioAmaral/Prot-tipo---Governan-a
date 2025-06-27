import React from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaBookOpen } from 'react-icons/fa';

export default function Conteudo({ professor }) {
  const conteudos = [
    { id: 1, titulo: 'Sistema Solar - Introdução', materia: 'Ciências', tipo: 'Vídeo', status: 'ativo' },
    { id: 2, titulo: 'Operações Básicas', materia: 'Matemática', tipo: 'Quiz', status: 'ativo' },
    { id: 3, titulo: 'Gramática Fundamental', materia: 'Português', tipo: 'Texto', status: 'rascunho' }
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
            📚 Curadoria de Conteúdo
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
            Adicionar Conteúdo
          </button>
        </div>

        <div style={{ display: 'grid', gap: 'clamp(8px, 2vw, 15px)' }}>
          {conteudos.map(conteudo => (
            <div key={conteudo.id} style={{
              background: '#f8f9fa',
              borderRadius: 10,
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: 15
            }}>
              <FaBookOpen style={{ fontSize: 24, color: '#667eea' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{conteudo.titulo}</h3>
                <div style={{ color: '#666', fontSize: 14 }}>
                  {conteudo.materia} • {conteudo.tipo}
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