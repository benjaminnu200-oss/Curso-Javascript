const productosIniciales = [
    { id: 1, nombre: "Remera Negra Lisa", precio: 15000 },
    { id: 2, nombre: "Remera Blanca Lisa", precio: 15000 },
    { id: 3, nombre: "Remera Negra Estampada", precio: 20000 }
];
const productos = JSON.parse(localStorage.getItem("productos")) ?? productosIniciales;

const contenedorItems = document.getElementById("contenedor-items");
const btnModo = document.querySelector (".btn-modo");
const formulario = document.getElementById("formulario-producto");
const inputNombre = document.getElementById("input-nombre");
const inputPrecio = document.getElementById("input-precio");
const inputBusqueda = document.getElementById("input-busqueda");
const mensajeFeedback = document.getElementById("mensaje-feedback");
const contadorProductos = document.getElementById("contador-productos");


let timeoutFeedback;

const modoGuardado = localStorage.getItem("modoOscuro");
if (localStorage.getItem("modoOscuro") === "true") {
    document.body.classList.add("oscuro");
    btnModo.textContent = "Modo Claro";
}

btnModo.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
    const btnOscuro = document.body.classList.contains("oscuro");
    btnModo.textContent = btnOscuro ? "Modo Claro" : "Modo Oscuro";
    localStorage.setItem("modoOscuro", btnOscuro);
});

function guardarProductosEnStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function mostrarFeedback(mensaje, tipo = "exito") {
    clearTimeout(timeoutFeedback);
    mensajeFeedback.textContent = mensaje;
    mensajeFeedback.className = `feedback ${tipo}`;

    timeoutFeedback = setTimeout(() => {
        mensajeFeedback.className = "feedback oculto";
    }, 2500);
}

function renderizarProductos(lista) {
    contenedorItems.innerHTML = "";

    contadorProductos.textContent = `${lista.length} producto${lista.length === 1 ? '' : 's'}`;

    if (lista.length === 0) {
        contenedorItems.innerHTML = `
        <div class="sin-items">
        <p>No se encontraron productos disponibles.</p>
        </div>
    `;
        return;
    }

    lista.forEach((producto) => {
        const { id, nombre, precio } = producto;
        const card = document.createElement("div");
        card.classList.add("item-card");

        card.innerHTML = `
        <div class="item-info">
            <h3>${nombre}</h3>
            <p>$${Number(precio).toLocaleString("es-AR")}</p>
        </div>
        <button class="btn btn-danger btn-eliminar" data-id="${id}">
            Eliminar
        </button>
    `;

        contenedorItems.appendChild(card);
    });

    asignarEventosEliminar();
}


function asignarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");

    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const idAEliminar = parseInt(e.target.dataset.id);
            const indice = productos.findIndex((p) => p.id === idAEliminar);

            if (indice !== -1) {
                const { nombre } = productos[indice];
                productos.splice(indice, 1);
                
                guardarProductosEnStorage(); // Persistencia
                aplicarFiltro();
                mostrarFeedback(`"${nombre}" ha sido eliminado.`, "alerta");
            }
        });
    });
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreVal = inputNombre.value.trim();
    const precioVal = parseFloat(inputPrecio.value);

    if (!nombreVal || isNaN(precioVal) || precioVal <= 0) {
        mostrarFeedback("Por favor ingrese datos válidos.", "alerta");
        return;
    }

    const nuevoProducto = {
        id: Date.now(),
        nombre: nombreVal,
        precio: precioVal
    };

    productos.push(nuevoProducto);
    guardarProductosEnStorage();

    formulario.reset();
    inputNombre.focus();


    inputBusqueda.value = "";
    renderizarProductos(productos);

    const { nombre } = nuevoProducto;
    mostrarFeedback(`"${nombre}" agregado con éxito.`, "exito");
});

function aplicarFiltro() {
    const termino = inputBusqueda.value.toLowerCase().trim();
    const filtrados = productos.filter((p) =>
        p.nombre.toLowerCase().includes(termino)
    );
    renderizarProductos(filtrados);
}

inputBusqueda.addEventListener("input", aplicarFiltro);

renderizarProductos(productos);