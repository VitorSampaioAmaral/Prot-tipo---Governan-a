const express = require('express');
const db = require('./db');
const app = express();
const PORT = 4000;

app.use(express.json());

// Exemplo de rota para alunos
app.get('/alunos', (req, res) => {
  db.alunos.find({}, (err, docs) => {
    if (err) return res.status(500).send(err);
    res.json(docs);
  });
});

// Exemplo de rota para adicionar aluno
app.post('/alunos', (req, res) => {
  db.alunos.insert(req.body, (err, newDoc) => {
    if (err) return res.status(500).send(err);
    res.status(201).json(newDoc);
  });
});

app.listen(PORT, () => {
  console.log(`OfflineBox rodando na porta ${PORT}`);
}); 