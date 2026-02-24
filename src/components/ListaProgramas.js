import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Certifique-se que esta é a ÚNICA vez que 'api' aparece antes da função

function ListaProgramas() {
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    // Aqui usamos a 'api' importada lá em cima
    api.get('/programas')
      .then(res => setProgramas(res.data))
      .catch(err => console.error("Erro ao carregar programas", err));
  }, []);

  return (
    <div className="progam-grid">
      <h2>Meus Programas de Pontos</h2>
      {programas.length === 0 ? <p>Nenhum programa encontrado.</p> : 
        programas.map(p => (
          <div key={p.id} className="progam-item">
            <h4 style={{ margin: 5, fontSize: '16px', color: '#333' }}>
              {p.nome}
            </h4>
          </div>
        ))
      }
    </div>
  );
}

export default ListaProgramas;