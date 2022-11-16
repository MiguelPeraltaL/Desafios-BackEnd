const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const http = require('http')
const path = require('path')
const handlebars = require("express-handlebars")
const routProductos = require("./router/routProductos")
const routCarrito = require("./router/routCarrito")
const routIndex = require("./router/routIndex")
const routProductosTest = require("./router/routProductosTest")
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

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

app.use(session({
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://developer:developer@cluster0.6bjy44b.mongodb.net/sesiones?retryWrites=true&w=majority',
      mongoOptions: advancedOptions,
      ttl: 60,
    }),
    secret: '3biXMV8#m5s7',
    resave: true,
    saveUninitialized: true,
}))

const USERNAME='asd'
const PASSWORD='1234'

const auth = (req, res, next) => {
    const { isAuth } = req.session
    if (isAuth) {
        next()
    } else{
        res.status(403).send('No tienes permiso para estar acá!!!')
    }
}

app.get('/login', (req, res) => {
    res.render("login")
})
  
app.post('/login', (req, res) => {
    // const { username, password } = req.body
    const { username } = req.body
    // if (username === USERNAME && password === PASSWORD) {
        req.session.username = username
        req.session.isAuth = true
        let data = {nombre: username}
        // res.status(200).send('Auth OK')
        res.render("home", data)
    // } else {
    //     res.status(401).send('Username or password invalid!')
    // }
})
  
app.delete('/logout', (req, res) => {
    req.session.destroy(error => {
        if (!error) {
            res.send('Adios')
        } else {
            res.send('Ah ocurrido un error', error.message)
        }
    })
})

app.get('/private', auth, (req, res) => {
    const { username } = req.session
    let data = {nombre: username}
    // res.status(200).send(`Hola ${username}`)
    res.render("home", data)
})

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
app.use('/api/productos-test', routProductosTest)
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