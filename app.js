const categories = [
  ["mailer-boxes", "Mailer Boxes", "mailer", 24],
  ["food-packaging", "Food Packaging", "food", 38],
  ["cosmetic-packaging", "Cosmetic Packaging", "cosmetic", 19],
  ["gift-boxes", "Gift Boxes", "gift", 27],
  ["labels-stickers", "Labels & Stickers", "labels", 52],
  ["custom-packaging", "Custom Packaging", "custom", 41],
];

const seed = [
  ["Kraft Mailer Box - Small", "mailer-boxes", 1.2, 1.8, 4.9, 218, "mailer", "Best Seller", "Premium corrugated kraft mailer in a compact size. Recyclable and FSC certified."],
  ["Kraft Mailer Box - Medium", "mailer-boxes", 1.65, 0, 4.8, 142, "mailer", "", "Versatile medium mailer for apparel, accessories and gifting."],
  ["Printed Mailer - Brand Edition", "mailer-boxes", 2.1, 2.6, 4.9, 96, "custom", "New", "Full-colour exterior print with food-safe water-based inks."],
  ["Compostable Food Box", "food-packaging", 0.85, 0, 4.7, 311, "food", "Eco", "PLA-lined kraft food box. Hot and cold safe, fully compostable."],
  ["Sushi Pack - 3 Compartment", "food-packaging", 0.95, 0, 4.6, 84, "food", "", "Leak-resistant compartment tray with snap-fit lid."],
  ["Bagasse Burger Clamshell", "food-packaging", 0.45, 0, 4.5, 207, "food", "", "Sugarcane fibre clamshell. Microwave and freezer safe."],
  ["Luxe Cosmetic Rigid Box", "cosmetic-packaging", 3.4, 4.2, 4.9, 132, "cosmetic", "Premium", "Magnetic-close rigid box with soft-touch lamination."],
  ["Serum Bottle Carton", "cosmetic-packaging", 1.2, 0, 4.7, 71, "cosmetic", "", "FSC paperboard carton with embossed brand panel."],
  ["Skincare Sleeve Pack", "cosmetic-packaging", 0.95, 0, 4.6, 58, "cosmetic", "", "Slip sleeve with metallic foil accent."],
  ["Signature Gift Box - Ribbon", "gift-boxes", 4.5, 0, 4.9, 188, "gift", "Top Rated", "Two-piece gift box with satin ribbon and tissue insert."],
  ["Hamper Crate - Large", "gift-boxes", 6.2, 0, 4.8, 64, "gift", "", "Sturdy hamper crate ideal for curated gift sets."],
  ["Custom Label Sheet - Gloss", "labels-stickers", 0.18, 0, 4.7, 412, "labels", "", "Die-cut gloss labels printed in vibrant CMYK."],
  ["Kraft Round Sticker Pack", "labels-stickers", 0.12, 0.2, 4.6, 198, "labels", "Save 40%", "Recycled kraft stickers, perfect for sealing pouches."],
  ["Holographic Brand Sticker", "labels-stickers", 0.35, 0, 4.8, 77, "labels", "", "Premium holographic finish with weatherproof adhesive."],
  ["Custom Subscription Box", "custom-packaging", 2.95, 0, 4.9, 256, "custom", "Most Loved", "Tailored subscription box with full-bleed interior print."],
  ["Eco Pouch - Resealable", "custom-packaging", 0.65, 0, 4.5, 143, "custom", "", "Compostable stand-up pouch with zip closure."],
];

