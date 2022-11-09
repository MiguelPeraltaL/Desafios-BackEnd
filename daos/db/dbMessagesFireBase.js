var FirebaseAdmin = require("firebase-admin")
const { v4: uuidv4 } = require('uuid')

// var serviceAccount2 = require("../../ecommercecoder-baca7-firebase-adminsdk-ufj6h-7a85b4dc50.json")
// FirebaseAdmin.initializeApp({
// credential: FirebaseAdmin.credential.cert(serviceAccount2)
// })
// console.log('Conectados a Firebase!')

const createMessage = async (message) =>{
    try{
        const db = FirebaseAdmin.firestore()
        const query = db.collection('mensajes')
        let id = uuidv4()
        let doc = query.doc(id)
        await doc.create(message)
    }catch (error) {
        console.error('Error createMessage:', error.message)
        throw new Error(error.message)
    }
}

const selectMessages = async () =>{
    try{
        const db = FirebaseAdmin.firestore()
        const query = db.collection('mensajes')
        const querySnapshot = await query.get()
        let docs = querySnapshot.docs
        const response = docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log('Mensajes obtenidos con éxito! ->', response)
        return response
    }catch (error) {
        console.error('Error selectMessages:', error.message)
        throw new Error(error.message)
    }
}

module.exports = { createMessage, selectMessages }