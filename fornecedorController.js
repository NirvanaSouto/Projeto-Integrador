const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Funções CRUD para o controlador de fornecedor
exports.getAllFornecedores = (req, res) => {
  db.all("SELECT * FROM fornecedores", [], (err, rows) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json(rows);
  });
};

exports.getFornecedorById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM fornecedores WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json(row);
  });
};

exports.createFornecedor = (req, res) => {
  const { nome, cnpj, endereco, contato } = req.body;
  db.run(`INSERT INTO fornecedores (nome, cnpj, endereco, contato) VALUES (?, ?, ?, ?)`, [nome, cnpj, endereco, contato], function (err) {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json({ id: this.lastID });
  });
};

exports.updateFornecedor = (req, res) => {
  const id = req.params.id;
  const { nome, cnpj, endereco, contato } = req.body;
  db.run(`UPDATE fornecedores SET nome = ?, cnpj = ?, endereco = ?, contato = ? WHERE id = ?`, [nome, cnpj, endereco, contato, id], function (err) {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json({ changes: this.changes });
  });
};

exports.deleteFornecedor = (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM fornecedores WHERE id = ?`, [id], function (err) {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json({ changes: this.changes });
  });
};
