const usuarioCorrecto = "Benja"
const contraseñaCorrecta = "123456"
let usuarioIngresado = prompt ("ingrese su Usuario");
let contraseñaIngresada = prompt ("Ingrese su contraseña");
if (usuarioIngresado === usuarioCorrecto && contraseñaIngresada === contraseñaCorrecta) {
        console.log ("Bienvenido a remeras Sportline")
}
else if (usuarioIngresado !== usuarioCorrecto && contraseñaIngresada === contraseñaCorrecta) {
        console.log ("Usuario Incorrecto, intente nuevamente ");
}
    
else if (usuarioIngresado === usuarioCorrecto && contraseñaIngresada !== contraseñaCorrecta ) {
    console.log ("Contraseña Incorrecta, intente nuevamente");
}
else  {
    console.log ("Usuario y contraseña incorrectos, intente nuevamente")
}
let seguirComprando = true; 
while (seguirComprando) {
    let remera = parseInt (prompt ("Ingrese 1 para ver remera color negra, 2 para color rojo, 3 para color azul, o Cero (0) para salir"));
    if (remera === 0) {
    seguirComprando=false;
    console.log ("Gracias por visitarnos");
    break;
}

switch (remera) {
    case 1:
    console.log ("Tenemos disponible este color en todos los talles, el precio es de $10.000");
    break
    case 2:  
    console.log ("Tenemos disponible este color en todos los talles, el precio es de $10.000");
    break
    case 3:
    console.log ("Tenemos disponible este color en todos los talles, el precio es de $10.000")
    break
    default:
        console.log ("Lo lamentamos, no tenemos disponible la remera en ese en ese color.")
}
}
