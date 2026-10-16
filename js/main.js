let productos = [];
let idProductoEnEdicion = null;

const contenedorItems = document.getElementById("contenedor-items");
const btnModo = document.querySelector(".btn-modo");
const formulario = document.getElementById("formulario-producto");
const inputNombre = document.getElementById("input-nombre");
const inputPrecio = document.getElementById("input-precio");
const inputBusqueda = document.getElementById("input-busqueda");
const contadorProductos = document.getElementById("contador-productos");
const btnAgregar = document.getElementById("btn-agregar");
const btnVaciar = document.getElementById("btn-vaciar");
const bannerPromocional = document.getElementById ("banner-promocional")



function notificarToast(mensaje, tipo = "exito") {
    const colores = {
        exito: "linear-gradient(to right, #10b981, #059669)",
        alerta: "linear-gradient(to right, #f59e0b, #d97706)", 
        error: "linear-gradient(to right, #ef4444, #dc2626)",
        info: "linear-gradient(to right, #3b82f6, #1d4ed8)" 
    };

    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: colores[tipo] ?? colores.exito,
            borderRadius: "8px",
            color: "#ffffff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
        }
    }).showToast();
}

async function obtenerProductos() {
    try {
        const datosStorage = localStorage.getItem("productos");
        if (datosStorage) {
            productos = JSON.parse(datosStorage);
            renderizarProductos(productos);
            return;
        }

        contenedorItems.innerHTML = `
            <div class="cargando">
                <p> Cargando productos...</p>
            </div>
        `;

        const respuesta = await fetch("./data/productos.json");

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datosJSON = await respuesta.json();
        productos = datosJSON;

        guardarProductosEnStorage();

        notificarToast("✅ Productos cargados con éxito", "exito");

    } catch (error) {
        console.error("Error al obtener los productos:", error);

        notificarToast("❌ No se pudieron cargar los productos", "error");

        contenedorItems.innerHTML = `
            <div class="sin-items">
                <p>⚠️ Ocurrió un error al cargar los datos. Intente recargar la página.</p>
            </div>
        `;
    } finally {
        if (productos.length > 0) {
            renderizarProductos(productos);
            iniciarNotificacionAsincronica();
        }
    }
}

function guardarProductosEnStorage() {
    try {
        localStorage.setItem("productos", JSON.stringify(productos));
    } catch (error) {
        console.error("Error al guardar en Storage:", error);
    }
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
function iniciarNotificacionAsincronica() {
    setTimeout(() => {
        if (bannerPromocional) {
            bannerPromocional.innerHTML = `
                <div class="banner-contenido">
                    <span>🔔 <strong>¡Notificación del día!</strong> Usá el cupón <strong>SPORTLINE</strong> para un 10% OFF en tu compra.</span>
                </div>
            `;
            bannerPromocional.classList.remove("oculto");
        }
    }, 1500);
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
        const { id, nombre, precio, stock } = producto;

        const card = document.createElement("div");
        card.classList.add("item-card");

        card.innerHTML = `
            <div class="item-info">
                <h3>${nombre}</h3>
                <p>$${Number(precio).toLocaleString("es-AR")}</p>
                ${stock !== undefined ? `<small class="stock-tag">Stock: ${stock} un.</small>` : ''}
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
            const productoAEliminar = productos.find((p) => p.id === idAEliminar);

            if (!productoAEliminar) return;

            Swal.fire({
                title: '¿Eliminar producto?',
                text: `Vas a borrar "${productoAEliminar.nombre}" del catálogo.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#64748b',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const indice = productos.findIndex((p) => p.id === idAEliminar);
                    productos.splice(indice, 1);

                    guardarProductosEnStorage();
                    aplicarFiltro();
                    notificarToast(`"${productoAEliminar.nombre}" eliminado`, "alerta");
                }
            });
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
                notificarToast("Modo edición activado", "info");
            }
        });
    });
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
        const nombreVal = inputNombre.value.trim();
        const precioVal = parseFloat(inputPrecio.value);

        // 1. Validamos que los campos no estén vacíos o sean inválidos
        if (!nombreVal || isNaN(precioVal) || precioVal <= 0) {
            throw new Error("Por favor ingrese un nombre y un precio válidos.");
        }

        if (idProductoEnEdicion !== null) {
            const existeOtroIgual = productos.some(
                (p) => p.nombre.toLowerCase() === nombreVal.toLowerCase() && Number(p.id) !== Number(idProductoEnEdicion)
            );
            if (existeOtroIgual) {
                throw new Error("Ya existe otro producto con ese mismo nombre.");
            }
            const indice = productos.findIndex((p) => Number(p.id) === Number(idProductoEnEdicion));
            if (indice !== -1) {
                productos[indice] = {
                    ...productos[indice],
                    nombre: nombreVal,
                    precio: precioVal
                };
                notificarToast(`"${nombreVal}" actualizado con éxito`, "exito");
            }

            idProductoEnEdicion = null;
            btnAgregar.textContent = "+ Agregar Producto";

        } else {
            const yaExiste = productos.some(
                (p) => p.nombre.toLowerCase() === nombreVal.toLowerCase()
            );

            if (yaExiste) {

                throw new Error("El producto ya existe en el catálogo.");
            }

            const nuevoProducto = {
                id: Date.now(),
                nombre: nombreVal,
                precio: precioVal,
                stock: 10
            };

            productos.push(nuevoProducto);
            notificarToast(`"${nombreVal}" agregado con éxito`, "exito");
        }

        guardarProductosEnStorage();
        formulario.reset();
        inputBusqueda.value = "";
        renderizarProductos(productos);

    } catch (error) {
        notificarToast(`⚠️ ${error.message}`, "alerta");
    }
});

btnVaciar?.addEventListener("click", () => {
    if (productos.length === 0) {
        notificarToast("El catálogo ya está vacío", "alerta");
        return;
    }

    Swal.fire({
        title: '¿Vaciar todo el catálogo?',
        text: 'Esta acción borrará todos los ítems guardados.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, vaciar catálogo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            productos = [];
            localStorage.removeItem("productos");
            renderizarProductos(productos);
            notificarToast("Se ha vaciado el catálogo completo", "alerta");
        }
    });
});

function aplicarFiltro() {
    const termino = inputBusqueda.value.toLowerCase().trim();
    const filtrados = productos.filter((p) =>
        p.nombre.toLowerCase().includes(termino)
    );
    renderizarProductos(filtrados);
}

inputBusqueda.addEventListener("input", aplicarFiltro);

obtenerProductos();