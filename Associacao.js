import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Associacao = () => {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');

  useEffect(() => {
    axios.get('/api/produtos')
      .then(response => setProdutos(response.data))
      .catch(error => console.error('Erro ao buscar produtos:', error));

    axios.get('/api/fornecedores')
      .then(response => setFornecedores(response.data))
      .catch(error => console.error('Erro ao buscar fornecedores:', error));
  }, []);

  const handleAssociar = () => {
    axios.post('/api/associacao', {
      produtoId: produtoSelecionado,
      fornecedorId: fornecedorSelecionado
    })
    .then(() => alert('Produto associado ao fornecedor com sucesso!'))
    .catch(error => console.error('Erro ao associar produto ao fornecedor:', error));
  };

  return (
    <div>
      <h1>Associação Produto/Fornecedor</h1>
      <div>
        <label>Selecione um Produto:</label>
        <select onChange={(e) => setProdutoSelecionado(e.target.value)} value={produtoSelecionado}>
          <option value="">Selecione</option>
          {produtos.map(produto => (
            <option key={produto.id} value={produto.id}>{produto.nome}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Selecione um Fornecedor:</label>
        <select onChange={(e) => setFornecedorSelecionado(e.target.value)} value={fornecedorSelecionado}>
          <option value="">Selecione</option>
          {fornecedores.map(fornecedor => (
            <option key={fornecedor.id} value={fornecedor.id}>{fornecedor.nome}</option>
          ))}
        </select>
      </div>
      <button onClick={handleAssociar}>Associar</button>
    </div>
  );
};

export default Associacao;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Produto from './Produto';
import Fornecedor from './Fornecedor';
import Associacao from './Associacao';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/produtos" element={<Produto />} />
        <Route path="/fornecedores" element={<Fornecedor />} />
        <Route path="/associacao" element={<Associacao />} />
      </Routes>
    </Router>
  );
};


