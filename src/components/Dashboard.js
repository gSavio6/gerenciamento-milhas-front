import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CadastroCartao from './CadastroCartao';
import ListaCartoes from './ListaCartoes';
import CadastroPrograma from './CadastroPrograma';
import RegistrarCompra from './RegistrarCompra';
import ModeracaoCompras from './ModeracaoCompras';
import RelatorioCompras from './RelatorioCompras';

function Dashboard() {
  const [stats, setStats] = useState({ totalPontos: 0, pontosPendentes: 0, totalCartoes: 0 });
  const [chaveAtualizacao, setChaveAtualizacao] = useState(0);
  
  const perfil = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');
  const portalAcesso = localStorage.getItem('portalAcesso');

  const exibirVisaoAdmin = perfil === 'ROLE_ADMIN' && portalAcesso === 'ADMIN';

  const carregarDados = () => {
    if (!token) return;
    api.get('/dashboard')
      .then(res => setStats(res.data))
      .catch(err => {
        if (err.response?.status === 403) {
          localStorage.clear();
          window.location.href = '/login';
        }
      });
    setChaveAtualizacao(prev => prev + 1);
  };

  useEffect(() => {
    if (token) carregarDados();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  if (!token) {
    window.location.href = '/login';
    return null; 
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* BARRA DE NAVEGAÇÃO COM NOME DO PROJETO GAV MILHAS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '15px 30px', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        {/* LOGOTIPO DO SISTEMA */}
        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e3c72' }}>
          GAV <span style={{ color: '#007bff', fontWeight: '400' }}>Milhas</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '0.9rem', color: '#666' }}>Modo: <strong>{exibirVisaoAdmin ? 'Administrador' : 'Cliente'}</strong></span>
          <button 
            onClick={handleLogout}
            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
          >
            Sair do Sistema
          </button>
        </div>
      </div>

      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#333' }}>
          {exibirVisaoAdmin ? '🛡️ Gestão Administrativa' : '👤 Painel do Cliente'}
        </h2>
      </header>

      {exibirVisaoAdmin ? (
        /* VISÃO ADMINISTRADOR */
        <div className="admin-view">
          <div style={{ backgroundColor: '#fff4f4', padding: '25px', borderRadius: '12px', border: '1px solid #f5c6cb' }}>
            <h3 style={{ color: '#721c24', marginBottom: '20px' }}>Configuração de Programas</h3>
            <CadastroPrograma aoSalvar={carregarDados} />
          </div>
          <hr style={{ border: '0.5px solid #eee', margin: '40px 0' }} />
          <ModeracaoCompras aoAtualizar={carregarDados} />
        </div>
      ) : (
        /* VISÃO USUÁRIO */
        <div className="user-view">
          {/* Estatísticas */}
          <div style={{ display: 'flex', gap: '40px', marginBottom: '40px', justifyContent: 'center' }}>
            <div className="card-stat"><h3>Total de Pontos</h3><p>{stats.totalPontos}</p></div>
            <div className="card-stat" style={{ color: 'orange' }}><h3>Pendentes</h3><p>{stats.pontosPendentes}</p></div>
            <div className="card-stat"><h3>Cartões Ativos</h3><p>{stats.totalCartoes}</p></div>
          </div>

          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {/* Coluna de Ações */}
            <div style={{ flex: '1', minWidth: '350px' }}>
              <CadastroCartao aoSalvar={carregarDados} />
              <hr style={{ margin: '25px 0', border: '0.1px solid #eee' }} />
              <RegistrarCompra aoSalvar={carregarDados} />
            </div>

            {/* Coluna Única de Cartões */}
            <div style={{ flex: '1.5', minWidth: '400px' }}>
              <ListaCartoes key={chaveAtualizacao} />
            </div>
          </div>

          <hr style={{ border: '0.5px solid #eee', margin: '40px 0' }} />
          
          <h3 style={{ marginBottom: '20px' }}>Extrato de Movimentações</h3>
          <RelatorioCompras refresh={chaveAtualizacao} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;