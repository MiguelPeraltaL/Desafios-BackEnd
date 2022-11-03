const { createCarrito, selectCarritos, selectCarrById, updateCarrito, deleteCarrito } = require('../daos/db/dbCarrFireBase.js')
const { createProducto, selectProductos, selectProdById, updateProducto, deleteProducto } = require('../daos/db/dbProdFireBase.js')

const ejecutarCarrFb = async (opcion, parametro) => {

    const noExiste = {error:'Carrito no encontrado'}

    const save = async (obj) =>{
        try{
            const dataProducto = await selectProdById(obj.producto)
            const newCarrito = {timestamp: obj.timestamp, producto:[dataProducto]}
            await createCarrito(newCarrito)
            return newCarrito
        }catch (error) {
            console.log('Error save:', error)
            throw new Error(error.message)
        }
    }

    const getById = async (id) =>{
        try{
            const objeto = await selectCarrById(id)
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
            const dataProducto = await selectProdById(obj.idProd)
            const carro = await selectCarrById(obj.idCarro)
            const arregloProductoCarro = carro.producto
            arregloProductoCarro.push(dataProducto)
            const newObject = {timestamp:carro.timestamp, producto:arregloProductoCarro}
            await updateCarrito(obj.idCarro, newObject)
            return newObject
        }catch (error) {
            console.log('Error updateById:', error)
            throw new Error(error.message)
        }
    }

    const deleteById = async (id) =>{
        try{
            await deleteCarrito(id)
            let borrado = {estado:'Carrito eliminado'}
            return borrado
        }catch (error) {
            console.log('Error deleteById:', error)
            throw new Error(error.message)
        }
    }

    const deleteByIdByProd = async (id) =>{
        try{
            const carro = await selectCarrById(id.id)
            const productosCarro = carro.producto
            const arregloProductoCarro = productosCarro.filter(p => p.id !== id.id_prod)
            const newObject = {timestamp:carro.timestamp, producto:arregloProductoCarro}
            await updateCarrito(id.id, newObject)
            return newObject
        }catch (error) {
            console.log('Error deleteByIdByProd:', error)
            throw new Error(error.message)
        }
    }

    try {
        switch (opcion){
          case 'save':
            let nuevoObjeto = await save(parametro)
            return nuevoObjeto
          case 'getById':
            let arregloProducto = await getById(parametro)
            return arregloProducto
          case 'updateById':
            let updateObjeto = await updateById(parametro)
            return updateObjeto
          case 'deleteById':
            let eliminado = await deleteById(parametro)
            return eliminado
          case 'deleteByIdByProd':
            let prodEliminado = await deleteByIdByProd(parametro)
            return prodEliminado
          default:
            break
        }
    } catch (error) {
      console.log('Error ejecución:', error)
      throw new Error(error.message)
    }
}
module.exports.ejecutarCarrFb = ejecutarCarrFb