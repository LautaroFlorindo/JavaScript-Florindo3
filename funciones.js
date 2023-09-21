// CREACIÓN DE PRODUCTOS - HTML

let ul;
const divProductos = document.getElementById("productos");

function pushF(lugar, pusheado) {
    lugar.appendChild(pusheado)
}

function cardProducto(item) {
    ul = document.createElement("ul")
    ul.classList.add("m-15", "pd-15")
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
    ul.classList.add("m-15", "pd-15", "ulCarrito");
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
                    botonQuitar.classList.add("m-15")
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

const divCarritoYTotal = document.getElementById("carritoTotal")
const divCarrito = document.getElementById("carrito");
const divTotal = document.getElementById("totalC")
const botonMostrar = document.getElementById("mostrarC");
const botonOcultar = document.getElementById("ocultarC");
const botonLimpiar = document.getElementById("limpiarC");

function mostrarCarrito() {
    divCarrito.innerHTML = ""
    divCarritoYTotal.classList.add("pd-15")


    if (carrito.length == 0) {
        let p = document.createElement("p")
        p.classList.add("m-15", "pd-15");
        p.innerText = "El carrito está vacío."
        p.classList.add("textoCarrito")
        divTotal.innerHTML = ""
        pushF(divCarrito, p)
    } else {
        carrito.forEach((el) => {
            cardCarrito(el)
        })
        let sumaFinal = 0;
        carrito.forEach((el) => {
            sumaFinal += (el.precio * el.cantidad)
        })
        divTotal.innerHTML = `Total: $${sumaFinal}`
    }

}


function ocultarCarrito() {
    divCarrito.innerHTML = ""
    divTotal.innerHTML = ""
    divCarritoYTotal.classList.replace("pd-15", "pd-0")
    localStorage.setItem("carritoLS", JSON.stringify(carrito))
}

function limpiarCarrito() {
    if(carrito.length > 0){
    Swal.fire({
        title: '¿Eliminar productos del carrito?',
        text: "Ésta acción no se puede revertir.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar.'
      }).then((result) => {
        if (result.isConfirmed) {
            divTotal.innerHTML = ""
            carrito = []
            localStorage.setItem("carritoLS", JSON.stringify(carrito))
            mostrarCarrito()
        }
      })
    } else{
        divTotal.innerHTML = ""
        localStorage.setItem("carritoLS", JSON.stringify(carrito))
    }
}

function agregarCarrito(boton, item) {
    boton.onclick = () => {
        Toastify({
            text: `Se agregó ${item.nombre} al carrito.`,
            duration: 2000,
            style:{
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
        localStorage.setItem("carritoLS", JSON.stringify(carrito));
       
        mostrarCarrito()
    }
}

function sumarCarrito(item, prop){
    item[prop] += 1
    mostrarCarrito()
    localStorage.setItem("carritoLS", JSON.stringify(carrito))
}

function restarCarrito(item, prop){
    if(item[prop] < 2){
        carrito.splice(carrito.indexOf(item), 1)
    }else{
        item[prop] -= 1  
    }  
    mostrarCarrito() 
    localStorage.setItem("carritoLS", JSON.stringify(carrito))
}

function quitarCarrito(index) {
    carrito.splice(index, 1)
    mostrarCarrito()
}
