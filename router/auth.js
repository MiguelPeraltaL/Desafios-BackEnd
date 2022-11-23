const express = require('express')
const { Router } = express
const passport = require('passport')

const routerAuth = Router()

const PORT = process.env.PORT

routerAuth.get('/login', (req, res) => {
    res.render("login")
})

routerAuth.get('/registro', (req, res) => {
    res.render("register")
})

routerAuth.post('/sign-in', passport.authenticate('sign-in'),(req, res) => {
  const { user } = req
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: 'Email or password is invalid' })
    return
  }
  res.redirect('http://localhost:' + PORT + '/api/users/private')
})

routerAuth.post('/sign-up', passport.authenticate('sign-up'), (req, res) => {
  const { user } = req
  console.log('register -> user', user)
res.redirect('http://localhost:' + PORT + '/api/users/private')
})

routerAuth.post('/sign-out', (req, res, next) => {
  const { user } = req
  req.logout((error) => {
    if (error) {
      return next(error)
    }
    // setTimeout(()=>{
    //     res.redirect('login')
    // }, 2000)
  })
})

module.exports = routerAuth