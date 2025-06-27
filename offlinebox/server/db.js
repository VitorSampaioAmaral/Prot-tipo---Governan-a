const Datastore = require('nedb');
const path = require('path');

module.exports = {
  alunos: new Datastore({ filename: path.join(__dirname, 'alunos.db'), autoload: true }),
  // Adicione outros bancos conforme necessário (ex: professores, trilhas, etc)
}; 