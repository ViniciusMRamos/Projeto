const AutorDAO = require('../model/Autor')

module.exports = {
    validaCampos: async (req, res, next) => {
        let autores = await AutorDAO.listarAutor()
        let aux = 0;
        let i = 0;
        while(i < autores.length){
            if (autores[i].nomeAutor == req.body.nomeAutor) {
                res.status(400).json({mensagem: "Esse autor já está cadastrado!"})
                aux = 1;
            } 
            i++;
        }

        if(req.body.nomeAutor == "" || req.body.nomeAutor == undefined){
            res.status(400).json({mensagem: "Informe o nome do autor corretamente!"})
            aux = 1;
        }

        if(aux == 0){
            next()
        }
        
    }

}