import React, { useState, useEffect } from 'react';
import api from '../services/api';

function ModeracaoCompras({ aoAtualizar }) {
  const [compras, setCompras] = useState([]);

  const carregarPendentes = () => {
    api.get('/aquisicoes/pendentes')
      .then(res => setCompras(res.data))
      .catch(err => console.error("Erro ao buscar compras pendentes", err));
  };

  useEffect(() => {
    carregarPendentes();
  }, []);

  const alterarStatus = async (id, novoStatus) => {
    try {
      await api.patch(`/aquisicoes/${id}/status?status=${novoStatus}`);
      alert(`Compra ${novoStatus.toLowerCase()} com sucesso!`);
      carregarPendentes();
      if (aoAtualizar) aoAtualizar();
    } catch (error) {
      alert('Erro ao atualizar status.');
    }
  };

  return (
    <div className="lista-container" style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '20px' }}>Moderação de Compras (Pendentes)</h3>
      {compras.length === 0 ? <p>Nenhuma compra aguardando aprovação.</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
              {/* NOVA COLUNA: Solicitante */}
              <th style={{ padding: '12px' }}>Solicitante</th> 
              <th style={{ padding: '12px' }}>Descrição</th>
              <th style={{ padding: '12px' }}>Valor (R$)</th>
              <th style={{ padding: '12px' }}>Comprovante</th>
              <th style={{ padding: '12px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {compras.map(compra => (
              <tr key={compra.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                {/* COLUNA DA DATA (Adicione aqui) */}
                <td style={{ padding: '12px' }}>
                  {compra.dataCompra ? 
                    new Date(compra.dataCompra + 'T12:00:00').toLocaleDateString('pt-BR') : 
                    '---'
                  }
                </td>
                {/* DADOS DO USUÁRIO: Nome e E-mail */}
                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 'bold', color: '#1e3c72' }}>
                    {compra.usuario?.nome || "Usuário não identificado"}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>
                    {compra.usuario?.email}
                  </div>
                </td>

                <td style={{ padding: '12px' }}>{compra.descricao}</td>
                <td style={{ padding: '12px' }}>R$ {compra.valor.toFixed(2)}</td>
                <td style={{ padding: '12px' }}>
                  {compra.comprovanteUrl ? (
                    <a 
                      href={`http://localhost:8080/${compra.comprovanteUrl}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <img 
                        src={`http://localhost:8080/${compra.comprovanteUrl}`} 
                        alt="Comprovante" 
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} 
                      />
                    </a>
                  ) : (
                    <span style={{ color: '#999', fontSize: '0.8rem' }}>Sem anexo</span>
                  )}
                </td>
                <td style={{ padding: '12px' }}>
                  <button 
                    onClick={() => alterarStatus(compra.id, 'APROVADO')}
                    style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' }}
                  >
                    Aprovar
                  </button>
                  <button 
                    onClick={() => alterarStatus(compra.id, 'REJEITADO')}
                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Rejeitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ModeracaoCompras;