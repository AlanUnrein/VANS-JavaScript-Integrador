/* navbar */
const navbarMenu = document.querySelector(".navbar__menu");
const categoriesDropdown = document.querySelector(".navbar__dropdown");
const navbarMenuIcon = document.querySelector(".navbar__menu-label");
const navbarDropdown = document.querySelector(".navbar__dropdown");
const navbarDropdownArrow = document.querySelector(".navbar__categories-i");
const dropdownItem = document.querySelector(".navbar__dropdown");
const categoryDropdown = document.querySelector('.dropdown__item');
/* cart */
const cartShop = document.querySelector(".cart__label");
const cartCount = document.querySelector(".cart__count");
const cartMenu = document.querySelector(".cart");
const cartItems = document.querySelector(".cart__items");
const totalContainer = document.querySelector(".cart-total");
const total = document.querySelector(".cart-total-value");
/* whitelist */
const whitelistLabel = document.querySelector(".whitelist__label");
const whitelistCount = document.querySelector(".whitelist__count");
const whitelistMenu = document.querySelector(".whitelist");
const whitelistContainer = document.querySelector(".whitelist__container");
/* Search */
const inputSearch = document.querySelector(".search-input");
/* Categories */
const categories = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
/* Popular */
const populars = document.querySelector(".popular__container");
/* Product */
const products = document.querySelector(".products__container");
const productWindow = document.querySelector(".product__window");
/* Buttons */
const btnSearch = document.querySelector(".search-button");
const btnMenu = document.querySelector(".navbar__menu-label");
const overlay = document.querySelector(".overlay");
const btnNext = document.querySelector(".products__load");
const btnCloseWindow = document.querySelector(".window-close");
const cartFinally = document.querySelector(".cart-finally");
const cartEmpty = document.querySelector(".cart-empty");
/* Modal */
const modal = document.querySelector(".modal");

// ------- CARRITO y WHITELIST

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let whitelist = JSON.parse(localStorage.getItem("whitelist")) || [];

const saveLocalStorage = (itemJSON, item) => {
  localStorage.setItem(`${item}`, JSON.stringify(itemJSON));
};

// ------- TEMPLATE DE PRODUCTOS

const renderProduct = (product) => {
  const { id, nombre, precio, img } = product;

  return `<div class="product">
            <div class="product__fav"><i data-id='${id}' data-nombre='${nombre}' data-precio='${precio}' data-img='${img}' class="addWhitelist fa-regular fa-heart"></i></div>
            <img class="product__img" src="${img}" alt="Vans - ${nombre}">
            <h3 class="product__name">${nombre}</h3>
            <span class="product__price">$${precio}</span>
            <button  class="product__show"><span class="product__window-span" data-item='${id}'>VER MAS</span></button>
        </div>`;
};
const renderPopular = (item) => {
  const { id, img, nombre, descripcionBreve, precio } = item;

  return ` <div class="popular">
                <div class="product__fav" ><i data-img="${img}" data-precio="${precio}"data-nombre="${nombre}"data-id='${id}' class="addWhitelist fa-regular fa-heart"></i>
                </div>
                <img class="popular__img" src="${img}" alt="${nombre}">
                <div class="popular__text">
                    <h3 class="popular__name">${nombre}</h3>
                    <p class="popular__description">${descripcionBreve}</p>
                </div>
                <button class="product__show popular-button" ><span class="product__window-span" data-item='${id}'>VER MAS</span></button>
            </div>`;
};

// ---- terminar el contador del producto en ventana, algun dia ----- //

