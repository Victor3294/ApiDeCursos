const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const { hashSync } = require("bcryptjs");
const Permissao = require("./Permissao");
const UsuarioPermissoes = require("./UsuarioPermissao")

const Usuario = connection.define('usuarios', {
    nome: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password_hash:{
        type: DataTypes.STRING
    }
}) 

Usuario.belongsToMany(Permissao, {through: UsuarioPermissoes,
    foreignKey: 'usuarioId',
    otherKey: 'permissaoId'
})

Usuario.beforeSave((user) => {
    user.password_hash = hashSync(user.password_hash)
    return user
})

module.exports = Usuario