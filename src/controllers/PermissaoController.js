const Permissao = require("../models/Permissao")
const Usuario = require("../models/Usuario")

class PermissaoController {
    async criar (request, response) {
        try {
            console.log(request.userId)
            const descricao = request.body
            const permissao = await Permissao.create(descricao)
            return response.status(201).json(permissao)
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel criar a permissao"})
            console.log(error)
        }
    }

    async listarTodos (request, response) {
        try {
            const permissoes = await Permissao.findAll()
            response.json(permissoes)
        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao listar as permissoes'
            })
        }
    }
   
    async deletar(request, response) {
        try {
            const id = request.params.id
            const permissao = await Permissao.findByPk(id)
            if(!permissao){
                return response.status(404).json({mensagem: "Não foi encontrado uma permissão com esse id"})
            }
            await permissao.destroy()
            return response.status(204).json()
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel deletar a permissão"})
            console.log(error)
        }
    }

    async atribuirPermissao (request, response) {
        try {
            const {usuarioId, permissaoId} = request.body
            const usuario = await Usuario.findByPk(usuarioId)
            const permissao = await Permissao.findByPk(permissaoId)
            if(!usuario || !permissao ){
                return response.status(404).json({mensagem: "Usuario ou permissão não encontrados"})
            }
            await usuario.addPermissoes(permissao)
            response.status(204).json()
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel atribuir a permissão"})
            console.log(error)
        }
    }

   
}

module.exports = new PermissaoController()