const {EditoraModel} = require("./bd")

module.exports = {
    cadastrar: async(nome) => {
        return await EditoraModel.create({nomeEditora: nome})
    },

    alterar: async(editora, id) => {
        return await EditoraModel.update(editora, {where: {id : id}})
    },

    deletar: async(id) => {
        return await EditoraModel.destroy({where: {id: id}})
    },

    listarEditora: async() => {
        return await EditoraModel.findAll()
    },

    buscarPorId: async(id) => {
        return await EditoraModel.findByPk(id)
    }
    
}