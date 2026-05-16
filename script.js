const DEFAULT_SITE_CONFIG = {
  business: {
    name: "Aamra Farms",
    tagline: "Ratnagiri to your table",
    shortDescription: "Fresh Alphonso, Kesar, and seasonal mango boxes for families, gifting, and teams.",
    location: "Ratnagiri, Maharashtra",
    logoLetter: "A",
  },
  contact: {
    orderEmail: "orders@aamrafarms.com",
    queryEmail: "mangoqueries@example.com",
    phoneDisplay: "+91 98765 43210",
    phoneLink: "919876543210",
    whatsappNumber: "919876543210",
  },
  currency: {
    locale: "en-IN",
    code: "INR",
    displayPrefix: "Rs. ",
  },
  home: {
    pageTitle: "Aamra Farms | Premium Mangoes Delivered Fresh",
    metaDescription:
      "Order premium Alphonso, Kesar, and seasonal mango boxes from Aamra Farms. Handpicked, naturally ripened, and packed for farm-fresh delivery.",
    harvestLabel: "2026 summer harvest now open",
    heroTitle: "Premium Indian mangoes, picked at peak sweetness.",
    heroText:
      "Naturally ripened Alphonso and Kesar mangoes, sorted by hand, packed in protective produce boxes, and delivered fresh for gifting, family boxes, and weekly orders.",
    productsEyebrow: "Shop the harvest",
    productsTitle: "Choose your mango box",
    productsText:
      "Each batch is checked for aroma, firmness, color, and skin condition before packing. Prices can be updated in one place in the config file.",
    seasonNote: "Peak dispatch: April to June. Early batches sell out first.",
  },
  query: {
    pageTitle: "Mango Query | Aamra Farms",
    metaDescription:
      "Ask Aamra Farms a question about mango varieties, bulk orders, ripening, delivery, or gifting.",
    eyebrow: "Mango support",
    title: "Ask us anything about your mangoes.",
    text:
      "Send questions about varieties, ripening stage, shipping, gifting, bulk orders, or custom box requirements.",
    formTitle: "Send a mango query",
  },
  defaults: {
    customerNamePlaceholder: "Atul Singh",
    cityPlaceholder: "Mumbai",
    phonePlaceholder: "+91 98765 43210",
  },
  products: {
    alphonso: {
      type: "Ratnagiri Alphonso",
      name: "Premium Alphonso Box",
      badge: "Best seller",
      price: 2199,
      description:
        "Rich saffron flesh, floral aroma, and a smooth dessert finish. Ideal for family gifting and special occasions.",
      meta: ["12 mangoes", "2.8-3.2 kg", "Naturally ripened"],
      image: "assets/images/alphonso-box.jpg",
      imageAlt: "Open box filled with ripe Alphonso mangoes",
    },
    kesar: {
      type: "Gir Kesar",
      name: "Kesar Family Crate",
      badge: "Family pack",
      price: 1499,
      description:
        "Bright, sweet, and deeply fragrant mangoes selected for everyday eating, milkshakes, aamras, and summer desserts.",
      meta: ["5 kg crate", "18-22 mangoes", "Juicy table grade"],
      image: "assets/images/kesar-crate.jpg",
      imageAlt: "Wooden crate overflowing with ripe Kesar mangoes",
    },
    gift: {
      type: "Curated hamper",
      name: "Harvest Gift Box",
      badge: "Corporate",
      price: 2899,
      description:
        "A polished seasonal box for clients, festivals, and celebrations with premium fruit grading and clean presentation.",
      meta: ["18 mangoes", "Gift-ready pack", "Custom note option"],
      image: "assets/images/orchard-sorting.jpg",
      imageAlt: "Fresh mangoes being sorted into crates at an orchard",
    },
  },
};

function mergeConfig(base, override) {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? override : base;
  }

  if (!base || typeof base !== "object") {
    return override === undefined ? base : override;
  }

  const merged = { ...base };
  Object.entries(override || {}).forEach(([key, value]) => {
    merged[key] = mergeConfig(base[key], value);
  });
  return merged;
}

const siteConfig = mergeConfig(DEFAULT_SITE_CONFIG, window.MANGO_SITE_CONFIG || {});
const { business, contact, currency: currencyConfig, defaults, home, query } = siteConfig;
const WHATSAPP_NUMBER = contact.whatsappNumber;
const QUERY_EMAIL = contact.queryEmail;
const products = siteConfig.products;
const cart = Object.fromEntries(Object.keys(products).map((id) => [id, 0]));

