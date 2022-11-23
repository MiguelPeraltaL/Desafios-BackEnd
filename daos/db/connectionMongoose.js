const mongoose = require('mongoose')
const { stringify } = require('uuid')

// mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
//     .then(db => console.log('conexion exitosa'))
//     .catch(err => console.log('error: ', err))

async function connectMongoose() {
    try {
        // const URL = process.env.MONGODB_URI
        const URL = 'mongodb+srv://developer:developer@cluster0.6bjy44b.mongodb.net/usuarios?retryWrites=true&w=majority'
        await mongoose.connect(URL)
        console.log('Base de datos conectada')
    } catch (error) {
        console.error('Problema al intentar conectar a la base de datos', error.message)
    }
}
connectMongoose()