const palette = {
  mailer: ["#b88954", "#f3dcc2", "Mailer"],
  food: ["#4f9c6e", "#d9f2d8", "Food"],
  cosmetic: ["#8073c8", "#f0dcff", "Cosmetic"],
  gift: ["#bd4960", "#ffe0e8", "Gift"],
  labels: ["#377b9f", "#d9f3ff", "Labels"],
  custom: ["#0f6b72", "#d7fbf4", "Custom"],
};

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const money = (n) => "$" + Number(n).toFixed(2);
const svgImage = (kind, title) => {
  const [dark, light, label] = palette[kind] || palette.custom;
  const safeTitle = title.replace(/&/g, "and");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${light}"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs><rect width="900" height="900" fill="url(#g)"/><circle cx="710" cy="170" r="150" fill="${dark}" opacity=".11"/><circle cx="190" cy="760" r="180" fill="${dark}" opacity=".12"/><rect x="245" y="265" width="410" height="310" rx="34" fill="#fff" stroke="${dark}" stroke-width="18"/><path d="M245 335h410M330 265v310M570 265v310" stroke="${dark}" stroke-width="14" opacity=".35"/><path d="M320 650h260" stroke="${dark}" stroke-width="22" stroke-linecap="round"/><text x="450" y="715" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="${dark}">${label}</text><text x="450" y="770" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#355266">${safeTitle.slice(0, 28)}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const products = seed.map((p, i) => ({
  id: `p-${i + 1}`,
  slug: slugify(p[0]),
  name: p[0],
  category: p[1],
  price: p[2],
  compare: p[3],
  rating: p[4],
  reviews: p[5],
  image: svgImage(p[6], p[0]),
  badge: p[7],
  description: p[8],
}));

const state = {
  filter: "all",
  search: "",
  theme: localStorage.getItem("veraqa-theme") || "light",
};


document.body.classList.toggle("dark", state.theme === "dark");

const currentRoute = () => decodeURI(location.hash.slice(1) || "/");
const currentPath = () => currentRoute().split("?")[0];
const currentQuery = () => new URLSearchParams(currentRoute().split("?")[1] || "");
const save = () => {
  // cart/checkout removed
  // wishlist removed
};


const icon = (name) => {
  const d = {
    box: '<path d="M4 7l8-4 8 4M4 7v10l8 4 8-4V7M4 7l8 4 8-4M12 11v10"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    bag: '<path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    moon: '<path d="M21 15a9 9 0 1 1-12-12 7 7 0 0 0 12 12Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/>',
    leaf: '<path d="M20 4C12 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16Z"/><path d="M4 21c2-5 6-9 11-11"/>',
    truck: '<path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
    spark: '<path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z"/>',
    shield: '<path d="M12 3 4 6v5c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.6a5.5 5.5 0 0 0-.1-7.8Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
  };
  return `<svg viewBox="0 0 24 24" class="ico" aria-hidden="true">${d[name] || d.box}</svg>`;
};

function toast(msg) {
  const t = document.querySelector("#toast") || Object.assign(document.createElement("div"), { id: "toast" });
  if (!document.querySelector("#toast")) document.body.appendChild(t);
  t.className = "toast-show";
  t.textContent = msg;
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => (t.className = ""), 2600);
}

function route(path) {
  document.querySelector(".side-cart")?.remove();
  document.querySelector("#mobile-nav")?.replaceChildren();
  if (location.hash.slice(1) === path) {
    render();
    window.scrollTo(0, 0);
  } else {
    location.hash = path;
  }
}

function header() {
  return `
    <header class="site-header">
      <nav>
        <a href="#/" data-route class="logo">${icon("box")}<span>VERAQA</span></a>
        <ul class="nav-links">
          <li><a href="#/shop" data-route>Products</a></li>
          <li><a href="#/industries" data-route>Industries</a></li>
          <li><a href="#/about" data-route>About Us</a></li>
          <li><a href="#/contact" data-route>Contact</a></li>
        </ul>
        <div class="nav-actions">
          <button class="icon-btn desktop-only" data-action="search" aria-label="Search">${icon("search")}</button>
          <button class="icon-btn desktop-only" data-action="theme" aria-label="Toggle theme">${icon(state.theme === "dark" ? "sun" : "moon")}</button>
          <a href="#/contact" data-route class="quote-btn">Get Quote</a>
          <button class="icon-btn mobile-only" data-action="menu" aria-label="Menu">${icon("menu")}</button>
        </div>
      </nav>
      <div class="searchbar">
        <input id="global-search" type="search" placeholder="Search mailers, food boxes, labels..." value="${state.search}">
        <button class="btn btn-primary" data-search-go>Search</button>
      </div>
      <div id="mobile-nav"></div>
    </header>`;
}

