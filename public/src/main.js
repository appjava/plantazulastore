/*
if ("serviceWorker" in navigator) {
	  window.addEventListener("load", function() {
		navigator.serviceWorker
		  .register("./serviceWorker.js")
		  .then(res => console.log("service worker registered"))
		  .catch(err => console.log("service worker not registered", err))
	  })
	}
*/


let shop = document.getElementById("shop");
let show = document.getElementById("show") || [];
let welco = document.getElementById("welcome");
let onDet = document.getElementById("onlyDetails");
let standItemsData = [];
let productShow = [];
let productSelect = JSON.parse(localStorage.getItem("producto")) || [];
  
let basket = JSON.parse(localStorage.getItem("data")) || [];
let subTot2 = document.getElementById("subTot2");

const menuBar = document.getElementById('menu-bar');

// Hide guide
shop.addEventListener('click', () => {
  menuBar.checked = false;
});

let selectionID = (id) => {
  productSelect = [];
  let selectedItem = id;
  let search = productSelect.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    productSelect.push({
      id: selectedItem.id,
      
    });}
  localStorage.setItem("producto", JSON.stringify(productSelect));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    
    var valorTotal = amount;
    
    subTot2.innerHTML = `
    <h5>$ ${amount}</h5>
    `;
    return valorTotal;
  } else return;
};

TotalAmount();

