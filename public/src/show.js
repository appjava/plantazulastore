/*
if ("serviceWorker" in navigator) {
	  window.addEventListener("load", function() {
		navigator.serviceWorker
		  .register("/serviceWorker.js")
		  .then(res => console.log("service worker registered"))
		  .catch(err => console.log("service worker not registered", err))
	  })
	}
*/

let shop = document.getElementById("shop") || [];
let show = document.getElementById("show");
let welco = document.getElementById("welcome") || [];
let nameShowcase = document.getElementById("nameShowcase");
let onDet = document.getElementById("onlyDetails") || [];
let standItemsData = [];
let productShow = [];

let basket = JSON.parse(localStorage.getItem("data")) || [];
let subTot2 = document.getElementById("subTot2");
let selectProduct = JSON.parse(localStorage.getItem("product")) || [];
let productSelect = JSON.parse(localStorage.getItem("producto")) || [];


let showWelco = () => {
  
  return (nameShowcase.innerHTML = productSelect.map((x) => {
    
    let { id } = x;
    let search = standItemsData.find((x) => x.id === id) || [];
    
    return `
    <div class="detail">
      <h2 class="detail">${search.name}</h2>
    </div>
    `;}).join(""));

};



let showProduct = () => {
  showWelco();
  
  return (show.innerHTML = productSelect.map((x) => {
    
      let { id } = x;
      let search = standItemsData.find((x) => x.id === id) || [];
      let search2 = basket.find((x) => x.id === id) || [];
      return `
      
      <section class="product-details">
        <div class="image-slider" style="background-image: url(${search.img})">
            <div class="product-images">
                <img src=${search.img === undefined ? ["images/logos/logoPlantaZula.png"] : search.img} alt="" class="active">
                <img src=${search.img1 === undefined ? ["images/logos/logoPlantaZula.png"] : search.img1} alt="" >
                <img src=${search.img2 === undefined ? ["images/logos/logoPlantaZula.png"] : search.img2} alt="" >
                <img src=${search.img3 === undefined ? ["images/logos/logoPlantaZula.png"] : search.img3} alt="" >
            </div>
        </div>
      </section>

      
      <!--
      <div class="showcase">
        <div class="pic-ctn">
            <img src=${search.img === undefined ? ["images/logos/logoPlantaZula.png"] : search.img} alt="" class="pic">
            <img src=${search.img1 === undefined ? ["images/logos/logoPlantaZula.png"] : search.img1} alt="" class="pic">
            <img src=${search.img2 === undefined ? ["images/logos/logoPlantaZula.png"] : search.img2} alt="" class="pic">
            <img src=${search.img3 === undefined ? ["images/logos/logoPlantaZula.png"] : search.img3} alt="" class="pic">
        </div>
      </div>
      -->
      <div>
        <div class="detail">
          <br>
          <h3 class="detail">${search.desc}</h3>
          <br>
        </div>
      
        <div id=product-id-${search.id} class="item-show">
          <br>
          <div class="price-quantity">
            <div class="buttons-show">
              <h3 class="price-item-show" onclick="increment(${search.id})">$ ${search.price} COP</h3>
              <i onclick="increment(${search.id})" class="bi bi-cart-plus-fill"></i>
              <div id=${search.id} class="quantity-item-show">
                ${search2.item === undefined ? "" : search2.item}
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="index.html">
      <button class="HomeBtn">Volver a Estante</button>
      </a>
     
    `;}).join(""));
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
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
        <img class="img-item" src=${img} alt="">
        <div class="details">
          <h4 class="name-item">${name}</h4>
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
    </div>
    `;
    })
    .join(""));
};

allPlants();
//generateShop();
showProduct();

const productImages = document.querySelectorAll(".product-images img"); // selecting all image thumbs
const productImageSlide = document.querySelector(".image-slider"); // seclecting image slider element

let activeImageSlide = 0; // default slider image

productImages.forEach((item, i) => { // loopinh through each image thumb
    item.addEventListener('click', () => { // adding click event to each image thumbnail
        productImages[activeImageSlide].classList.remove('active'); // removing active class from current image thumb
        item.classList.add('active'); // adding active class to the current or clicked image thumb
        productImageSlide.style.backgroundImage = `url('${item.src}')`; // setting up image slider's background image
        activeImageSlide = i; // updating the image slider variable to track current thumb
    })
})


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

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
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
  //onDet.innerHTML = "";
  //welcome();
  //generateShop();
};

function onlySuculentas(){
  standItemsData = [];
  suculentas.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  //onDet.innerHTML = "";
  detailSuculentas();
  generateShop();
};
function onlyBromelias(){
  standItemsData = [];
  bromelias.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  //onDet.innerHTML = "";
  detailBromelias();
  generateShop();
};
function onlyOrquideas(){
  standItemsData = [];
  orquideas.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  //onDet.innerHTML = "";
  detailOrquideas();
  generateShop();
};
function onlyAnturios(){
  standItemsData = [];
  anturios.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  //onDet.innerHTML = "";
  detailAnturios();
  generateShop();
};
function onlyCartuchos(){
  standItemsData = [];
  cartuchos.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  //onDet.innerHTML = "";
  detailCartuchos();
  generateShop();
};
function onlyPlaticeros(){
  standItemsData = [];
  platiceros.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  //onDet.innerHTML = "";
  detailPlaticeros();
  generateShop();
};
function onlyComplementos(){
  standItemsData = [];
  complementos.forEach((planta) => {
    standItemsData.push(planta);
  });
  welco.innerHTML = "";
  //onDet.innerHTML = "";
  detailComplementos();
  generateShop();
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

