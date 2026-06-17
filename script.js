const products = [
  {
    name: "Signature Mailer Box",
    category: "Boxes",
    material: "Corrugated",
    price: 42,
    moq: 250,
    rating: "4.9",
    position: "18% 22%",
    description: "Recyclable shipping-ready mailer with premium print finishes."
  },
  {
    name: "Luxury Gift Box",
    category: "Boxes",
    material: "Paperboard",
    price: 118,
    moq: 100,
    rating: "4.8",
    position: "50% 18%",
    description: "Rigid presentation packaging for elevated gifting moments."
  },
  {
    name: "Boutique Paper Bag",
    category: "Bags",
    material: "Kraft",
    price: 36,
    moq: 300,
    rating: "4.7",
    position: "80% 20%",
    description: "Retail carry bag with cotton handles and clean branding area."
  },
  {
    name: "Compostable Pouch",
    category: "Pouches",
    material: "Compostable",
    price: 24,
    moq: 500,
    rating: "4.8",
    position: "20% 68%",
    description: "Matte pouch for food, wellness, and refill products."
  },
  {
    name: "Cosmetic Carton",
    category: "Boxes",
    material: "Paperboard",
    price: 31,
    moq: 250,
    rating: "4.9",
    position: "50% 72%",
    description: "Color-accurate folding carton with soft-touch options."
  },
  {
    name: "Eco Label Set",
    category: "Labels",
    material: "Recycled Paper",
    price: 12,
    moq: 1000,
    rating: "4.6",
    position: "78% 72%",
    description: "Recycled labels and stickers for complete packaging systems."
  },
  {
    name: "Food Sleeve Kit",
    category: "Food Packaging",
    material: "Food-safe Board",
    price: 29,
    moq: 400,
    rating: "4.7",
    position: "34% 48%",
    description: "Food-safe sleeves and wraps for cafes and D2C brands."
  },
  {
    name: "Shipping Box Program",
    category: "Boxes",
    material: "Corrugated",
    price: 55,
    moq: 200,
    rating: "4.9",
    position: "66% 48%",
    description: "Durable corrugated packaging for growing fulfillment teams."
  }
];

const state = {
  cart: []
};

const productGrid = document.querySelector("#productGrid");
const categoryFilter = document.querySelector("#categoryFilter");
const productSearch = document.querySelector("#productSearch");
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");

function formatRupees(amount) {
  return `Rs ${amount.toLocaleString("en-IN")}`;
}

function renderProducts() {
  const category = categoryFilter.value;
  const query = productSearch.value.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const categoryMatch = category === "All" || product.category === category;
    const queryMatch = [product.name, product.category, product.material, product.description]
      .join(" ")
      .toLowerCase()
      .includes(query);
    return categoryMatch && queryMatch;
  });

  productGrid.innerHTML = filtered.map((product) => `
    <article class="product-card">
      <div class="product-image" style="--pos: ${product.position}" aria-hidden="true"></div>
      <div>
        <div class="price-row">
          <h3>${product.name}</h3>
          <span class="rating">${product.rating}/5</span>
        </div>
        <p>${product.description}</p>
        <p>${product.material} - MOQ ${product.moq}</p>
      </div>
      <div>
        <div class="price-row">
          <span>From</span>
          <strong>${formatRupees(product.price)}</strong>
        </div>
        <div class="card-actions">
          <a class="btn secondary" href="#product">Quick View</a>
          <button class="btn primary add-cart" data-name="${product.name}" data-price="${product.price}">Add To Cart</button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderCart() {
  const grouped = state.cart.reduce((acc, item) => {
    acc[item.name] = acc[item.name] || { ...item, qty: 0 };
    acc[item.name].qty += 1;
    return acc;
  }, {});
  const items = Object.values(grouped);
  const total = state.cart.reduce((sum, item) => sum + item.price, 0);

  cartCount.textContent = state.cart.length;
  cartTotal.textContent = formatRupees(total);
  cartItems.innerHTML = items.length
    ? items.map((item) => `
      <div class="cart-line">
        <span>${item.name} x ${item.qty}</span>
        <strong>${formatRupees(item.price * item.qty)}</strong>
      </div>
    `).join("")
    : `<p class="empty-cart">Your selected packaging will appear here.</p>`;
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".add-cart");
  if (!button) return;
  state.cart.push({
    name: button.dataset.name,
    price: Number(button.dataset.price)
  });
  renderCart();
});

categoryFilter.addEventListener("change", renderProducts);
productSearch.addEventListener("input", renderProducts);

const moqRange = document.querySelector("#moqRange");
const moqValue = document.querySelector("#moqValue");
moqRange.addEventListener("input", () => {
  moqValue.textContent = `${Number(moqRange.value).toLocaleString("en-IN")} units`;
});

const packType = document.querySelector("#packType");
const materialType = document.querySelector("#materialType");
const finishType = document.querySelector("#finishType");
const dimensions = document.querySelector("#dimensions");
const mockupBox = document.querySelector("#mockupBox");
const mockupMeta = document.querySelector("#mockupMeta");
const mockupButton = document.querySelector("#mockupButton");

function updateMockup() {
  const type = packType.value;
  const material = materialType.value;
  const finish = finishType.value;
  const dims = dimensions.value || "Custom size";
  const palettes = {
    Kraft: "linear-gradient(145deg, #d7b579, #f6e4bd 42%, #b68d54)",
    Corrugated: "linear-gradient(145deg, #b98d55, #efd6a0 45%, #8f6737)",
    Paperboard: "linear-gradient(145deg, #f9feff, #dff6f2 48%, #b7d8d3)",
    "Compostable Material": "linear-gradient(145deg, #dce7bf, #f7f2d6 46%, #99b98a)"
  };

  mockupBox.style.background = palettes[material];
  mockupBox.style.borderRadius = type === "Label" ? "999px" : type === "Pouch" ? "34px 34px 18px 18px" : "22px";
  mockupBox.querySelector("span").textContent = type === "Label" ? "VERAQA LABEL" : "VERAQA";
  mockupMeta.textContent = `${type} - ${material} - ${finish} - ${dims}`;
  mockupBox.classList.add("previewed");
  window.setTimeout(() => mockupBox.classList.remove("previewed"), 700);
}

[packType, materialType, finishType, dimensions].forEach((input) => {
  input.addEventListener("input", updateMockup);
});
mockupButton.addEventListener("click", updateMockup);

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.parentElement.querySelector(".form-note");
    if (note) note.textContent = "Request received. A Veraqa specialist will follow up with mockup and pricing options.";
    form.reset();
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

let countersStarted = false;
const counterObserver = new IntersectionObserver((entries) => {
  if (countersStarted || !entries.some((entry) => entry.isIntersecting)) return;
  countersStarted = true;
  document.querySelectorAll("[data-count]").forEach((counter) => {
    const target = Number(counter.dataset.count);
    const duration = 1300;
    const started = performance.now();
    function tick(now) {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased).toLocaleString("en-IN");
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}, { threshold: 0.25 });

counterObserver.observe(document.querySelector("#sustainability"));

renderProducts();
renderCart();
updateMockup();