let generateShop = () => {
  return (shop.innerHTML = standItemsData
    .map((x) => {
      let { id, name, price, desc1, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
        <a href="product.html" onclick="selectionID(${id})">
          <img class="img-item" src=${img} alt="">
        </a>
        <div class="details">
          <h4 class="name-item">${name}</h4>
          <p class="desc-item">"${desc1}"</p>
        </div>
        <div class="price-quantity">
          <h3 class="price-item">$ ${price} COP</h3>
          <div class="buttons v-center">
            <i onclick="increment(${id})" class="bi bi-cart-plus-fill"></i>
            <div id=${id} class="quantity-item">
              ${search.item === undefined ? "" : search.item}
            </div>
          </div>
        </div> 
    </div>
    `;
    })
    .join(""));
};


allPlants();
generateShop();


let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log(basket);
  TotalAmount();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let viewProduct = (id) => {
  selectProduct = [];
  let selected = id;
  let searchProduct = selectProduct.find((x) => x.id === selected.id);

  if (searchProduct === undefined) {
    selectProduct.push({id: selected.id});
  } else {
      pass;
  }

  // console.log(basket);
  TotalAmount();
  //showSelected(selected.id);
  localStorage.setItem("product", JSON.stringify(selectProduct));
  console.log(selectProduct);
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};


let showProduct = () => {
  return (show.innerHTML = productShow.map((x) => {
      let { id, name, price, desc, img } = x;
      let search = selectProduct.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
        <img class="img-item" src=${img} alt="">
        <div class="details">
          <h4 class="name-item">Nombre: ${name}</h4>
          <p class="desc-item">"${desc}"</p>
        </div>
        <div class="price-quantity">
          <h3 class="price-item">$ ${price} COP</h3>
          <div class="buttons">
            <i onclick="increment(${id})" class="bi bi-cart-plus-fill"></i>
            <div id=${id} class="quantity-item">
              ${search.item === undefined ? "" : search.item}
            </div>
          </div>
        </div> 
    </div>`;}).join(""));
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  let cartIcon2 = document.getElementById("cartAmount2");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  cartIcon2.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

function allPlants(){
  
  standItemsData = [];
  suculentas.forEach((planta) => {
    standItemsData.push(planta);
  });
  bromelias.forEach((planta) => {
    standItemsData.push(planta);
  });
  orquideas.forEach((planta) => {
    standItemsData.push(planta);
  });
  anturios.forEach((planta) => {
    standItemsData.push(planta);
  });
  cartuchos.forEach((planta) => {
    standItemsData.push(planta);
  });
  platiceros.forEach((planta) => {
    standItemsData.push(planta);
  });
  complementos.forEach((planta) => {
    standItemsData.push(planta);
  });
 
  welco.innerHTML = "";
  onDet.innerHTML = "";
  welcome();
  generateShop();
};

function onlySuculentas(){
  standItemsData = [];
  suculentas.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  onDet.innerHTML = "";
  detailSuculentas();
  generateShop();
  menuBar.checked = false;
};
function onlyBromelias(){
  standItemsData = [];
  bromelias.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  onDet.innerHTML = "";
  detailBromelias();
  generateShop();
  menuBar.checked = false;
};
function onlyOrquideas(){
  standItemsData = [];
  orquideas.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  onDet.innerHTML = "";
  detailOrquideas();
  generateShop();
  menuBar.checked = false;
};
function onlyAnturios(){
  standItemsData = [];
  anturios.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  onDet.innerHTML = "";
  detailAnturios();
  generateShop();
  menuBar.checked = false;
};
function onlyCartuchos(){
  standItemsData = [];
  cartuchos.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  onDet.innerHTML = "";
  detailCartuchos();
  generateShop();
  menuBar.checked = false;
};
function onlyPlaticeros(){
  standItemsData = [];
  platiceros.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  onDet.innerHTML = "";
  detailPlaticeros();
  generateShop();
  menuBar.checked = false;
};
function onlyComplementos(){
  standItemsData = [];
  complementos.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  onDet.innerHTML = "";
  detailComplementos();
  generateShop();
  menuBar.checked = false;
};

function welcome() {
	welco.innerHTML = `
	<div class="detail" id="detail">
	
	<p class="detalle">¡Bienvenido a nuestro maravilloso mundo! Aquí encontrarás una exquisita selección de plantas que llenarán tu vida de color, frescura y belleza natural. Explora nuestra colección y déjate cautivar por la magia de la naturaleza.</p>
	
	</div>
	
	`;
};
function detailBromelias() {
	onDet.innerHTML = `
	<div class="detail" id="detail">
	<h3 class="detalle">Bromelias</h3>
	<p class="detalle">Explora el encanto tropical de las bromelias: hojas vibrantes, flores en espiral y versatilidad para interiores y exteriores. ¡Embellece con magia exótica!</p>
	
	</div>
	
	`;
};
function detailSuculentas() {
	onDet.innerHTML = `
	<div class="detail" id="detail">
	<h3 class="detalle">Suculentas</h3>
	<p class="detalle">Descubre la elegancia y diversidad de las suculentas: hojas carnosas, colores cautivadores y bajo mantenimiento. ¡Decora con encanto natural y sofisticado!</p>
	
	</div>
	
	`;
};
function detailOrquideas() {
	onDet.innerHTML = `
	<div class="detail" id="detail">
	<h3 class="detalle">Orquídeas</h3>
	<p class="detalle">Descubre la elegancia de las orquídeas: colores, formas y cuidado sencillo. ¡Flores espectaculares para tu hogar!</p>
	
	</div>
	
	`;
};
function detailAnturios() {
	onDet.innerHTML = `
	<div class="detail" id="detail">
	<h3 class="detalle">Anturios</h3>
	<p class="detalle">Descubre los anturios: exuberantes inflorescencias, colores vibrantes y cuidado sencillo. ¡Tropicalidad y pasión para tu hogar!</p>
	
	</div>
	
	`;
};
function detailCartuchos() {
	onDet.innerHTML = `
	<div class="detail" id="detail">
	<h3 class="detalle">Cartuchos</h3>
	<p class="detalle">Explora los cartuchos: flores singulares, colores vibrantes y cuidado sencillo. ¡Elegancia acuática para tu espacio!</p>
	
	</div>
	
	`;
};
function detailPlaticeros() {
	onDet.innerHTML = `
	<div class="detail" id="detail">
	<h3 class="detalle">Platiceros</h3>
	<p class="detalle">Sumérgete en la belleza de los platiceros: hojas exóticas, colores cautivadores y facilidad de cuidado. ¡Fascinación tropical en tu hogar!</p>
	
	</div>
	
	`;
};
function detailComplementos() {
	onDet.innerHTML = `
	<div class="detail" id="detail">
	<h3 class="detalle">Complementos</h3>
	<p class="detalle">¡Embellece tu jardín con encantadores complementos! Materas elegantes, soportes prácticos y abonos nutritivos, todo en un solo lugar.</p>
	
	</div>
	
	`;
};

