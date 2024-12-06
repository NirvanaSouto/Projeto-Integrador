const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Funções CRUD para o controlador de associação
exports.getProdutosByFornecedor = (req, res) => {
  const fornecedorId = req.params.fornecedorId;
  db.all(`SELECT produtos.* FROM produtos 
          JOIN produtos_fornecedores ON produtos.id = produtos_fornecedores.produtoId 
          WHERE produtos_fornecedores.fornecedorId = ?`, [fornecedorId], (err, rows) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json(rows);
  });
};

exports.getFornecedoresByProduto = (req, res) => {
  const produtoId = req.params.produtoId;
  db.all(`SELECT fornecedores.* FROM fornecedores 
          JOIN produtos_fornecedores ON fornecedores.id = produtos_fornecedores.fornecedorId 
          WHERE produtos_fornecedores.produtoId = ?`, [produtoId], (err, rows) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json(rows);
  });
};

exports.associarProdutoFornecedor = (req, res) => {
  const { produtoId, fornecedorId } = req.body;
  db.run(`INSERT INTO produtos_fornecedores (produtoId, fornecedorId) VALUES (?, ?)`, [produtoId, fornecedorId], function (err) {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json({ id: this.lastID });
  });
};

exports.desassociarProdutoFornecedor = (req, res) => {
  const { produtoId, fornecedorId } = req.body;
  db.run(`DELETE FROM produtos_fornecedores WHERE produtoId = ? AND fornecedorId = ?`, [produtoId, fornecedorId], function (err) {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json({ changes: this.changes });
  });
};
