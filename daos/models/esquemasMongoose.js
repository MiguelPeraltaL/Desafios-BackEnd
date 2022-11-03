const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imagen: { type: String, required: true },
    timestamp: { type: String, required: true }
});

const carritoSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    producto: { type: Array, required: true }
});

const Producto = mongoose.model('Producto', productoSchema)
const Carrito = mongoose.model('Carrito', carritoSchema)

// module.exports = Producto

module.exports = { Producto, Carrito }