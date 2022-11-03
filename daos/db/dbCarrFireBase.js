var FirebaseAdmin = require("firebase-admin")
const { v4: uuidv4 } = require('uuid')

// var serviceAccount2 = require("../../ecommercecoder-baca7-firebase-adminsdk-ufj6h-7a85b4dc50.json")
// FirebaseAdmin.initializeApp({
// credential: FirebaseAdmin.credential.cert(serviceAccount2)
// })
// console.log('Conectados a Firebase!')

const createCarrito = async (carr) =>{
    try{
        const db = FirebaseAdmin.firestore()
        const query = db.collection('carrito')
        let id = uuidv4()
        let doc = query.doc(id)
        await doc.create(carr)
    }catch (error) {
        console.error('Error createCarrito:', error.message)
        throw new Error(error.message)
    }
}

const selectCarritos = async () =>{
    try{
        const db = FirebaseAdmin.firestore()
        const query = db.collection('carrito')
        const querySnapshot = await query.get()
        let docs = querySnapshot.docs
        const response = docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log('Carritos obtenidos con éxito! ->', response)
        return response
    }catch (error) {
        console.error('Error selectCarritos:', error.message)
        throw new Error(error.message)
    }
}

const selectCarrById = async (id) =>{
    try{
        const db = FirebaseAdmin.firestore()
        const query = db.collection('carrito')
        const doc = query.doc(id)
        const item = await doc.get()
        const response = item.data()
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
        const db = FirebaseAdmin.firestore()
        const query = db.collection('carrito')
        const doc = query.doc(id)
        await doc.update(data)
        console.log(`Carrito ${id} actualizado con éxito!`)
    }catch (error) {
        console.error(`Error updateCarrito: Carrito id ${id} ->`, error.message)
        throw new Error(error.message)
    }
}

const deleteCarrito = async (id) =>{
    try{
        const db = FirebaseAdmin.firestore()
        const query = db.collection('carrito')
        const doc = query.doc(id)
        await doc.delete()
        console.log(`Carrito ${id} eliminado con éxito!`)
    }catch (error) {
        console.error(`Error deleteCarrito: Carrito id ${id} ->`, error.message)
        throw new Error(error.message)
    }
}

module.exports = { createCarrito, selectCarritos, selectCarrById, updateCarrito, deleteCarrito }