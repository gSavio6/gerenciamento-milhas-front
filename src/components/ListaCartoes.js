import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Certifique-se que esta é a ÚNICA vez que 'api' aparece antes da função

function ListaCartoes() {
  const [cartoes, setCartoes] = useState([]);

  useEffect(() => {
    // Aqui usamos a 'api' importada lá em cima
    api.get('/cartoes')
      .then(res => setCartoes(res.data))
      .catch(err => console.error("Erro ao carregar cartões", err));
  }, []);

  return (
    <div className="cards-grid">
      <h2>Meus Cartões</h2>
      {cartoes.length === 0 ? <p>Nenhum cartão encontrado.</p> : 
        cartoes.map(c => (
          <div key={c.id} className="card-item">
            <h3>{c.nomePersonalizado}</h3>
            <p>Bandeira: {c.bandeira}</p>
          </div>
        ))
      }
    </div>
  );
}

export default ListaCartoes;