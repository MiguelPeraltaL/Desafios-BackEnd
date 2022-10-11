const express = require('express')
const http = require('http')
const path = require('path')
const handlebars = require("express-handlebars")
const routProductos = require("./router/routProductos")
const routCarrito = require("./router/routCarrito")
const routIndex = require("./router/routIndex")
const { initSocket } = require('./socket')

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.set("views", path.join(__dirname, "views"))
app.engine("handlebars", handlebars.engine())
app.set('view engine', 'handlebars')

///////////////////////////////
let isAdmin = true
const validaUsuario = (req, res, next) => {
    if (isAdmin){
        next()
    } else {
        res.status(403).json({error: -1, descripcion: `Ruta ${req.url} método ${req.method} no autorizada`})
    }
}
app.use(validaUsuario)
//////////////////////////////

app.use('/api/productos', routProductos)
app.use('/api/carrito', routCarrito)
app.use('/', routIndex)

app.use((req, res) => {
    res.status(404).json({error: -1, descripcion: `Ruta ${req.url} método ${req.method} no implementada`})
})

const server = http.createServer(app)
initSocket(server)
server.listen(PORT, () => {
    console.log(`Servidor en el puerto: ${PORT}`)
})