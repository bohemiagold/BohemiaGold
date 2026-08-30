/* ==========================================
   BOHEMIA GOLD
   ONLINE STORE
========================================== */

/* ==========================================
   MƏHSULLAR
========================================== */

const products = [
  {
    id: 1,

    name: "Kristal Güldan",

    category: "vase",

    categoryName: "Güldan",

    price: 26.99,

    image: "https://www.bohemiagoldcrystal.com/img/cms/IMG_20210513_131101.jpg",

    badge: "SEÇİLMİŞ",
  },

  {
    id: 2,

    name: "Bohemia Bokal Dəsti",

    category: "glass",

    categoryName: "Badə",

    price: 71.99,

    image: "https://www.bohemiagoldcrystal.com/img/cms/IMG_20210513_131101.jpg",

    badge: "PREMIUM",
  },

  {
    id: 3,

    name: "Kristal Dekor",

    category: "decor",

    categoryName: "Dekor",

    price: 89.99,

    image: "https://www.bohemiagoldcrystal.com/img/cms/IMG_20210513_131101.jpg",

    badge: "YENİ",
  },

  {
    id: 4,

    name: "Gold Kristal Set",

    category: "glass",

    categoryName: "Badə",

    price: 149.99,

    image: "https://www.bohemiagoldcrystal.com/img/cms/IMG_20210513_131101.jpg",

    badge: "PREMIUM",
  },

  {
    id: 5,

    name: "Dekorativ Kristal Qab",

    category: "decor",

    categoryName: "Dekor",

    price: 119.99,

    image: "https://www.bohemiagoldcrystal.com/img/cms/IMG_20210513_131101.jpg",

    badge: "",
  },

  {
    id: 6,

    name: "Classic Kristal Güldan",

    category: "vase",

    categoryName: "Güldan",

    price: 54.99,

    image: "https://www.bohemiagoldcrystal.com/img/cms/IMG_20210513_131101.jpg",

    badge: "KLASSİK",
  },
];

/* ==========================================
   SƏBƏT
========================================== */

let cart = [];

/* ==========================================
   ELEMENTLƏR
========================================== */

const productsContainer = document.getElementById("products");

const noProducts = document.getElementById("noProducts");

const searchInput = document.getElementById("searchInput");

const categories = document.querySelectorAll(".category");

const cartSidebar = document.getElementById("cartSidebar");

const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");

const cartEmpty = document.getElementById("cartEmpty");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const modal = document.getElementById("checkoutModal");

/* ==========================================
   MƏHSULLARI GÖSTƏR
========================================== */

function renderProducts(list = products) {
  productsContainer.innerHTML = "";

  if (list.length === 0) {
    noProducts.style.display = "block";

    return;
  }

  noProducts.style.display = "none";

  list.forEach((product) => {
    const card = document.createElement("article");

    card.className = "product";

    card.innerHTML = `

            <div class="product-image-wrap">

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                ${
                  product.badge
                    ? `<span class="product-badge">
                        ${product.badge}
                    </span>`
                    : ""
                }

            </div>


            <div class="product-info">

                <div class="product-category">
                    ${product.categoryName}
                </div>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="product-bottom">

                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                    <button
                        class="add-btn"
                        data-id="${product.id}"
                        aria-label="Səbətə əlavə et"
                    >
                        +
                    </button>

                </div>

            </div>

        `;

    productsContainer.appendChild(card);
  });
}

/* ==========================================
   QİYMƏT FORMAT
========================================== */

function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + " ₼";
}

/* ==========================================
   MƏHSUL AXTARIŞI
========================================== */

function filterProducts() {
  const search = searchInput.value.trim().toLowerCase();

  const activeCategory =
    document.querySelector(".category.active").dataset.category;

  const filtered = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search);

    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);

/* ==========================================
   KATEQORİYA
========================================== */

categories.forEach((button) => {
  button.addEventListener("click", () => {
    categories.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    filterProducts();
  });
});

/* ==========================================
   SƏBƏTƏ ƏLAVƏ
========================================== */

productsContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".add-btn");

  if (!button) return;

  const id = Number(button.dataset.id);

  addToCart(id);
});

/* ==========================================
   ADD TO CART
========================================== */

