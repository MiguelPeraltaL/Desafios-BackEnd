const express = require('express')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const http = require('http')
const path = require('path')
const handlebars = require("express-handlebars")
const routProductos = require("./router/routProductos")
const routCarrito = require("./router/routCarrito")
const routIndex = require("./router/routIndex")
const routProductosTest = require("./router/routProductosTest")
const routAuth = require("./router/auth")
const routUser = require("./router/users")

const { initSocket } = require('./socket')
const { Strategy } = require('passport-local')
const Usuario = require('./daos/models/esquemasMongoose.js')

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.set("views", path.join(__dirname, "views"))
app.engine("handlebars", handlebars.engine())
app.set('view engine', 'handlebars')

///////////////////////////////

passport.use('sign-in', new Strategy({
    usernameField: 'mail',
  }, (mail, password, done) => {
    Usuario.findOne({ mail })
      .then(user => {
        if (!user) {
          console.log(`User with ${mail} not found.`)
          return done(null, false)
        }
        if (password !== user.password) {
          console.log('Invalid Password')
          return done(null, false)
        }
        done(null, user)
      })
      .catch(error => {
        console.log('Error in sign-in', error.message)
        done(error)
      })
  }))
  
  passport.use('sign-up', new Strategy({
    usernameField: 'mail',
    passReqToCallback: true,
  }, (req, mail, password, done) => {
    Usuario.findOne({ mail })
      .then(user => {
        if (user) {
          console.log(`User ${mail} already exists.`)
          return done(null, false)
        }
        return Usuario.create(req.body)
      })
      .then(newUser => {
        console.log(`User ${newUser.mail} registration succesful.`)
        done(null, newUser)
      })
      .catch(error => {
        console.log('Error in sign-up', error.message)
        done(error)
      })
  }))
  
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  
  passport.deserializeUser((_id, done) => {
    Usuario.findOne({ _id })
      .then(user => done(null, user))
      .catch(done)
  })
  
  app.use(session({
    secret: '3!$H4s5K36#s',
    resave: false, 
    saveUninitialized: false,
  }));
  app.use(passport.initialize())
  app.use(passport.session())

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
app.use('/home', routIndex)
app.use('/api/auth', routAuth)
app.use('/api/users', routUser)

app.use((req, res) => {
    res.status(404).json({error: -1, descripcion: `Ruta ${req.url} método ${req.method} no implementada`})
})

const server = http.createServer(app)
initSocket(server)
server.listen(PORT, () => {
    console.log(`Servidor en el puerto: ${PORT}`)
})