function footer() {
  return `<footer class="footer"><div class="wrap"><div class="footer-grid">
    <div><a href="#/" data-route class="logo footer-logo">${icon("box")}<span>VERAQA</span></a><p>Premium sustainable packaging engineered for modern brands. Compostable, recyclable, beautifully designed, built in India and shipped worldwide.</p></div>
    <div><strong>Shop</strong><ul><li><a data-route href="#/shop">All Products</a></li><li><a data-route href="#/industries">Industries</a></li><li><a data-route href="#/custom-packaging">Custom Packaging</a></li><li><a data-route href="#/contact">Get Quote</a></li></ul></div>
    <div><strong>Company</strong><ul><li><a data-route href="#/about">About Us</a></li><li><a data-route href="#/shipping-policy">Shipping Policy</a></li><li><a data-route href="#/return-policy">Return Policy</a></li><li><a data-route href="#/refund-policy">Refund Policy</a></li></ul></div>
    <div><strong>Legal</strong><ul><li><a data-route href="#/privacy-policy">Privacy Policy</a></li><li><a data-route href="#/terms">Terms & Conditions</a></li><li><a data-route href="#/disclaimer">Disclaimer</a></li><li><a data-route href="#/faq">FAQ</a></li></ul><form class="newsletter"><div class="newsletter-row"><input class="input" type="email" required placeholder="you@brand.com"><button class="btn btn-primary">Subscribe</button></div></form></div>
    </div><div class="copyright"><span>&copy; ${new Date().getFullYear()} Veraqa Packaging. All rights reserved.</span><span><a data-route href="#/privacy-policy">Privacy</a> &middot; <a data-route href="#/terms">Terms</a> &middot; <a data-route href="#/shipping-policy">Shipping</a></span></div></div></footer>`;
}

function productCard(p) {
  return `<article class="product-card glass"><div class="product-img"><a data-route href="#/product/${p.slug}"><img src="${p.image}" alt="${p.name}"></a>${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}</div><div class="product-body"><span class="product-cat">${p.category.replaceAll("-", " ")}</span><a data-route href="#/product/${p.slug}"><div class="product-name">${p.name}</div></a><span class="rating"><span class="stars">&#9733;</span> ${p.rating} (${p.reviews})</span><div class="product-meta"><span><span class="price">${money(p.price)}</span>${p.compare ? `<span class="compare">${money(p.compare)}</span>` : ""}<small class="muted"> / unit</small></span></div></div></article>`;
}