const renderOpenedProduct = (item) => {
  const { id, nombre, precio, talles, img, descripcion } = item;
  const quantity = 1;

  return `<div class="product__window-container">
            <img src="${img}" alt="Vans-${nombre}" class="product__window-img">

            <div class="product__fav">
              <i data-img="${img}" data-precio="${precio}"data-nombre="${nombre}"data-id='${id}' class="addWhitelist fa-regular fa-heart"></i>
              </div>
            
            <button class="window-close"><i class="window-close-icon fa-solid fa-xmark"></i></button>
            <div class="product__window-body">
              <h2 class="window-name">${nombre}</h2>
              <span class="window-price">$${precio}</span>
              <form class="window-form">
                  <label for="talles" class="window-label">TALLE :</label>
                  <select class="window-select" name="talle" id="talles">
                      ${talles
                        .map(
                          (talle) =>
                            ` <option value="${talle}">${talle}<i data-talle="${talle}"class="selectedTalle fa-solid fa-chevron-down"></i></option>`
                        )
                        .join("")}
                  </select>
              </form>
              <bold class="window-form-p">
                    <a href="#">Como saber cual es tu talle</a>
              </bold>
              
              <div class="window-quantity hidden">
                  <span class="quantity-tittle">CANTIDAD : </span>
                  <div class="quantity-handler">
                      <span class="quantity-down" data-id=${id}>-</span>
                      <span class="item-quantity">${quantity}</span>
                      <span class="quantity-up" data-id=${id}>+</span>
                  </div>    
              </div>

              <button data-nombre="${nombre}" data-talle="${talles}" data-precio="${precio}" data-img="${img}" data-id="${id}" data-quantity="${quantity}"  class="red-button addCart"><span  data-nombre="${nombre}" data-talle="${talles}" data-precio="${precio}" data-img="${img}" data-id="${id}" data-quantity="${quantity}" class="addCart">COMPRAR</span></button>
              
              <p class="window-description">
                  ${descripcion}
              </p>
            </div>
          </div>`;
};

// reparar renderizacion de talles 

const renderCart = (cartProduct) => {
  const { id, img, precio, nombre, talles, quantity } = cartProduct;


  return `
  <div class="cart__item">
    <img src="${img}" alt="${nombre}" class="cart-img">
    <div class="cart-content">
      <i data-id="${id}" class="cart-trash fa-regular fa-trash-can"></i>
      <h3 class="cart-name">${nombre}</h3>
      <span class="cart-price">$${precio}</span>
      <div class="cart-talle">
          <dd class="cart-talle-tittle">Talle:</dd>
          <span class="cart-talle-size">${talles}</span>
      </div>
      <div class="cart-quantity-handler">
          <dd class="quantity-cart-tittle">Cantidad:</dd>
          <span class="quantity-down" data-id=${id}>-</span>
          <span class="quantity">${quantity}</span>
          <span class="quantity-up" data-id=${id}>+</span>
      </div>
    </div>
  </div>
  `;
};
const renderWhitelist = (whitelistProduct) => {
  const { img, nombre, precio, id } = whitelistProduct;

  return `
  <div class="whitelist__item">
      <img src="${img}" alt="${nombre}" class="whitelist-img">
      <div class="whitelist-content">
        <i data-id="${id}" class="whitelist-trash fa-regular fa-trash-can"></i>
        <h3 class="whitelist-name">${nombre}</h3>
        <span class="whitelist-price">$${precio}</span>
        <button class="product__show whitelist-button"><span class="product__window-span product__whitelist-span" data-item='${id}'>VER MAS</span></button>
      </div>
  </div>
  `;
};

// ------ LOGICA DE RENDERIZACION

const renderDivideProducts = (index = 0) => {
  products.innerHTML += productController.dividedProducts[index]
    .map(renderProduct)
    .join("");
};

const renderPopularProducts = () => {
  let popularItems = productData.sort(() => Math.random() - 0.5).slice(0, 3);
  populars.innerHTML = popularItems.map(renderPopular).join("");
};

const renderFilteredProducts = (category) => {
  const productsFiltered = productData.filter(
    (product) => product.categoria === category
  );
  products.innerHTML = productsFiltered
    .map((product) => renderProduct(product))
    .join("");
};

const renderAllProducts = (index = 0, category = undefined) => {
  if (!category) {
    renderDivideProducts(index);
    return;
  }
  renderFilteredProducts(category);
};

// -----LOGICA DE FILTRACION DE CATEGORIAS

const changeBtnSelectedCategory = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
    } else categoryBtn.classList.add("active");
  });
};
const changeBtnNextState = (selectedCategory) => {
  if (!selectedCategory) {
    btnNext.classList.remove("hidden");
    return;
  }
  btnNext.classList.add("hidden");
};

const changeFilterState = (e) => {
  const selectedCategory = e.target.dataset.category;
  changeBtnSelectedCategory(selectedCategory);
  changeBtnNextState(selectedCategory);
};

