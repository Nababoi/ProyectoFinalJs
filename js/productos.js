
class Producto {
  constructor(id, img, nombre, precio, categoria, cantidad) {
          this.id = parseInt(id);
          this.img = img;
          this.nombre = nombre;
          this.precio = parseFloat(precio);
          this.categoria = categoria;
          this.cantidad = parseInt(cantidad);
  }

  agregarCantidad(valor) {

    this.cantidad += valor;
  }

  subtotal() {
    return this.cantidad * this.precio;
  }

}
