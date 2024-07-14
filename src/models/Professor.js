const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Professor = connection.define('professores', {
    nome: {
        type: DataTypes.STRING(100)
    },
    email: {
        unique: true,
        type: DataTypes.STRING
    },
    idade: {
        type: DataTypes.INTEGER
    },
    materia: {
        type: DataTypes.STRING(40)
    }
})