function addToCart(id) {
  const product = products.find((product) => product.id === id);

  if (!product) return;

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,

      quantity: 1,
    });
  }

  saveCart();

  renderCart();

  openCart();
}

/* ==========================================
   CART RENDER
========================================== */

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartEmpty.style.display = "grid";
  } else {
    cartEmpty.style.display = "none";
  }

  let total = 0;

  let quantityTotal = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    quantityTotal += item.quantity;

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div class="cart-item-content">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">
                    ${formatPrice(itemTotal)}
                </div>


                <div class="cart-quantity">

                    <button
                        data-action="minus"
                        data-id="${item.id}"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        data-action="plus"
                        data-id="${item.id}"
                    >
                        +
                    </button>


                    <button
                        class="remove-item"
                        data-action="remove"
                        data-id="${item.id}"
                    >
                        Sil
                    </button>

                </div>

            </div>

        `;

    cartItems.appendChild(div);
  });

  cartCount.textContent = quantityTotal;

  cartTotal.textContent = formatPrice(total);
}

/* ==========================================
   CART ACTIONS
========================================== */

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const id = Number(button.dataset.id);

  const action = button.dataset.action;

  const item = cart.find((item) => item.id === id);

  if (!item) return;

  if (action === "plus") {
    item.quantity++;
  }

  if (action === "minus") {
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter((item) => item.id !== id);
    }
  }

  if (action === "remove") {
    cart = cart.filter((item) => item.id !== id);
  }

  saveCart();

  renderCart();
});

/* ==========================================
   LOCAL STORAGE
========================================== */

function saveCart() {
  localStorage.setItem("bohemiaGoldCart", JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem("bohemiaGoldCart");

  if (saved) {
    try {
      cart = JSON.parse(saved);
    } catch {
      cart = [];
    }
  }
}

/* ==========================================
   CART OPEN
========================================== */

function openCart() {
  cartSidebar.classList.add("open");

  cartOverlay.classList.add("active");

  document.body.classList.add("no-scroll");
}

/* ==========================================
   CART CLOSE
========================================== */

function closeCart() {
  cartSidebar.classList.remove("open");

  cartOverlay.classList.remove("active");

  document.body.classList.remove("no-scroll");
}

document.getElementById("openCartBtn").addEventListener("click", openCart);

document.getElementById("closeCartBtn").addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);

/* ==========================================
   CHECKOUT
========================================== */

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Səbətiniz boşdur. Əvvəlcə məhsul seçin.");

    return;
  }

  modal.classList.add("active");
});

/* ==========================================
   MODAL CLOSE
========================================== */

document.getElementById("closeModalBtn").addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});

/* ==========================================
   SİFARİŞİ WHATSAPP-A GÖNDƏR
========================================== */

document.getElementById("orderForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();

  const phone = document.getElementById("customerPhone").value.trim();

  const address = document.getElementById("customerAddress").value.trim();

  if (!name || !phone || !address) {
    alert("Zəhmət olmasa bütün məlumatları doldurun.");

    return;
  }

  let total = 0;

  let message = "BOHEMIA GOLD SİFARİŞİ\n\n";

  message += "Ad: " + name + "\n";

  message += "Telefon: " + phone + "\n";

  message += "Ünvan: " + address + "\n\n";

  message += "MƏHSULLAR:\n";

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    message +=
      "• " +
      item.name +
      " × " +
      item.quantity +
      " — " +
      formatPrice(itemTotal) +
      "\n";
  });

  message += "\nÜMUMİ: " + formatPrice(total);

  /*
          BURADAKI NÖMRƏNİ
          MAĞAZANIN REAL WHATSAPP
          NÖMRƏSİ İLƏ DƏYİŞDİR.
        */

  const whatsappNumber = "994559701318";

  const whatsappURL =
    "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);

  window.open(whatsappURL, "_blank");

  modal.classList.remove("active");
});

/* ==========================================
   MOBİL MENYU
========================================== */

const mobileMenuBtn = document.getElementById("mobileMenuBtn");

const nav = document.getElementById("nav");

mobileMenuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

/* ==========================================
   ESC İLƏ BAĞLA
========================================== */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();

    modal.classList.remove("active");
  }
});

/* ==========================================
   START
========================================== */

loadCart();

renderProducts();

renderCart();
