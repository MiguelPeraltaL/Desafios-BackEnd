const { Router } = require('express')
const router = Router()

const productos = require("./productos")
const carrito = require("./carrito")
const productosTest = require("./productosTest")
const auth = require("./auth")
const users = require("./users")
const apiInfo = require("./apiInfo")
const apiRandoms = require("./apiRandoms")

router.use('/auth', auth)
router.use('/users', users)
router.use('/productos', productos)
router.use('/carrito', carrito)
router.use('/productos-test', productosTest)
router.use('/info', apiInfo)
router.use('/', apiRandoms)

module.exports = router