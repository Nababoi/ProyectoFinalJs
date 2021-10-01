
function productosUIjQuery(productos, id){
  $(id).empty()
  for (const producto of productos) {
    $(id).append(`<div class="card">
                    <img src=" ${producto.img} " class="imagen" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                      <p class="card-text">${producto.precio}</p>
                      <span class="badge bg-info">${producto.categoria}</span>
                      <a href="#" id='${producto.id}' class="btn btn-primary btn-compra">COMPRAR</a>
                    </div>
                  </div>`);
  }

  $('.btn-compra').on("click", comprarProducto);
}

function comprarProducto(e){
  e.preventDefault();

  e.stopPropagation();
  const idProducto   = e.target.id;

  const seleccionado = carrito.find(p => p.id == idProducto);
  

  if(seleccionado == undefined){
    carrito.push(productos.find(p => p.id == idProducto));
  } else {

    seleccionado.agregarCantidad(1);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  carritoUI(carrito);
}

function carritoUI(productos){

  $('#carritoCantidad').html(productos.length);

  $('#carritoProductos').empty();

  for (const producto of productos) {
    $('#carritoProductos').append(registroCarrito(producto));
  }

  $("#carritoProductos").append(`<div class = "CarritoTotal"><div class = "Total"><p id="totalCarrito"> TOTAL ${totalCarrito(productos)}</p></div>
                                <div id="divConfirmar" class="text-center"><button id="btnConfirmar" class="btn btn-success">CONFIRMAR</button></div>
                                </div>`);

  // $("#carritoProductos").append(`<div id="divConfirmar" class="text-center"><button id="btnConfirmar" class="btn btn-success">CONFIRMAR</button></div>`);

  $(".btn-add").click(addCantidad);
  $(".btn-delete").click(eliminarCarrito);
  $(".btn-restar").click(restarCantidad);
  $("#btnConfirmar").click(confirmarCompra);
}

function registroCarrito(producto){
  return `<p> ${producto.nombre} 
            <span class="badge bg-warning"> Precio Unitario: $ ${producto.precio}</span>
            <span class="badge bg-dark"> Cantidad: ${producto.cantidad}</span>
            <span class="badge bg-success"> Precio total: $ ${producto.subtotal()}</span>
            <a id="${producto.id}" class="btn btn-info btn-add">+</a>
            <a id="${producto.id}" class="btn btn-warning btn-restar">-</a>
            <a id="${producto.id}" class="btn btn-danger btn-delete">x</a>
            </p>`
}


function eliminarCarrito(e) {
  console.log(e.target.id);
  let posicion = carrito.findIndex(p => p.id == e.target.id);
  carrito.splice(posicion, 1);
  
  carritoUI(carrito);
  
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function addCantidad() {
  let producto = carrito.find(p => p.id == this.id);
  producto.agregarCantidad(1);
  $(this).parent().children()[1].innerHTML = producto.cantidad;
  $(this).parent().children()[2].innerHTML = producto.subtotal();

  $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function restarCantidad() {
  let producto = carrito.find(p => p.id == this.id);
  if(producto.cantidad > 1) {
    producto.agregarCantidad(-1);

    let registroUI = $(this).parent().children();
    registroUI[1].innerHTML = producto.cantidad;
    registroUI[2].innerHTML = producto.subtotal();

    $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);


    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
}

function selectUI(lista, selector){
  $(selector).empty();

  lista.forEach(element => {
    $(selector).append(`<option value="${element}">${element}</option>`)
  });
  $(selector).prepend(`<option value="TODOS" selected>TODOS</option>`);
}

function totalCarrito(carrito) {
  console.log(carrito);
  let total = 0;
  carrito.forEach(p => total += p.subtotal());
  return total.toFixed(2);
}

function confirmarCompra(){

}

$(".AnimacionSlideUp").click(function(){
  $(".AnimacionSlideUp").fadeOut(2000);
})


let textoHerramientas = "Las herramientas de jardineria son de uso domestico y tambien para actividades de jardineria a gran escala. En cuanto a la jardineria las herramientas se dividen en herramientas jardineria para la poda, para la limpieza, para el riego";

let textoTrepadoras = "Las enredaderas son plantas trepadoras que se caracterizan por presentar un tallo largo y voluble. Éste tiene la misión principal de “enredarse” y trepar por diferentes superficies, ya sean postes, paredes o pérgolas."

let textoInteriores = "LAS PLANTAS DE INTERIOR SON CUALQUIER ESPECIE VEGETAL CULTIVADA BAJO TECHO, COMO CASAS U OFICINAS. LAS PLANTAS DE INTERIOR SE CULTIVAN CON PROPOSITOS DECORATIVOS O POR MOTIVOS DE SALUD, COMO PURIFICADORES DE AIRE"

let textoSemillas = "LA SEMILLA ES EL COMPONENTE DE UNA FROTA QUE ALBERGA EL EMBRÍON QUE PUEDE DERIVAR EN UNA NUEVA PLANTA. ESTA CUMPLE CON LAS FUNCIONES DE DISPERSÍON, PROTECCION Y REPRODUCCION DE LA ESPECIE"

function modalAutomatizado(padre, clase, texto, boton, contenedor){

  $(".ContenedorSecciones").append(`<div class= ${padre}>
  <div class= ${clase}>
      <button class="BtnModal">x</button>
      <div class="TextoModal"> ${texto} </div>
  </div>
  </div>`)
  
  $(".ModalContenedor").hide();
  $(".ModalTrepadoraContenedor").hide();
  $(".ModalInterioresContenedor").hide();
  $(".ModalSemillasContenedor").hide();

  $(boton).click(function(){
    $(contenedor).fadeIn(1000);

})

$(contenedor).hide()

$(".BtnModal").click(function(){   
    $(contenedor).fadeOut(1000);
})
} 

modalAutomatizado("ModalContenedor","HerramientasModal", textoHerramientas, ".Herramientas", ".ModalContenedor")
modalAutomatizado("ModalTrepadoraContenedor", "TrepadoraModal",textoTrepadoras , ".Trepadoras", ".ModalTrepadoraContenedor")
modalAutomatizado("ModalInterioresContenedor","InterioresModal", textoInteriores,".Interiores", ".ModalInterioresContenedor")
modalAutomatizado("ModalSemillasContenedor", "SemillaModal", textoSemillas, ".Semillas", ".ModalSemillasContenedor")


function scale(elemento){
  $(elemento).css("transition", "transform 500ms ease-in-out");

  $(elemento).hover(
    function(){
      $(this).css("transform", "scale(1.2)");
    },
    function(){
      $(this).css("transform", "scale(1)");
    }
  )
}
scale(".Herramientas")
scale(".Trepadoras")
scale(".Interiores")
scale(".Semillas")

function animacionScroll(elemento){
$(window).scroll(function() {
  if ($(this).scrollTop() > 1200) {
      $(elemento).fadeIn(2000).css("transition", "transform 2000ms ease-in-out");
      $(elemento).css("transform", "translateX(0px) scale(0.9)");
      } 
  });
}
animacionScroll(".ContenedorInterioryAgua");
animacionScroll(".Riego")


$(window).scroll(function() {

if($(this).scrollTop() > 2000) {
$(".ContenedorCardsHerramientas").fadeIn(2000).css("transition", "transform 2000ms ease-in-out");
$(".ContenedorCardsHerramientas").css("transform", "translateY(0px) scale(0.83)");
  }
});

$(window).on("load", function(){
  $(".BoxShadow, .BoxShadowDerecha").fadeIn(2000).css("transition", "transform 2000ms ease-in-out");
  $(".BoxShadow, .BoxShadowDerecha").css("transform", "translateX(0px)");
})

$(".Burger").on("click", function(){
  $(".BarraTextoRes").toggleClass("BarraTextoResHide");


})

// $(".CarritoHide").on("click", function(){
//   $(".CarritoProductos").toggleClass("CarritoProductosHide")
// })