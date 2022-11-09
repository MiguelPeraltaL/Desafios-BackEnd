const { faker } = require('@faker-js/faker/locale/es_MX')
const { commerce, image } = faker

function generarProductoFake() {
    const productos = []
    for (let index = 0; index < 5; index++) {
        productos.push({
            title: commerce.product(),
            price: commerce.price(5, 100, 0, '$'),
            imagen: image.abstract()
        })
    }
    return productos
}

module.exports.generarProductoFake = generarProductoFake