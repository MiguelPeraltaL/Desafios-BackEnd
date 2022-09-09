const fs = require('fs')

const ejecutar = async (run) => {
    if (!run) return
  
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
            data.push(obj)
            await escribirTxt(ruta, data)
        }catch (error) {
            console.log('Error save:', error)
            throw new Error(error.message)
        }
    }

    const getById = async (id, ruta) =>{
        try{
            const data = await leerTxt(ruta)
            const objeto = data.filter(producto => producto.id === id)
            objeto.length >= 1 ? console.log(objeto) : console.log(`Producto ID ${id} no existe`)
        }catch (error) {
            console.log('Error getById:', error)
            throw new Error(error.message)
        }
    }

    const getAll = async (ruta) =>{
        try{
            const data = await leerTxt(ruta)
            console.log(data)
        }catch (error) {
            console.log('Error getAll:', error)
            throw new Error(error.message)
        }
    }

    const deleteById = async (id, ruta) =>{
        try{
            const data = await leerTxt(ruta)
            const objeto = data.filter(producto => producto.id !== id)
            await escribirTxt(ruta, objeto)
        }catch (error) {
            console.log('Error deleteById:', error)
            throw new Error(error.message)
        }
    }

    const deleteAll = async (ruta) =>{
        try{
            //En el desafio indica que se deben eliminar todos los objetos, 
            //por esta razón preferí sobreescribir el archivo con un arreglo vacio.
            //En caso de haber pedido eliminar el archivo habría utilizado unlink.
            const arrayVacio = []
            await escribirTxt(ruta, arrayVacio)
        }catch (error) {
            console.log('Error deleteAll:', error)
            throw new Error(error.message)
        }
    }
  
    try {
        //El desafío no pide entregar la ruta del archivo como parámetro,  
        //pero creo que es más conveniente porque la función deja de ser  
        //tan específica y se podrían utilizar con archivos de otras rutas.
        const nuevoObjeto = {id:0, title:"Lapiz", price:28, stock:5}
        save(nuevoObjeto, './productos.txt')
        getById(25, './productos.txt')
        getAll('./productos.txt')
        deleteById(27, './productos.txt')
        deleteAll('./productos.txt')
    } catch (error) {
      console.log('Error ejecución:', error)
      throw new Error(error.message)
    }
}
ejecutar(true)