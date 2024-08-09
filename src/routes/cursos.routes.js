const { Router } = require("express");
const CursosController = require("../controllers/CursosController");
const verificarPermissao = require("../middlewares/verificarPermissao");

const cursosRoutes = new Router()

cursosRoutes.post('/', verificarPermissao(['Criar curso']), CursosController.criar)
cursosRoutes.get('/', CursosController.listarTodos)
cursosRoutes.get('/l', CursosController.buscarCursos)
cursosRoutes.put('/:id', CursosController.atualizarCurso)
cursosRoutes.delete('/:id', CursosController.deletarCurso)

module.exports = cursosRoutes