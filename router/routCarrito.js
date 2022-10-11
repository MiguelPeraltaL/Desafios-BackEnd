const funcIndex = require('./carrito.js')
const express = require('express')
const { Router } = express
const router = Router()
const dayjs = require('dayjs')

router.post('/', (req, res) => {
    (async (run) => {
        if(!run) return
        try{
            let ahora = dayjs()
            const data = { id: 0, timestamp: ahora.format("DD/MM/YYYY HH:mm:ss"), producto: req.body.producto }
            let objetoResultado = await funcIndex.ejecutarCarrito("save", data)
            res.status(201).json(objetoResultado).end()
        }catch (error) {
            console.log('Error router post:', error)
            throw new Error(error.message)
        }
    })(true)
})

router.post('/:id', (req, res) => {
    (async (run) => {
        if(!run) return
        try{
            let id = req.params
            let objetoResultado = await funcIndex.ejecutarCarrito("updateById", { idCarro: parseInt(id.id), idProd: req.body.producto })
            res.status(200).json(objetoResultado).end()
        }catch (error) {
            console.log('Error router postById:', error)
            throw new Error(error.message)
        }
    })(true)
})

router.get('/:id', (req, res) => {
    (async (run) => {
        if(!run) return
        try{
            let id = req.params
            let objetoResultado = await funcIndex.ejecutarCarrito("getById", parseInt(id.id))
            res.status(200).json(objetoResultado).end()
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
            let nuevoArray = await funcIndex.ejecutarCarrito("deleteById", parseInt(id.id))
            res.status(200).json(nuevoArray).end()
        }catch (error) {
            console.log('Error router deleteById:', error)
            throw new Error(error.message)
        }
    })(true)
})

router.delete('/:id/productos/:id_prod', (req, res) => {
    (async (run) => {
        if(!run) return
        try{
            let ids = req.params
            let nuevoArray = await funcIndex.ejecutarCarrito("deleteByIdByProd", ids)
            res.status(200).json(nuevoArray).end()
        }catch (error) {
            console.log('Error router deleteByIdByProd:', error)
            throw new Error(error.message)
        }
    })(true)
})

module.exports = router