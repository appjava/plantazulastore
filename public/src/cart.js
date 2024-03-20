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

let contact = document.getElementById("contact");
let label = document.getElementById("label");
let back = document.getElementById("back");
let ShoppingCart = document.getElementById("shopping-cart");
let cartIcon = document.getElementById("cartAmount");
let subTot = document.getElementById("subTot");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let productSelect = JSON.parse(localStorage.getItem("producto")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

function infoContact() {
	contact.innerHTML = `
	<div class="container">
      <form id="contacto">
          <fieldset class="datos">
              <h3 class="empty">Información de Contacto</h3>
              
                  <input type="text" id="name" placeholder="Nombre" required />
              
                  <input type="email" id="email" placeholder="Email" required />
              
                  <input type="tel" id="phone" placeholder="Teléfono" required />
     
          </fieldset>
      </form>
      <button id="submit" name="submit" onclick="sendEmail()">Realizar Pedido</button>
      <h6 class="note">* Confirmaremos los detalles del envío y el precio total de la compra, una vez realizado el pedido.</h6>
    </div>
	`;
};

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

let generateCartItems = () => {
  
  if (basket.length !== 0) {
    
    return (ShoppingCart.innerHTML = basket.map((x) => {
        
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
      <div class="cart-item">
      <a href="product.html" onclick="selectionID(${id})"><img src=${search.img} alt="" /></a>
        <div class="details-cart">
          <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <!--<p class="cart-item-price">$ ${search.price}</p>-->
              </h4>
          </div>
          <h3>$ ${item * search.price} COP</h3>
          <div class="title-price-x">
          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-square-fill"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-square-fill"></i>
          </div>
          <i onclick="removeItem(${id})" class="bi bi-trash"></i>
          </div>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2 class="empty">Vacio</h2>
    <div class="cart">
    <a href="index.html"><i class="bi bi-stars"></i></a>
    </div>
    <h5 class="note">* Agrega productos del estante para hacer la compra</h5>
    <a href="index.html">
      <button class="HomeBtn">Volver a Estante</button>
    </a>
    `;
    back.innerHTML = ``;
  }
};

generateCartItems();

// Modificamos la función para generar la tabla de carrito
let generateCartTable = () => {
  if (basket.length !== 0) {
    // Creamos un nuevo arreglo con la información para la tabla
    const cartTableData = basket.map((item) => {
      const { id, item: quantity } = item;
      const { name, price } = shopItemsData.find((itemData) => itemData.id === id) || {};
      const total = quantity * price;
      let orden = name + " x " + quantity.toString();
      return orden;
      //return { Producto: name, Cantidad: quantity };
      //return { Cantidad: quantity, Producto: name, Precio: `$ ${price}`, Total: `$ ${total}` };
    });

    // Mostramos la tabla en la consola usando console.table()
    //console.table(cartTableData, ["Cantidad", "Producto", "Precio", "Total"]);
    //console.log(cartTableData.length);
    //console.log(JSON.stringify(cartTableData));
    return JSON.stringify(cartTableData);
  } else {
    console.log("El carrito está vacío.");
  }
};

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

  generateCartItems();
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
  generateCartItems();
  
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  update(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  TotalAmount();
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
  
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  cartIcon.innerHTML = 0;
  contact.innerHTML = ``;
  back.innerHTML = ``;
  subTot.innerHTML = ``;
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
    if (valorTotal >= 90000) {
      back.innerHTML = ``;
      infoContact();
      subTot.innerHTML = `
    <h6>*Envío Gratis*</h6>
    `;
    }else{
      subTot.innerHTML = ``;
      contact.innerHTML = ``;
      back.innerHTML = `
      <div class="container">
      <h5 class="note">* Compra mínima de $90.000 COP para hacer pedido, incluye envío gratuito en ciudades principales</h5>
      <!--<a href="index.html">
        <button class="HomeBtn">Volver a Estante</button>
      </a>-->
      </div>
      `;
    }
    
    label.innerHTML = `
    <h2 class="total" id="total">Total Estimado:</h2>
    <div class="clear">
    <h2 class="valor" id="valor">$ ${amount} COP</h2>
    <span class="bi bi-trash" onclick="clearCart()"></span>
    </div>
    <a href="index.html">
      <button class="HomeBtn">Seguir Comprando</button>
    </a>
    `;
    return valorTotal;
  } else{
    subTot.innerHTML = ``;
    contact.innerHTML = ``;
    return;
  }
};

TotalAmount();
total = TotalAmount();

function sendEmail(){

  //total = TotalAmount();
  Name = document.getElementById("name").value;
  Email = document.getElementById("email").value;
  Phone = document.getElementById("phone").value;
  
  var params = {
    userName: Name,
    userEmail: Email,
    userPhone: Phone,
    userMessage: generateCartTable(),
    userTotal: total
  };

const serviceID = "service_hpd8bdi";
const templateID = "template_b298aw9";

if (Name == "" || Email == "" ||  Phone == ""){
  alert("Por favor completa la información de contacto para hacer pedido, gracias.")
}else {
    emailjs.send(serviceID, templateID, params).then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);});

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
      
    alert("Pedido enviado.\nEn breve nos comunicaremos para definir los detalles del envío y concretar la compra.\nGracias por visitarnos!!!")
    clearCart()
}


/*
userName = document.getElementById("name").value;
userEmail = document.getElementById("email").value;
userPhone =  document.getElementById("phone").value;

console.log("Datos de Contacto");
console.log("Nombre: " + userName);
console.log("Email: " + userEmail);
console.log("Teléfono: " + userPhone);
console.log("Pedido Solicitado: ");
console.log(generateCartTable());
console.log("Total Compra: " + total + " COP");
*/
//clearCart();

}


function gracias(){ 
  alert("Pedido enviado.\nEn breve nos comunicaremos para definir los detalles del envío y concretar la compra.\nGracias por visitarnos!!!")
  clearCart()
}


