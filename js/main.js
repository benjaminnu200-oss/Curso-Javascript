let nombre = prompt("Ingrese nombre");
let apellido = prompt("Ingrese su apellido");
function saludar(nombre, apellido) {
alert("Hola" + " " + nombre + " " + apellido + " " + "Bienvenido a la tienda");
}
saludar(nombre, apellido);
class Producto {
    constructor (nombre, precio, categoria, stock){
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;
    }
}
const producto1 = new Producto ("Remera Negra Lisa", 15000, "Remeras", 5)
const producto2 = new Producto ("Remera Negra Estampada", 20000, "Remeras", 3)
const producto3 = new Producto ("Remera Blanca Lisa", 15000, "Remeras", 5 )
const producto4 = new Producto ("Remera Blanca Estampada", 20000, "Remeras", 3)
const productos = [producto1,producto2,producto3,producto4];

let verProductos = prompt ("¿Desea ver los productos? Si / No ");
if (verProductos && verProductos.toLowerCase().trim() === "si") {
    productos.forEach((producto) => { console.log("los productos son: " , producto)});
}
else { 
    console.log ("Gracias por visitarnos, ¡ Hasta luego !")
}
let buscarProducto = prompt ("¿Que producto esta buscando? Remera Negra Lisa, Remera Negra Estampada, Remera Blanca Lisa, Remera Blanca Estampada ")
const encontrado = productos.find ((producto) => producto.nombre.toLowerCase() == buscarProducto.toLowerCase().trim ())
if (encontrado) {
console.log (encontrado)
}
else {
console.log("No se encontró el producto")
};
const resultado = productos.filter ((producto) => producto.nombre.includes ("Estampada") );
if (resultado.length > 0 ) {
console.log (resultado)
}
else {
console.log ("No se encontró el producto.")
}
const precioTotal = productos.reduce ((total, producto) => total + producto.precio, 0 );
console.log ("El precio total del stock es" + " " + precioTotal );

const productosOrdenados = productos.toSorted ((a,b) => b.precio - a.precio);
console.log ("productos ordenados de mayor a menor: ")
console.table (productosOrdenados);