const {Router} = require("express")
const cursosRoutes = require("./cursos.routes")
const professoresRoutes = require("./professores.routes")
const usuariosRoutes = require("./usuarios.routes")
const validaToken = require("../middlewares/validaToken")
const permissoesRoutes = require("./permissoes.routes")

const routes = new Router()
routes.use('/usuarios', usuariosRoutes)
routes.use('/cursos', validaToken , cursosRoutes)
routes.use('/professores', validaToken , professoresRoutes)
routes.use('/permissoes', validaToken , permissoesRoutes)

module.exports = routes