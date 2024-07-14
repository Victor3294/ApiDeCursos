const { Op } = require("sequelize")
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

    async buscarCursos (request, response) {
        try {
            const dados = request.query
            let conditions = [];

            if (dados.nome !== undefined && dados.duracao !== undefined) {
                conditions ={ [Op.and] : [{
                    nome: {[Op.like]: `%${dados.nome}%`}
                },
                { duracao: { [Op.eq]: dados.duracao } }
                ]};
            } else if (dados.nome !== undefined) {
                conditions = 
                    {nome: {[Op.like]: `%${dados.nome}%`}}
                ;
            } else if (dados.duracao !== undefined) {
                conditions = 
                { duracao: { [Op.eq]: dados.duracao } }
                ;
            }
                const cursos = await Curso.findAll({
                    where: conditions
                })
                if(cursos.length === 0){
                    return response.status(404).json({mensagem:"Nome e duração não encontrados"})
                }
                response.status(200).json(cursos)
        } catch (error) {
            response.status(500).json({mensagem:"Não foi possivel realizar a busca"})
            console.log(error)
        }
    }

    async atualizarCurso (request, response) {
        try {
            const dados = request.body
            const id = request.params.id
            const curso = await Curso.findByPk(id)
            if(!curso){
                return response.status(404).json({mensagem: "Não foi encontrado um curso com esse id"})
            }
            curso.nome = dados.nome
            curso.duracao = dados.duracao

            await curso.save()
            response.status(200).json(curso)

        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel atualizar o curso"})
        }
    }
}

module.exports = new CursosController()