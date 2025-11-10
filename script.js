// menu icon for phone view
const navbarToggle = document.querySelector('.navbar-toggle');
const sidebar = document.querySelector('.sidebar');

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  sidebar.classList.toggle('active');
})

// cart icon button open and close
const iconCart = document.querySelector('.names');
const body = document.querySelector('body');
const closebtn = document.querySelector('.close');

console.log('Cart icon found', iconCart)


iconCart.addEventListener('click', () => {
  console.log('cart icon clicked', iconCart.outerHTML)
  body.classList.add('showCart')
  
});

closebtn.addEventListener('click', () => {
  body.classList.remove('showCart')
})


// add to cart code
// ---------- SELECTORS ----------
document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".names");
  const cartTab = document.querySelector(".cartTab");
  const closeBtn = document.querySelector(".close");
  const checkOutBtn = document.querySelector(".checkOut");
  const cartList = document.querySelector(".listCart");
  const totalPrice = document.querySelector(".total-price");
  const cartNumber = document.querySelector(".cart-number");

  // All buttons that can add to cart
  const addButtons = document.querySelectorAll(
    ".add-cart, .cart-button, .lower-cart-button"
  );

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Open and close cart
  cartIcon.addEventListener("click", () => cartTab.classList.add("active"));
  closeBtn.addEventListener("click", () => cartTab.classList.remove("active"));

  // Add product to cart
  addButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productEl = e.target.closest(".product-box, .beach-towel, .vintage-chairs, vase, tray");

      if (!productEl) return;

      const title =
        productEl.querySelector(".product-title, h5, h4")?.textContent.trim() ||
        "Unnamed Item";

      const priceTextEl =
       productEl.querySelector(".product-price") ||
       productEl.querySelector("h4:nth-of-type(2)");
       const priceText = priceTextEl ? priceTextEl.textContent.trim() : "$0";
       console.log('Price found for', title, ':', priceText);
        console.log('price text found', priceText)
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

      // Get image source
      let imgSrc =
        productEl.querySelector("img")?.getAttribute("src") ||
        getBackgroundImage(productEl) ||
        "";

      addToCart({ title, price, imgSrc });
    });
  });

  // Helper to get background image if <img> not used
  function getBackgroundImage(el) {
    const bgEl = el.querySelector(".vin-img, .vase-img, .image, .decor, .decors");
    if (bgEl) {
      const style = window.getComputedStyle(bgEl);
      const bg = style.backgroundImage;
      if (bg && bg !== "none") {
        return bg.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
      }
    }
    return "";
  }

  // Add item to cart logic
  function addToCart(product) {
    const existing = cart.find((item) => item.title === product.title);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCart();
  }

  // Render and update cart
  function updateCart() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("item");
      itemEl.innerHTML = `
        <div class="image">
          <img src="${item.imgSrc}" alt="">
        </div>
        <div class="item-name"><p>${item.title}</p></div>
        <div class="totalPrice">$${(item.price * item.quantity).toFixed(2)}</div>
        <div class="quantity">
          <span class="decrease" data-index="${index}">-</span>
          <span>${item.quantity}</span>
          <span class="increase" data-index="${index}">+</span>
        </div>
      `;
      cartList.appendChild(itemEl);
      total += item.price * item.quantity;
    });

    totalPrice.textContent = `$${total.toFixed(2)}`;
    cartNumber.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);

    localStorage.setItem("cart", JSON.stringify(cart));

    // Event listeners for +, -, delete
    document.querySelectorAll(".increase").forEach((btn) =>
      btn.addEventListener("click", () => changeQuantity(btn.dataset.index, 1))
    );
    document.querySelectorAll(".decrease").forEach((btn) =>
      btn.addEventListener("click", () => changeQuantity(btn.dataset.index, -1))
    );
    document.querySelectorAll(".delete-icon").forEach((btn) =>
      btn.addEventListener("click", () => deleteItem(btn.dataset.index))
    );
  }

  function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCart();
  }

  function deleteItem(index) {
    cart.splice(index, 1);
    updateCart();
  }

  // Checkout clears cart
  checkOutBtn.addEventListener("click", () => {
    alert("Thank you for your purchase!");
    cart = [];
    updateCart();
    cartTab.classList.remove("active");
  });

  // Load cart if exists
  updateCart();
});