const applyFilter = (e) => {
  if (!e.target.classList.contains("category")) return;
  changeFilterState(e);
  if (!e.target.dataset.category) {
    products.innerHTML = "";
    renderAllProducts();
  } else {
    renderAllProducts(0, e.target.dataset.category);
    productController.nextProductsIndex = 1;
  }
};
const applyFilterDropdown = (e) => {
  if (!e.target.classList.contains("dropdown__category")) return;
  changeFilterState(e);
  if (!e.target.dataset.category) {
    products.innerHTML = "";
    renderAllProducts();
  } else {
    renderAllProducts(0, e.target.dataset.category);
    productController.nextProductsIndex = 1;
    // algo
  }
}

// ------ VENTANA DE PRODUCTO

const openProductWindow = (e) => {
  if (!e.target.classList.contains("product__window-span")) return;

  const selectedProduct = e.target.dataset.item;
  productWindow.classList.remove("product__window-closed");
  const open = productData.filter(
    (product) => Number(product.id) === Number(selectedProduct)
  );
  productWindow.innerHTML = renderOpenedProduct(open[0]);
  whitelistMenu.classList.remove("open-whitelist");
  overlay.classList.add("hidden");
};

const closeProductWindow = (e) => {
  if (!e.target.classList.contains("window-close-icon")) return;
  productWindow.classList.add("product__window-closed");
};

// ------ Cantidad del Icono whitelist y cart
const checkQuantity = (element, array) => {
  if (!array.length) {
    element.classList.add("hidden");
    return;
  } else if (array.length) {
    element.textContent = array.reduce((acc, obj) => {
      return acc + obj.quantity;
    }, 0);
    element.classList.remove("hidden");
    return;
  }
};

// ------- Logica de botones para abrir/cerrar(whitelist, menu, cart), overlay, superposiciones

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  cartShop.classList.toggle("cart__label-active");
  if (navbarMenu.classList.contains("open-menu")) {
    navbarMenu.classList.remove("open-menu");
    navbarMenuIcon.classList.remove("navbar__menu-label-active");
    return;
  }
  if (whitelistMenu.classList.contains("open-whitelist")) {
    whitelistMenu.classList.remove("open-whitelist");
    whitelistLabel.classList.remove("whitelist__label-active");
    return;
  }
  overlay.classList.toggle("hidden");
};

const toggleWhitelist = () => {
  whitelistMenu.classList.toggle("open-whitelist");
  whitelistLabel.classList.toggle("whitelist__label-active");
  if (navbarMenu.classList.contains("open-menu")) {
    navbarMenu.classList.remove("open-menu");
    navbarMenuIcon.classList.remove("navbar__menu-label-active");
    return;
  }
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    cartShop.classList.remove("cart__label-active");
    return;
  }
  overlay.classList.toggle("hidden");
};

const toggleMenu = () => {
  navbarMenuIcon.classList.toggle("navbar__menu-label-active");
  navbarMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    cartShop.classList.remove("cart__label-active");
    return;
  }
  if (whitelistMenu.classList.contains("open-whitelist")) {
    whitelistMenu.classList.remove("open-whitelist");
    whitelistLabel.classList.remove("whitelist__label-active");
    return;
  }
  overlay.classList.toggle("hidden");
};

const closeOnScroll = () => {
  if (
    !navbarMenu.classList.contains("open-menu") &&
    !cartMenu.classList.contains("open-cart") &&
    !whitelistMenu.classList.contains("open-whitelist")
  )
    return;
  navbarMenu.classList.remove("open-menu");
  navbarMenuIcon.classList.remove("navbar__menu-label-active");
  cartMenu.classList.remove("open-cart");
  cartShop.classList.remove("cart__label-active");
  whitelistMenu.classList.remove("open-whitelist");
  whitelistLabel.classList.remove("whitelist__label-active");
  overlay.classList.add("hidden");
};

const closeOnOverlayClick = () => {
  navbarMenu.classList.remove("open-menu");
  navbarMenuIcon.classList.remove("navbar__menu-label-active");
  cartMenu.classList.remove("open-cart");
  cartShop.classList.remove("cart__label-active");
  whitelistMenu.classList.remove("open-whitelist");
  whitelistLabel.classList.remove("whitelist__label-active");
  overlay.classList.add("hidden");
};

const closeCart = (e) => {
  if (!e.target.classList.contains("cart__close")) return;
  cartMenu.classList.remove("open-cart");
  cartShop.classList.remove("cart__label-active");
  overlay.classList.add("hidden");
};

