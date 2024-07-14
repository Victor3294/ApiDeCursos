const { Router } = require("express");
const CursosController = require("../controllers/CursosController");

const cursosRoutes = new Router()

cursosRoutes.post('/', CursosController.criar)
cursosRoutes.get('/', CursosController.listarTodos)
cursosRoutes.get('/l', CursosController.buscarCursos)
cursosRoutes.put('/:id', CursosController.atualizarCurso)
cursosRoutes.delete('/:id', CursosController.deletarCurso)

module.exports = cursosRoutes