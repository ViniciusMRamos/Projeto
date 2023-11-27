const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: './database.sqlite'
})

const UsuarioModel = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cargo: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

const AutorModel = sequelize.define('Autor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeAutor: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

const EditoraModel = sequelize.define('Editora', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeEditora: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

const LivroModel = sequelize.define('Livro', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dataPublicacao: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

LivroModel.belongsTo(AutorModel)
LivroModel.belongsTo(EditoraModel)


module.exports = {
    sequelize: sequelize,
    AutorModel: AutorModel,
    EditoraModel: EditoraModel,
    LivroModel: LivroModel,
    UsuarioModel: UsuarioModel
}