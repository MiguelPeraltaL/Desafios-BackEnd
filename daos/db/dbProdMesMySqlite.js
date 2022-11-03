/*const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'coderhouse'
    }
});*/

const knex = require('knex')

const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'coderhouse'
    },
}

const options2 = {
    client: 'sqlite3',
    connection: {
      filename: './ecommerce.sqlite'
    },
  }

//////////////////////// MySQL ////////////////////////

const createTable = async () =>{
    const knexInstance = knex(options)
    try{
        const exist = await knexInstance.schema.hasTable('productos')
        if(exist) {
            console.log('La tabla productos ya existe.')
            return
        }
        await knexInstance.schema.createTable('productos', (table) => {
            table.increments('id').notNullable().comment('Auto-generated id')
            table.timestamp('timestamp').notNullable()
            table.string('title', 20).notNullable()
            table.float('price').notNullable()
            table.integer('stock').notNullable()
            table.string('imagen', 255).notNullable()
            table.primary('id')
        })
        console.log('Tabla productos creada.')
    }catch (error) {
        console.log('Error createTable:', error)
        throw new Error(error.message)
    } finally {
        knexInstance.destroy()
    }
}

const insertProducts = async (product) =>{
    const knexInstance = knex(options)
    try{
        await knexInstance('productos').insert(product)
        console.log('Producto creado con exito')
    }catch (error) {
        console.log('Error insertProducts:', error)
        throw new Error(error.message)
    } finally {
        knexInstance.destroy()
    }
}

const selectProducts = async () =>{
    const knexInstance = knex(options)
    try{
        const exist = await knexInstance.schema.hasTable('productos')
        if(exist) {
            const rows = await knexInstance('productos').select('*')
            // console.log('Productos encontrados:', rows.length)
            return rows
        } else {
            return
        }
    }catch (error) {
        console.log('Error selectProducts:', error)
        throw new Error(error.message)
    } finally {
        knexInstance.destroy()
    }
}

/////////////////////// SQLite3 ///////////////////////

const createTable2 = async () =>{
    const knexInstance = knex(options2)
    try{
        const exist = await knexInstance.schema.hasTable('mensajes')
        if(exist) {
            console.log('La tabla mensajes ya existe.')
            return
        }
        await knexInstance.schema.createTable('mensajes', (table) => {
            table.increments('id').notNullable().comment('Auto-generated id')
            table.string('fullname', 25).notNullable()
            table.timestamp('fecha').notNullable()
            table.string('message', 255).notNullable()
            table.primary('id')
        })
        console.log('Tabla mensajes creada.')
    }catch (error) {
        console.log('Error createTable2:', error)
        throw new Error(error.message)
    } finally {
        knexInstance.destroy()
    }
}

const insertMessages = async (mensaje) =>{
    const knexInstance = knex(options2)
    try{
        await knexInstance('mensajes').insert(mensaje)
        console.log('Mensaje creado con exito')
    }catch (error) {
        console.log('Error insertMessages:', error)
        throw new Error(error.message)
    } finally {
        knexInstance.destroy()
    }
}

const selectMessages = async () =>{
    const knexInstance = knex(options2)
    try{
        const exist = await knexInstance.schema.hasTable('mensajes')
        if(exist) {
            const rows = await knexInstance('mensajes').select('*')
            return rows
        } else {
            return
        }
    }catch (error) {
        console.log('Error selectMessages:', error)
        throw new Error(error.message)
    } finally {
        knexInstance.destroy()
    }
}

module.exports = { createTable, insertProducts, selectProducts, createTable2, insertMessages, selectMessages }