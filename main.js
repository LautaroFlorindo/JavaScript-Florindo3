// EJECUCION


function traerProductos() {
    fetch("./data.json")
        .then(response => response.json())
        .then(data => {
            let productos = data
            productos.forEach((el) => {
                cardProducto(el)
            })
        })

}
traerProductos()

botonMostrar.onclick = () => {
    mostrarCarrito()
};
botonOcultar.onclick = () => {
    ocultarCarrito()
};
botonLimpiar.onclick = () => {
    limpiarCarrito()
    mostrarCarrito()
}
main.onclick = () => {
    ocultarCarrito()
}































