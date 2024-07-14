const { Router } = require("express");
const CursosController = require("../controllers/CursosController");

const cursosRoutes = new Router()

cursosRoutes.post('/', CursosController.criar)
cursosRoutes.get('/', CursosController.listarTodos)

module.exports = cursosRoutes