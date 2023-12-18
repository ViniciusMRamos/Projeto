const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const UsuarioDAO = require("../model/Usuario")

router.get("/",  async (req, res) => {
    // #swagger.summary = 'Valida as credênciais do usuário'
    let {login, senha} = req.body
    
    const usuario = await UsuarioDAO.buscaLogin(login, senha)
    
    if(usuario){
        let token = jwt.sign({usuario: usuario.login, cargo: usuario.cargo, id: usuario.id}, '123!@#', {expiresIn: '10 min'})
        res.json({logged: true, token: token})
    }else{
        res.status(403).json({logged: false, mensagem: 'Usuario e senha invalidos!'})
    }
})


module.exports = router