const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const UsuarioDAO = require('../model/Usuario')

router.get("/",  async (req, res) => {
    let usuarios = await UsuarioDAO.listar()
    let aux = 1;
    let i = 0;
   
    while(i < usuarios.length){
        if (usuarios[i].login == req.body.login && usuarios[i].senha == req.body.senha) {
            let token = jwt.sign({usuario: usuarios[i].login, cargo: usuarios[i].cargo}, '123!@#', {expiresIn: '10 min'})
            res.json({logged: true, token: token})
            aux = 0;
        } 
        i++;
    }
    if (aux == 1) res.status(403).json({logged: false, mensagem: 'Usuario e senha invalidos!'})
    
})


module.exports = router