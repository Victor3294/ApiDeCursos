const { compareSync } = require("bcryptjs")
const Usuario = require("../models/Usuario")
const { sign } = require("jsonwebtoken")

class UsuarioController {
    async criar(request, response) {
        try {
            const dados = request.body
            if(!dados.nome || !dados.email || !dados.password_hash){
                return response.status(400).json({mensagem: "Nome, email e a senha são dados obrigatorios"})
            }
            const emailExistente = await Usuario.findAll({
                where: {
                    email: dados.email
                }
            })
            if(emailExistente){
                if(emailExistente.length !== 0){
                    return response.status(409).json({mensagem: "Email invalido"})
                }
            }
            
            const usuario = await Usuario.create(dados)
            response.status(201).json(usuario)
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel realizar o cadastro"})
        }
    }

    async login(request, response) {
        try {
            const dados = request.body
            if (!dados.email || !dados.password_hash) {
                return response.status(400).json({ mensagem: "Email e senha são obrigatorios" })
            }

            const usuario = await Usuario.findOne({
                where: {
                    email: dados.email
                }
            })

            if (!usuario) {
                return response.status(404).json({ mensagem: "Email ou senha incorreta" })
            }

            const senhaCorreta = compareSync(dados.password_hash, usuario.password_hash)
            if (!senhaCorreta) {
                return response.status(404).json({ mensagem: "Email ou senha incorreta" })
            }

            const token = sign({
                id: usuario.id
            }, process.env.SECRET_JWT, {
                expiresIn: '1d'
            })

            response.json({
                token: token,
                nome: usuario.nome
            })

        } catch (error) {
            response.status(500).json({ mensagem: "Não foi possivel realizar o login" })
            console.log(error)
        }
    }
}

module.exports = new UsuarioController()