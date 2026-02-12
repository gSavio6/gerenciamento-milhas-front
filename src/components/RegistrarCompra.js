import React, { useState, useEffect } from 'react';
import api from '../services/api';

function RegistrarCompra({ aoSalvar }) {
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cartaoId, setCartaoId] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [cartoes, setCartoes] = useState([]);

  // Busca os cartões do usuário para preencher o select
  useEffect(() => {
    api.get('/cartoes')
      .then(res => setCartoes(res.data))
      .catch(err => console.error("Erro ao buscar cartões", err));
  }, []);

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Captura a data atual no fuso horário do navegador (Brasil)
    const dataLocal = new Date().toLocaleDateString('en-CA');
    
    // Como o backend usa MultipartFile, precisamos de FormData
    const formData = new FormData();
    formData.append('valor', valor);
    formData.append('descricao', descricao);
    formData.append('cartaoId', cartaoId);
    formData.append('dataCompra', dataLocal);
    if (arquivo) {
      formData.append('file', arquivo);
    }

    try {
      await api.post('/aquisicoes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Compra registrada! Aguarde a aprovação para ver os pontos.');
      setValor('');
      setDescricao('');
      setCartaoId('');
      setArquivo(null);
      if (aoSalvar) aoSalvar();
    } catch (error) {
      console.error(error);
      alert('Erro ao registrar compra.');
    }
  };

  return (
    <div className="form-container" style={{ marginTop: '20px' }}>
      <h3>Registrar Nova Compra</h3>
      <form onSubmit={handleRegistro}>
        <select value={cartaoId} onChange={e => setCartaoId(e.target.value)} required>
          <option value="">Selecione o Cartão Utilizado</option>
          {cartoes.map(c => (
            <option key={c.id} value={c.id}>{c.nomePersonalizado} ({c.bandeira})</option>
          ))}
        </select>

        <input 
          type="number" 
          step="0.01"
          placeholder="Valor da Compra (R$)" 
          value={valor}
          onChange={e => setValor(e.target.value)}
          required 
        />

        <input 
          type="text" 
          placeholder="Descrição (ex: Supermercado, Amazon)" 
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required 
        />

        <div style={{ margin: '10px 0' }}>
          <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>Comprovante (Opcional):</label>
          <input type="file" onChange={e => setArquivo(e.target.files[0])} />
        </div>

        <button type="submit">Enviar para Aprovação</button>
      </form>
    </div>
  );
}

export default RegistrarCompra;