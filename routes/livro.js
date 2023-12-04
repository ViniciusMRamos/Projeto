var express = require('express');
var router = express.Router();

const Auth = require('../helpers/Auth');
const AuthLivro = require('../helpers/AuthLivro')
const LivroDAO = require('../model/Livro');


router.get('/', async (req, res) => {
  // #swagger.summary = 'Lista os livros'  
  let livros = await LivroDAO.listarLivro()
  if(livros.length != 0){
    res.json({livros: livros})
  }else{
    res.json({mensagem: "Sem livro cadastrado!!"})
  }
})

router.get('/:id', async (req, res) => {
  // #swagger.summary = 'Lista os livros pelo ID do usuário que efetuou o cadastro'  
  let livros = await LivroDAO.listarPorUsuario(req.params.id)
  if(livros.length != 0){
    res.json({livros: livros})
  }else{
    res.json({mensagem: "Usuário não efetuou nenhum cadastro!"})
  }
})

router.post('/', Auth.validaAcesso, AuthLivro.validaCampos, async (req, res) => {
  // #swagger.summary = 'Cadastra o livro'  
  try{
    let  livro = {
      "titulo": req.body.titulo,
      "dataPublicacao": req.body.dataPublicacao,
      "AutorId": req.body.AutorId,
      "EditoraId": req.body.EditoraId,
      "UsuarioId": req.id
    }
    await LivroDAO.cadastrar(livro)
    res.json({livro: livro})
  }catch(e){
    res.status(400).json({mensagem: "Falha ao cadastrar!"})
  }
            
})

router.put('/:id', Auth.validaAcesso, AuthLivro.validaCampos, async (req, res) => {
  // #swagger.summary = 'Altera o livro' 
  if(await LivroDAO.buscarPorId(req.params.id)){
      try{
        if(req.body.UsuarioId){
          res.status(400).json({mensagem: "ID de usuário que cadastrou o livro não pode ser alterado!!"})
        }else{
          await LivroDAO.alterar(req.body, req.params.id)
          res.json({mensagem: "Livro alterado com suceso"})
        }
    }catch(e){
        res.status(400).json({mensagem: "Falha ao alterar!!"})
    }
  }else{
    res.status(400).json({mensagem: "ID não encontrado!"})
  }
})

router.delete('/:id', Auth.validaAcesso, Auth.verificaCargo, async (req, res) => {
  // #swagger.summary = 'Exclui o livro' 
  if(await LivroDAO.buscarPorId(req.params.id)){
      try{
        await LivroDAO.deletar(req.params.id)
        res.json({mensagem: "Livro excluído com suceso"})
    }catch(e){
        res.status(400).json({mensagem: "Falha ao excluir!!"})
    }
  }else{
    res.status(400).json({mensagem: "ID não encontrado!"})
  }
})

module.exports = router;
