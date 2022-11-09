(function () {
    const formMessage = document.getElementById('form-message')
    const inputEmail= document.getElementById('input-email')
    const inputFirstname= document.getElementById('input-firstName')
    const inputLastname= document.getElementById('input-lastName')
    const inputEdad= document.getElementById('input-edad')
    const inputAlias= document.getElementById('input-alias')
    const inputAvatar= document.getElementById('input-avatar')
    const inputMessage = document.getElementById('input-message')
    const listMessages = document.getElementById('list-messages')
    const porcentaje = document.getElementById('porcentaje')
    const tablaProductos = document.getElementById('tabla-productos')

    let messages = []

    const socket = io()

    function showMessage(data) {
        const li = document.createElement('li')
        li.innerHTML = `<p><b style="color:blue">${data.author.id} </b><span style="color:brown">[${data.fecha}] </span>: <span style="color:green">${data.message}</span> <img src=${data.author.avatar} width="20 px"></p>`
        listMessages.appendChild(li)
    }

    function showProducto(data) {
        tablaProductos.innerHTML += `
            <tr>
                <td>${data.id}</td>
                <td>${data.title}</td>
                <td>${data.price}</td>
                <td><img src=${data.imagen} alt=${data.title} width="20 px"></td>
            </tr>
        `
    }

    formMessage.addEventListener('submit', (event) => {
        event.preventDefault()
        const datosAuthor = {
            id: inputEmail.value,
            nombre: inputFirstname.value,
            apellido: inputLastname.value,
            edad: inputEdad.value,
            alias: inputAlias.value,
            avatar: inputAvatar.value
        }
        const data = {
            author: datosAuthor,
            fecha: '',
            message: inputMessage.value,
        }
        socket.emit('new-message', data)
        inputMessage.value = ''
        inputMessage.focus()
    })

    socket.on('connect', () => {
        console.log("Conectado al servidor")
    })

    socket.on('history-messages', (data) => {
        const authorSchema = new normalizr.schema.Entity('autores')
        const messagesSchema = new normalizr.schema.Entity('mensajes', {
        author: authorSchema
        })

        const dataReversed = normalizr.denormalize(data.result, messagesSchema, data.entities)
        messages = [...dataReversed.mensajes]
        
        const sizeNormalized = JSON.stringify(data).length
        const sizeOriginal = JSON.stringify(dataReversed).length
        const resultCompresion = 100 - ((sizeNormalized * 100) / sizeOriginal)
        porcentaje.innerHTML = `Compresión: ${resultCompresion.toFixed(2)}%`

        // messages = data
        listMessages.innerText = ''
        messages.forEach((message) => {
          showMessage(message)
        })
    })

    socket.on('total-productos', (data) => {
        tablaProductos.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Foto</th>
            </tr>
        `
        data.forEach((productos) => {
          showProducto(productos)
        })
    })
    
    socket.on('notification', (data) => {
        messages.push(data)
        showMessage(data)
    })

})();