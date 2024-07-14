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
}

module.exports = new CursosController()