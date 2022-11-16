/* navbar */
const navbarMenu = document.querySelector(".navbar__menu");
const categoriesDropdown = document.querySelector(".navbar__dropdown");
const navbarMenuIcon = document.querySelector(".navbar__menu-icon");
const navbarDropdown = document.querySelector(".navbar__dropdown");
const navbarDropdownArrow = document.querySelector(".navbar__categories-i");
const dropdownItem = document.querySelector(".navbar__dropdown");
/* cart */
const cartShop = document.querySelector(".cart__label");
const cartIcon = document.querySelector(".cart__label-icon");
const cartCount = document.querySelector(".cart__count");
const cartMenu = document.querySelector(".cart");
const cartItems = document.querySelector(".cart__items");
const totalContainer = document.querySelector(".cart-total");
const total = document.querySelector(".cart-total-value");
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

// ------- Array de cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

// ------- renderizacion del html

const renderProduct = (product) => {
  const { id, nombre, precio, img } = product;

  return `<div class="product">
            <button class="product__shop" data-id='${id}' data-name='${nombre}' data-price='${precio}' data-img='${img}'><i class="fa-regular fa-heart"></i></button>
            <img class="product__img" src="${img}" alt="Vans - ${nombre}">
            <h3 class="product__name">${nombre}</h3>
            <span class="product__price">$${precio}</span>
            <button  class="product__show"><span class="product__window-span" data-item='${id}'>VER MAS</span></button>
        </div>`;
};
const renderPopular = (item) => {
  const { id, img, nombre, descripcionBreve } = item;

  return ` <div class="popular">
                <button class="product__shop" data-id='${id}'><i class="fa-regular fa-heart"></i></button>
                <img class="popular__img" src="${img}" alt="${nombre}">
                <div class="popular__text">
                    <h3 class="popular__name">${nombre}</h3>
                    <p class="popular__description">${descripcionBreve}</p>
                </div>
                <button class="product__show popular-button" ><span class="product__window-span" data-item='${id}'>VER MAS</span></button>
            </div>`;
};
const renderOpenedProduct = (item) => {
  const { id, nombre, precio, talles, img, descripcion } = item;
  const quantity = 1

  return `<div class="product__window-container">
            <img src="${img}" alt="Vans-${nombre}" class="product__window-img">

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
              <div class="window-quantity">
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
const renderCart = (cartProduct) => {
  const { id, img, precio, nombre, talle, quantity } = cartProduct;

  return `
  <div class="cart__item">
    <img src="${img}" alt="${nombre}" class="cart-img">
    <div class="cart-content">
      <i data-id="${id}" class="cart-trash fa-regular fa-trash-can"></i>
      <h3 class="cart-name">${nombre}</h3>
      <span class="cart-price">$${precio}</span>
      <div class="cart-talle">
          <dd class="cart-talle-tittle">Talle:</dd>
          <span class="cart-talle-size">${talle}</span>
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

// ------ Logica de renderizacion


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

// -----logica de filtracion de categorias

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

// ------Ventana de producto

const openProductWindow = (e) => {
  if (!e.target.classList.contains("product__window-span")) return;

  const selectedProduct = e.target.dataset.item;
  productWindow.classList.remove("product__window-closed");
  const open = productData.filter(
    (product) => Number(product.id) === Number(selectedProduct)
  );
  productWindow.innerHTML = renderOpenedProduct(open[0]);
};

const closeProductWindow = (e) => {
  if (!e.target.classList.contains("window-close-icon")) return;
  productWindow.classList.add("product__window-closed");
};

/*  Abrir y cerrar carrito/menu */

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  cartIcon.classList.toggle("cart__label-icon-active");
  if (navbarMenu.classList.contains("open-menu")) {
    navbarMenu.classList.remove("open-menu");
    navbarMenuIcon.classList.remove("navbar__menu-icon-active");
    return;
  }
  overlay.classList.toggle("hidden");
};
const toggleMenu = () => {
  navbarMenuIcon.classList.toggle("navbar__menu-icon-active");
  navbarMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    cartIcon.classList.remove("cart__label-icon-active");
    return;
  }
  overlay.classList.toggle("hidden");
};
const closeOnScroll = () => {
  if (
    !navbarMenu.classList.contains("open-menu") &&
    !cartMenu.classList.contains("open-cart")
  )
    return;

  navbarMenu.classList.remove("open-menu");
  navbarMenuIcon.classList.remove("navbar__menu-icon-active");
  cartMenu.classList.remove("open-cart");
  cartIcon.classList.remove("cart__label-icon-active");
  overlay.classList.add("hidden");
};

