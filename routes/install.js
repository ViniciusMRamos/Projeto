const express = require('express')
const router = express.Router()

const {sequelize} = require('../model/bd');
const AutorDAO = require('../model/Autor');
const EditoraDAO = require('../model/Editora');
const LivroDAO = require('../model/Livro');
const UsuarioDAO = require('../model/Usuario');
  
router.get('/', async function(req, res) {
    await sequelize.sync({force: true})
    let aux = 0

    let usuarios = [{
      "login": "vinicius",
      "senha": "123", 
      "cargo": 1
    },
    {
      "login": "davi",
      "senha": "1234", 
      "cargo": 2
    }]

    for(aux = 0; aux < usuarios.length; aux++){
      await UsuarioDAO.cadastrar(usuarios[aux]);
    }

    let autores = [{
      "nomeAutor": "Paulo Freire"
    },
    {
      "nomeAutor": "Machado de Assis"
    },
    {
      "nomeAutor": "Aluísio Azevedo"
    },
    {
      "nomeAutor": "Manuel Antônio de Almeida"
    },
    {
      "nomeAutor": "Anne Frank"
    }]

    for(aux = 0; aux < autores.length; aux++){
      await AutorDAO.cadastrar(autores[aux].nomeAutor);
    }

    let editoras = [{
      "nomeEditora": "Paz e Terra"
    },
    {
      "nomeEditora": "Livraria Garnier"
    },
    {
      "nomeEditora": "Moderna"
    },
    {
      "nomeEditora": "Grupo Editorial Record"
    }]

    for(aux = 0; aux < editoras.length; aux++){
      await EditoraDAO.cadastrar(editoras[aux].nomeEditora);
    }

    let livros = [{
      "titulo": "Educação como Prática da Liberdade",
      "dataPublicacao": "12/08/1967",
      "AutorId": 1,
      "EditoraId": 1,
      "UsuarioId": 1
    },
    {
      "titulo": "Dom Casmurro",
      "dataPublicacao": "10/07/1899",
      "AutorId": 2,
      "EditoraId": 2,
      "UsuarioId": 1
    },
    {
      "titulo": "O Cortiço",
      "dataPublicacao": "08/04/1890",
      "AutorId": 3,
      "EditoraId": 2,
      "UsuarioId": 1
    },
    {
      "titulo": "Memórias de um Sargento de Milícias",
      "dataPublicacao": "31/06/1853",
      "AutorId": 4,
      "EditoraId": 3,
      "UsuarioId": 1
    },
    {
      "titulo": "Diário de Anne Frank",
      "dataPublicacao": "25/05/1947",
      "AutorId": 5,
      "EditoraId": 4,
      "UsuarioId": 1
    }]

    for(aux = 0; aux < livros.length; aux++){
      await LivroDAO.cadastrar(livros[aux]);
    }

    res.json({ title: 'Instalado com sucesso!!!' });
  });

module.exports = router