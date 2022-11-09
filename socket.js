const { Server } = require('socket.io')
const axios = require('axios')
const dayjs = require('dayjs')
// const { createTable2, insertMessages, selectMessages } = require('./daos/db/dbProdMesMySqlite')
const { createMessage, selectMessages } = require('./daos/db/dbMessagesFireBase.js')
const { schema, normalize, denormalize } = require('normalizr')

let io

const authorSchema = new schema.Entity('autores')

const messagesSchema = new schema.Entity('mensajes', {
  author: authorSchema
})

let messages = []
const leer = async() =>{
    let arregloMensajes = await selectMessages()
    const objetoMensaje = {
        id:'mensajes',
        mensajes: arregloMensajes
    }
    messages = normalize(objetoMensaje, messagesSchema)
    // messages = await selectMessages()
}
leer()

function initSocket(httpServer) {
    io = new Server(httpServer)
    setEvent(io)
}

function setEvent(io){
    io.on('connection', (socketCliente) => {
        console.log(`Se conecto nuevo cliente ID: ${socketCliente.id}`)

        socketCliente.emit('history-messages', messages)

        var data = ''
        var config = {
            method: 'get',
            url: 'http://localhost:8080/api/productos',
            data: data
        }
        setInterval(async ()=>{
            let response = await axios(config)
            socketCliente.emit('total-productos', response.data)
        }, 5000)

        socketCliente.on('new-message', async(data) => {
            let ahora = dayjs()
            data.fecha = ahora.format("DD/MM/YYYY HH:mm:ss")
            messages.push(data)
            // await createTable2()
            // await insertMessages(data)
            await createMessage(data)
            io.emit('notification', data)
        })

        socketCliente.on('disconnection', () => {
            console.log(`Se desconecto el cliente ID: ${socketCliente.id}`)
        })
    })
}

module.exports = { initSocket }