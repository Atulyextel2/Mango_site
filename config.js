// Edit this file to personalize the mango website.
// Keep phone and WhatsApp numbers with country code and digits only, no +, spaces, or dashes.
window.MANGO_SITE_CONFIG = {
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
