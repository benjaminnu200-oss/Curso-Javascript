let nombre = prompt("Ingrese nombre");
let apellido = prompt("Ingrese su apellido");
function saludar(nombre, apellido) {
    alert("Hola" + " " + nombre + " " + apellido + " " + "Bienvenido a la tienda");
}

saludar(nombre, apellido);

const remeraNegra = 5000;
const remeraRoja = 5000;
const remeraBlanca = 5000;
let MenuDeCompras = parseInt(prompt("Ingrese 1, si desea Remera Negra, 2 si desea Remera Roja, 3 Si desea Remera Blanca o 0 para salir"))

function obtenerPrecio(MenuDeCompras) {
    switch (MenuDeCompras) {
        case 1:
            return remeraNegra;
            break;
        case 2:
            return remeraRoja;
            break;
        case 3:
            return remeraBlanca;
            break;
        default:
            alert("Opcion no valida");
            return 0; 
    }
}
let totalGeneral = 0; 
const calcularTotal = (precio, cantidad) => precio * cantidad;

while (MenuDeCompras !== 0) {
let precio = obtenerPrecio(MenuDeCompras);
if (precio > 0 ) {
alert ("El precio de esta remera es de " + "$" + precio);
let cantidad = parseInt(prompt("¿Cuántas unidades desea comprar?"));
if ( cantidad > 0 ) {
let totalFinal = calcularTotal(precio, cantidad);
alert ("El monto total es de " + "$" + totalFinal);
totalGeneral = totalGeneral + totalFinal;
alert ("Agregado al carrito $" + totalFinal + " // Total acumulado : $" + totalGeneral);
}
}
MenuDeCompras = parseInt (prompt ("¿Desea comprar otra remera? 1, si desea Remera Negra, 2 si desea Remera Roja, 3 Si desea Remera Blanca o 0 para salir "))
}
alert ("El monto total a pagar es de $" + totalGeneral) ;
