require('./connectionMongoose.js')
const Producto = require('../models/esquemasMongoose.js')

// const producto = new Producto({
//     title: 'prueba',
//     price: 321,
//     stock: 321,
//     imagen: 'https://prueba.png',
//     timestamp: '25/09/2022 10:35:38'
//   })
// producto.save()

const createProducto = async (prod) =>{
    try{
        const producto = new Producto(prod)
        const result = await producto.save()
        return result
    }catch (error) {
        console.error('Error createProducto:', error.message)
        throw new Error(error.message)
    }
}

const selectProductos = async () =>{
    try{
        const result = await Producto.find({}, { _id: 0, __v: 0 })
        return result
    }catch (error) {
        console.error('Error selectProductos:', error.message)
        throw new Error(error.message)
    }
}

const selectProdById = async (id) =>{
    try{
        const item = await Producto.findOne({ _id: id })
        const idProd = {'id': id}
        const response = Object.assign(idProd,item.data())
        if (response) {
            console.log(`Producto ${id} obtenido con éxito! ->`, response)
            return response
        } else {
            console.log(`Producto ${id} no encontrado`)
        }
    }catch (error) {
        console.error(`Error selectProdById: producto id ${id} ->`, error.message)
        throw new Error(error.message)
    }
}

const updateProducto = async (id, data) =>{
    try{
        const result = await Producto.updateOne({ _id: id }, { $set: data })
        console.log(`Producto ${id} actualizado con éxito!`)
        return result
    }catch (error) {
        console.error(`Error updateProducto: producto id ${id} ->`, error.message)
        throw new Error(error.message)
    }
}

const deleteProducto = async (id) =>{
    try{
        const result = await Producto.deleteOne({ _id: id })
        console.log(`Producto ${id} eliminado con éxito!`)
        return result
    }catch (error) {
        console.error(`Error deleteProducto: producto id ${id} ->`, error.message)
        throw new Error(error.message)
    }
}

module.exports = { createProducto, selectProductos, selectProdById, updateProducto, deleteProducto }