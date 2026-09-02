let nombre = prompt("Ingrese nombre");
let apellido = prompt("Ingrese su apellido");
function saludar(nombre, apellido) {
    alert("Hola" + " " + nombre + " " + apellido + " " + "Bienvenido a la tienda");
}

saludar(nombre, apellido);
let menus = ["Remera Negra", "Remera Roja", "Remera Blanca" ,"Remera Azul"];
console.log (menus)
menus.push ("Remera Verde");
menus.unshift ("Remera Gris")
let eliminado = menus.pop ();
console.log("Se ha eliminado" + " " + eliminado);
let buscar = prompt ("ingrese el nombre del producto que busca, ejemplos: Remera Violeta, Remera Negra, Remera Roja, Remera Blanca , Remera Azul")
if (menus.includes(buscar)) {
    let posicion = menus.indexOf(buscar)
    alert ("Producto encontrado, esta en: " + posicion )
}
else {
    alert("Lo sentimos, no existe el producto.")
}
menus.splice (0,1, "Remera Violeta")
console.log ("Se actualizó el catalogo. Se agrego Remera Violeta, Remera Gris sin stock")
const mostrarCatalogo = (menus) => {
    console.log("Catalogo Actualizado");
    for (let menu of menus) {
        console.log("Producto: " + menu);
    }
    }
mostrarCatalogo (menus);