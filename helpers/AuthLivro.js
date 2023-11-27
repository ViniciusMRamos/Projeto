const AutorDAO = require('../model/Autor');
const EditoraDAO = require('../model/Editora');

module.exports = {
    validaCampos : async (req, res, next) =>{
        let aux = 0;
        if(!await AutorDAO.buscarPorId(req.body.AutorId)){
            res.status(400).json({mensagem: "Informe um ID válido para o Autor!"})
            aux = 1;
        }
        if(!await EditoraDAO.buscarPorId(req.body.EditoraId)) {
            res.status(400).json({mensagem: "Informe um ID válido para a Editora!"})
            aux = 1;
        }

        if(req.body.titulo == "" || req.body.titulo == undefined){
            res.status(400).json({mensagem: "Informe o titulo corretamente!"})
            aux = 1;
        }

        if(req.body.dataPublicacao == "" || req.body.dataPublicacao == undefined){
            res.status(400).json({mensagem: "Informe a data de publicação corretamente!"})
            aux = 1;
        }

        if(req.body.AutorId == "" || req.body.AutorId == undefined){
            res.status(400).json({mensagem: "Informe o ID do autor corretamente!"})
            aux = 1;
        }

        if(req.body.EditoraId == "" || req.body.EditoraId == undefined){
            res.status(400).json({mensagem: "Informe o ID da editora corretamente!"})
            aux = 1;
        }
        
        if(aux == 0){
            next()
        }      

    }
}