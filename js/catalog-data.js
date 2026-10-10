"use strict";
window.NunixCatalog = {
  businessWhatsapp: "", // TODO: set the verified business WhatsApp number
  categories: [
  {
    "slug": "cookers",
    "name": "Cookers"
  },
  {
    "slug": "gas-stoves",
    "name": "Gas Stoves"
  },
  {
    "slug": "woofers",
    "name": "Woofers"
  },
  {
    "slug": "water-dispensers",
    "name": "Water Dispensers"
  },
  {
    "slug": "microwaves",
    "name": "Microwaves"
  },
  {
    "slug": "blenders",
    "name": "Blenders"
  },
  {
    "slug": "electric-fans",
    "name": "Electric Fans"
  },
  {
    "slug": "air-fryers",
    "name": "Air Fryers"
  },
  {
    "slug": "shoe-racks",
    "name": "Shoe Racks"
  }
],
  products: [
  {
    "id": "cookers-1",
    "category": "cookers",
    "name": "4-Burner Freestanding Cooker",
    "price": 28500,
    "description": "Four burners, oven compartment and stainless-look finish.",
    "image": "assets/images/cookers-1.svg",
  },
  {
    "id": "cookers-2",
    "category": "cookers",
    "name": "Compact 3-Burner Cooker",
    "price": 23900,
    "description": "Space-saving cooker with an oven and three cooking burners.",
    "image": "assets/images/cookers-2.svg",
  },
  {
    "id": "gas-stoves-1",
    "category": "gas-stoves",
    "name": "Double-Burner Tabletop Stove",
    "price": 4200,
    "description": "Compact tabletop design with two burners.",
    "image": "assets/images/gas-stoves-1.svg",
  },
  {
    "id": "gas-stoves-2",
    "category": "gas-stoves",
    "name": "Single-Burner Gas Stove",
    "price": 2150,
    "description": "Portable tabletop stove for a small kitchen.",
    "image": "assets/images/gas-stoves-2.svg",
  },
  {
    "id": "woofers-1",
    "category": "woofers",
    "name": "2.1 Channel Woofer System",
    "price": 8500,
    "description": "Subwoofer and two satellite speakers for home audio.",
    "image": "assets/images/woofers-1.svg",
  },
  {
    "id": "woofers-2",
    "category": "woofers",
    "name": "Bluetooth Home Woofer",
    "price": 12900,
    "description": "Home speaker system with a Bluetooth-style feature concept.",
    "image": "assets/images/woofers-2.svg",
  },
  {
    "id": "water-dispensers-1",
    "category": "water-dispensers",
    "name": "Hot & Cold Water Dispenser",
    "price": 11500,
    "description": "Freestanding dispenser with hot- and cold-water concept.",
    "image": "assets/images/water-dispensers-1.svg",
  },
  {
    "id": "water-dispensers-2",
    "category": "water-dispensers",
    "name": "Tabletop Water Dispenser",
    "price": 5800,
    "description": "Compact countertop drinking-water dispenser concept.",
    "image": "assets/images/water-dispensers-2.svg",
  },
  {
    "id": "microwaves-1",
    "category": "microwaves",
    "name": "20L Countertop Microwave",
    "price": 10500,
    "description": "Compact oven with timer and glass turntable concept.",
    "image": "assets/images/microwaves-1.svg",
  },
  {
    "id": "microwaves-2",
    "category": "microwaves",
    "name": "Digital Microwave Oven",
    "price": 14800,
    "description": "Microwave with digital-style controls and compact design.",
    "image": "assets/images/microwaves-2.svg",
  },
  {
    "id": "blenders-1",
    "category": "blenders",
    "name": "1.5L Kitchen Blender",
    "price": 3800,
    "description": "Jug blender suitable for smoothie and food-preparation concepts.",
    "image": "assets/images/blenders-1.svg",
  },
  {
    "id": "blenders-2",
    "category": "blenders",
    "name": "Personal Smoothie Blender",
    "price": 2900,
    "description": "Compact smoothie blender with travel-cup concept.",
    "image": "assets/images/blenders-2.svg",
  },
  {
    "id": "electric-fans-1",
    "category": "electric-fans",
    "name": "Standing Pedestal Fan",
    "price": 6500,
    "description": "Adjustable-height standing fan with circular guard.",
    "image": "assets/images/electric-fans-1.svg",
  },
  {
    "id": "electric-fans-2",
    "category": "electric-fans",
    "name": "Desktop Electric Fan",
    "price": 3200,
    "description": "Compact table fan with adjustable tilt concept.",
    "image": "assets/images/electric-fans-2.svg",
  },
  {
    "id": "air-fryers-1",
    "category": "air-fryers",
    "name": "5L Digital Air Fryer",
    "price": 9600,
    "description": "Countertop air-fryer concept with digital temperature controls.",
    "image": "assets/images/air-fryers-1.svg",
  },
  {
    "id": "air-fryers-2",
    "category": "air-fryers",
    "name": "Compact Air Fryer",
    "price": 6800,
    "description": "Compact countertop fryer with manual temperature dial.",
    "image": "assets/images/air-fryers-2.svg",
  },
  {
    "id": "shoe-racks-1",
    "category": "shoe-racks",
    "name": "Five-Tier Shoe Rack",
    "price": 4200,
    "description": "Open five-tier organizer concept for shoes and accessories.",
    "image": "assets/images/shoe-racks-1.svg",
  },
  {
    "id": "shoe-racks-2",
    "category": "shoe-racks",
    "name": "Three-Tier Shoe Organizer",
    "price": 2950,
    "description": "Compact three-tier shoe storage for smaller spaces.",
    "image": "assets/images/shoe-racks-2.svg",
  }
],
  money(amount) { return "KSh " + Number(amount).toLocaleString("en-KE"); }
};
