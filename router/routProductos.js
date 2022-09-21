const funcIndex = require('./productos.js')
const express = require('express')
const { Router } = express
const router = Router()

router.post('/', (req, res) => {
    (async (run) => {
        if(!run) return
        try{
            const data = { id: 0, ...req.body }
            let objetoResultado = await funcIndex.ejecutar("save", data)
            res.status(201).json(objetoResultado).end()
        }catch (error) {
            console.log('Error router getById:', error)
            throw new Error(error.message)
        }
    })(true)
})

router.get('/', (req, res) => {
    (async (run) => {
        if(!run) return
        try{
            let arregloProductos = await funcIndex.ejecutar("getAll")
            res.status(200).json(arregloProductos).end()
        }catch (error) {
            console.log('Error router getAll:', error)
            throw new Error(error.message)
        }
    })(true)
})

router.get('/:id', (req, res) => {
    (async (run) => {
        if(!run) return
        try{
            let id = req.params
            let objetoResultado = await funcIndex.ejecutar("getById", parseInt(id.id))
            res.status(200).json(objetoResultado).end()
        }catch (error) {
            console.log('Error router getById:', error)
            throw new Error(error.message)
        }
    })(true)
})

router.put('/:id', (req, res) => {
    (async (run) => {
        if(!run) return
        try{
            let idParam = req.params
            const data = { id: parseInt(idParam.id), ...req.body }
            let objetoActualizado = await funcIndex.ejecutar("updateById", data)
            res.status(201).json(objetoActualizado).end()
        }catch (error) {
            console.log('Error router getById:', error)
            throw new Error(error.message)
        }
    })(true)
})

router.delete('/:id', (req, res) => {
    (async (run) => {
        if(!run) return
        try{
            let id = req.params
            let nuevoArray = await funcIndex.ejecutar("deleteById", parseInt(id.id))
            res.status(200).json(nuevoArray).end()
        }catch (error) {
            console.log('Error router getById:', error)
            throw new Error(error.message)
        }
    })(true)
})

module.exports = router