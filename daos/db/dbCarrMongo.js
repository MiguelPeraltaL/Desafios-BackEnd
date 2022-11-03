require('./connectionMongoose.js')
const Carrito = require('../models/esquemasMongoose.js')

const createCarrito = async (carr) =>{
    try{
        const carrito = new Carrito(carr)
        const result = await carrito.save()
        return result
    }catch (error) {
        console.error('Error createCarrito:', error.message)
        throw new Error(error.message)
    }
}

const selectCarritos = async () =>{
    try{
        const result = await Carrito.find({}, { _id: 0, __v: 0 })
        return result
    }catch (error) {
        console.error('Error selectCarritos:', error.message)
        throw new Error(error.message)
    }
}

const selectCarrById = async (id) =>{
    try{
        const item = await Carrito.findOne({ _id: id })
        const idCarr = {'id': id}
        const response = Object.assign(idCarr,item.data())
        if (response) {
            console.log(`Carrito ${id} obtenido con éxito! ->`, response)
            return response
        } else {
            console.log(`Carrito ${id} no encontrado`)
        }
    }catch (error) {
        console.error(`Error selectCarrById: Carrito id ${id} ->`, error.message)
        throw new Error(error.message)
    }
}

const updateCarrito = async (id, data) =>{
    try{
        const result = await Carrito.updateOne({ _id: id }, { $set: data })
        console.log(`Carrito ${id} actualizado con éxito!`)
        return result
    }catch (error) {
        console.error(`Error updateCarrito: Carrito id ${id} ->`, error.message)
        throw new Error(error.message)
    }
}

const deleteCarrito = async (id) =>{
    try{
        const result = await Carrito.deleteOne({ _id: id })
        console.log(`Carrito ${id} eliminado con éxito!`)
        return result
    }catch (error) {
        console.error(`Error deleteCarrito: Carrito id ${id} ->`, error.message)
        throw new Error(error.message)
    }
}

module.exports = { createCarrito, selectCarritos, selectCarrById, updateCarrito, deleteCarrito }