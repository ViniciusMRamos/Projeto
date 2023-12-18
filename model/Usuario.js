const {UsuarioModel} = require('./bd')

module.exports = {
    cadastrar: async(usuario) => {
        return await UsuarioModel.create(usuario)
    },

    alterar: async(usuario, id) => {
        return await UsuarioModel.update(usuario, {where: {id: id}})
    },

    deletar: async(id) => {
        return await UsuarioModel.destroy({where: {id: id}})
    },
    
    listar: async() => {
        return await UsuarioModel.findAll()
    },

    buscarPorId: async(id) => {
        return await UsuarioModel.findByPk(id)
    },

    buscaLogin: async function (login, senha) {
        return await UsuarioModel.findOne({
            where: {
            login: login,
            senha: senha
        }});
    }
   
}