
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
