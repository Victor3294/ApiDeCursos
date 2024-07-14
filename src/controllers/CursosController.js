const Curso = require("../models/Curso")

class CursosController {
    async criar (request, response) {
        try {
            const dados = request.body
            if(!dados.nome || !dados.duracao){
                return response.status(400).json({mensagem: "O nome e a duração do curso são obrigatórios"})
            }
            const curso = await Curso.create(dados)
            response.status(201).json(curso)
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel cadastrar o curso"})
        }
    }

    async listarTodos (request,response) {
        try {
            const cursos = await Curso.findAll()
            response.status(200).json(cursos)
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel realizar a busca"})
        }
    }
}

module.exports = new CursosController()