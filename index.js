const minimist = require('minimist')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const http = require('http')
const path = require('path')
const handlebars = require("express-handlebars")
const router = require("./router/index")
const { encryptPassword, isValidPassword } = require('./utils.js')
const cluster = require('cluster')
const os = require('os')

const { initSocket } = require('./socket')
const { Strategy } = require('passport-local')
const Usuario = require('./daos/models/esquemasMongoose.js')

const opts = {
  default: {
    p: 8080,
    m: 'fork'
  },
  alias: {
    p: 'port',
    m: 'mode'
  }
}
const params = minimist(process.argv.slice(2), opts)

const PORT = params.p
const mode = params.m
// const PORT = process.env.PORT || 8080
const HOST = process.env.HOST

if(mode === 'cluster' && cluster.isPrimary){
  console.log(`Principal process.pid ${process.pid}`)
  const numCpus = os.cpus().length
  console.log('CPUs length', numCpus)
  for (let i = 0; i < numCpus; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker killed ${worker.process.pid} | Code ${code} | Signal ${signal}`)
    console.log('Setup new worker...')
    cluster.fork()
  })
} else {

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
        if (!isValidPassword(password, user.password)) {
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
        const { body } = req
        const newUser = {
          ...body,
          password: encryptPassword(password)
        }
        console.log(newUser)
        return Usuario.create(newUser)
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

  app.get('/', (req, res) => {
      res.send(`<h1>Servidor express en ${PORT} - PID ${process.pid} - ${(new Date()).toLocaleString()}</h1>`)
    })
  app.use('/api', router)

  app.get('/datos', (req, res) => {
    console.log(`Here from process ${process.pid} listening in port ${PORT}.`);
    res.send(`<h1>Servidor express en ${PORT} - PID ${process.pid} - ${(new Date()).toLocaleString()}</h1>`)
  })

  app.use((req, res) => {
      res.status(404).json({error: -1, descripcion: `Ruta ${req.url} método ${req.method} no implementada`})
  })

  const server = http.createServer(app)
  initSocket(server)
  server.listen(PORT, () => {
      console.log(`Servidor en el puerto: http://localhost:${PORT}/ from process ${process.pid} in mode ${mode}`)
  })

}