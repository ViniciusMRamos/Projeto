const express = require('express')
const router = express.Router()

const EditoraDAO = require('../model/Editora')
const Auth = require('../helpers/Auth')
const AuthEditora = require('../helpers/AuthEditora')

router.get('/', async (req, res) => {
    let editoras = await EditoraDAO.listarEditora()
    if(editoras.length != 0){        
        res.json({editoras: editoras})
    }else{
        res.json({mensagem: "Sem editora cadastrado!!"})
    }
})

router.post('/', Auth.validaAcesso, Auth.verificaCargo, AuthEditora.validaCampos, async (req, res) => {
    try {
        let editora = await EditoraDAO.cadastrar(req.body.nomeEditora)
        res.json({editora: editora})
    } catch (e) {
        res.status(400).json({mensagem: "Falha ao cadastrar!"})
    }
})

router.put('/:id', Auth.validaAcesso, Auth.verificaCargo, AuthEditora.validaCampos, async (req, res) => {
    if(await EditoraDAO.buscarPorId(req.params.id)){
        try{
            await EditoraDAO.alterar(req.body, req.params.id)
            res.json({mensagem: "Editora alterada com suceso"})
        }catch(e){
            res.status(400).json({mensagem: "Falha ao alterar!!"})
        }
    }else{
        res.status(400).json({mensagem: "ID não encontrado!"})
    }
})

router.delete('/:id', Auth.validaAcesso, Auth.verificaCargo, async (req, res) => {
    if(await EditoraDAO.buscarPorId(req.params.id)){
        try{
            await EditoraDAO.deletar(req.params.id)
            res.json({mensagem: "Editora excluída com suceso"})
        }catch(e){
            res.status(400).json({mensagem: "Falha ao Excluir!!"})
        }
    }else{
        res.status(400).json({mensagem: "ID não encontrado!"})
    }
})


module.exports = router