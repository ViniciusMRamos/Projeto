const UsuarioDAO = require('../model/Usuario')

module.exports = {
    validaCampos: async (req, res, next) => {
        let usuarios = await UsuarioDAO.listar()
        let aux = 0;
        let i = 0;
        while(i < usuarios.length){
            if (usuarios[i].login == req.body.login) {
                res.status(400).json({mensagem: "Esse login já está em uso!"})
                aux = 1;
            } 
            i++;
        }

        if(req.body.login == "" ||  req.body.login == undefined) {
            res.status(400).json({mensagem: "Informe o login corretamente!"})
            aux = 1;
        }        
        if(req.body.senha == "" || req.body.senha == undefined ){
            res.status(400).json({mensagem: "Informe a senha corretamente!"})
            aux = 1;
        }
        if(req.body.cargo != 1 && req.body.cargo != 2 ){
            res.status(400).json({mensagem: "Informe um cargo válido!"})
            aux = 1;
        }

        if(aux == 0){
            next()
        }

    }
}