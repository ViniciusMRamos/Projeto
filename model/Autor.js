const {AutorModel} = require("./bd")

module.exports = {
    cadastrar: async(nome) => {
        return await AutorModel.create({nomeAutor: nome})
    },

    alterar: async(autor, id) => {
        return await AutorModel.update(autor, {where: {id : id}})
    },

    deletar: async(id) => {
        return await AutorModel.destroy({where: {id: id}})
    },

    listarAutor: async() => {
        return await AutorModel.findAll()
    },

    buscarPorId: async(id) => {
        return await AutorModel.findByPk(id)
    }
    
}