const { Router } = require("express");
const ProfessoresController = require("../controllers/ProfessoresController");

const professoresRoutes = new Router()
professoresRoutes.post('/', ProfessoresControllerler.criar)

module.exports = professoresRoutes