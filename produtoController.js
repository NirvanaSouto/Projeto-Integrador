const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Funções CRUD para o controlador de produto
exports.getAllProducts = (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json(rows);
  });
};

exports.getProductById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM produtos WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json(row);
  });
};

exports.createProduct = (req, res) => {
  const { nome, descricao, preco, codigoBarras } = req.body;
  db.run(`INSERT INTO produtos (nome, descricao, preco, codigoBarras) VALUES (?, ?, ?, ?)`, [nome, descricao, preco, codigoBarras], function (err) {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json({ id: this.lastID });
  });
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { nome, descricao, preco, codigoBarras } = req.body;
  db.run(`UPDATE produtos SET nome = ?, descricao = ?, preco = ?, codigoBarras = ? WHERE id = ?`, [nome, descricao, preco, codigoBarras, id], function (err) {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json({ changes: this.changes });
  });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM produtos WHERE id = ?`, [id], function (err) {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json({ changes: this.changes });
  });
};
