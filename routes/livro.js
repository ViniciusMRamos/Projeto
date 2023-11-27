var express = require('express');
var router = express.Router();

const Auth = require('../helpers/Auth');
const AuthLivro = require('../helpers/AuthLivro')
const LivroDAO = require('../model/Livro');


router.get('/', async (req, res) => {
  let livros = await LivroDAO.listarLivro()
  if(livros.length != 0){
    res.json({livros: livros})
  }else{
    res.json({mensagem: "Sem livro cadastrado!!"})
  }
})

router.post('/', Auth.validaAcesso, Auth.verificaCargo, AuthLivro.validaCampos, async (req, res) => {
  try{
    let  livro = await LivroDAO.cadastrar(req.body)
    res.json({livro: livro})
  }catch(e){
    res.status(400).json({mensagem: "Falha ao cadastrar!"})
  }
            
})

router.put('/:id', Auth.validaAcesso, Auth.verificaCargo, AuthLivro.validaCampos, async (req, res) => {
  if(await LivroDAO.buscarPorId(req.params.id)){
      try{
        await LivroDAO.alterar(req.body, req.params.id)
        res.json({mensagem: "Livro alterado com suceso"})
    }catch(e){
        res.status(400).json({mensagem: "Falha ao alterar!!"})
    }
  }else{
    res.status(400).json({mensagem: "ID não encontrado!"})
  }
})

router.delete('/:id', Auth.validaAcesso, Auth.verificaCargo, async (req, res) => {
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
