const {Router} = require("express")
const cursosRoutes = require("./cursos.routes")
const professoresRoutes = require("./professores.routes")
const usuariosRoutes = require("./usuarios.routes")

const routes = new Router()
routes.use('/cursos', cursosRoutes)
routes.use('/professores', professoresRoutes)
routes.use('/usuarios', usuariosRoutes)

module.exports = routes