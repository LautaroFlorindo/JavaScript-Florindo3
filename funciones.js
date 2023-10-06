// CREACIÓN DE PRODUCTOS - HTML

let ul;
const divProductos = document.getElementById("productos");

function pushF(lugar, pusheado) {
    lugar.appendChild(pusheado)
}

function cardProducto(item) {
    ul = document.createElement("ul")
    ul.classList.add("m-15", "pd-15", "ulProducto")
    let divCardProductos = document.createElement("div")
    let botonAgregar = document.createElement("button")
    botonAgregar.className = "botonAgregarCarrito"
    botonAgregar.innerText = "Agregar al Carrito"
    item.cantidad = ""


    crearElemento(item, "imgProductos")

    pushF(divCardProductos, ul)
    pushF(divCardProductos, botonAgregar)
    pushF(divProductos, divCardProductos)

    agregarCarrito(botonAgregar, item)
}

function cardCarrito(item) {
    ul = document.createElement("ul");
    ul.classList.add("m-15", "pd-0", "ulCarrito");
    item.esProducto = false;

    crearElemento(item, "imgCarrito")


    pushF(divCarrito, ul)
}

function crearElemento(item, clase) {
    for (const prop in item) {
        if (prop === "img") {
            let img = document.createElement("img")
            img.classList.add(clase)
            img.src = item[prop]
            pushF(ul, img)
        } else if (prop !== "id") {
            let li = document.createElement("li")
            if (prop == "nombre") {
                li.innerHTML = `<b>${item[prop]}</b>`
                pushF(ul, li)
            } else if (prop === "precio") {
                li.innerHTML = `$${item[prop]}`
                pushF(ul, li)
            } else if (prop === "cantidad") {
                if (!item.esProducto) {
                    let botonSumar = document.createElement("button")
                    botonSumar.innerHTML = `+`
                    let botonRestar = document.createElement("button")
                    botonRestar.innerHTML = `-`
                    pushF(li, botonRestar);
                    pushF(li, document.createTextNode(` ${item[prop]} `));
                    pushF(li, botonSumar);
                    botonSumar.onclick = () => sumarCarrito(item, prop)
                    botonRestar.onclick = () => restarCarrito(item, prop)

                    let botonQuitar = document.createElement("button")
                    botonQuitar.innerHTML = `<img id="imgBotonCarrito" src="./img/basureroCarrito.png">`
                    botonQuitar.classList.add("m-10")
                    botonQuitar.onclick = () => quitarCarrito(carrito.indexOf(item))

                    pushF(ul, li)
                    pushF(ul, botonQuitar);
                }
            } else if (prop !== "esProducto") {
                li.innerHTML = `${item[prop]}`
                pushF(ul, li)
            }
        }
    }
}


// FUNCIONES DE CARRITO - HTML 

let carrito = JSON.parse(localStorage.getItem("carritoLS")) || []

const divCarritoCompleto = document.getElementById("carritoCompleto")
const divCarritoYTotal = document.getElementById("carritoTotal")
const divCarrito = document.getElementById("carrito");
const divTotal = document.getElementById("totalC")
const botonMostrar = document.getElementById("mostrarC");
const botonOcultar = document.getElementById("ocultarC");
const botonLimpiar = document.getElementById("limpiarC");
const main = document.getElementById("main")

function mostrarCarrito() {
    divCarrito.innerHTML = `<span class="loader"></span>`
    divCarritoYTotal.classList.add("pd-15")
    divCarritoCompleto.classList.add("carritoAbierto");
    divCarritoCompleto.classList.remove("carritoCerrado");
    botonMostrar.classList.add("botonCarritoCerrado");
    botonMostrar.classList.remove("botonCarritoAbierto");
    botonOcultar.classList.remove("botonCarritoCerrado");
    botonLimpiar.classList.remove("botonCarritoCerrado");
    
    setTimeout(() => {
        if (carrito.length == 0) {
            divCarrito.innerHTML = ""
            divCarritoYTotal.classList.add("carritoVacio")
            let p = document.createElement("p")
            p.classList.add("m-15", "pd-15");
            p.innerText = "El carrito está vacío."
            p.classList.add("textoCarrito")
            divTotal.innerHTML = ""
            pushF(divCarrito, p)
        } else if (divCarritoCompleto.classList.contains("carritoAbierto")) {
            divCarrito.innerHTML = ""
            divCarritoYTotal.classList.remove("carritoVacio")
            carrito.forEach((el) => {
                cardCarrito(el)
            })
            let sumaFinal = 0;
            carrito.forEach((el) => {
                sumaFinal += (el.precio * el.cantidad)
            })
            divTotal.innerHTML = `<p id="totalPrecio">Total: $${sumaFinal}</p>`
        } 
    }, 300);
}


function ocultarCarrito() {
    divCarrito.innerHTML = ""
    divTotal.innerHTML = ""
    divCarritoYTotal.classList.replace("pd-15", "pd-0")
    divCarritoCompleto.classList.add("carritoCerrado");
    divCarritoCompleto.classList.remove("carritoAbierto");
    botonMostrar.classList.add("botonCarritoAbierto");
    botonOcultar.classList.add("botonCarritoCerrado");
    botonLimpiar.classList.add("botonCarritoCerrado");
    localStorage.setItem("carritoLS", JSON.stringify(carrito))
}

function limpiarCarrito() {
    if (carrito.length > 0) {
        Swal.fire({
            title: '¿Vaciar carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, vaciar.',
            cancelButtonText: "No, seguir comprando.",
            customClass: {
                container: "containerSwal",
                popup: "popupSwal",
                header: "headerSwal",
                title: "titleSwal",
                icon: "iconSwal",
                confirmButton: "confirmSwal",
                cancelButton: "cancelSwal",
              }
        }).then((result) => {
            if (result.isConfirmed) {
                divTotal.innerHTML = ""
                carrito = []
                localStorage.setItem("carritoLS", JSON.stringify(carrito))
                ocultarCarrito()
            }
        })
    } else {
        divTotal.innerHTML = ""
        localStorage.setItem("carritoLS", JSON.stringify(carrito))
    }
}

function agregarCarrito(boton, item) {
    boton.onclick = () => {
            Toastify({
                text: `Se agregó ${item.nombre} al carrito.`,
                duration: 1000,
                style: {
                    background: "linear-gradient(to right, #4c944c, #008001)"
                }
            }).showToast();

        const elementoExistente = carrito.find((el) => el.id === item.id);
        let qty = 1;

        if (elementoExistente) {
            elementoExistente.cantidad += qty;
        } else {
            item.cantidad = qty;
            item.tamano = "";
            carrito.push(item);
        }

        divCarritoCompleto.classList.contains("carritoAbierto") && mostrarCarrito()

        localStorage.setItem("carritoLS", JSON.stringify(carrito));
    }
}

function sumarCarrito(item, prop) {
    item[prop] += 1
    mostrarCarrito()
    localStorage.setItem("carritoLS", JSON.stringify(carrito))
}

function restarCarrito(item, prop) {
    if (item[prop] < 2) {
        carrito.splice(carrito.indexOf(item), 1)
    } else {
        item[prop] -= 1
    }
    mostrarCarrito()
    localStorage.setItem("carritoLS", JSON.stringify(carrito))
}

function quitarCarrito(index) {
    carrito.splice(index, 1)
    mostrarCarrito()
}
