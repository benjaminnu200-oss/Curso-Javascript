const productosIniciales = [
    { id: 1, nombre: "Remera Negra Lisa", precio: 15000 },
    { id: 2, nombre: "Remera Blanca Lisa", precio: 15000 },
    { id: 3, nombre: "Remera Negra Estampada", precio: 20000 }
];
function cargarProductosDesdeStorage() {
    try {
        const datosGuardados = localStorage.getItem("productos");
        if (!datosGuardados) return productosIniciales;
        return JSON.parse(datosGuardados) ?? productosIniciales;
    } catch (error) {
        console.error("Error al leer desde localStorage:", error);
        mostrarFeedback(" Hubo un problema al recuperar los datos guardados. Se cargó el catálogo por defecto.", "alerta");
        return productosIniciales;
    } finally {
        console.log("Carga de productos finalizada.");
    }
}

let productos = cargarProductosDesdeStorage();
let idProductoEnEdicion = null;

const contenedorItems = document.getElementById("contenedor-items");
const btnModo = document.querySelector(".btn-modo");
const formulario = document.getElementById("formulario-producto");
const inputNombre = document.getElementById("input-nombre");
const inputPrecio = document.getElementById("input-precio");
const inputBusqueda = document.getElementById("input-busqueda");
const mensajeFeedback = document.getElementById("mensaje-feedback");
const contadorProductos = document.getElementById("contador-productos");
const btnAgregar = document.getElementById("btn-agregar");
const btnVaciar = document.getElementById("btn-vaciar");
const bannerPromocional = document.getElementById("banner-promocional");

let timeoutFeedback;

function iniciarNotificacionAsincronica() {
    setTimeout(() => {
        if (bannerPromocional) {
            bannerPromocional.innerHTML = `
                <div class="banner-contenido">
                    <span> <strong>¡Notificación del día!</strong> Usá el cupón <strong>SPORTLINE</strong> para un 10% OFF en tu compra.</span>
                </div>
            `;
            bannerPromocional.classList.remove("oculto");
        }
    }, 2000);
}
if (localStorage.getItem("modoOscuro") === "true") {
    document.body.classList.add("oscuro");
    btnModo.textContent = "Modo Claro";
}

btnModo.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
    const esOscuro = document.body.classList.contains("oscuro");
    btnModo.textContent = esOscuro ? "Modo Claro" : "Modo Oscuro";
    localStorage.setItem("modoOscuro", esOscuro);
});

function guardarProductosEnStorage() {
    try {
        localStorage.setItem("productos", JSON.stringify(productos));
    } catch (error) {
        console.error("Error al guardar en localStorage:", error);
        mostrarFeedback("⚠️ No se pudieron guardar los cambios en el navegador.", "alerta");
    }
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
            <div class="item-acciones">
                <button class="btn btn-warning btn-editar" data-id="${id}">Editar</button>
                <button class="btn btn-danger btn-eliminar" data-id="${id}">Eliminar</button>
            </div>
        `;

        contenedorItems.appendChild(card);
    });

    asignarEventosAcciones();
}

function asignarEventosAcciones() {
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const idAEliminar = parseInt(e.target.dataset.id);
            const indice = productos.findIndex((p) => p.id === idAEliminar);

            if (indice !== -1) {
                const { nombre } = productos[indice];
                productos.splice(indice, 1);

                guardarProductosEnStorage();
                aplicarFiltro();
                mostrarFeedback(`"${nombre}" ha sido eliminado.`, "alerta");
            }
        });
    });

    const botonesEditar = document.querySelectorAll(".btn-editar");
    botonesEditar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const idAEditar = parseInt(e.target.dataset.id);
            const productoAEditar = productos.find((p) => p.id === idAEditar);

            if (productoAEditar) {
                const { id, nombre, precio } = productoAEditar;
                inputNombre.value = nombre;
                inputPrecio.value = precio;
                
                idProductoEnEdicion = id;
                btnAgregar.textContent = "Guardar Cambios";
                inputNombre.focus();
            }
        });
    });
}
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
        const nombreVal = inputNombre.value.trim();
        const precioVal = parseFloat(inputPrecio.value);

        if (!nombreVal || isNaN(precioVal) || precioVal <= 0) {
            throw new Error("Datos de entrada inválidos.");
        }

        if (idProductoEnEdicion !== null) {
            const indice = productos.findIndex((p) => p.id === idProductoEnEdicion);
            if (indice !== -1) {
                productos[indice] = {
                    ...productos[indice],
                    nombre: nombreVal,
                    precio: precioVal
                };
                mostrarFeedback(`"${nombreVal}" actualizado con éxito.`, "exito");
            }
            idProductoEnEdicion = null;
            btnAgregar.textContent = "+ Agregar Producto";
        } else {
            const nuevoProducto = {
                id: Date.now(),
                nombre: nombreVal,
                precio: precioVal
            };

            productos.push(nuevoProducto);
            const { nombre } = nuevoProducto;
            mostrarFeedback(`"${nombre}" agregado con éxito.`, "exito");
        }

        guardarProductosEnStorage();
        formulario.reset();
        inputBusqueda.value = "";
        renderizarProductos(productos);

    } catch (error) {
        console.error("Error al procesar el formulario:", error.message);
        mostrarFeedback("⚠️ Por favor ingrese datos válidos.", "alerta");
    } finally {
        inputNombre.focus();
    }
});

btnVaciar?.addEventListener("click", () => {
    if (productos.length === 0) {
        mostrarFeedback("El catálogo ya está vacío.", "alerta");
        return;
    }

    productos = [];
    localStorage.removeItem("productos");
    renderizarProductos(productos);
    mostrarFeedback("Se ha vaciado el catálogo completo.", "alerta");
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
iniciarNotificacionAsincronica();