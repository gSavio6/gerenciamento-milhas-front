import React, { useState, useEffect } from 'react';
import api from '../services/api';

function RelatorioCompras({ refresh }) {
  const [historico, setHistorico] = useState([]);

  const carregarHistorico = () => {
    api.get('/relatorios/compras')
      .then(res => setHistorico(res.data))
      .catch(err => console.error("Erro ao carregar relatório", err));
  };

  useEffect(() => {
    carregarHistorico();
  }, [refresh]);

  // Função genérica para baixar arquivos (PDF ou CSV)
  const baixarArquivo = async (formato) => {
    try {
      const response = await api.get(`/relatorios/${formato}`, {
        responseType: 'blob',
      });
      
      const extensao = formato === 'pdf' ? 'pdf' : 'csv';
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `extrato_milhas.${extensao}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(`Erro ao baixar ${formato}`, error);
      alert(`Não foi possível gerar o arquivo ${formato.toUpperCase()} no momento.`);
    }
  };

  return (
    <div className="lista-container" style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Extrato de Pontos (Compras Aprovadas)</h3>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Botão CSV */}
          <button 
            onClick={() => baixarArquivo('csv')}
            style={{ 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '8px 15px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            📊 Excel (CSV)
          </button>

          {/* Botão PDF */}
          <button 
            onClick={() => baixarArquivo('pdf')}
            style={{ 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              padding: '8px 15px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            📄 Baixar PDF
          </button>
        </div>
      </div>

      {historico.length === 0 ? <p>Nenhuma compra aprovada ainda.</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
              <th style={{ padding: '10px' }}>Data</th>
              <th style={{ padding: '10px' }}>Cartão</th>
              <th style={{ padding: '10px' }}>Descrição</th>
              <th style={{ padding: '10px' }}>Valor (R$)</th>
              <th style={{ padding: '10px' }}>Pontos</th>
            </tr>
          </thead>
          <tbody>
            {historico.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                <td style={{ padding: '10px' }}>
                  {item.dataCompra 
                    ? new Date(item.dataCompra + 'T12:00:00').toLocaleDateString('pt-BR') 
                    : '---'}
                </td>
                <td style={{ padding: '10px' }}>
                  {item.cartao ? item.cartao.nomePersonalizado : 'S/ Nome'}
                </td>
                <td style={{ padding: '10px' }}>{item.descricao || '---'}</td>
                <td style={{ padding: '10px' }}>
                  R$ {typeof item.valor === 'number' ? item.valor.toFixed(2) : '0.00'}
                </td>
                <td style={{ padding: '10px', color: '#28a745', fontWeight: 'bold' }}>
                  +{typeof item.pontosEstimados === 'number' ? item.pontosEstimados.toFixed(0) : '0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RelatorioCompras;