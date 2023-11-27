const jwt = require('jsonwebtoken')
const UsuarioDAO = require('../model/Usuario')

module.exports = {
    validaAcesso: (req, res, next) => {
        let beartoken = req.headers['authorization'] || ""
        let token = beartoken.split(" ")
        if (token[0] == 'Bearer') {
            token = token[1]
        }
        
        jwt.verify(token, '123!@#', (err, obj) => {
            if (err) {
                res.status(403).json({mensagem: "Token invalido, acesso negado"})}
            else {
                req.usuario = obj.usuario
                next()
            }
        })
    }, 

    verificaCargo: async (req, res, next) => {
        let usuarios = await UsuarioDAO.listar()
        let i = 0;
        while(i < usuarios.length){
            if (usuarios[i].login == req.usuario && usuarios[i].cargo == 1) {
                next()
            } 
            i++;
        }
        res.status(403).json({mensagem: "Usuário não tem cargo para fazer edições!"})
    }
}