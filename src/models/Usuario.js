const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const { hashSync } = require("bcryptjs");

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

Usuario.beforeSave((user) => {
    user.password_hash = hashSync(user.password_hash)
    return user
})

module.exports = Usuario