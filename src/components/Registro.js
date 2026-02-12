import React, { useState } from 'react';
import api from '../services/api';

function Registro({ aoSucesso }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegistro = async (e) => {
  e.preventDefault();
  try {
    // Verifique se os nomes das chaves (nome, email, senha) 
    // são exatamente esses, em letras minúsculas.
    await api.post('/auth/registrar', { nome, email, senha });
    alert('Cadastrado com sucesso!');
  } catch (error) {
    console.error(error.response.data); // Veja o erro real no F12
    alert('Erro no cadastro');
  }
};

  return (
    <div className="login-container">
      <form onSubmit={handleRegistro} className="login-form">
        <h2>Criar Conta</h2>
        <input type="text" placeholder="Nome Completo" onChange={e => setNome(e.target.value)} required />
        <input type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} required />
        <button type="submit">Cadastrar</button>
        <button type="button" onClick={aoSucesso} className="btn-link">Já tenho conta</button>
      </form>
    </div>
  );
}

export default Registro;