const closeOnOverlayClick = () => {
  navbarMenu.classList.remove("open-menu");
  navbarMenuIcon.classList.remove("navbar__menu-icon-active");
  cartMenu.classList.remove("open-cart");
  cartIcon.classList.remove("cart__label-icon-active");
  overlay.classList.add("hidden");
};
const closeCart = (e) => {
  if (!e.target.classList.contains("cart__close")) return;
  cartMenu.classList.remove("open-cart");
  cartIcon.classList.remove("cart__label-icon-active");
  overlay.classList.add("hidden");
};
const openSubmenu = (e) => {
  if (!e.target.classList.contains("navbar__categories-i")) return;
  else {
    navbarDropdown.classList.toggle("navbar__dropdown-active");
    navbarDropdownArrow.classList.toggle("navbar__categories-i-active");
  }
};

//-------- Proximos productos

const nextProducts = () => {
  renderAllProducts(productController.nextProductsIndex);
  productController.nextProductsIndex++;
  if (productController.nextProductsIndex == productController.productsLimit) {
    btnNext.classList.add("hidden");
  }
};

//--------- Logica del carrito
const hiddenBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("hidden");
  } else {
    btn.classList.remove("hidden");
  }
};
const getTotal = () => {
    return cart.reduce((acc, curr) => acc + Number(curr.precio) * curr.quantity,0)
  }
const displayTotal = () => {
  total.textContent = `$${getTotal()}`
};
const renderCartContents = () => {
  if (!cart.length) {
    cartItems.innerHTML = `<p class="cart__items-empty">No hay productos en el carrito</p>`;
    return;
  }
  cartItems.innerHTML = cart.map((itemCart) => renderCart(itemCart)).join('');
};
const existingProductInCart = (product) => {
  return cart.find((item => item.id === product.id))
}
const addUnit = (product) => {
  cart = cart.map ((item)=> {
    return item.id === product.id ? {...item, quantity:item.quantity + 1} : item
  })
}
const createCartProduct = (product) => {
  cart = [...cart, {...product, quantity: 1}]
}
const createProductDataCart = (img, talle, nombre, id, precio) => {
  return {img, talle, nombre, id, precio}
}
const showSuccesModal = (msg) => {
    modal.classList.add('modal-active')
    modal.textContent = msg
    setTimeout(()=> {
      modal.classList.remove('modal-active')
    }, 1500)
}
const checkCartState = () => {
  saveLocalStorage(cart)
  renderCartContents()
  displayTotal()
  hiddenBtn(cartFinally)
  hiddenBtn(cartEmpty)
  hiddenBtn(totalContainer)
}

const addProduct = (e) => {
  if(!e.target.classList.contains('addCart')) return

  const talle = document.querySelector('.window-select').value
  const {img, nombre, id, precio} = e.target.dataset;
  const product = createProductDataCart(img, talle, nombre, id, precio);

  if(existingProductInCart(product)) {
    addUnit(product);
    showSuccesModal('Se agrego una unidad del producto al carrito')
  } else {
    createCartProduct(product)
    showSuccesModal('Se agrego un elemento al carrito')
  }
  checkCartState()
  console.log(product);
}

// Funcion inicializadora

const init = () => {
  renderAllProducts();
  checkCartState()
  renderPopularProducts();
  categories.addEventListener("click", applyFilter);
  categoriesDropdown.addEventListener(".click", applyFilter);
  btnNext.addEventListener("click", nextProducts);
  cartIcon.addEventListener("click", toggleCart);
  document.addEventListener("click", closeCart);
  btnMenu.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", closeOnScroll);
  overlay.addEventListener("click", closeOnOverlayClick);
  document.addEventListener("click", openSubmenu);
  document.addEventListener("click", openProductWindow);
  document.addEventListener("click", closeProductWindow);
  productWindow.addEventListener('click', addProduct)
  document.addEventListener("DOMContentLoaded", renderCartContents);
  document.addEventListener("DOMContentLoaded", displayTotal);
};
init();
