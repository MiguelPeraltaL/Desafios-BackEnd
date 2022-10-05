const express = require('express')
const http = require('http')
const path = require('path')
const handlebars = require("express-handlebars")
const routProductos = require("./router/routProductos")
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

app.use('/api/productos', routProductos)
app.use('/', routIndex)
const server = http.createServer(app)
initSocket(server)
server.listen(PORT, () => {
    console.log(`Servidor en el puerto: ${PORT}`)
})