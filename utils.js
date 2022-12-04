const bcrypt = require('bcrypt')

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

const isValidPassword = (password, target) => {
    return bcrypt.compareSync(password, target)
}

module.exports = { encryptPassword, isValidPassword }