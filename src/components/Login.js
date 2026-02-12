import React, { useState } from 'react';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [codigoAdmin, setCodigoAdmin] = useState('');
  const [modoAdmin, setModoAdmin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = { 
        email, 
        senha, 
        codigoAcesso: modoAdmin ? codigoAdmin : null 
      };

      const response = await api.post('/auth/login', data);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role); 
      localStorage.setItem('portalAcesso', modoAdmin ? 'ADMIN' : 'USER'); 
      
      window.location.href = '/dashboard';
    } catch (error) {
      alert(error.response?.data || 'Erro nas credenciais ou código inválido.');
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px' }}>
      
      {/* NOME DO PROJETO NO LOGIN */}
      <h1 style={{ color: '#1e3c72', marginBottom: '30px', fontSize: '2.5rem', fontWeight: '800' }}>
        GAV <span style={{ color: '#007bff', fontWeight: '300' }}>Milhas</span>
      </h1>

      <div style={{ display: 'flex', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '25px', overflow: 'hidden', backgroundColor: '#fff' }}>
        <button 
          onClick={() => setModoAdmin(false)} 
          style={{ padding: '10px 25px', border: 'none', cursor: 'pointer', backgroundColor: !modoAdmin ? '#007bff' : '#fff', color: !modoAdmin ? '#fff' : '#333', fontWeight: 'bold', transition: '0.3s' }}>
          Usuário
        </button>
        <button 
          onClick={() => setModoAdmin(true)} 
          style={{ padding: '10px 25px', border: 'none', cursor: 'pointer', backgroundColor: modoAdmin ? '#dc3545' : '#fff', color: modoAdmin ? '#fff' : '#333', fontWeight: 'bold', transition: '0.3s' }}>
          Administrador
        </button>
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '320px', gap: '15px', padding: '35px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '15px', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 10px 0', fontSize: '1.2rem', color: '#555' }}>
          {modoAdmin ? 'Painel Administrativo' : 'Acesso ao Cliente'}
        </h2>
        
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail( e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
        
        {modoAdmin && (
          <input 
            type="password" 
            placeholder="Código de Segurança Admin" 
            value={codigoAdmin} 
            onChange={(e) => setCodigoAdmin(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #dc3545', outline: 'none' }}
          />
        )}
        
        <button type="submit" style={{ padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: modoAdmin ? '#dc3545' : '#007bff', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          {modoAdmin ? 'Entrar no Painel' : 'Ver Minhas Milhas'}
        </button>
      </form>
    </div>
  );
}

export default Login;