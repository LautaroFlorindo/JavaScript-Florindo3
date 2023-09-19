// PRODUCTOS 
class Producto {
    constructor(id, img, nombre, precio, tamano, cantidad, esProducto) {
        this.id = parseInt(id);
        this.img = img;
        this.nombre = nombre;
        this.precio = precio;
        this.tamano = tamano;
        this.cantidad = cantidad;
        this.esProducto = esProducto;
    }
}

const aj = new Producto(1, "./img/aj.jpeg", "Air Jordan", 25000, "14x32x14cm", 1, true)
const aj4 = new Producto(2, "./img/jordan4.jpeg", "Air Jordan 4", 22000, "14x29x14cm", 1, true)
const dunklow = new Producto(3, "./img/dunklow.jpeg", "Dunk Low", 17000, "14x26x14cm", 1, true)

const productos = [aj, aj4, dunklow]

