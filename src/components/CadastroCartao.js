import React, { useState, useEffect } from 'react';
import api from '../services/api'; //

function CadastroCartao({ aoSalvar }) {
  const [nomePersonalizado, setNomePersonalizado] = useState('');
  const [bandeira, setBandeira] = useState('Visa');
  const [programas, setProgramas] = useState([]); // Lista vinda do banco
  const [programaId, setProgramaId] = useState(''); // ID selecionado
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Busca os programas cadastrados no backend
  useEffect(() => {
    api.get('/programas')
      .then(res => setProgramas(res.data))
      .catch(err => console.error("Erro ao carregar programas", err));
  }, []);

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      // Enviamos o programa como um objeto contendo o ID para o Java
      await api.post('/cartoes', { 
        nomePersonalizado: nomePersonalizado, 
        bandeira: bandeira,
        programa: { id: programaId } //
      });
      
      setMensagemSucesso('Cartão cadastrado com sucesso!');
      setNomePersonalizado('');
      setProgramaId(''); // Limpa a seleção após o sucesso
      if (aoSalvar) aoSalvar();
      setTimeout(() => {
        setMensagemSucesso('');
      }, 5000); 
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar cartão. Verifique se escolheu o programa de pontos.');
    }
  };

  return (
    <div className="form-container">
      <h3>Novo Cartão</h3>
      <form onSubmit={handleCadastro}>
        <input 
          type="text" 
          placeholder="Nome do Cartão (ex: Azul Infinite)" 
          value={nomePersonalizado}
          onChange={e => setNomePersonalizado(e.target.value)}
          required 
        />
        
        <select value={bandeira} onChange={e => setBandeira(e.target.value)}>
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
          <option value="Elo">Elo</option>
          <option value="American Express">Amex</option>
        </select>

        {/* Novo campo de seleção de Programa */}
        <select 
          value={programaId} 
          onChange={e => setProgramaId(e.target.value)} 
          required
        >
          <option value="">Selecione o Programa de Pontos</option>
          {programas.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
        {mensagemSucesso && (
          <p style={{ color: 'green', fontSize: '0.9rem', margin: '10px 0' }}>
             {mensagemSucesso}
          </p>
        )}

        <button type="submit">Cadastrar Cartão</button>
      </form>
    </div>
  );
}

export default CadastroCartao;