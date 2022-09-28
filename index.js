const express = require('express')
const { Router } = express
const router = Router()
const routProductos = require('./router/routProductos.js')

const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configuración PUG
app.set('views', './views')
app.set('view engine', 'pug')

// Formulario
app.get('/', (req, res) => {
    res.render('creaProductos')
})

// const PORT = 8080
const PORT = process.env.PORT
const ENV = process.env.NODE_ENV

const server = app.listen(PORT, () => {
    console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
    console.log(`http://localhost:${server.address().port}`)
    console.log(`Environment:${ENV}`)
})

app.use('/api/productos', routProductos)

server.on("error", error => console.log(`Error en servidor ${error}`))