const funcIndex = require('../contenedores/productos.js')
const funcIndex2 = require('../contenedores/productosdb.js')
const funcIndex3 = require('../contenedores/productosFireBase.js')
const funcIndex4 = require('../contenedores/productosMongoose.js')
const express = require('express')
const { Router } = express
const router = Router()
const dayjs = require('dayjs')

// let database = "Firebase"
const database = process.env.DATABASE

router.post('/', (req, res) => {
    (async (run) => {
        if(!run) return
        try{
            let ahora = dayjs()
            // const data = { id: 0, timestamp: ahora.format("DD/MM/YYYY HH:mm:ss"), ...req.body }
            const data = { timestamp: ahora.format("DD/MM/YYYY HH:mm:ss"), ...req.body }
            // let objetoResultado = await funcIndex.ejecutar("save", data)
            // let objetoResultado = await funcIndex2.ejecutardb("save", data)
            if(database === "Firebase"){
                let objetoResultado = await funcIndex3.ejecutarDbFb("save", data)
                res.status(201).json(objetoResultado).end()
            } else if(database === "MongoDb"){
                let objetoResultado = await funcIndex4.ejecutarDbMng("save", data)
                res.status(201).json(objetoResultado).end()
            }
            // res.status(201).json(objetoResultado).end()
            // res.redirect("http://localhost:8080/")
        }catch (error) {
            console.log('Error router post:', error)
            throw new Error(error.message)
        }
    })(true)
})

router.get('/', (req, res) => {
    (async (run) => {
        if(!run) return
        try{
            // let arregloProductos = await funcIndex.ejecutar("getAll")
            // let arregloProductos = await funcIndex2.ejecutardb("getAll")
            if(database === "Firebase"){
                let arregloProductos = await funcIndex3.ejecutarDbFb("getAll")
                res.status(200).json(arregloProductos).end()
            } else if(database === "MongoDb"){
                let arregloProductos = await funcIndex4.ejecutarDbMng("getAll")
                res.status(200).json(arregloProductos).end()
            }
            // res.render('verProductos', { arregloProductos })
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
            // let objetoResultado = await funcIndex.ejecutar("getById", parseInt(id.id))
            if(database === "Firebase"){
                let objetoResultado = await funcIndex3.ejecutarDbFb("getById", id.id)
                res.status(200).json(objetoResultado).end()
            } else if(database === "MongoDb"){
                let objetoResultado = await funcIndex4.ejecutarDbMng("getById", id.id)
                res.status(200).json(objetoResultado).end()
            }
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
            let ahora = dayjs()
            const data = { id: idParam.id, timestamp: ahora.format("DD/MM/YYYY HH:mm:ss"), ...req.body }
            // let objetoActualizado = await funcIndex.ejecutar("updateById", data)
            if(database === "Firebase"){
                let objetoActualizado = await funcIndex3.ejecutarDbFb("updateById", data)
                res.status(201).json(objetoActualizado).end()
            } else if(database === "MongoDb"){
                let objetoActualizado = await funcIndex4.ejecutarDbMng("updateById", data)
                res.status(201).json(objetoActualizado).end()
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
            // let nuevoArray = await funcIndex.ejecutar("deleteById", parseInt(id.id))
            if(database === "Firebase"){
                let nuevoArray = await funcIndex3.ejecutarDbFb("deleteById", id.id)
                res.status(200).json(nuevoArray).end()
            } else if(database === "MongoDb"){
                let nuevoArray = await funcIndex4.ejecutarDbMng("deleteById", id.id)
                res.status(200).json(nuevoArray).end()
            }
        }catch (error) {
            console.log('Error router getById:', error)
            throw new Error(error.message)
        }
    })(true)
})
module.exports = router