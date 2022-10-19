const { createTable, insertProducts, selectProducts } = require('../db/index')

const ejecutardb = async (opcion, parametro) => {

    const save = async (obj) =>{
        try{
            obj.price = parseInt(obj.price)
            obj.stock = parseInt(obj.stock)
            await createTable()
            await insertProducts(obj)
            return obj
        }catch (error) {
            console.log('Error save:', error)
            throw new Error(error.message)
        }
    }

    const getAll = async () =>{
        try{
            const data = await selectProducts()
            return data
        }catch (error) {
            console.log('Error getAll:', error)
            throw new Error(error.message)
        }
    }

    try {
        switch (opcion){
          case 'save':
            let nuevoObjeto = await save(parametro)
            return nuevoObjeto
          case 'getAll':
            let arregloProductos = await getAll()
            return arregloProductos
          default:
            break
        }
    } catch (error) {
      console.log('Error ejecución:', error)
      throw new Error(error.message)
    }
}
module.exports.ejecutardb = ejecutardb