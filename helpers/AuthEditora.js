const EditoraDAO = require('../model/Editora')

module.exports = {
    validaCampos: async (req, res, next) => {
        let editoras = await EditoraDAO.listarEditora()
        let aux = 0;
        let i = 0;
        while(i < editoras.length){
            if (editoras[i].nomeEditora == req.body.nomeEditora) {
                res.status(400).json({mensagem: "Essa editora já está cadastrado!"})
                aux = 1;
            } 
            i++;
        }

        if(req.body.nomeEditora == "" || req.body.nomeEditora == undefined){
            res.status(400).json({mensagem: "Informe o nome da editora corretamente!"})
            aux = 1;
        }

        if(aux == 0){
            next()
        }
    }

}