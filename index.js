class Usuario {
    static totalUsuarios = 0
    constructor (nombre, apellido, libros, mascotas) {
      this.nombre = nombre
      this.apellido = apellido
      this.libros = libros
      this.mascotas = mascotas
      Usuario.totalUsuarios++
    }
    getFullName() {
      return this.nombre + " " + this.apellido
    }
    addMascota(mascota){
        this.mascotas.push(mascota)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nameBook, autor){
        this.libros.push({nombre: nameBook, autor: autor})
    }
    getBookNames(){
        let nombresLibro = []
        this.libros.forEach(elemento => {
            nombresLibro.push(elemento.nombre)
        })
        return nombresLibro
    }
  }
  
  const usuario1 = new Usuario('Pedro', 'Perez', [{nombre:'libro1', autor:'autor1'}], ['perro'])
  const usuario2 = new Usuario('Juan', 'Lopez', [{nombre:'libro2', autor:'autor2'}], ['perro', 'gato', 'conejo'])

  console.log('Datos completos de usuario: ', usuario1)
  console.log('Nombre usuario: ', usuario1.getFullName())
  usuario1.addMascota('gato')
  usuario1.addBook('libro4', 'autor4')
  console.log('Número de mascotas: ', usuario1.countMascotas())
  console.log('Nombres de libros: ', usuario1.getBookNames())
  console.log(`Total usuarios: ${Usuario.totalUsuarios}`)