const express = require('express')
const router = express.Router()

const AutorDAO = require('../model/Autor')
const AuthAutor = require('../helpers/AuthAutor')
const Auth = require('../helpers/Auth')

router.get('/', async (req, res) => {
    let autores = await AutorDAO.listarAutor()

    if(autores.length != 0){
        res.json({autores: autores})
    }else{
        res.json({mensagem: "Sem autor cadastrado!!"})
    }

})

router.post('/', Auth.validaAcesso, Auth.verificaCargo, AuthAutor.validaCampos, async (req, res) => {
    try {
        let autor = await AutorDAO.cadastrar(req.body.nomeAutor)
        res.json({autor: autor})
    } catch (e) {
        res.status(400).json({mensagem: "Falha ao cadastrar!"})
    }
})

router.put('/:id', Auth.validaAcesso, Auth.verificaCargo, AuthAutor.validaCampos, async (req, res) => {
    if(await AutorDAO.buscarPorId(req.params.id)){
        try{
            await AutorDAO.alterar(req.body, req.params.id)
            res.json({mensagem: "Usuário alterado com suceso"})
        }catch(e){
            res.status(400).json({mensagem: "Falha ao alterar!!"})
        }
    }else{
        res.status(400).json({mensagem: "ID não encontrado!"})
    }
})

router.delete('/:id', Auth.validaAcesso, Auth.verificaCargo, async (req, res) => {
    if(await AutorDAO.buscarPorId(req.params.id)){
        try{
            await AutorDAO.deletar(req.params.id)
            res.json({mensagem: "Autor excluído com suceso"})
        }catch(e){
            res.status(400).json({mensagem: "Falha ao Excluir!!"})
        }
    }else{
        res.status(400).json({mensagem: "ID não encontrado!"})
    }
})


module.exports = router
