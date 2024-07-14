const Professor = require("../models/Professor")

class ProfessoresController {
    async criar(request, response) {
        try {
            const dados = request.body
            if (!dados.nome || !dados.email || !dados.idade || !dados.materia) {
                return response.status(400).json({ mensagem: "O nome, o email, a idade e a materia que sera lecionada são obrigatorios" })
            }

            let professorExistente = await Professor.findOne({
                where: {
                    email: dados.email
                }
            })
            if (professorExistente) {
                return response.status(409).json({ mensagem: "Email de professor ja cadastrado" })
            }
            const professor = await Professor.create(dados)

            response.status(201).json({
                nome: professor.nome,
                idade: professor.idade,
                materia: professor.materia,
                createdAt: professor.createdAt,
                updatedAt: professor.updatedAt
            })
        } catch (error) {
            response.status(500).json({ mensagem: "Não foi possivel cadastrar o professor" })
            console.log(error)
        }
    }

    async listarTodos (request, response) {
        try {
            const professores = await Professor.findAll()
            response.status(200).json(professores)
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel realizar a busca"})
        }
    }

    async listarUm (request, response) {
        try {
            const id = request.params.id
            const professor = await Professor.findByPk(id)
            if(!professor) {
                return response.status(404).json({mensagem: "Não foi encontrado um professor com esse id"})
            }
            response.status(200).json(professor)
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel realizar a busca"})
        }
    }

    async excluir (request, response) {
        try {
            const id = request.params.id
            const professor = await Professor.findByPk(id)
            if(!professor) {
                return response.status(404).json({mensagem: "Não foi encontrado um professor com esse id"})
            }
            await professor.destroy()
            response.status(204).json()
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel deletar o curso"})
        }
    }

    async atualizar (request, response) {
        try {
            const id = request.params.id
            const dados = request.body
            const professor = await Professor.findByPk(id)
            if(!professor) {
                return response.status(404).json({mensagem: "Não foi encontrado um professor com esse id"})
            }
            if(dados.email !== undefined){
                const professorExistente = await Professor.findOne({
                    where: {
                        email: dados.email
                    }
                })
                if (professorExistente) {
                    return response.status(409).json({ mensagem: "Email de professor ja cadastrado" })
                }
            }
            
            
            professor.nome = dados.nome
            professor.idade = dados.idade
            professor.email = dados.email
            professor.materia = dados.materia

            await professor.save()
            response.status(200).json(professor)
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel atualizar o curso"})
            console.log(error)
        }
    }
}

module.exports = new ProfessoresController()