const closeWhitelist = (e) => {
  if (!e.target.classList.contains("whitelist__close")) return;
  whitelistMenu.classList.remove("open-whitelist");
  whitelistLabel.classList.remove("whitelist__label-active");
  overlay.classList.add("hidden");
};

const openSubmenu = (e) => {
  if (!e.target.classList.contains("navbar__categories-i")) return;
  else {
    navbarDropdown.classList.toggle("navbar__dropdown-active");
    navbarDropdownArrow.classList.toggle("navbar__categories-i-active");
  }
};

const hiddenBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("hidden");
  } else {
    btn.classList.remove("hidden");
  }
};

//-------- Boton de proximos productos

const nextProducts = () => {
  renderAllProducts(productController.nextProductsIndex);
  productController.nextProductsIndex++;
  if (productController.nextProductsIndex == productController.productsLimit) {
    btnNext.classList.add("hidden");
  }
};

//--------- CARRITO

const getTotal = () => {
  return cart.reduce(
    (acc, curr) => acc + Number(curr.precio) * curr.quantity,
    0
  );
};
const displayTotal = () => {
  total.textContent = `$${getTotal()}`;
};
const renderCartContents = () => {
  if (!cart.length) {
    cartItems.innerHTML = `<p class="cart__items-empty">No hay productos en el carrito</p>`;
    return;
  }
  cartItems.innerHTML = cart.map((itemCart) => renderCart(itemCart)).join("");
};

const existingProductInCart = (product) => {
  return cart.find((item) => item.id === product.id);
};

const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

const createProductDataCart = (img, talles, nombre, id, precio) => {
  return { img, talles, nombre, id, precio };
};

const showSuccesModal = (msg) => {
  modal.classList.add("modal-active");
  modal.textContent = msg;
  setTimeout(() => {
    modal.classList.remove("modal-active");
  }, 1500);
};

const checkCartState = () => {
  saveLocalStorage(cart, "cart");
  renderCartContents();
  displayTotal();
  hiddenBtn(cartFinally);
  hiddenBtn(cartEmpty);
  hiddenBtn(totalContainer);
  checkQuantity(cartCount, cart);
};

const addProduct = (e) => {
  if (!e.target.classList.contains("addCart")) return;

  
  let talles = document.querySelector(".window-select").value;

  const { img, nombre, id, precio } = e.target.dataset;
  const product = createProductDataCart(img, talles, nombre, id, precio);

  if (existingProductInCart(product)) {
    addUnitCart(product);
    showSuccesModal("Se agrego una unidad del producto al carrito");
  } else {
    createCartProduct(product);
    showSuccesModal("Se agrego un elemento al carrito");
  }
  checkCartState();
};

const addUnitCart = (product) => {
  cart = cart.map((item) => {
    return item.id === product.id
      ? { ...item, quantity: item.quantity + 1 }
      : item;
  });
};

const subtractUnitCart = (product) => {
  cart = cart.map((item) => {
    return item.id === product.id
      ? { ...item, quantity: item.quantity - 1 }
      : item;
  });
};

const removeProductCart = (existinProduct) => {
  cart = cart.filter((product) => product.id !== existinProduct.id);
  checkCartState();
};

// Logica de botones dentro del carrito

const minusBtnAction = (id) => {
  const existingProductInCart = cart.find((product) => product.id === id);
  if (existingProductInCart.quantity === 1) {
    if (window.confirm("¿Deseas quitar el producto del carrito?")) {
      removeProductCart(existingProductInCart);
      cartMenu.classList.remove("open-cart");
      cartShop.classList.remove("cart__label-active");
      overlay.classList.add("hidden");
    }
    return;
  }
  subtractUnitCart(existingProductInCart);
};

const plusBtnAction = (id) => {
  const existingProductInCart = cart.find((product) => product.id === id);
  addUnitCart(existingProductInCart);
};

const changeQuantity = (e) => {
  if (e.target.classList.contains("quantity-down")) {
    minusBtnAction(e.target.dataset.id);
  } else if (e.target.classList.contains("quantity-up")) {
    plusBtnAction(e.target.dataset.id);
  }
  checkCartState();
};

const removeAllProductsToCart = () => {
  if (!confirm("¿Desea vaciar el carrito?")) return;
  cart = [];
  cartMenu.classList.remove("open-cart");
  cartShop.classList.remove("cart__label-active");
  overlay.classList.add("hidden");
  checkCartState();
};

