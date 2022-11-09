var FirebaseAdmin = require("firebase-admin")
const { v4: uuidv4 } = require('uuid')

var serviceAccount = require("../../ecommercecoder-baca7-firebase-adminsdk-ufj6h-7a85b4dc50.json")
FirebaseAdmin.initializeApp({
credential: FirebaseAdmin.credential.cert(serviceAccount)
})
console.log('Conectados a Firebase!')

const createProducto = async (prod) =>{
    try{
        const db = FirebaseAdmin.firestore()
        const query = db.collection('productos')
        let id = uuidv4()
        let doc = query.doc(id)
        await doc.create(prod)
    }catch (error) {
        console.error('Error createProducto:', error.message)
        throw new Error(error.message)
    }
}

const selectProductos = async () =>{
    try{
        const db = FirebaseAdmin.firestore()
        const query = db.collection('productos')
        const querySnapshot = await query.get()
        let docs = querySnapshot.docs
        const response = docs.map(doc => ({ id: doc.id, ...doc.data() }))
        // console.log('Productos obtenidos con éxito! ->', response)
        return response
    }catch (error) {
        console.error('Error selectProductos:', error.message)
        throw new Error(error.message)
    }
}

const selectProdById = async (id) =>{
    try{
        const db = FirebaseAdmin.firestore()
        const query = db.collection('productos')
        const doc = query.doc(id)
        const item = await doc.get()
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
        const db = FirebaseAdmin.firestore()
        const query = db.collection('productos')
        const doc = query.doc(id)
        await doc.update(data)
        console.log(`Producto ${id} actualizado con éxito!`)
    }catch (error) {
        console.error(`Error updateProducto: producto id ${id} ->`, error.message)
        throw new Error(error.message)
    }
}

const deleteProducto = async (id) =>{
    try{
        const db = FirebaseAdmin.firestore()
        const query = db.collection('productos')
        const doc = query.doc(id)
        await doc.delete()
        console.log(`Producto ${id} eliminado con éxito!`)
    }catch (error) {
        console.error(`Error deleteProducto: producto id ${id} ->`, error.message)
        throw new Error(error.message)
    }
}

module.exports = { createProducto, selectProductos, selectProdById, updateProducto, deleteProducto }