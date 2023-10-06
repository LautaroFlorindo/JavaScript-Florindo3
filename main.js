// EJECUCION

productos.forEach((el) => {
    cardProducto(el)
})
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































