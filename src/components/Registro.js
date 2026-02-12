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
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px' }}>
      <h1 style={{ color: '#1e3c72', marginBottom: '30px', fontSize: '2.5rem', fontWeight: '800' }}>
        GAV <span style={{ color: '#007bff', fontWeight: '300' }}>Milhas</span>
      </h1>
      <form onSubmit={handleRegistro} className="login-form" style={{ display: 'flex', flexDirection: 'column', width: '320px', gap: '15px', padding: '35px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '15px', backgroundColor: '#fff' }}>
        <h2>Cadastro</h2>
        <input type="text" placeholder="Nome Completo" onChange={e => setNome(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
        <input type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
        <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
        <button type="submit" style={{ padding: '5px', borderRadius: '8px', border: 'none', backgroundColor:'#007bff', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '5px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          {'Cadastrar'}
        </button>
        <button type="button" onClick={aoSucesso} className="btn-link" style={{ padding: '5px', borderRadius: '8px', border: 'none', backgroundColor:'#1e3c72', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} >
          {'Já tenho conta'}
          </button>
      </form> 
    </div>
  );
}

export default Registro;