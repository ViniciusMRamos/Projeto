const {LivroModel} = require("./bd")

module.exports = {
    cadastrar: async(livro) => {
        return await LivroModel.create(livro)
    },

    alterar: async(livro, id) => {
        return await LivroModel.update(livro, {where: {id: id}})
    },

    deletar: async(id) => {
        return await LivroModel.destroy({where: {id: id}})
    },

    listarLivro: async() => {
        return await LivroModel.findAll()
    },
    
    listarPorUsuario: async(id) => {
        return await LivroModel.findAll({where: {UsuarioId: id}})
    },

    buscarPorId: async(id) => {
        return await LivroModel.findByPk(id)
    }   
    
}
