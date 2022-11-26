const express = require('express')
const { Router } = express
const { createUsuario, selectUserById } = require('../daos/db/dbUsuariosMongo.js')

const router = Router()

const PORT = process.env.PORT

const verifyAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    // res.status(401).json({ message: 'Unauthorized to zone private.' })
    res.redirect('/api/auth/login')
  }
}

router.get('/private', verifyAuth, async (req, res, next) => {
  console.log('req.session.passport', req.session.passport);
  try {
    const user = await selectUserById(req.user.mail)
    // res.json(user)
    let data = {nombre: req.user.mail}
    res.render("home", data)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const user = await createUsuario(body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { params: { id } } = req
    const user = await selectUserById(id)
    if (!user) {
      return res.status(404).end()
    }
    res.json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router