const currency = new Intl.NumberFormat(currencyConfig.locale, {
  style: "currency",
  currency: currencyConfig.code,
  maximumFractionDigits: 0,
});

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector(".nav-toggle");
const productCards = document.querySelectorAll("[data-product]");
const cartLines = document.querySelector("[data-cart-lines]");
const subtotalEl = document.querySelector("[data-subtotal]");
const clearCartButton = document.querySelector("[data-clear-cart]");
const orderForm = document.querySelector("[data-order-form]");
const formStatus = document.querySelector("[data-form-status]");
const queryForm = document.querySelector("[data-query-form]");
const queryStatus = document.querySelector("[data-query-status]");

function field(formData, name) {
  return String(formData.get(name) || "").trim();
}

function formatPrice(value) {
  return currency.format(value).replace("₹", currencyConfig.displayPrefix);
}

function setText(selector, text) {
  if (!text) return;
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = text;
  });
}

function setMetaDescription(description) {
  const meta = document.querySelector('meta[name="description"]');
  if (meta && description) meta.setAttribute("content", description);
}

function setPlaceholder(selector, placeholder) {
  if (!placeholder) return;
  document.querySelectorAll(selector).forEach((element) => {
    element.setAttribute("placeholder", placeholder);
  });
}

function applyProductConfig() {
  productCards.forEach((card) => {
    const id = card.dataset.product;
    const product = products[id];
    if (!product) return;

    const image = card.querySelector(".product-image img");
    if (image) {
      image.src = product.image;
      image.alt = product.imageAlt || product.name;
    }

    const badge = card.querySelector(".product-badge");
    if (badge) badge.textContent = product.badge || "";

    const type = card.querySelector(".product-type");
    if (type) type.textContent = product.type || "";

    const title = card.querySelector(".product-body h3");
    if (title) title.textContent = product.name;

    const description = card.querySelector(".product-body > p");
    if (description) description.textContent = product.description || "";

    const meta = card.querySelector(".product-meta");
    if (meta) {
      meta.setAttribute("aria-label", `${product.name} details`);
      meta.replaceChildren(
        ...(product.meta || []).map((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          return li;
        }),
      );
    }

    const price = card.querySelector(".price");
    if (price) {
      price.dataset.price = product.price;
      price.textContent = formatPrice(product.price);
    }

    const quantity = card.querySelector(".quantity");
    if (quantity) quantity.setAttribute("aria-label", `${product.name} quantity`);

    card
      .querySelector("[data-decrease]")
      ?.setAttribute("aria-label", `Decrease ${product.name} quantity`);
    card
      .querySelector("[data-increase]")
      ?.setAttribute("aria-label", `Increase ${product.name} quantity`);
  });
}

function applyQueryVarietyOptions() {
  const select = queryForm?.elements?.variety;
  if (!select) return;

  select.replaceChildren();

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Not sure yet";
  select.append(defaultOption);

  Object.values(products).forEach((product) => {
    const option = document.createElement("option");
    option.textContent = product.name;
    select.append(option);
  });
}

