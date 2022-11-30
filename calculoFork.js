let numero
process.on('message', (msg) => {
    console.log(`Message from apiRandoms.js: ${msg}`)
    if(!isNaN(parseInt(msg))){
        numero = parseInt(msg)
    }
    if(msg === 'Start-task'){
        process.send(generaArreglo(numero))
        process.exit()
    }
})

const generaAleatorio = (min,max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const generaArreglo = (cantidad) => {
    let arrayNumeros = []
    for (let i = 0; i < cantidad; i++) {
        arrayNumeros[i] = generaAleatorio(1, 1000)
    }
    console.log(arrayNumeros)
    const objetoRepetidos = objetoContadorNumeros(arrayNumeros)
    console.log(objetoRepetidos)
    return objetoRepetidos
}

const objetoContadorNumeros = (arrayNumeros) => {
    let repetidos = {}
    arrayNumeros.forEach(function(numero){
        repetidos[numero] = (repetidos[numero] || 0) + 1
    })
    return repetidos
}

process.send('Ready')