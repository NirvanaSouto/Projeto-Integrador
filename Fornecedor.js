import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fornecedor = () => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    axios.get('/api/fornecedores')
      .then(response => setFornecedores(response.data))
      .catch(error => console.error('Erro ao buscar fornecedores:', error));
  }, []);

  return (
    <div>
      <h1>Fornecedores</h1>
      <ul>
        {fornecedores.map(fornecedor => (
          <li key={fornecedor.id}>{fornecedor.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Fornecedor;
