const { Router } = require('express')
const routerIndex = Router()

routerIndex.get('/', (req, res) => {
    res.render("home")
})

module.exports = routerIndex