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
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px' }}>
      <h1 style={{ color: '#1e3c72', marginBottom: '30px', fontSize: '2.5rem', fontWeight: '800' }}>
        GAV <span style={{ color: '#007bff', fontWeight: '300' }}>Milhas</span>
      </h1>
      <form onSubmit={handleRecuperar} className="login-form" style={{ display: 'flex', flexDirection: 'column', width: '320px', gap: '15px', padding: '35px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '15px', backgroundColor: '#fff' }}>
        <h2>Recuperar Senha</h2>
        <input type="email" placeholder="Seu e-mail cadastrado" onChange={e => setEmail(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
        <button type="submit"style={{ padding: '5px', borderRadius: '8px', border: 'none', backgroundColor:'#007bff', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '5px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          {'Enviar Link'}
        </button>
        <button type="button" onClick={aoVoltar} className="btn-link" style={{ padding: '5px', borderRadius: '8px', border: 'none', backgroundColor:'#1e3c72', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} >
          {'Já tenho conta'}
        </button>
      </form>
    </div>
  );
}

export default RecuperarSenha;