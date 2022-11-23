require('./connectionMongoose.js')
const Usuario = require('../models/esquemasMongoose.js')

const createUsuario = async (user) =>{
    try{
        const usuario = new Usuario(user)
        const result = await usuario.save()
        console.log(result)
        return result
    }catch (error) {
        console.error('Error createUsuario:', error.message)
        throw new Error(error.message)
    }
}

const selectUserById = async (mail) =>{
    try{
        const item = await Usuario.findOne({ mail: mail })
        if (item) {
            const response = {mail: item.mail, password: item.password}
            console.log(`Usuario ${mail} obtenido con éxito! ->`, response)
            return response
        } else {
            console.log(`Usuario ${mail} no encontrado`)
            return false
        }
    }catch (error) {
        console.error(`Error selectUserById: usuario mail ${mail} ->`, error.message)
        throw new Error(error.message)
    }
}

module.exports = { createUsuario, selectUserById }