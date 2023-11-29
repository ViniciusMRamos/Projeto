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
                req.cargo = obj.cargo
                next()
            }
        })
    }, 

    verificaCargo: async (req, res, next) => {
        if(req.cargo == 1){
            next()
        }else{
            res.status(403).json({mensagem: "Usuário não tem cargo para fazer edições!"})
        }
    }
}