function applySiteConfig() {
  const isQueryPage = window.location.pathname.endsWith("query.html");
  document.title = isQueryPage ? query.pageTitle : home.pageTitle;
  setMetaDescription(isQueryPage ? query.metaDescription : home.metaDescription);

  setText(".brand-mark", business.logoLetter);
  setText(".brand strong", business.name);
  setText(".brand small", business.tagline);
  setText(".site-footer p", business.shortDescription);
  setText(".site-footer address span", business.location);

  document.querySelectorAll('.site-footer a[href^="mailto:"]').forEach((link) => {
    link.textContent = contact.orderEmail;
    link.href = `mailto:${contact.orderEmail}`;
  });

  document.querySelectorAll('.site-footer a[href^="tel:"]').forEach((link) => {
    link.textContent = contact.phoneDisplay;
    link.href = `tel:+${contact.phoneLink}`;
  });

  setText(".hero .eyebrow", home.harvestLabel);
  setText("#hero-title", home.heroTitle);
  setText(".hero-copy", home.heroText);
  setText(".products-section .section-heading .eyebrow", home.productsEyebrow);
  setText("#products-title", home.productsTitle);
  setText(".products-section .section-heading > p:not(.eyebrow)", home.productsText);
  setText(".season-note span", home.seasonNote);

  setText(".query-copy .eyebrow", query.eyebrow);
  setText("#query-title", query.title);
  setText(".query-copy > p", query.text);
  setText(".query-panel h2", query.formTitle);

  setPlaceholder('input[name="name"]', defaults.customerNamePlaceholder);
  setPlaceholder('input[name="city"]', defaults.cityPlaceholder);
  setPlaceholder('input[name="phone"]', defaults.phonePlaceholder);

  applyProductConfig();
  applyQueryVarietyOptions();
}

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function setMenu(open) {
  if (!nav || !header || !navToggle) return;
  nav.classList.toggle("is-open", open);
  header.classList.toggle("nav-active", open);
  document.body.classList.toggle("nav-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

function updateProductCard(card) {
  const id = card.dataset.product;
  const product = products[id];
  if (!product) return;

  const output = card.querySelector("[data-quantity]");
  const decrease = card.querySelector("[data-decrease]");
  output.value = cart[id];
  output.textContent = cart[id];
  decrease.disabled = cart[id] === 0;
}

function cartEntries() {
  return Object.entries(cart).filter(([, quantity]) => quantity > 0);
}

function updateCart() {
  if (!cartLines || !subtotalEl) return;

  productCards.forEach(updateProductCard);

  const entries = cartEntries();
  const subtotal = entries.reduce((sum, [id, quantity]) => sum + products[id].price * quantity, 0);
  subtotalEl.textContent = formatPrice(subtotal);

  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "empty-cart";
    empty.textContent = "Select mango boxes to start your enquiry.";
    cartLines.replaceChildren(empty);
    return;
  }

  cartLines.replaceChildren(
    ...entries.map(([id, quantity]) => {
      const product = products[id];
      const lineTotal = product.price * quantity;
      const line = document.createElement("div");
      const label = document.createElement("span");
      const total = document.createElement("strong");

      line.className = "cart-line";
      label.textContent = `${quantity} x ${product.name}`;
      total.textContent = formatPrice(lineTotal);
      line.append(label, total);

      return line;
    }),
  );
}

function buildWhatsAppMessage(formData) {
  const entries = cartEntries();
  const lines = entries.map(([id, quantity]) => {
    const product = products[id];
    return `- ${quantity} x ${product.name} (${formatPrice(product.price * quantity)})`;
  });
  const subtotal = entries.reduce((sum, [id, quantity]) => sum + products[id].price * quantity, 0);
  const hasOrderItems = entries.length > 0;

  const details = [
    hasOrderItems
      ? `Hello ${business.name}, I would like to enquire about this mango order:`
      : `Hello ${business.name}, I would like to enquire about mangoes.`,
    "",
    ...lines,
    "",
    hasOrderItems ? `Estimated subtotal: ${formatPrice(subtotal)}` : "",
    field(formData, "name") ? `Name: ${field(formData, "name")}` : "",
    field(formData, "phone") ? `Phone: ${field(formData, "phone")}` : "",
    field(formData, "city") ? `Delivery city: ${field(formData, "city")}` : "",
    field(formData, "date") ? `Preferred date: ${field(formData, "date")}` : "",
    field(formData, "note") ? `Note: ${field(formData, "note")}` : "",
  ].filter(Boolean);

  return details.join("\n");
}

function buildQueryEmail(formData) {
  const name = field(formData, "name");
  const topic = field(formData, "topic");
  const subject = `Mango query from ${name || "website visitor"}${topic ? ` - ${topic}` : ""}`;
  const body = [
    `New mango query from the ${business.name} website:`,
    "",
    name ? `Name: ${name}` : "",
    field(formData, "email") ? `Email: ${field(formData, "email")}` : "",
    field(formData, "phone") ? `Phone: ${field(formData, "phone")}` : "",
    field(formData, "city") ? `City: ${field(formData, "city")}` : "",
    topic ? `Topic: ${topic}` : "",
    field(formData, "variety") ? `Mango variety: ${field(formData, "variety")}` : "",
    "",
    "Question:",
    field(formData, "message"),
  ].filter((line) => line !== "");

  return {
    subject,
    body: body.join("\n"),
  };
}

applySiteConfig();

productCards.forEach((card) => {
  const id = card.dataset.product;
  const increase = card.querySelector("[data-increase]");
  const decrease = card.querySelector("[data-decrease]");

  if (!products[id]) return;

  increase.addEventListener("click", () => {
    cart[id] += 1;
    updateCart();
  });

  decrease.addEventListener("click", () => {
    cart[id] = Math.max(0, cart[id] - 1);
    updateCart();
  });
});

clearCartButton?.addEventListener("click", () => {
  Object.keys(cart).forEach((id) => {
    cart[id] = 0;
  });
  if (formStatus) formStatus.textContent = "";
  updateCart();
});

orderForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const message = encodeURIComponent(buildWhatsAppMessage(formData));
  window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  formStatus.textContent = "Opening WhatsApp with your enquiry.";
});

queryForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(queryForm);
  const email = buildQueryEmail(formData);
  const mailto = `mailto:${QUERY_EMAIL}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
  window.location.href = mailto;
  queryStatus.textContent = `Your email app is opening a message to ${QUERY_EMAIL}.`;
});

navToggle?.addEventListener("click", () => {
  setMenu(!nav.classList.contains("is-open"));
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenu(false);
  }
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
updateCart();

if (window.lucide) {
  window.lucide.createIcons();
} else {
  window.addEventListener("load", () => window.lucide?.createIcons());
}
