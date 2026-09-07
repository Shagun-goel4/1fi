import samsungImg from '../assets/samsung.png';

export const products = [
  {
    id: "prod_1",
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "Smartphones",
    price: 134900,
    originalPrice: 134900,
    image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg",
    gallery: [
      "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg"
    ],
    highlights: ["A17 Pro chip", "Titanium design", "48MP Main camera"],
    variants: [
      { id: "v_1_1", type: "Storage", value: "256GB", priceModifier: 0 },
      { id: "v_1_2", type: "Storage", value: "512GB", priceModifier: 20000 },
      { id: "v_1_3", type: "Storage", value: "1TB", priceModifier: 40000 },
    ]
  },
  {
    id: "prod_2",
    name: "Sony PlayStation 5",
    brand: "Sony",
    category: "Gaming",
    price: 54990,
    originalPrice: 54990,
    image: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21",
    gallery: [
      "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21",
    ],
    highlights: ["Ultra-High Speed SSD", "Ray Tracing", "4K-TV Gaming"],
    variants: [
      { id: "v_2_1", type: "Edition", value: "Disc", priceModifier: 0 },
      { id: "v_2_2", type: "Edition", value: "Digital", priceModifier: -10000 },
    ]
  },
  {
    id: "prod_3",
    name: "MacBook Air M3",
    brand: "Apple",
    category: "Laptops",
    price: 114900,
    originalPrice: 114900,
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba13-m3-spacegray-gallery1-202402?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1707259306975",
    gallery: [
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba13-m3-spacegray-gallery1-202402?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1707259306975"
    ],
    highlights: ["M3 chip", "Up to 18 hours battery life", "Liquid Retina display"],
    variants: [
      { id: "v_3_1", type: "RAM", value: "8GB", priceModifier: 0 },
      { id: "v_3_2", type: "RAM", value: "16GB", priceModifier: 20000 },
    ]
  },
  {
    id: "prod_4",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    price: 129999,
    originalPrice: 129999,
    image: samsungImg,
    gallery: [
      samsungImg
    ],
    highlights: ["Galaxy AI", "200MP Camera", "Titanium Frame"],
    variants: [
      { id: "v_4_1", type: "Storage", value: "256GB", priceModifier: 0 },
      { id: "v_4_2", type: "Storage", value: "512GB", priceModifier: 10000 },
    ]
  }
];
