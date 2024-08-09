const Permissao = require("../models/Permissao")
const Usuario = require("../models/Usuario")

const verificarPermissao = (permissoesRequiridas) => {
    return async (request, response, next) => {
        try {
            const { usuarioId } = request

            const usuario = await Usuario.findByPk(usuarioId, {
                include: {
                    model: Permissao,
                    through: {
                            attributes: []
                    }
                }
            })

            const permissoesUsuario = usuario.permissoes.map(p => p.descricao)
            const temPermissao = permissoesRequiridas.every(permissao => permissoesUsuario.includes(permissao))
            
            if(!temPermissao){
                return response.status(401).json({mensagem: 'Usuario não tem uma ou mais permissões'})
            }

            next()
        } catch (error) {
            response.status(500).json({mensagem: "requisição falhou"})
        }   
    }
}

module.exports = verificarPermissao