const funcIndex = require('../contenedores/carrito.js')
const funcIndex2 = require('../contenedores/carritoFireBase.js')
const funcIndex3 = require('../contenedores/carritoMongoose.js')
const express = require('express')
const { Router } = express
const router = Router()
const dayjs = require('dayjs')

const database = process.env.DATABASE

router.post('/', (req, res) => {
    (async (run) => {
        if(!run) return
        try{
            let ahora = dayjs()
            // const data = { id: 0, timestamp: ahora.format("DD/MM/YYYY HH:mm:ss"), producto: req.body.producto }
            const data = { timestamp: ahora.format("DD/MM/YYYY HH:mm:ss"), producto: req.body.producto }
            // let objetoResultado = await funcIndex.ejecutarCarrito("save", data)
            if(database === "Firebase"){
                let objetoResultado = await funcIndex2.ejecutarCarrFb("save", data)
                res.status(201).json(objetoResultado).end()
            } else if(database === "MongoDb"){
                let objetoResultado = await funcIndex3.ejecutarCarrMng("save", data)
                res.status(201).json(objetoResultado).end()
            }
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
            // let objetoResultado = await funcIndex.ejecutarCarrito("updateById", { idCarro: id.id, idProd: req.body.producto })
            if(database === "Firebase"){
                let objetoResultado = await funcIndex2.ejecutarCarrFb("updateById", { idCarro: id.id, idProd: req.body.producto })
                res.status(200).json(objetoResultado).end()
            } else if(database === "MongoDb"){
                let objetoResultado = await funcIndex3.ejecutarCarrMng("updateById", { idCarro: id.id, idProd: req.body.producto })
                res.status(200).json(objetoResultado).end()
            }
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
            // let objetoResultado = await funcIndex.ejecutarCarrito("getById", parseInt(id.id))
            if(database === "Firebase"){
                let objetoResultado = await funcIndex2.ejecutarCarrFb("getById", id.id)
                res.status(200).json(objetoResultado).end()
            } else if(database === "MongoDb"){
                let objetoResultado = await funcIndex3.ejecutarCarrMng("getById", id.id)
                res.status(200).json(objetoResultado).end()
            }
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
            // let nuevoArray = await funcIndex.ejecutarCarrito("deleteById", parseInt(id.id))
            if(database === "Firebase"){
                let nuevoArray = await funcIndex2.ejecutarCarrFb("deleteById", id.id)
                res.status(200).json(nuevoArray).end()
            } else if(database === "MongoDb"){
                let nuevoArray = await funcIndex3.ejecutarCarrMng("deleteById", id.id)
                res.status(200).json(nuevoArray).end()
            }
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
            // let nuevoArray = await funcIndex.ejecutarCarrito("deleteByIdByProd", ids)
            if(database === "Firebase"){
                let nuevoArray = await funcIndex2.ejecutarCarrFb("deleteByIdByProd", ids)
                res.status(200).json(nuevoArray).end()
            } else if(database === "MongoDb"){
                let nuevoArray = await funcIndex3.ejecutarCarrMng("deleteByIdByProd", ids)
                res.status(200).json(nuevoArray).end()
            }
        }catch (error) {
            console.log('Error router deleteByIdByProd:', error)
            throw new Error(error.message)
        }
    })(true)
})
module.exports = router