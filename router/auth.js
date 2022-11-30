const express = require('express')
const { Router } = express
const passport = require('passport')

const routerAuth = Router()

routerAuth.get('/login', (req, res) => {
    res.render("login")
})

routerAuth.get('/failureLogin', (req, res) => {
  res.render("failureLogin")
})

routerAuth.get('/registro', (req, res) => {
    res.render("register")
})

routerAuth.get('/failureRegister', (req, res) => {
  res.render("failureRegister")
})

routerAuth.post('/sign-in', passport.authenticate('sign-in', {failureRedirect: '/api/auth/failureLogin'}),(req, res) => {
  const { user } = req
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: 'Email or password is invalid' })
    return
  }
  res.redirect('/api/users/private')
})

routerAuth.post('/sign-up', passport.authenticate('sign-up', {failureRedirect: '/api/auth/failureRegister'}), (req, res) => {
  const { user } = req
  console.log('register -> user', user)
  res.redirect('/api/users/private')
})

routerAuth.post('/sign-out', (req, res, next) => {
  const { user } = req
  req.logout((error) => {
    if (error) {
      return next(error)
    }
  })
})

module.exports = routerAuth