import React, { useState } from 'react';
import api from '../services/api';

function RecuperarSenha({ aoVoltar }) {
  const [email, setEmail] = useState('');

  const handleRecuperar = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/auth/recuperar-senha?email=${email}`);
      alert('Se o e-mail existir, um link foi enviado para o console do seu Backend!');
      aoVoltar();
    } catch (error) {
      alert('Erro ao processar solicitação.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRecuperar} className="login-form">
        <h2>Recuperar Senha</h2>
        <input type="email" placeholder="Seu e-mail cadastrado" onChange={e => setEmail(e.target.value)} required />
        <button type="submit">Enviar Link</button>
        <button type="button" onClick={aoVoltar} className="btn-link">Voltar ao Login</button>
      </form>
    </div>
  );
}

export default RecuperarSenha;