const productoFake = require('../contenedores/productosTest.js')
const { Router } = require('express')
const routerProdTest = Router()

routerProdTest.get('/', (req, res) => {
    let resultadoFaker = productoFake.generarProductoFake()
    res.status(201).json(resultadoFaker).end()
})

module.exports = routerProdTest