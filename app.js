require('colors');
const fs = require('fs');
const fse = require('fs-extra');
/* fs-extra incluye funciones adicionales
 que no están presentes en el módulo fs, 
 como copy, emptyDir, ensureDir, move, remove, */
const readline = require('readline');
const path = require('path');
/* No se necesita instalar el 
módulo path por separado, ya
 que es un módulo integrado en 
 Node.js y forma parte del núcleo del 
 lenguaje este  proporciona utilidades
  para trabajar con rutas de archivos y directorios*/


const datosArchivos = require('./datos.json');
/* const { clear } = require('console');
const { get } = require('https'); */



/* Aquí se crea una constante "rl" utilizando la 
función createInterface del módulo readline */
const rl = readline.createInterface({
    input: process.stdin,
    //Es como el lugar de donde tu programa "escucha" lo que escribes en la consola. 
    output: process.stdout,
    /* Es como el lugar donde tu programa "habla". Si quieres
     mostrar algo en la consola, usas process.stdout para imprimirlo. */
});

  

//se crea una clase llamada "Producto" y se le asignan atributos los cual encapsulamos  con "#"
    class Producto {
        #codigoProducto;
        #nombreProducto;
        #inventarioProducto;
        #precioProducto;

        //Creamos un metodo constructor en el cual inicializamos los atributos
        constructor() {
            this.#codigoProducto = '';
            this.#nombreProducto = '';
            this.#inventarioProducto = 0;
            this.#precioProducto = 0;
        }


        /* Estos métodos permiten definir cómo se obtiene y establece un valor
        con el set asignamos un color y con el get llamamos en color que le asignamos*/
        setCodigoProducto(value) {
            this.#codigoProducto = value;
        }

        getCodigoProducto() {
            return this.#codigoProducto;
        }

        setNombreProducto(value) {
            this.#nombreProducto = value;
        }

        getNombreProducto() {
            return this.#nombreProducto;
        }

        setInventarioProducto(value) {
            this.#inventarioProducto = value;
        }

        getInventarioProducto() {
            return this.#inventarioProducto;
        }

        setPrecioProducto(value) {
            this.#precioProducto = value;
        }

        getPrecioProducto() {
            return this.#precioProducto;
        }

    }
    

    //se crea una clase llamada "Cliente" a la cual le creamos un metodo constructor y  inicilizamos 
    class Cliente{
        constructor(){
          this.documentoCliente = '';
          this.nombreCliente = '';
          this.direccionCliente = '';
          this.codigo = "";
          this.cantidad = "";
          this.precio = 0;
          this.nombreProducto = "";
        
        }
      
        /* Estos métodos permiten definir cómo se obtiene y establece un valor
        con el set asignamos un color y con el get llamamos en color que le asignamos*/
        setDocumentoCliente(documento) {
          this.documentoCliente = documento;
        }
      
        setNombreCliente(nombre) {
          this.nombreCliente = nombre;
        }
      
        setDireccionCliente(direccion) {
          this.direccionCliente = direccion;
        }
      }
      
 
    //se crea una clase llamada "ProductoTienda" y se le asigna 1 atributo el cual encapsulamos  con "#"
    class ProductoTienda{
        #listaProductos;
    

        //Se crea un metodo constructor y inicializamos el atributo con un array
        constructor() {
            this.#listaProductos = [];

        }

        getListaProductos() {
            return this.#listaProductos;
        }
        
        // Deserializar
        // Método para cargar productos desde el archivo 'datos.json'
        cargaArchivosProductos() {
            let contador = 0;
            // declara una variable llamada contador que inicializa en 0
            if (datosArchivos.length > 0) {
                datosArchivos.forEach((objeto) => {
                    //se usa el .length verificar si la longitud del arreglo datosArchivos es mayor que cero
                    //el forEach permite iterar a través de cada objeto en datosArchivos
                    contador++;
                     // contador que incrementa de 1 en 1

                    let producto = new Producto();
                    //Se crea una instancia de clase llamada "producto" la  cual instacia de la clase "Producto"
                    
                    //producto esta asignando los atributos y los convierte en objetos de clase
                    producto.setCodigoProducto(objeto.codigoProducto);
                    producto.setNombreProducto(objeto.nombreProducto);
                    producto.setInventarioProducto(objeto.inventarioProducto);
                    producto.setPrecioProducto(objeto.precioProducto);

                    //para pegar los datos en el objeto producto(la instancia creada arriba)
                    this.#listaProductos.push(producto);
                });
               /*  console.log(`total de productos cargados ===>`.blue + ` ${contador}`.cyan); */

            } else {
                //Se imprime ese mensaje en caso de que haya unn error (el archivos datos.json no tenga datos)
                console.log(`ERROR, el archivo datos.json no contiene datos\n`.blue);
            }
        }
        

        //Serializar
        // Método para guardar los productos en el archivo 'datos.json'
        grabaArchivoProducto() {
            const instanciaClaseAObjetos = this.#listaProductos.map((producto) => {
            /* Utiliza el método map para transformar cada elemento de this.#listaProductos en un nuevo objeto
            todo esto en una constante llamada "instanciaClaseObjetos"*/
                return {
                    codigoProducto: producto.getCodigoProducto(),
                    nombreProducto: producto.getNombreProducto(),
                    inventarioProducto: producto.getInventarioProducto(),
                    precioProducto: producto.getPrecioProducto(),
                };
            });
            const cadenaJson = JSON.stringify(instanciaClaseAObjetos, null, 2);
            /* Convierte el arreglo de objetos obtenido en el paso anterior a una cadena JSON 
 null: Indica que no se está realizando ninguna transformación especial a los valores durante la conversión a JSON.
         2: Establece que la cadena JSON resultante tendrá una sangría de dos espacios. */
            const nombreArchivo = 'datos.json';
            fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');
            /* Utiliza el módulo fs para escribir la cadena JSON en un 
            archivo llamado 'datos.json'. Esto sobrescribirá el archivo si ya existe. */

          /*   console.log(`DATOS GUARDADOS EN ${nombreArchivo}`.cyan); */
        }


        // Método para mostrar los productos en la consola
        mostrarProductos(){ 
            this.#listaProductos.forEach((producto) => {
                 /* el forEach permite iterar a través de cada objeto en listaProductos en este
            caso toma los objetos de "producto"  y los inprime junto con una interfaz */
                console.log(
                    `|    `.blue +
                    producto.getCodigoProducto() +
                    `      |`.blue +
                    `|    ` +
                    producto.getNombreProducto() +
                    `      |`.blue +
                    `|    ` +
                    producto.getInventarioProducto() +
                    `       |`.blue +
                    `|    ` +
                    producto.getPrecioProducto() +
                    `      |`.blue 
                    )
                });
                
            }       
                
            
            //Creamos un metodo llamado "Preguntas"
            preguntas(){

                //inicia el proceso de preguntar al usuario y que el usuario pueda responder en consola
                /*creamos un rl.question el cual nos mostrara en pantalla
                 el mensaje asignado y nos permitira responder */
                rl.question('Ingrese el código del nuevo producto: ', (codigo) => {
                    rl.question('Ingrese el nombre del nuevo producto: ', (nombre) => {
                        rl.question('Ingrese el inventario del nuevo producto: ', (inventario) => {
                            rl.question('Ingrese el precio del nuevo producto: ', (precio) => {
                                console.log("------------------------------------------".green);
                                console.log("| Su producto se ha guarado correctamente|".green);
                                console.log("------------------------------------------".green);

                                const nuevoProducto = new Producto();
                                 //crea una instacia de la clase producto llamada "nuevoProducto"
    
                                nuevoProducto.setCodigoProducto(codigo);
                                nuevoProducto.setNombreProducto(nombre);
                                nuevoProducto.setInventarioProducto(parseInt(inventario));
                                nuevoProducto.setPrecioProducto(parseFloat(precio));
                                //analiza un argumento (si es necesario, lo convierte en una cadena) y devuelve un número punto flotante.
            
                                productosTienda.getListaProductos().push(nuevoProducto);
                                //se pegan los datos de la instancia que creamos en productoTienda
                                productosTienda.grabaArchivoProducto();
                                //grabamos esta actualizacion
                                
                                
                                //creamos una promesa
                                return new Promise((resolve, reject) => {
                                    //con un rl.question hacemos una pregunta al usuario
                                    rl.question('¿Deseas agregar un nuevo producto? (Sí/No): ', (respuesta) => {
                                        /* con la respuesta del usuario hacemos una conversion a minusculas y si
                                        es estrictamente si se vuelve a hacer el metodo preguntas*/
                                      if (respuesta.toLowerCase() === 'si') {
                                        resolve(this.preguntas()); // Continuar con la compra
                                        /* con la respuesta del usuario hacemos una conversion a minusculas y si
                                        es estrictamente no se sale al menu principal*/
                                      } else if (respuesta.toLowerCase() === 'no') {
                                          this.menuPrincipal();
                                      } else {
                                        //En caso de que esas no sean las  respuestas se imprimira este mensaje
                                        reject('Por favor, responde "Sí" o "No".'); 
                                      }
                                    });
                                });                               
                            });
                        });
                    });
                });
            }  
              

           //Se crea un metodo
           preguntaCompra() {
            //creamos una promesa
            //con un rl.question hacemos una pregunta al usuario
            return new Promise((resolve, reject) => {
              rl.question('¿Deseas comprar un nuevo producto? (Sí/No): ', (respuesta) => {
                /* con la respuesta del usuario hacemos una conversion a minusculas y si
                  es estrictamente si se vuelve a hacer el metodo compraCliente*/
                if (respuesta.toLowerCase() === 'si') {
                  resolve(this.compraCliente()); // Continuar con la compra
                /* con la respuesta del usuario hacemos una conversion a minusculas y si
                es estrictamente no se sale al menu principal*/
                } else if (respuesta.toLowerCase() === 'no') {
                    this.menuPrincipal();
                } else {
                    //En caso de que esas no sean las  respuestas se imprimira este mensaje
                  reject('Por favor, responde "Sí" o "No".'); 
                }
              });
            });
          }

      
          //creamos un metodo
         borrarProducto() {
            //hace una pregunta al usuario
        rl.question('Ingrese el número del objeto que desea borrar: ', (numeroObjeto) => {
            // Verificar si el número ingresado es válido
            /* crea una constante, toma el numero ingresado por el usuario y lo convierte en entero y lo resta  */
            const indiceBorrar = parseInt(numeroObjeto) - 1;
            /* Verifica si el índice obtenido es un número válido y está dentro del rango de los objetos */
            // isNaN (Is Not a Number)
            if (isNaN(indiceBorrar) || indiceBorrar < 0 || indiceBorrar >= datosArchivos.length) {
                //si el numero no es encuentra se imprime este mensaje y se vuelve hacer la pregunta
              console.log('Número inválido.');
              this.borrarProducto();
              return;
            }
        
            // Eliminar el objeto del array
             /* Utiliza el método splice para eliminar un elemento del arreglo datosArchivos 
             en la posición indicada por indiceBorrar. El 1 pasado como segundo argumento 
             especifica que se eliminará un único elemento en esa posición. */
            const objetoBorrado = datosArchivos.splice(indiceBorrar, 1);
            this.cargaArchivosProductos();
        
            console.log(`El objeto se ha borrado con exito.`);
            /* Se imprime un mensaje */

            const nuevoContenidoJSON = JSON.stringify(datosArchivos, null, 2);
             /* Convierte el paso anterior a una cadena JSON 
 null: Indica que no se está realizando ninguna transformación especial a los valores durante la conversión a JSON.
         2: Establece que la cadena JSON resultante tendrá una sangría de dos espacios. */
            fs.writeFileSync('datos.json', nuevoContenidoJSON, 'utf-8');
             /* Utiliza el módulo fs para escribir la cadena JSON en un 
            archivo llamado 'datos.json'. Esto sobrescribirá el archivo si ya existe. */
        
            //Le dice al usuario que presione la tecla enter y esta lo redigira al metodo menuPrincipal
            rl.question("\n Presiona ENTER para salir el menu principal: ", () => {
                this.menuPrincipal();
            });


        });
    }   
    

    //se crea un metodo
   compraCliente(){
        //se crea una instancia dde la clase Cliente
        const datosCompra = new Cliente();
        rl.question("Digite su documento : ",(documentoCliente) =>{ 
            rl.question("Digite su nombre : ",(nombreCliente) =>{ 
            rl.question("Digite su direccion : ",(direccionCliente) =>{ 
                //los valores dados por el usuario se los asignamos a los atributos de la clase Cliente
                this.documentoCliente = documentoCliente; 
                this.nombreCliente = nombreCliente;
                this.direccionCliente = direccionCliente;


                    //llama al metodo mostrarProductos
                    productosTienda.mostrarProductos();
                    //Se hace una pregunta al usuario
                    rl.question('Ingrese el código del producto que desea comprar: ', (codigo) =>{
                         // Utiliza el método find para buscar un producto en la lista de productos de la tienda 
                                /* que tenga un código coincidente con el código ingresado por el usuario. El producto
                                 encontrado se asigna a la variable productoAComprar. */
                                const productoAComprar = productosTienda.#listaProductos.find((producto) => producto.getCodigoProducto() === codigo);                     

                                //el valor dado por el usuario se lo asignamos al atributo de la clase Cliente
                                 this.codigo = codigo;

                        /*  Comprueba si productoAComprar tiene un valor 
                        (es decir, si se encontró un producto con el código ingresado). */
                        if (productoAComprar) {

                            /* Si se encontro se crea una constante llamada nombre 
                            a la cual le damos el nombre del producto que se encontro */
                            const nombre = productoAComprar.getNombreProducto();
                            //y lo imprimimos
                            console.log(`Producto seleccionado: ${productoAComprar.getNombreProducto(nombre)}`);
                             //el valor dado por el usuario se lo asignamos al atributo de la clase Cliente
                            this.nombreProducto = nombre;

                             /* Si se encontro se crea una constante llamada precioEncontrado 
                            a la cual le damos el nombre del producto que se encontro */
                            const precioEncontrado = productoAComprar.getPrecioProducto();
                            console.log(`El precio del producto seleccionado es: ${precioEncontrado}`);
                             //el valor dado por el usuario se lo asignamos al atributo de la clase Cliente
                            this.precio = precioEncontrado;

                            //hacemos una pregunta al usuario
                            rl.question('¿Cuántas unidades desea comprar?: ', (cantidad) => {
                                const unidades = parseInt(cantidad);
                                this.cantidad = unidades    
                                /* Convierte la cantidad ingresada por el usuario a un número entero utilizando parseInt */
                                if (unidades <= productoAComprar.getInventarioProducto()) {
                                    /*  Verifica si la cantidad de unidades solicitadas por el usuario no supera el 
                                    inventario disponible del producto. Si es así, se procede con lo siguiente bloque de código. */
                                    productoAComprar.setInventarioProducto(productoAComprar.getInventarioProducto() - unidades); 
                                    productosTienda.grabaArchivoProducto();
                                    /* Actualiza el inventario del producto restando las unidades compradas. */
                                  
                                } else {
                                    //Se imprime este mensaje en caso de que no haya tal cantidad de productos
                                    console.log('No hay suficientes unidades disponibles para comprar.');
                                }
                                //Se llama al metodo preguntaCompra
                                this.preguntaCompra();
                                //Le dice al usuario que presione la tecla enter y esta lo redigira al metodo menuPrincipal
                                rl.question("\nPresiona ENTER para salir el menu principal: ", () => {
                                    this.menuPrincipal();
                                });
                            });
                        }
                    })                
                })
            })
        })
    }

    //se crea un metodo
    imprimirFactura(){
        /* se imprime una "factura" con algunos de los datos asignados
         a los atributos de la clase Cliente en el metodo compra Cliente */
        console.log("------------------------------".green);
        console.log("|    Factura del Cliente     |".green);
        console.log("------------------------------".green);
        console.log(">  ".green + "Documento: " + this.documentoCliente);
        console.log(">  ".green + "Nombre: " + this.nombreCliente);
        console.log(">  ".green + "Direccion: " + this.direccionCliente);
        console.log("------------------------------".green);
        console.log(">  ".green + "Producto Comprado :" + this.nombreProducto);
        console.log(">  ".green + "Cantidad: " + this.cantidad);
        const total = this.cantidad*this.precio 
        console.log(">  ".green + "El valor de su factura es de: "+ total)
        console.log("------------------------------".green);
    }

    

    /* se crea un metodo asincronico ( puede realizar operaciones de 
        larga duración sin bloquear la ejecución del código) */
    async crearCopiaSeguridad() {
        //Se le asigna la ubicacion del archivo que deseo respaldar a una constante
        const directorioOrigen = './datos.json';
        /* Se le asigna la ubicacion del archivo donde quiero que se
         guarden los datos que deseo respaldar en una constante */
        const directorioDestinoBase = './copias_seguridad';
        
        const fechaActual = new Date();
        const nombreArchivo = `Copia_${new Date().toISOString().split('T')[0]}`;
        /* se utiliza la fecha y hora actual para crear un nombre de archivo único 
        en formato ISO 8601, y se elimina cualquier carácter no permitido en los nombres
         de archivos (por ejemplo, :) para garantizar la compatibilidad con sistemas de archivos. */
        

         /* path.join() es un método que toma segmentos de ruta
          como argumentos y los une para formar una ruta completa */
        // Construir la ruta completa del directorio de destino
        const directorioDestino = path.join(directorioDestinoBase, nombreArchivo);
      
        try {
          /* fse.ensureDir se utiliza para asegurarse de que un directorio exista. Si el 
          directorio ya existe, no hace nada. Si el directorio no existe, 
          lo crea, incluidos todos los directorios intermedios que no existan. */
          await fse.ensureDir(directorioDestinoBase);


        /*  La palabra clave await solo puede usarse dentro de funciones marcadas como async.
         Indica que la ejecución del programa debe esperar hasta que la operación de ensureDir
          se complete antes de pasar a la siguiente línea de código */

      
          /* fse.copy se utiliza para copiar archivos o directorios de un lugar a otro. */
          await fse.copy(directorioOrigen, directorioDestino);
      
          //Se imprime un mensaje informando que la copia de seguridad se ha hecho correctamente
          console.log(`--------------------------------------------------`.red)
          console.log(`|`.red +`Su copia de respaldo se ha guardado exitosamente.`+`|`.red);
          console.log(`--------------------------------------------------`.red)

        } catch (error) {
            //si ocurre un error nos arrojara este mensaje
          console.error('Error al crear la copia de seguridad:', error);
        }
        //Le dice al usuario que presione la tecla enter y esta lo redigira al metodo menuPrincipal
        rl.question("\nPresiona ENTER para salir el menu principal: ", () => {
            this.menuPrincipal();
        });
    }


    /* se crea un metodo asincronico ( puede realizar operaciones de 
        larga duración sin bloquear la ejecución del código) */
    async mostrarCopiasYRestaurar() {
        //Se le asigna la ubicacion dela carpeta de los archivos que deseo restaurar a una constante
        const directorioDestinoBase = './copias_seguridad';
    
        try {
            // Obtener la lista de carpetas en el directorio de copias de seguridad
            // fse.readdir se utiliza para leer el contenido de un directorio 
            const carpetas = await fse.readdir(directorioDestinoBase);
    
            if (carpetas.length === 0) {
                //si no se encuntra ningun archivo nos arrojara este mensaje
                console.log('No hay copias de seguridad disponibles.');
            } else {
                console.log('Copias de seguridad disponibles:');
                carpetas.forEach((carpeta, index) => {
                    /* carpetas se refiere a un array y el forEach toma dos parámetros:
                     carpeta representa el valor actual del elemento en la iteración 
                     y index representa el índice actual del elemento en el array. */
                    console.log(`${index + 1}. ${carpeta}`);
                    /* index + 1 se utiliza para mostrar un índice basado en 1 en lugar de en 0 
                    esto se hace para dar una lista de la pocision de las carpetas */
                });
    
                // Solicitar al usuario que elija una carpeta para mostrar las copias de seguridad
                rl.question('\nSeleccione el número de la carpeta de copias de seguridad que desea explorar (o 0 para salir): ', async (respuesta) => {
                    const opcion = parseInt(respuesta);
                    /* Convierte la respuesta del usuario (que se recibe como cadena) a un número entero usando parseInt. */
    

                    //si la respuesta del usuario es 0 se sale al menu principal
                    if (opcion === 0) {
                        this.menuPrincipal();
                    } else if (opcion > 0 && opcion <= carpetas.length) {
                        /*  Verifica si la opción ingresada por el usuario está dentro del rango válido de opciones
                        && se utiliza para combinar dos condiciones en una expresión lógica "y",
                         y el bloque de código dentro del if se ejecutará si ambas condiciones son verdaderas. */
                        const carpetaSeleccionada = carpetas[opcion - 1];
                        /*  Obtiene el nombre de la carpeta seleccionada utilizando el índice proporcionado por el usuario */
                        const rutaCarpeta = path.join(directorioDestinoBase, carpetaSeleccionada);
                        /* path.join se utiliza para construir rutas de archivos o directorios */
    
                        // Asegurarse de que la carpeta 'datos.json' exista
                        await fse.ensureDir('./datos.json');
    
                        // Obtener la lista de copias de seguridad dentro de la carpeta seleccionada
                        const copias = await fse.readdir(rutaCarpeta);
    
                        if (copias.length === 0) {
                            console.log(`No hay copias de seguridad en la carpeta ${carpetaSeleccionada}.`);
                        } else {
                            console.log(`Copias de seguridad en la carpeta ${carpetaSeleccionada}:`);
                            copias.forEach((copia, index) => {
                                console.log(`${index + 1}. ${copia}`);
                            });
    
                            // Solicitar al usuario que elija una copia de seguridad para restaurar
                            rl.question('\nSeleccione el número de la copia de seguridad que desea restaurar (o 0 para salir): ', async (respuestaCopia) => {
                                const opcionCopia = parseInt(respuestaCopia);
    
                                if (opcionCopia === 0) {
                                    menu();
                                } else if (opcionCopia > 0 && opcionCopia <= copias.length) {
                                    const copiaSeleccionada = copias[opcionCopia - 1];
                                    const rutaCopia = path.join(rutaCarpeta, copiaSeleccionada);
    
                                    // Restaurar la copia de seguridad en la carpeta original
                                    await fse.copy(rutaCopia, './datos.json');
                                    console.log(`La copia de seguridad ${copiaSeleccionada} ha sido restaurada en la carpeta original.`);
                                    this.menuPrincipal();
                                } else {
                                    console.log('Opción no válida. Por favor, seleccione un número válido.');
                                    this.menuPrincipal();
                                }
    
                                rl.close();
                            });
                        }
                    } else {
                        console.log('Opción no válida. Por favor, seleccione un número válido.');
                        rl.close();
                    }
                });
            }
        } catch (error) {
            console.error('Error al mostrar las copias de seguridad:', error);
            rl.close();
        }
    }


    //se crea un metodo
    menuPrincipal(){

        //se crea una interfaaz del menu de la tienda
        console.log('*****************************'.blue);
        console.log('**'.blue+'     PROYECTO CLASES     '+'**'.blue);
        console.log('*****************************\n'.blue);
        console.log(`--------------------------------`.blue)
        console.log('|  '.blue + '1. Cargar Productos' +'         |'.blue),
        console.log('|  '.blue + '2. Copia de Respaldo' +'        |'.blue);
        console.log('|  '.blue + '3. Reparacion Datos' +'         |'.blue);
        console.log('|  '.blue + '4. Grabar Nuevos Productos' +'  |'.blue);
        console.log('|  '.blue + '5. Borrar Producto' +'          |'.blue);
        console.log('|  '.blue + '6. Comprar Productos' +'        |'.blue);
        console.log('|  '.blue + '7. Imprimir Factura' +'         |'.blue);
        console.log('|  '.blue + '0. Cerrar APP' +'               |'.blue);
        console.log(`--------------------------------`.blue)

        //hacemos un pregunta al usuario
        rl.question("\nSeleccione la opcion a la que deseas ingresar: ", (opcion) => {
            //dependiendo la opcion del usuario nos dirigira a un case que contiene la funcion que dice en el menu
    switch (opcion) {
        case '1':
                this.mostrarProductos();
                rl.question("\nPresiona ENTER para salir el menu principal: ", () => {
                        this.menuPrincipal();
                });
            break;
        case '2':
            console.clear();
            this.crearCopiaSeguridad();
            break;
        case '3':
            console.clear();
            this.mostrarCopiasYRestaurar();
            break;
        case '4':
            console.clear();
            this.mostrarProductos();
            this.preguntas();
            rl.question("\nPresiona ENTER para salir el menu principal: ", () => {
                this.menuPrincipal();
            });
            break;
        case '5':
            console.clear();
            this.mostrarProductos();
            this.borrarProducto();
            rl.question("\nPresiona ENTER para salir el menu principal: ", () => {
                this.menuPrincipal();
            });
            break;
        case '6':
            console.clear();
            this.compraCliente();
            rl.question("\nPresiona ENTER para salir el menu principal: ", () => {
                this.menuPrincipal();
            });
            break;
        case '7':
            console.clear();
            this.imprimirFactura();
            rl.question("\nPresiona ENTER para salir el menu principal: ", () => {
                this.menuPrincipal();
            });
            break;
        case '0':
            console.clear();
            console.log('Guardando datos antes de cerrar la aplicación...'.blue);
            productosTienda.grabaArchivoProducto();
            console.log('Gracias por contar con nosotros, ¡que tengas un buen día! :)'.cyan);
            rl.close();
        default: 'Cualquier otro numero'
            return ('Digite algun numero que se muestran en las opciones')
            break;
        }
    });
};


   

            pregunta() {
 
                rl.question("¿Deseas agregar un nuevo producto? (Sí/No): ", (respuesta) => {

                  if (respuesta.toLowerCase() === 'si') {
   
                    preguntas();
                  } else if (respuesta.toLowerCase() === 'no') {
                    console.log("Saliendo...");
                    rl.close();

                  } else {
                    console.log("Por favor, responde 'Sí' o 'No'.");
                    pregunta(); 
                  }
                });
                pregunta(); 
              }
        }

         


    let productosTienda = new ProductoTienda();

     productosTienda.cargaArchivosProductos(); 

    /* console.log(`DATOS APERTURA TIENDA`.cyan); */

     /* productosTienda.mostrarProductos();  */

 /*    productosTienda.getListaProductos().forEach((producto) => {
        producto.setInventarioProducto(Math.floor(Math.random() * (20 - 1) + 1));
    }); */
    
/*     console.log(`DATOS CIERRE TIENDA`.cyan); */

    /* productosTienda.mostrarProductos(); 

     productosTienda.grabaArchivoProducto();
 */
   /*  productosTienda.agregarNuevoProducto();  */

function main(){
    console.clear();
    productosTienda.menuPrincipal();
}
main();
