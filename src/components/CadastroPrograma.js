import React, { useState } from 'react';
import api from '../services/api';

function CadastroPrograma({ aoSalvar }) {
  const [nome, setNome] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      // O backend espera um objeto com o campo 'nome'
      await api.post('/programas', { nome });
      alert('Programa cadastrado com sucesso!');
      setNome('');
      if (aoSalvar) aoSalvar(); // Avisa o Dashboard para atualizar listas, se necessário
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar programa.');
    }
  };

  return (
    <div className="form-container" style={{ marginTop: '20px' }}>
      <h3>Novo Programa de Pontos</h3>
      <form onSubmit={handleCadastro}>
        <input 
          type="text" 
          placeholder="Nome do Programa (ex: Livelo, Esfera)" 
          value={nome}
          onChange={e => setNome(e.target.value)}
          required 
        />
        <button type="submit">Cadastrar Programa</button>
      </form>
    </div>
  );
}

export default CadastroPrograma;