const buyProduct = () => {
  if (!confirm("¿Desea completar su compra?")) return;
  cart = [];
  cartMenu.classList.remove("open-cart");
  cartShop.classList.remove("cart__label-active");
  overlay.classList.add("hidden");
  alert("Gracias por su compra!");
  checkCartState();
};

// ---- WHITELIST y logica de botones para eliminar producto del whitelist y cart

const renderWhitelistContents = () => {
  if (!whitelist.length) {
    whitelistContainer.innerHTML =
      '<p class="whitelist__items-empty">No hay productos en tu lista de deseos</p>';
    return;
  }
  whitelistContainer.innerHTML = whitelist
    .map((item) => renderWhitelist(item))
    .join("");
};

const existingProductInWhitelist = (product) => {
  return whitelist.find((item) => item.id === product.id);
};

const checkWhitelistState = () => {
  renderWhitelistContents();
  saveLocalStorage(whitelist, "whitelist");
};

const createProductWhiteList = (img, nombre, precio, id) => {
  return { img, nombre, precio, id };
};

const addToWhiteList = (e) => {
  if (!e.target.classList.contains("addWhitelist")) return;

  const { img, nombre, id, precio } = e.target.dataset;
  const productSave = createProductWhiteList(img, nombre, precio, id);

  if (existingProductInWhitelist(productSave)) {
    alert("Ya guardaste ese producto!");
    return;
  }

  whitelist = [...whitelist, productSave];
  showSuccesModal("Se agrego el producto a tu lista de deseos");
  checkWhitelistState();
};

const removeProductToWhitelist = (e) => {
  if (!e.target.classList.contains("whitelist-trash")) return;

  const toDelete = Number(e.target.dataset.id);

  if (!confirm("¿Quieres remover este producto de tu lista de deseos")) return;
  whitelist = whitelist.filter((item) => item.id != toDelete);

  if (!whitelist.length) {
    whitelistMenu.classList.remove("open-whitelist");
    whitelistLabel.classList.remove("whitelist__label-active");
    overlay.classList.add("hidden");
  }
  checkWhitelistState();
};

const removeProductToCart = (e) => {
  if (!e.target.classList.contains("cart-trash")) return;

  const toDelete = Number(e.target.dataset.id);

  if (!confirm("¿Quieres remover este producto del carrito?")) return;
  cart = cart.filter((item) => item.id != toDelete);

  if (!cart.length) {
    cartMenu.classList.remove("open-cart");
    cartShop.classList.remove("cart__label-active");
    overlay.classList.add("hidden");
  }
  checkCartState();
};

// FUNCION INICIALIZADORA

const init = () => {
  renderAllProducts();
  checkCartState();
  checkWhitelistState();
  renderPopularProducts();
  categories.addEventListener("click", applyFilter);
  categoriesDropdown.addEventListener(".click", applyFilter);
  btnNext.addEventListener("click", nextProducts);
  cartShop.addEventListener("click", toggleCart);
  whitelistLabel.addEventListener("click", toggleWhitelist);
  document.addEventListener("click", closeCart);
  document.addEventListener("click", closeWhitelist);
  btnMenu.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", closeOnScroll);
  overlay.addEventListener("click", closeOnOverlayClick);
  document.addEventListener("click", openSubmenu);
  document.addEventListener("click", openProductWindow);
  document.addEventListener("click", closeProductWindow);
  productWindow.addEventListener("click", addProduct);
  cartItems.addEventListener("click", changeQuantity);
  document.addEventListener("DOMContentLoaded", renderCartContents);
  document.addEventListener("DOMContentLoaded", displayTotal);
  populars.addEventListener("click", addToWhiteList);
  products.addEventListener("click", addToWhiteList);
  productWindow.addEventListener("click", addToWhiteList);
  cartEmpty.addEventListener("click", removeAllProductsToCart);
  cartFinally.addEventListener("click", buyProduct);
  document.addEventListener("click", removeProductToCart);
  document.addEventListener("click", removeProductToWhitelist);
  categoriesDropdown.addEventListener('click', applyFilterDropdown )
  console.info(
    "No llegue con el input de buscar, ademas no pude renderizar correctamente todos los talles escogidos en un array y mostrarlos en el cart. Te he fallado(inserte meme de dexter)"
  );
};
init();
