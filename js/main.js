// let nombre = prompt("Ingrese nombre");
// let apellido = prompt("Ingrese su apellido");
// function saludar(nombre, apellido) {
//     alert("Hola" + " " + nombre + " " + apellido + " " + "Bienvenido a la tienda");
// }

// saludar(nombre, apellido);
// let menus = ["Remera Negra", "Remera Roja", "Remera Blanca" ,"Remera Azul"];
// console.log (menus)
// menus.push ("Remera Verde");
// menus.unshift ("Remera Gris")
// let eliminado = menus.pop ();
// console.log("Se ha eliminado" + " " + eliminado);
// let buscar = prompt ("ingrese el nombre del producto que busca, ejemplos: Remera Violeta, Remera Negra, Remera Roja, Remera Blanca , Remera Azul")
// if (menus.includes(buscar)) {
//     let posicion = menus.indexOf(buscar)
//     alert ("Producto encontrado, esta en: " + posicion )
// }
// else {
//     alert("Lo sentimos, no existe el producto.")
// }
// menus.splice (0,1, "Remera Violeta")
// console.log ("Se actualizó el catalogo. Se agrego Remera Violeta, Remera Gris sin stock")
// const mostrarCatalogo = (menus) => {
//     console.log("Catalogo Actualizado");
//     for (let menu of menus) {
//         console.log("Producto: " + menu);
//     }
//     }
// mostrarCatalogo (menus);

// let producto = {
//     id: "1604",
//     nombre: "RemeraNegra",
//     precio: 5000,
//     tallesDisponibles: ["S", "M", "L", "Xl" ],
// }
// console.log (producto.nombre)   

class Producto { 
    constructor (id, nombre, precio,tallesDisponibles) {
        this.id = id;
        this.nombre =  nombre;
        this.precio = precio;
        this.tallesDisponibles = tallesDisponibles
    }
    sumarIva () {
        this.precio = parseInt ((this.precio * 1.21))
        return this.precio
    }
    imprimirProductos () {
        console.log ("ID: " + this.id + " " +  this.nombre +  " " + " tiene un costo de " + this.precio + " y tiene los siguientes talles disponibles : " + " " + this.tallesDisponibles)
    }
}
const producto1 = new Producto ("1", "Remera Negra", 5000 , ["S", "M", "L", "XL"]);
const producto2 = new Producto ("2", "Remera Blanca", 5000 , ["S", "M", "L", "XL"]);
const producto3 = new Producto ("3", "Remera Azul", 5000 , ["S", "M", "L", "XL"]);

producto1.sumarIva ();
producto2.sumarIva ();
producto3.sumarIva ();

producto1.imprimirProductos ();
producto2.imprimirProductos ();
producto3.imprimirProductos ();
