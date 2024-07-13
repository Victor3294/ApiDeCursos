const express = require("express")
const cors = require("cors")
const connection = require("./database/connection")
const routes = require("./routes/routes")

const PORT_API = process.env.API_PORT

class Server {
    constructor (server = express()) {
        this.middlewares(server)
        this.database()
        server.use(routes)
        this.initializeServer(server)
    }

    async middlewares (app) {
        console.log("executando middlewares")
        app.use(cors())
        app.use(express.json())
        console.log("middlewares executados")
    }

    async database () {
        try {
            await connection.authenticate()
            console.log("Conexão com o banco de dados realizada com sucesso")
        } catch (error) {
            console.log(error)
        }
    }

    async initializeServer(app){
        app.listen(PORT_API, () => {
            console.log(`Servidor iniciado na porta ${PORT_API}`)
        })
    }
}

module.exports = {Server}