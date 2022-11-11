/* navbar */
const navbarLinks = document.querySelector(".navbar__ul");
const categoriesDropdown = document.querySelector(".navbar__dropdown");
/* cart */
const cartShop = document.querySelector(".cart__shop");
const cartCount = document.querySelector(".cart__count");
const cartContainer = document.querySelector(".cart-container");
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
const productWindow = document.querySelector(".show__product");

/* buttons */
const btnSearch = document.querySelector(".search-button");
const btnBuy = document.getElementById("addCart");
const btnMenu = document.querySelector(".navbar__menu-label");
const overlay = document.querySelector(".overlay");
const btnNext = document.querySelector(".products__load");
const btnCloseWindow = document.querySelector(".show-close");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

// logica de renderizacion
const renderProduct = (product) => {
  const { id, nombre, precio, img } = product;

  return `<div class="product">
            <button id="addCart" class="product__shop" data-id='${id}' data-name='${nombre}' data-price='${precio}' data-img='${img}'><i class="fa-solid fa-basket-shopping"></i></button>
            <img class="product__img" src="${img}" alt="Vans - ${nombre}">
            <h3 class="product__name">${nombre}</h3>
            <span class="product__price">$${precio}</span>
            <button  class="product__show"><span class="product__show-span" data-item='${id}'>VER MAS</span></button>
        </div>`;
};
const renderPopular = (item) => {
  const { id, img, nombre, descripcionBreve } = item;

  return ` <div class="popular">
                <button id="addCart" class="product__shop" data-id='${id}'><i class="fa-solid fa-basket-shopping"></i></button>
                <img class="popular__img" src="${img}" alt="${nombre}">
                <div class="popular__text">
                    <h3 class="popular__name">${nombre}</h3>
                    <p class="popular__description">${descripcionBreve}</p>
                </div>
                <button class="product__show popular-button" ><span class="product__show-span" data-item='${id}'>VER MAS</span></button>
            </div>`;
};
const renderOpenedProduct = (item) => {
  const { id, nombre, precio, talles, img, descripcion } = item;

  return `<div class="show__product-container">
            <img src="${img}" alt="Vans-${nombre}" class="show__product-img">

            <button class="show-close"><i class="show-close-icon fa-solid fa-xmark"></i></button>

            <div class="show__product-body">
              <h2 class="show-name">${nombre}</h2>
              <span class="show-price">$${precio}</span>
              <form class="show-form">
                  <label for="talles" class="show-label">TALLE :</label>
                  <select class="show-select" name="talle" id="talles">
                      ${talles.map(talle => ` <option value="${talle}">${talle}<i class="fa-solid fa-chevron-down"></i></option>`).join('')}
                  </select>
              </form>
              <bold class="show-form-p">
                    <a href="#">Como saber cual es tu talle</a>
              </bold>
              <div class="show__quantity">
                  <span class="quantity-tittle">CANTIDAD : </span>
                  <div class="quantity-handler">
                      <span class="quantity-down" data-id=${id}>-</span>
                      <span class="item-quantity">1</span>
                      <span class="quantity-up" data-id=${id}>+</span>
                  </div>    
              </div>
              <button class="red-button"><span>COMPRAR</span></button>
              <p class="show-description">
                  ${descripcion}
              </p>
            </div>
          </div>`;
};

const renderDivideProducts = (index = 0) => {
  products.innerHTML = productController.dividedProducts[index]
    .map(renderProduct)
    .join("");
};

const renderPopularProducts = () => {
  let popularItems = productData.sort(() => Math.random() - 0.5).slice(0, 3);
  populars.innerHTML = popularItems.map(renderPopular).join("");
};

// logica de filtracion de categorias

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
  } else renderAllProducts(0, e.target.dataset.category);
};

/* Ventana de producto */
const openProductWindow = (e) => {
  if (!e.target.classList.contains("product__show-span")) return;

  const selectedProduct = e.target.dataset.item;
  productWindow.classList.remove("show__product-closed");
  const open = productData.filter(
    (product) => Number(product.id) === Number(selectedProduct)
  );
  productWindow.innerHTML = renderOpenedProduct(open[0]);
};

const closeProductWindow = (e) => {
  if (!e.target.classList.contains('show-close-icon')) return
  productWindow.classList.add("show__product-closed");
};

const init = () => {
  renderAllProducts();
  renderPopularProducts();
  categories.addEventListener("click", applyFilter);
  categoriesDropdown.addEventListener(".click", applyFilter);
  document.addEventListener("click", openProductWindow);
  document.addEventListener("click", closeProductWindow);
};
init();
