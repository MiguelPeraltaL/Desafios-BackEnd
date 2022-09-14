(function (run) {
    if(!run) return
  
    const funcIndex = require('./index')

    const express = require('express')
    const app = express()
    const PORT = 8080
    const server = app.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
    })
    server.on("error", error => console.log(`Error en servidor ${error}`))
  
    app.get('/', (req, res) => {
        res.send(`<h1>Desafio: Servidor con Express</h1>`)
    })

    app.get('/productos', (req, res) => {
        (async (run) => {
            if(!run) return
            try{
                let arregloProductos = await funcIndex.ejecutar("getAll")
                res.send(arregloProductos)
            }catch (error) {
                console.log('Error escritura:', error)
                throw new Error(error.message)
            }
        })(true)
    })

    app.get('/productoRandom', (req, res) => {
        (async (run) => {
            if(!run) return
            try{
                let objetoRandom = await funcIndex.ejecutar("objetoRandom")
                res.send(objetoRandom)
            }catch (error) {
                console.log('Error escritura:', error)
                throw new Error(error.message)
            }
        })(true)
    })
  
  })(true);