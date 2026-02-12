import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Registro from './components/Registro';
import RecuperarSenha from './components/RecuperarSenha';
import ResetarSenha from './components/ResetarSenha'; // Importe o novo componente de reset
import Dashboard from './components/Dashboard';
import ListaCartoes from './components/ListaCartoes';

function App() {
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [isRecuperando, setIsRecuperando] = useState(false);
  
  // Detecta se existe um token na URL vindo do link de recuperação
  const urlParams = new URLSearchParams(window.location.search);
  const temToken = urlParams.has('token');
  const [isResetando, setIsResetando] = useState(temToken);

  const token = localStorage.getItem('token');

  // 1. Se o usuário estiver logado, mostra o sistema principal
 // 1. Se o usuário estiver logado, mostra APENAS o Dashboard
  if (token) {
    return (
      <div className="App">
        {/* Removido o <nav> com o botão 'Sair' cinza */}
        {/* O Dashboard já tem o botão 'Sair do Sistema' vermelho */}
        <Dashboard /> 
        
        {/* Removido o <ListaCartoes /> daqui, pois ele já existe dentro do Dashboard */}
      </div>
    );
  }

  // 2. Se não estiver logado, decide qual tela de acesso mostrar
  return (
    <div className="App">
      {isResetando ? (
        // Se houver token na URL, mostra a tela para digitar a nova senha
        <ResetarSenha aoSucesso={() => {
          setIsResetando(false);
          window.history.pushState({}, null, '/'); // Limpa o token da URL após o sucesso
        }} />
      ) : isRecuperando ? (
        <RecuperarSenha aoVoltar={() => setIsRecuperando(false)} />
      ) : isRegistrando ? (
        <Registro aoSucesso={() => setIsRegistrando(false)} />
      // ... (resto do seu código acima permanece igual)
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Login />
          
          {/* MUDANÇA AQUI: Alteramos para 'row' e centralizamos */}
          <div style={{ 
            marginTop: '20px', 
            display: 'flex', 
            flexDirection: 'row', // Coloca um ao lado do outro
            justifyContent: 'center', 
            alignItems: 'center',
            gap: '10px' 
          }}>
            <button onClick={() => setIsRegistrando(true)} className="btn-link"style={{ padding: '7px', borderRadius: '2px', border: 'none', backgroundColor:'#1e3c72', color: 'white', cursor: 'pointer', fontWeight: 'thin', fontSize: '0.8rem', marginTop: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} >
          {'Cadastre-se aqui'}
          </button>
            
            
            
            <button onClick={() => setIsRecuperando(true)} className="btn-link"style={{ padding: '7px', borderRadius: '2px', border: 'none', backgroundColor:'#1e3c72', color: 'white', cursor: 'pointer', fontWeight: 'thin', fontSize: '0.8rem', marginTop: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} >
          {'Esqueci minha senha'}
          </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
