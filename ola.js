 /*
 async comprarProductos() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log('Productos disponibles para comprar:'.blue);
    this.mostrarProductos();

    rl.question('Ingrese el código del producto que desea comprar: ', (codigo) => {
        if (codigo.toLowerCase() === 'cancelar') {
            this.menuPrincipal();
            return;
        };

        const productoAComprar = this.#listaProductos.find((producto) => producto.getCodigoProducto() === codigo);

        if (productoAComprar) {
            console.log(`Producto seleccionado: ${productoAComprar.getNombreProducto()}`);
            rl.question('¿Cuántas unidades desea comprar?: ', (cantidad) => {
                const unidades = parseInt(cantidad);
                if (unidades <= productoAComprar.getInventarioProducto()) {
                    productoAComprar.setInventarioProducto(productoAComprar.getInventarioProducto() - unidades);

                    // Agregar el producto a la factura actual
                    this.#facturaActual = this.#facturaActual || new Factura(); // Crear una factura si no existe
                    this.#facturaActual.agregarProducto(productoAComprar, unidades);
                    const factura = new Factura();
                    factura.agregarProducto(new Producto('1234', 'Producto 1', 10, 2000));
                    console.log('Producto comprado con éxito.');
                } else {
                    console.log('No hay suficientes unidades disponibles para comprar.');
                }
                this.menuPrincipal();
            });
        } else {
            console.log(`No se encontró un producto con el código ${codigo}.`);
            this.comprarProductos(); // Volvemos a pedir el código si no se encontró el producto.
        }
    });
}




console.log('------------------------------'.blue);
console.log('|'.blue +'     factura del cliente    '+'|'.blue)
console.log('------------------------------'.blue);
console.log("Datos del cliente:");
console.log("Documento de identificación:", identificacion);
console.log("Nombre:", cliente);
console.log("Dirección:", direccion);
console.log(``) 


    function compraProducto(){
        rl.question(`Digite el codigo del producto que deseas comprar : `,(opcion)=>{
            switch (opcion) {
                case '01':
                    rl.question(`Digite la cantidad de productos que desea comprar(${datosArchivos[0].inventarioProducto}) : `,(inventario) =>{
                        preguntaCompra();
                        rl.question("\nMarca 0 para salir el menu principal: ", () => {
                            menu();
                        });
                    })
                    break;
                case '02':
                    rl.question(`Digite la cantidad de productos que desea comprar(${datosArchivos[1].inventarioProducto}) : `,(inventario) =>{ 
                        preguntaCompra();
                        rl.question("\nMarca 0 para salir el menu principal: ", () => {
                            menu();
                        });
                    })
                    break;
                case '03':
                    rl.question(`Digite la cantidad de productos que desea comprar(${datosArchivos[2].inventarioProducto}) : `,(inventario) =>{ 
                        preguntaCompra();
                        rl.question("\nMarca 0 para salir el menu principal: ", () => {
                            menu();
                        });
                    })
                case '04':
                    rl.question(`Digite la cantidad de productos que desea comprar(${datosArchivos[3].inventarioProducto}) : `,(inventario) =>{ 
                        preguntaCompra();
                        rl.question("\nMarca 0 para salir el menu principal: ", () => {
                            menu();
                        });
                    })
                case '05':
                    rl.question(`Digite la cantidad de productos que desea comprar(${datosArchivos[4].inventarioProducto}) : `,(inventario) =>{ 
                        preguntaCompra();
                        rl.question("\nMarca 0 para salir el menu principal: ", () => {
                            menu();
                        });
                    })
                case '06':
                    rl.question(`Digite la cantidad de productos que desea comprar(${datosArchivos[5].inventarioProducto}) : `,(inventario) =>{ 
                        preguntaCompra();
                        rl.question("\nMarca 0 para salir el menu principal: ", () => {
                            menu();
                        });
                    })
                case '07':
                    rl.question(`Digite la cantidad de productos que desea comprar(${datosArchivos[6].inventarioProducto}) : `,(inventario) =>{ 
                        preguntaCompra();
                        rl.question("\nMarca 0 para salir el menu principal: ", () => {
                            menu();
                        });
                    })
                    break;
                default: 'Cualquier otro numero'
                    return ('Digite algun numero que se muestran en las opciones')
                    break;
        }
        })
    }


*/

/*    function borrarProducto() {
            productoTienda.mostrarProductos();
            rl.question('Ingrese el código del producto que desea borrar: ', (codigoBorrar) => {
                const indiceProducto = datosArchivos.findIndex(producto => producto.codigoProducto === codigoBorrar);
    
                if (indiceProducto !== -1) {
                    datosArchivos.splice(indiceProducto, codigoBorrar);
                    console.log(`Producto con código ${codigoBorrar} eliminado exitosamente.`);
                    productoTienda.grabaArchivoProducto();
                    rl.question("\nMarca 0 para salir el menu principal: ", () => {
                        menu();
                    });
                    
                } else {
                    console.log(`No se encontró un producto con el código ${codigoBorrar}.`);
                }
            });
        } */

          /* async function crearCopiaCarpeta() {
        const carpetaOrigen = './datos.json';  
        const carpetaDestino = './copia_datos.json';  

        try {
            await fse.copy(carpetaOrigen, carpetaDestino);
            console.log(`--------------------------------------------------`.red)
            console.log(`|`.red +`Su copia de respaldo se ha guardado exitosamente.`+`|`.red);
            console.log(`--------------------------------------------------`.red)

            rl.question("\nMarca 0 para salir el menu principal: ", () => {
                menu();
        });
        } catch (error) {
            console.error(`Error al copiar la carpeta: ${error}`);
        }
    } */