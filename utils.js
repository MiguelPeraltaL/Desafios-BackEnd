const bcrypt = require('bcrypt')

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

const isValidPassword = (password, target) => {
    return bcrypt.compareSync(password, target)
}

module.exports = { encryptPassword, isValidPassword }

// let clave = "holactm123"
// let clave2 = "holactm123"
// let claveEncriptada = encryptPassword(clave)
// console.log('Clave encriptada', claveEncriptada)
// if (!isValidPassword(clave2, claveEncriptada)) {
//     console.log('Invalid Password')
// } else {
//     console.log('OK Password')
// }