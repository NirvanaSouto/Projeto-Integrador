import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Produto = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('/api/produtos')
      .then(response => setProdutos(response.data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  return (
    <div>
      <h1>Produtos</h1>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>{produto.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Produto;
