(function () {
    const formMessage = document.getElementById('form-message')
    const inputFullname= document.getElementById('input-fullname')
    const inputMessage = document.getElementById('input-message')
    const listMessages = document.getElementById('list-messages')
    const tablaProductos = document.getElementById('tabla-productos')

    let messages = []

    const socket = io()

    function showMessage(data) {
        const li = document.createElement('li')
        li.innerHTML = `<p><b style="color:blue">${data.fullname} </b><span style="color:brown">[${data.fecha}] </span>: <span style="color:green">${data.message}</span></p>`
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
        const data = {
            fullname: inputFullname.value,
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
        messages = data
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