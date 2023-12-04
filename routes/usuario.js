const express = require('express')
const router = express.Router()

const UsuarioDAO = require('../model/Usuario')
const Auth = require('../helpers/Auth')
const AuthUsuario = require('../helpers/AuthUsuario')

router.get('/',  async (req, res) => {
    // #swagger.summary = 'Lista os usuários' 
    let usuarios = await UsuarioDAO.listar()
    if(usuarios.length != 0){
        res.json({usuarios: usuarios})
    }else{
        res.json({mensagem: "Sem usuário cadastrado!!"})
    }
})

router.get('/:id', async (req, res) => {
    // #swagger.summary = 'Busca o usuário pelo ID' 
    let usuario = await UsuarioDAO.buscarPorId(req.params.id)
    if(usuario != null){
       res.json({usuario: usuario})
    }else{
        res.status(400).json({mensagem: "ID não encontrado!"})
    }
})

router.post('/', Auth.validaAcesso, Auth.verificaCargo, AuthUsuario.validaCampos, async (req, res) => {
    // #swagger.summary = 'Cadastro do usuário' 
    try{
        let usuario = await UsuarioDAO.cadastrar(req.body)
        res.json({usuario: usuario})
     }catch(e){
        res.status(400).json({mensagem: "Falha ao cadastrar!"})
     }
})

router.put('/:id', AuthUsuario.validaCampos, Auth.validaAcesso, Auth.verificaCargo, async (req, res) => {
    // #swagger.summary = 'Altera o usuário' 
    if(await UsuarioDAO.buscarPorId(req.params.id)){
        try{
            await UsuarioDAO.alterar(req.body, req.params.id)
            res.json({mensagem: "Usuário alterado com suceso"})
        }catch(e){
            res.status(400).json({mensagem: "Falha ao alterar!!"})
        }
    }else{
        res.status(400).json({mensagem: "ID não encontrado!"})
    }
})

router.delete('/:id', Auth.validaAcesso, Auth.verificaCargo, async(req, res) => {
    // #swagger.summary = 'Exclui o usuário' 
    if(await UsuarioDAO.buscarPorId(req.params.id)){
        try{
            await UsuarioDAO.deletar(req.params.id)
            res.json({mensagem: "Usuário excluído com suceso"})
        }catch(e){
            res.status(400).json({mensagem: "Falha ao excluir!!"})
        }
    }else{
        res.status(400).json({mensagem: "ID não encontrado!"})
    }
})

module.exports = router