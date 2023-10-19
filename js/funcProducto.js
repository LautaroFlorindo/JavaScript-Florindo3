// CREACIÓN DE PRODUCTOS - HTML

let ul;
const divProductos = document.getElementById("productos");

function pushF(lugar, pusheado) {
    lugar.appendChild(pusheado)
}

function cardProducto(item) {
    ul = document.createElement("ul")
    ul.classList.add("m-pd-15", "ulProducto")
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
                    botonSumar.classList.add("botonSumar")
                    botonSumar.innerHTML = `<img id="botonMasMenosCarrito" src="./img/mas.svg">`
                    let botonRestar = document.createElement("button")
                    botonRestar.classList.add("botonRestar")
                    botonRestar.innerHTML = `<img id="botonMasMenosCarrito" src="./img/menos.svg">`
                    pushF(li, botonRestar);
                    pushF(li, document.createTextNode(` ${item[prop]} `));
                    pushF(li, botonSumar);
                    botonSumar.onclick = () => sumarCarrito(item, prop)
                    botonRestar.onclick = () => restarCarrito(item, prop)

                    let botonQuitar = document.createElement("button")
                    botonQuitar.classList.add("m-10", "botonQuitar")
                    botonQuitar.innerHTML = `<img id="imgBotonCarrito" src="./img/basureroCarrito.png">`
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
