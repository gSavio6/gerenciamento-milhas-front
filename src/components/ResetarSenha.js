import React, { useState } from 'react';
import api from '../services/api';

function ResetarSenha({ aoSucesso }) {
  const [novaSenha, setNovaSenha] = useState('');
  
  // Captura o token que o Spring Boot gerou e enviou no link
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  const handleReset = async (e) => {
  e.preventDefault();
  try {
    // A chave aqui deve ser exatamente 'novaSenha'
    await api.post(`/auth/resetar-senha?token=${token}`, { novaSenha: novaSenha });
    alert('Senha alterada com sucesso!');
    aoSucesso();
  } catch (error) {
    alert('Erro ao trocar a senha.');
  }
};

  return (
    <div className="login-container">
      <form onSubmit={handleReset} className="login-form">
        <h2>Nova Senha</h2>
        <p style={{fontSize: '0.8rem', color: '#666'}}>Defina sua nova senha de acesso.</p>
        <input 
          type="password" 
          placeholder="Digite a nova senha" 
          onChange={e => setNovaSenha(e.target.value)} 
          required 
        />
        <button type="submit">Salvar Nova Senha</button>
      </form>
    </div>
  );
}

export default ResetarSenha;