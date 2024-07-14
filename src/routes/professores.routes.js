const { Router } = require("express");
const ProfessoresController = require("../controllers/ProfessoresController");

const professoresRoutes = new Router()
professoresRoutes.post('/', ProfessoresController.criar)
professoresRoutes.get('/', ProfessoresController.listarTodos)
professoresRoutes.get('/:id', ProfessoresController.listarUm)

module.exports = professoresRoutes