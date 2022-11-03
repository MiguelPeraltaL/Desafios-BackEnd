const { Server } = require('socket.io')
const axios = require('axios')
const dayjs = require('dayjs')
const { createTable2, insertMessages, selectMessages } = require('./daos/db/dbProdMesMySqlite')

let io

// let ahora = dayjs()

// let messages = [
//     {
//       fullname: 'Bienvenido@coderhouse.com',
//       fecha: ahora.format("DD/MM/YYYY HH:mm:ss"),
//       message: 'Bienvenidos'
//     },
//   ]

let messages = []
const leer = async() =>{
    messages = await selectMessages() 
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
        }, 1000)

        socketCliente.on('new-message', async(data) => {
            let ahora = dayjs()
            data.fecha = ahora.format("DD/MM/YYYY HH:mm:ss")
            messages.push(data)
            await createTable2()
            await insertMessages(data)
            io.emit('notification', data)
        })

        socketCliente.on('disconnection', () => {
            console.log(`Se desconecto el cliente ID: ${socketCliente.id}`)
        })
    })
}

module.exports = { initSocket }