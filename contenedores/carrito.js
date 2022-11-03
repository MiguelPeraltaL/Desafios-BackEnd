const fs = require('fs')
const funcProductos = require('./productos.js')

const ejecutarCarrito = async (opcion, id) => {

    const noExiste = {error:'Carrito no encontrado'}

    async function leerTxt(ruta) {
        try{
            const contenido = await fs.promises.readFile(ruta, 'utf-8')
            return JSON.parse(contenido)
        }catch (error) {
            console.log('Error lectura:', error)
            throw new Error(error.message)
        }
    }
    
    async function escribirTxt(ruta, contenido) {
        try{
            await fs.promises.writeFile(ruta, JSON.stringify(contenido, null, 2), 'utf-8')
        }catch (error) {
            console.log('Error escritura:', error)
            throw new Error(error.message)
        }
    }

    const save = async (obj, ruta) =>{
        try{
            const data = await leerTxt(ruta)
            const dataProducto = await funcProductos.ejecutar("getById", obj.producto)
            if(data.length >= 1){
                let numeroId = data[data.length-1].id
                do {
                    numeroId += 1
                } while (data.some(p => p.id === numeroId))
                obj.id = numeroId
                console.log(`El ID asignado es: ${numeroId}`)
            }else{
                obj.id = 1
                console.log(`El ID asignado es: 1`)
            }
            const newCarrito = {id: obj.id, timestamp: obj.timestamp, producto:dataProducto}
            data.push(newCarrito)
            await escribirTxt(ruta, data)
            return newCarrito
        }catch (error) {
            console.log('Error save:', error)
            throw new Error(error.message)
        }
    }

    const updateById = async (obj, ruta) =>{
        try{
            const data = await leerTxt(ruta)
            const dataProducto = await funcProductos.ejecutar("getById", obj.idProd)
            const newData = []
            let indicador = false
            data.forEach(e => {
                if(e.id === obj.idCarro){
                    const arregloProductoCarro = e.producto
                    arregloProductoCarro.push(dataProducto[0])
                    const newObject = {id:e.id, timestamp:e.timestamp, producto:arregloProductoCarro}
                    newData.push(newObject)
                    indicador = true
                }else{
                    newData.push(e)
                } 
            })
            if(indicador){
                await escribirTxt(ruta, newData)
                return newData
            }else{
                return noExiste
            }
        }catch (error) {
            console.log('Error updateById:', error)
            throw new Error(error.message)
        }
    }

    const getById = async (id, ruta) =>{
        try{
            const data = await leerTxt(ruta)
            const objeto = data.filter(carrito => carrito.id === id)
            if (objeto.length >= 1){
                return objeto[0].producto
            } else {
                return noExiste
            }
        }catch (error) {
            console.log('Error getById:', error)
            throw new Error(error.message)
        }
    }

    const deleteById = async (id, ruta) =>{
        try{
            const data = await leerTxt(ruta)
            const objeto = data.filter(carrito => carrito.id !== id)
            if(data.length !== objeto.length){
                await escribirTxt(ruta, objeto)
                return (objeto)
            }else{
                return noExiste
            }
        }catch (error) {
            console.log('Error deleteById:', error)
            throw new Error(error.message)
        }
    }

    const deleteByIdByProd = async (id, ruta) =>{
        try{
            const data = await leerTxt(ruta)
            const newData = []
            let indicador = false
            data.forEach(e => {
                if(e.id === parseInt(id.id)){
                    console.log('id carrito ok')
                    const productosCarro = e.producto
                    const arregloProductoCarro = productosCarro.filter(p => p.id !== parseInt(id.id_prod))
                    console.log(arregloProductoCarro)
                    const newObject = {id:e.id, timestamp:e.timestamp, producto:arregloProductoCarro}
                    newData.push(newObject)
                    indicador = true
                }else{
                    newData.push(e)
                } 
            })
            if(indicador){
                await escribirTxt(ruta, newData)
                return newData
            }else{
                return noExiste
            }
        }catch (error) {
            console.log('Error deleteByIdByProd:', error)
            throw new Error(error.message)
        }
    }

    try {
        switch (opcion){
          case 'save':
            let nuevoObjeto = save(id, './carrito.txt')
            return nuevoObjeto
          case 'getById':
            let objetoById = await getById(id, './carrito.txt')
            return objetoById
          case 'deleteById':
            let eliminado = await deleteById(id, './carrito.txt')
            return eliminado
          case 'updateById':
            let updateObjeto = await updateById(id, './carrito.txt')
            return updateObjeto
          case 'deleteByIdByProd':
            let prodEliminado = await deleteByIdByProd(id, './carrito.txt')
            return prodEliminado
          default:
            break
        }
    } catch (error) {
      console.log('Error ejecución:', error)
      throw new Error(error.message)
    }
}
module.exports.ejecutarCarrito = ejecutarCarrito