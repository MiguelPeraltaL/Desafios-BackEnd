const { createProducto, selectProductos, selectProdById, updateProducto, deleteProducto } = require('../daos/db/dbProdMongo.js')

const ejecutarDbMng = async (opcion, parametro) => {

    const noExiste = {error:'Producto no encontrado'}

    const save = async (obj) =>{
        try{
            obj.price = parseInt(obj.price)
            obj.stock = parseInt(obj.stock)
            await createProducto(obj)
            return obj
        }catch (error) {
            console.log('Error save:', error)
            throw new Error(error.message)
        }
    }

    const getAll = async () =>{
        try{
            const data = await selectProductos()
            return data
        }catch (error) {
            console.log('Error getAll:', error)
            throw new Error(error.message)
        }
    }

    const getById = async (id) =>{
        try{
            const objeto = await selectProdById(id)
            if (objeto){
                return objeto
            } else {
                return noExiste
            }
        }catch (error) {
            console.log('Error getById:', error)
            throw new Error(error.message)
        }
    }

    const updateById = async (obj) =>{
        try{
            let data = {"title": obj.title,
            "price": parseInt(obj.price),
            "stock": parseInt(obj.stock),
            "imagen": obj.imagen,
            "timestamp": obj.timestamp}
            await updateProducto(obj.id, data)
            return data
        }catch (error) {
            console.log('Error updateById:', error)
            throw new Error(error.message)
        }
    }

    const deleteById = async (id) =>{
        try{
            await deleteProducto(id)
            let borrado = {estado:'Producto eliminado'}
            return borrado
        }catch (error) {
            console.log('Error deleteById:', error)
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
          case 'getById':
            let arregloProducto = await getById(parametro)
            return arregloProducto
          case 'updateById':
            let updateObjeto = await updateById(parametro)
            return updateObjeto
          case 'deleteById':
            let eliminado = await deleteById(parametro)
            return eliminado
          default:
            break
        }
    } catch (error) {
      console.log('Error ejecución:', error)
      throw new Error(error.message)
    }
}
module.exports.ejecutarDbMng = ejecutarDbMng