function home() {
  return `<main>
    <section class="hero">
      <picture><source media="(max-width: 768px)" srcset="banner_mobile.png"><img src="banner.png" alt="Veraqa sustainable packaging"></picture>
      <div class="overlay"></div><div class="hero-content"><span class="hero-tag">Sustainable Packaging Solutions</span><h1>Packaging That Makes<br>Brands Unforgettable</h1><p>Premium, sustainable, and fully customizable packaging solutions designed for ambitious brands.</p><div class="buttons"><a href="#/shop" data-route class="btn btn-primary">Explore Packaging</a><a href="#/contact" data-route class="btn btn-outline">Get a Quote</a></div></div>
    </section>

    ${categoriesSection()}${productsSection()}
    <section class="section features"><div class="wrap"><div class="center-head"><p class="eyebrow">Why Veraqa</p><h2>Built for brands that <span class="text-gradient"><i>care</i></span>.</h2></div><div class="feature-grid">${[["leaf", "Eco Friendly", "FSC-certified, compostable and recyclable materials across every SKU."], ["truck", "Fast Delivery", "PAN-India dispatch in 48 hours. International express available."], ["box", "Bulk Manufacturing", "In-house production capacity of 2M+ units per month."], ["spark", "Fully Customizable", "Bespoke sizes, prints, finishes and inserts from MOQ of 100."], ["shield", "Quality Assurance", "Triple-stage QC and ISO-9001 certified workflows."], ["heart", "Dedicated Support", "Personal packaging consultant from concept to delivery."]].map((x) => `<div class="feature glass"><span class="trust-icon">${icon(x[0])}</span><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join("")}</div></div></section>
    <section class="section-sm"><div class="wrap stats gradient">${[["500+", "Brands shipped"], ["2M+", "Units / month"], ["98%", "On-time delivery"], ["42t", "CO2 saved this year"]].map((x) => `<div class="stat"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join("")}</div></section>
    ${quoteSection()}
  </main>`;
}

function categoriesSection() {
  return `<section class="section"><div class="wrap"><div class="heading-row"><div><p class="eyebrow">Collections</p><h2>Browse by category</h2></div><a data-route href="#/shop">View all -></a></div><div class="category-grid">${categories.map((c) => `<a data-route href="#/shop?category=${c[0]}" class="category"><img src="${svgImage(c[2], c[1])}" alt="${c[1]}"><div class="category-info"><strong>${c[1]}</strong><small>${c[3]} products</small></div></a>`).join("")}</div></div></section>`;
}

function productsSection() {
  return `<section class="section-sm"><div class="wrap"><div class="heading-row"><div><p class="eyebrow">Bestsellers</p><h2>Featured products</h2></div><a data-route href="#/shop">Shop all -></a></div><div class="products-grid">${products.slice(0, 8).map(productCard).join("")}</div></div></section>`;
}

function quoteSection() {
  return `<section class="section quote-section" id="quote"><div class="wrap quote-grid"><div><p class="eyebrow">Get started</p><h2 class="display">Request a <span class="text-gradient"><i>custom</i></span> quote.</h2><p class="muted">Tell us about your brand. We will send materials, mockups and pricing within 4 business hours.</p><ul class="check-list"><li>No minimum design fee</li><li>Free samples on first order</li><li>Dedicated packaging consultant</li></ul></div>${formCard("Send quote request")}</div></section>`;
}

function formCard(label = "Send message") {
  return `<form class="form-card glass contact-form"><div class="form-grid"><div class="field"><label>Name</label><input required></div><div class="field"><label>Company</label><input></div><div class="field"><label>Email</label><input type="email" required></div><div class="field"><label>Phone</label><input type="tel"></div><div class="field"><label>Product type</label><input placeholder="e.g. Mailer boxes"></div><div class="field"><label>Quantity</label><input type="number" placeholder="500"></div><div class="field full"><label>Requirements</label><textarea rows="4" placeholder="Tell us about sizes, finishes and branding..."></textarea></div><button class="btn btn-primary full">${label} ${icon("arrow")}</button></div></form>`;
}

function visibleProducts() {
  const q = currentQuery();
  if (q.get("category")) state.filter = q.get("category");
  const term = state.search.trim().toLowerCase();
  return products.filter((p) => (state.filter === "all" || p.category === state.filter) && (!term || `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(term)));
}

function shop() {
  const shown = visibleProducts();
  return `<main><section class="page-hero"><div class="wrap"><p class="eyebrow">The collection</p><h1>Packaging, thoughtfully made.</h1><p class="muted">Stock formats and customizable essentials, ready to carry your brand.</p></div></section><section class="section-sm"><div class="wrap"><div class="filters"><button class="filter ${state.filter === "all" ? "active" : ""}" data-filter="all">All products</button>${categories.map((c) => `<button class="filter ${state.filter === c[0] ? "active" : ""}" data-filter="${c[0]}">${c[1]}</button>`).join("")}</div><p class="muted product-count">${shown.length} products${state.search ? ` for "${state.search}"` : ""}</p><div class="products-grid">${shown.length ? shown.map(productCard).join("") : `<div class="empty glass"><p>No products found. Try a different search.</p></div>`}</div></div></section></main>`;
}

function productPage(slug) {
  const p = products.find((x) => x.slug === slug) || products[0];
  return `<main class="section page-offset"><div class="wrap detail-grid"><div class="detail-image glass"><img src="${p.image}" alt="${p.name}"></div><div class="detail"><p class="eyebrow">${p.category.replaceAll("-", " ")}</p><h1>${p.name}</h1><div><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span> <span class="muted small">${p.rating} &middot; ${p.reviews} reviews</span></div><div class="detail-price">${money(p.price)} <small class="muted">per unit</small></div><p class="muted detail-copy">${p.description}</p><div class="feature glass info-note"><strong>Responsibly made</strong><p>100% recyclable &middot; Free shipping over $250 &middot; Quality guaranteed</p></div></div></div></main>`;
}

function basicPage(type) {
  const pages = {
    about: ["About Us", "Packaging that leaves no trace.", "Veraqa was founded in 2021 to make brand-defining packaging easier to buy and better for the planet. We design, prototype and manufacture boxes, labels and pouches from compostable, recyclable and FSC-certified materials.", [["leaf", "Eco-first", "Every SKU is audited against an internal sustainability scorecard."], ["shield", "Quality-led", "Production includes material checks, print checks and final packing inspection."], ["truck", "Global supply", "Serving Indian and international brands from Bengaluru, Mumbai and Delhi."], ["heart", "People-powered", "Packaging consultants support projects from concept to delivery."]]],
    industries: ["Industries", "Built for every category.", "Whether you ship serums or sandwiches, our packaging systems flex to your brand and supply chain.", [["spark", "Beauty & Cosmetics", "Rigid boxes, cartons and sleeves with premium finishes."], ["leaf", "Food & Beverage", "Compostable food-grade trays, cups and pouches."], ["box", "Fashion & Apparel", "Branded mailers, tissue and tag systems."], ["shield", "Wellness & Pharma", "Tamper-evident, child-safe and serialized cartons."], ["truck", "Subscription Brands", "Recurring custom kitting and on-demand fulfilment."], ["heart", "Gifting & Hampers", "Premium rigid boxes, hampers and inserts."]]],
    "custom-packaging": ["Custom Packaging", "Your brand, made physical.", "From 3D mockup to mass production, we craft packaging systems that look polished and ship reliably.", [["01", "Brief", "Share your brand, sizes and quantities."], ["02", "Design", "We produce dielines and mockups."], ["03", "Sample", "Approve the real thing before bulk production."], ["04", "Production", "Bulk runs from 100 to 1M units."]]],
  };
  const content = pages[type] || pages.about;
  return `<main><section class="page-hero"><div class="wrap"><p class="eyebrow">${content[0]}</p><h1>${content[1]}</h1><p class="muted hero-copy">${content[2]}</p></div></section><section class="section"><div class="wrap feature-grid">${content[3].map((x) => `<div class="feature glass">${x[0].length > 2 ? `<span class="trust-icon">${icon(x[0])}</span>` : `<span class="display text-gradient step-code">${x[0]}</span>`}<h3>${x[1]}</h3><p>${x[2]}</p></div>`).join("")}</div><div class="wrap center-cta"><a data-route href="#/contact" class="btn btn-primary">Talk to a packaging consultant ${icon("arrow")}</a></div></section></main>`;
}

function contact() {
  return `<main><section class="page-hero"><div class="wrap"><p class="eyebrow">Contact</p><h1>Let's build it together.</h1><p class="muted">Tell us what you are planning. We reply within four business hours.</p></div></section><section class="section-sm"><div class="wrap contact-grid"><div><div class="feature glass"><h3>hello@veraqa.com</h3><p>Replies within 4 business hours</p></div><div class="feature glass mt"><h3>+91 98765 43210</h3><p>Mon-Sat &middot; 9am-7pm IST</p></div><div class="feature glass mt"><h3>Bengaluru &middot; Mumbai &middot; Delhi</h3><p>Manufacturing and sample units</p></div></div>${formCard()}</div></section></main>`;
}

const policyData = {
  "return-policy": ["Return Policy", "Returns are accepted for eligible stock products within 7 days of delivery when items are unused, unopened and in original packaging.", ["Custom printed packaging, opened food-contact items and approved bulk production orders are not returnable unless defective.", "To start a return, contact hello@veraqa.com with your order number, photos and reason for return.", "Return shipping is paid by the customer unless the product arrived damaged or incorrect."]],
  "refund-policy": ["Refund Policy", "Refunds are reviewed after returned goods are inspected or after a valid defect claim is approved.", ["Approved refunds are processed to the original payment method within 5-10 business days.", "Design fees, sampling charges and custom tooling charges are non-refundable once work has started.", "Partial refunds may apply when only part of an order is affected."]],
  "privacy-policy": ["Privacy Policy", "We collect only the information needed to process enquiries, quotes, orders, payments, shipping and support.", ["Information may include name, company, email, phone, shipping address, order requirements and payment confirmation data.", "We do not sell personal data. We may share necessary data with payment, logistics and production partners to complete your order.", "You can request correction or deletion of your information by contacting hello@veraqa.com."]],
  disclaimer: ["Disclaimer", "Product images, colours, pricing and availability on this demo site are for presentation and may change before final quotation.", ["Packaging performance depends on product weight, handling, storage and transport conditions.", "Sustainability claims are based on material specifications and supplier documentation; local disposal rules may vary.", "This website content is general information and is not legal, regulatory or compliance advice."]],
  terms: ["Terms & Conditions", "By using this website or placing an order, you agree to Veraqa's quotation, payment, production and delivery terms.", ["Custom orders begin only after written approval of artwork, dielines, quantities and commercial terms.", "Customers are responsible for ensuring submitted artwork, logos and claims are legally usable.", "Delivery timelines are estimates unless confirmed in writing for a specific order."]],
  "shipping-policy": ["Shipping Policy", "Stock products normally dispatch within 2 business days. Custom production timelines depend on sampling, approval and quantity.", ["Free standard shipping applies to eligible orders above $250 in the demo checkout.", "Express, bulk freight and international shipping are quoted separately.", "Risk of delay can increase during holidays, weather disruptions, customs inspection or incomplete delivery details."]],
  faq: ["FAQ", "Quick answers for common packaging questions.", ["Minimum order quantity starts at 100 units for selected custom packaging and varies by material and finish.", "Samples are available for most formats before bulk production.", "Artwork support, dielines, print proofing and material recommendations are available through the quote form."]],
};

function policyPage(key) {
  const p = policyData[key] || policyData.disclaimer;
  return `<main><section class="page-hero"><div class="wrap"><p class="eyebrow">Information</p><h1>${p[0]}</h1><p class="muted hero-copy">${p[1]}</p></div></section><section class="section-sm"><div class="wrap policy-card glass"><p class="updated">Last updated: June 26, 2026</p>${p[2].map((line) => `<div class="policy-row"><h3>${line.split(".")[0]}.</h3><p>${line}</p></div>`).join("")}<div class="policy-help"><strong>Need help?</strong><p>Contact hello@veraqa.com for order-specific support.</p></div></div></section></main>`;
}

function cartPage() {
  return `<main class="section page-offset"><div class="wrap"><h1 class="display page-title">Cart</h1><div class="empty glass"><p class="muted">Cart and checkout are removed from this demo site.</p><a data-route href="#/shop" class="btn btn-primary">Back to products</a></div></div></main>`;
}

function summary() {
  // Cart/checkout removed from this demo.
  return ``;
}

function checkout() {
  // Cart/checkout removed from this demo.
  return cartPage();
}

function checkoutPanel() {
  return ``;
}

function sideCart() {
  return ``;
}

function render() {
  const path = currentPath();
  const body = path === "/" ? home()
    : path === "/shop" ? shop()
    : path.startsWith("/product/") ? productPage(path.split("/").pop())
    : path === "/about" ? basicPage("about")
    : path === "/industries" ? basicPage("industries")
    : path === "/custom-packaging" ? basicPage("custom-packaging")
    : path === "/contact" ? contact()
    : policyData[path.slice(1)] ? policyPage(path.slice(1))
    : home();
  document.querySelector("#app").innerHTML = header() + body + footer();
  document.title = `${path === "/" ? "Sustainable Packaging" : path.split("/").filter(Boolean).pop()?.replaceAll("-", " ") || "Sustainable Packaging"} - Veraqa`;
  bind();
}

function add(id, qty = 1) {
  // cart/checkout removed
}


function doSearch() {
  const input = document.querySelector("#global-search");
  state.search = input ? input.value.trim() : "";
  state.filter = "all";
  route("/shop");
}

function bind() {
  document.querySelectorAll("[data-route]").forEach((a) => {
    const target = a.getAttribute("href").replace(/^#/, "");
    a.setAttribute("href", "#" + target);
    a.onclick = (e) => {
      e.preventDefault();
      route(target);
    };
  });


  document.querySelectorAll("[data-filter]").forEach((b) => (b.onclick = () => {
    state.filter = b.dataset.filter;
    route(state.filter === "all" ? "/shop" : `/shop?category=${state.filter}`);
  }));
  document.querySelectorAll(".variant").forEach((b) => (b.onclick = () => {
    document.querySelectorAll(".variant").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
  }));
  document.querySelector('[data-action="theme"]')?.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("veraqa-theme", state.theme);
    document.body.classList.toggle("dark", state.theme === "dark");
    render();
  });
  document.querySelector('[data-action="search"]')?.addEventListener("click", () => {
    document.querySelector(".searchbar").classList.toggle("open");
    document.querySelector("#global-search")?.focus();
  });
  document.querySelector("[data-search-go]")?.addEventListener("click", doSearch);
  document.querySelector("#global-search")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
  });
  document.querySelector('[data-action="menu"]')?.addEventListener("click", () => {
    const m = document.querySelector("#mobile-nav");
    m.innerHTML = m.innerHTML ? "" : `<div class="mobile-menu glass">${[["/shop", "Products"], ["/custom-packaging", "Custom Packaging"], ["/industries", "Industries"], ["/about", "About Us"], ["/contact", "Contact"], ["/return-policy", "Returns"], ["/privacy-policy", "Privacy"]].map((n) => `<a data-route href="#${n[0]}">${n[1]}</a>`).join("")}</div>`;
    bind();
  });

  document.querySelectorAll(".contact-form,.newsletter").forEach((f) => (f.onsubmit = (e) => {
    e.preventDefault();
    f.reset();
    toast(f.classList.contains("newsletter") ? "Welcome to the Veraqa list!" : "Thanks. We will be in touch within 4 hours.");
  }));
  document.querySelector('[data-step="back"]')?.addEventListener("click", () => {
    state.checkoutStep = Math.max(0, state.checkoutStep - 1);
    render();
  });
  document.querySelector('[data-step="next"]')?.addEventListener("click", () => {
    if (state.checkoutStep < 2) {
      state.checkoutStep++;
      render();
    } else {
      state.cart = [];
      state.checkoutStep = 0;
      save();
      toast("Order placed successfully");
      setTimeout(() => route("/"), 700);
    }
  });
  document.querySelectorAll(".pay-tab").forEach((b) => (b.onclick = () => {
    document.querySelectorAll(".pay-tab").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
  }));
}

window.addEventListener("hashchange", () => {
  document.querySelector(".side-cart")?.remove();
  render();
  window.scrollTo(0, 0);
});

render();
