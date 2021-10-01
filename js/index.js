
$(document).ready(function(){
  if("carrito" in localStorage) {
    const arrayLiterales = JSON.parse(localStorage.getItem("carrito"));
    for(const literal of arrayLiterales) {
      carrito.push(new Producto(literal.id, literal.img, literal.nombre, literal.precio, literal.categoria, literal.cantidad));
    }
    carritoUI(carrito);
  }
  $(".dropdown-menu").click(function(e){
    e.stopPropagation();
  });

  $.get("data/producto.json", function(datos, estado){
    console.log(datos);
    console.log(estado);
    if(estado == "success") {
      for(const literal of datos){
        productos.push(new Producto(literal.id, literal.img, literal.nombre, literal.precio, literal.categoria, literal.cantidad));
      }
    }
    console.log(productos);
    productosUIjQuery(productos, '#productosContenedor');
  });
});

selectUI(categorias, "#filtroCategorias");

$('#filtroCategorias').change(function(e) {
  const value = this.value;

  $('#productosContenedor').fadeOut(600, function(){

    if(value == 'TODOS'){
      productosUIjQuery(productos, '#productosContenedor');
    } else {
      const filtrados = productos.filter(producto => producto.categoria == value);
      productosUIjQuery(filtrados, '#productosContenedor');
    }
    $("#productosContenedor").fadeIn();
  })
});

$("#btn-oferta1").click(function(e){
  $("#oferta1").slideDown(2000).slideUp(2000);
})

$("#oferta2").animate({
  margin: '30px',
  opacity: 0.4,
  fontSize: "2em",
  width: 500
}, 2000).delay(1000).slideUp(1000);


