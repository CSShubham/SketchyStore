import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

// Sample 10 products (mapped to your Product.js schema)
const products = [
  /* ================== APPLE MACBOOK PRO ================== */
  {
    title: "Apple MacBook Pro 14 Inch Space Grey",
    description:
      "The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple's M1 Pro chip for exceptional performance and a stunning Retina display.",
    price: 1999.99,
    discountPrice: 1906.2, // price - 4.69%
    rating: 3.65,
    category: "laptops",
    brand: "Apple",
    stock: 24,
    sku: "LAP-APP-APP-078",
    tags: ["laptops", "apple"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "macbook14-1",
        url: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
      },
      {
        public_id: "macbook14-2",
        url: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp",
      },
      {
        public_id: "macbook14-3",
        url: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/3.webp",
      },
    ],
    reviews: [
      {
        name: "Hazel Evans",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      {
        name: "Christopher West",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      { name: "Aubrey Garcia", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },

  /* ================== BLUE & BLACK CHECK SHIRT ================== */
  {
    title: "Blue & Black Check Shirt",
    description:
      "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern.",
    price: 29.99,
    discountPrice: 25.39, // price - 15.35%
    rating: 3.64,
    category: "mens-shirts",
    brand: "Fashion Trends",
    stock: 38,
    sku: "MEN-FAS-BLU-083",
    tags: ["clothing", "men's shirts"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "shirt-1",
        url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
      },
      {
        public_id: "shirt-2",
        url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/2.webp",
      },
      {
        public_id: "shirt-3",
        url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/3.webp",
      },
      {
        public_id: "shirt-4",
        url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/4.webp",
      },
    ],
    reviews: [
      { name: "Logan Lee", rating: 1, comment: "Waste of money!" },
      { name: "Zachary Lee", rating: 5, comment: "Very satisfied!" },
      { name: "Aurora Rodriguez", rating: 4, comment: "Fast shipping!" },
    ],
    numOfReviews: 3,
  },

  /* ================== BLUE FROCK ================== */
  {
    title: "Blue Frock",
    description:
      "The Blue Frock is a charming and stylish dress for various occasions with a vibrant blue color.",
    price: 29.99,
    discountPrice: 26.36, // price - 12.13%
    rating: 4.17,
    category: "tops",
    brand: "Generic",
    stock: 52,
    sku: "TOP-BRD-BLU-162",
    tags: ["clothing", "dresses"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "frock-1",
        url: "https://cdn.dummyjson.com/product-images/tops/blue-frock/1.webp",
      },
      {
        public_id: "frock-2",
        url: "https://cdn.dummyjson.com/product-images/tops/blue-frock/2.webp",
      },
      {
        public_id: "frock-3",
        url: "https://cdn.dummyjson.com/product-images/tops/blue-frock/3.webp",
      },
      {
        public_id: "frock-4",
        url: "https://cdn.dummyjson.com/product-images/tops/blue-frock/4.webp",
      },
    ],
    reviews: [
      { name: "Victoria McDonald", rating: 4, comment: "Great product!" },
      { name: "Benjamin Foster", rating: 4, comment: "Fast shipping!" },
      { name: "Addison Ward", rating: 4, comment: "Would buy again!" },
    ],
    numOfReviews: 3,
  },

  /* ================== IPAD MINI ================== */
  {
    title: "iPad Mini 2021 Starlight",
    description:
      "The iPad Mini 2021 in Starlight is a compact and powerful tablet from Apple.",
    price: 499.99,
    discountPrice: 481.79, // price - 3.64%
    rating: 3.18,
    category: "tablets",
    brand: "Apple",
    stock: 47,
    sku: "TAB-APP-IPA-159",
    tags: ["electronics", "tablets"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "ipadmini-1",
        url: "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/1.webp",
      },
      {
        public_id: "ipadmini-2",
        url: "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/2.webp",
      },
      {
        public_id: "ipadmini-3",
        url: "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/3.webp",
      },
      {
        public_id: "ipadmini-4",
        url: "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/4.webp",
      },
    ],
    reviews: [
      { name: "Eleanor Collins", rating: 4, comment: "Highly impressed!" },
      {
        name: "Leo Rivera",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      { name: "Carter Rivera", rating: 4, comment: "Would buy again!" },
    ],
    numOfReviews: 3,
  },

  /* ================== NIKE AIR JORDAN ================== */
  {
    title: "Nike Air Jordan 1 Red And Black",
    description:
      "The Nike Air Jordan 1 in Red and Black is an iconic basketball sneaker.",
    price: 149.99,
    discountPrice: 143.81, // price - 4.12%
    rating: 4.77,
    category: "mens-shoes",
    brand: "Nike",
    stock: 7,
    sku: "MEN-NIK-NIK-088",
    tags: ["footwear", "athletic shoes"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "jordan-1",
        url: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp",
      },
      {
        public_id: "jordan-2",
        url: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/2.webp",
      },
      {
        public_id: "jordan-3",
        url: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/3.webp",
      },
      {
        public_id: "jordan-4",
        url: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/4.webp",
      },
    ],
    reviews: [
      { name: "Elena Long", rating: 5, comment: "Highly impressed!" },
      {
        name: "Addison Wright",
        rating: 4,
        comment: "Very happy with my purchase!",
      },
      { name: "Mason Wright", rating: 1, comment: "Waste of money!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "iPhone 5s",
    description: "Compact and reliable Apple smartphone.",
    price: 199.99,
    discountPrice: 174.99,
    rating: 2.83,
    category: "smartphones",
    brand: "Apple",
    stock: 25,
    sku: "SMA-APP-001",
    tags: ["apple", "iphone"],
    images: [
      {
        public_id: "iphone5s-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/1.webp",
      },
      {
        public_id: "iphone5s-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/2.webp",
      },
      {
        public_id: "iphone5s-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "iPhone 6",
    description: "Sleek design with improved performance.",
    price: 299.99,
    discountPrice: 279.99,
    rating: 3.41,
    category: "smartphones",
    brand: "Apple",
    stock: 60,
    sku: "SMA-APP-002",
    tags: ["apple", "iphone"],
    images: [
      {
        public_id: "iphone6-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/1.webp",
      },
      {
        public_id: "iphone6-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/2.webp",
      },
      {
        public_id: "iphone6-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "iPhone 13 Pro",
    description: "High-end Apple flagship smartphone.",
    price: 1099.99,
    discountPrice: 999.99,
    rating: 4.12,
    category: "smartphones",
    brand: "Apple",
    stock: 56,
    sku: "SMA-APP-003",
    tags: ["apple", "flagship"],
    images: [
      {
        public_id: "iphone13pro-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp",
      },
      {
        public_id: "iphone13pro-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/2.webp",
      },
      {
        public_id: "iphone13pro-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/3.webp",
      },
      {
        public_id: "iphone13pro-4",
        url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/4.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "Samsung Galaxy S8",
    description: "Infinity display premium smartphone.",
    price: 499.99,
    discountPrice: 399.99,
    rating: 4.4,
    category: "smartphones",
    brand: "Samsung",
    stock: 0,
    sku: "SMA-SAM-004",
    tags: ["samsung"],
    images: [
      {
        public_id: "s8-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/1.webp",
      },
      {
        public_id: "s8-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/2.webp",
      },
      {
        public_id: "s8-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "Samsung Galaxy S21",
    description: "Flagship Samsung smartphone.",
    price: 799.99,
    discountPrice: 699.99,
    rating: 4.5,
    category: "smartphones",
    brand: "Samsung",
    stock: 40,
    sku: "SMA-SAM-005",
    tags: ["samsung"],
    images: [
      {
        public_id: "s21-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s21/1.webp",
      },
      {
        public_id: "s21-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s21/2.webp",
      },
      {
        public_id: "s21-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s21/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "OPPO F19",
    description: "Stylish phone with AMOLED display.",
    price: 249.99,
    discountPrice: 219.99,
    rating: 4.1,
    category: "smartphones",
    brand: "OPPO",
    stock: 100,
    sku: "SMA-OPP-006",
    tags: ["oppo"],
    images: [
      {
        public_id: "f19-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19/1.webp",
      },
      {
        public_id: "f19-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19/2.webp",
      },
      {
        public_id: "f19-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "Huawei P30",
    description: "Photography focused smartphone.",
    price: 499.99,
    discountPrice: 449.99,
    rating: 4.2,
    category: "smartphones",
    brand: "Huawei",
    stock: 30,
    sku: "SMA-HUA-007",
    tags: ["huawei"],
    images: [
      {
        public_id: "p30-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/huawei-p30/1.webp",
      },
      {
        public_id: "p30-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/huawei-p30/2.webp",
      },
      {
        public_id: "p30-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/huawei-p30/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "Infinix Hot 9",
    description: "Affordable smartphone with big battery.",
    price: 119.99,
    discountPrice: 99.99,
    rating: 3.9,
    category: "smartphones",
    brand: "Infinix",
    stock: 200,
    sku: "SMA-INF-008",
    tags: ["budget"],
    images: [
      {
        public_id: "hot9-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/infinix-hot-9/1.webp",
      },
      {
        public_id: "hot9-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/infinix-hot-9/2.webp",
      },
      {
        public_id: "hot9-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/infinix-hot-9/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "Redmi Note 12",
    description: "Powerful mid-range smartphone.",
    price: 279.99,
    discountPrice: 249.99,
    rating: 4.3,
    category: "smartphones",
    brand: "Xiaomi",
    stock: 90,
    sku: "SMA-XIA-009",
    tags: ["redmi"],
    images: [
      {
        public_id: "note12-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/redmi-note-12/1.webp",
      },
      {
        public_id: "note12-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/redmi-note-12/2.webp",
      },
      {
        public_id: "note12-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/redmi-note-12/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "Realme Narzo 50",
    description: "Gaming focused smartphone.",
    price: 199.99,
    discountPrice: 179.99,
    rating: 4.0,
    category: "smartphones",
    brand: "Realme",
    stock: 110,
    sku: "SMA-REA-010",
    tags: ["gaming"],
    images: [
      {
        public_id: "narzo50-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/realme-narzo-50/1.webp",
      },
      {
        public_id: "narzo50-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/realme-narzo-50/2.webp",
      },
      {
        public_id: "narzo50-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/realme-narzo-50/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "Vivo Y20",
    description: "Balanced phone for daily use.",
    price: 159.99,
    discountPrice: 139.99,
    rating: 3.8,
    category: "smartphones",
    brand: "Vivo",
    stock: 140,
    sku: "SMA-VIV-011",
    tags: ["vivo"],
    images: [
      {
        public_id: "y20-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/vivo-y20/1.webp",
      },
      {
        public_id: "y20-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/vivo-y20/2.webp",
      },
      {
        public_id: "y20-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/vivo-y20/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "Motorola Edge 40",
    description: "Clean Android experience.",
    price: 349.99,
    discountPrice: 319.99,
    rating: 4.2,
    category: "smartphones",
    brand: "Motorola",
    stock: 50,
    sku: "SMA-MOT-012",
    tags: ["motorola"],
    images: [
      {
        public_id: "edge40-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/motorola-edge-40/1.webp",
      },
      {
        public_id: "edge40-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/motorola-edge-40/2.webp",
      },
      {
        public_id: "edge40-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/motorola-edge-40/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "OnePlus 11R",
    description: "Fast and smooth performance.",
    price: 599.99,
    discountPrice: 549.99,
    rating: 4.6,
    category: "smartphones",
    brand: "OnePlus",
    stock: 35,
    sku: "SMA-ONE-013",
    tags: ["oneplus"],
    images: [
      {
        public_id: "11r-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/oneplus-11r/1.webp",
      },
      {
        public_id: "11r-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/oneplus-11r/2.webp",
      },
      {
        public_id: "11r-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/oneplus-11r/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "Google Pixel 7",
    description: "Best Android camera experience.",
    price: 699.99,
    discountPrice: 649.99,
    rating: 4.7,
    category: "smartphones",
    brand: "Google",
    stock: 45,
    sku: "SMA-GOO-014",
    tags: ["pixel"],
    images: [
      {
        public_id: "pixel7-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/google-pixel-7/1.webp",
      },
      {
        public_id: "pixel7-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/google-pixel-7/2.webp",
      },
      {
        public_id: "pixel7-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/google-pixel-7/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "Asus ROG Phone 6",
    description: "Ultimate gaming smartphone.",
    price: 999.99,
    discountPrice: 899.99,
    rating: 4.8,
    category: "smartphones",
    brand: "Asus",
    stock: 20,
    sku: "SMA-ASU-015",
    tags: ["gaming"],
    images: [
      {
        public_id: "rog6-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/asus-rog-phone-6/1.webp",
      },
      {
        public_id: "rog6-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/asus-rog-phone-6/2.webp",
      },
      {
        public_id: "rog6-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/asus-rog-phone-6/3.webp",
      },
    ],
    numOfReviews: 0,
  },

  {
    title: "Nokia G21",
    description: "Reliable phone with clean UI.",
    price: 179.99,
    discountPrice: 159.99,
    rating: 3.7,
    category: "smartphones",
    brand: "Nokia",
    stock: 80,
    sku: "SMA-NOK-016",
    tags: ["nokia"],
    images: [
      {
        public_id: "g21-1",
        url: "https://cdn.dummyjson.com/product-images/smartphones/nokia-g21/1.webp",
      },
      {
        public_id: "g21-2",
        url: "https://cdn.dummyjson.com/product-images/smartphones/nokia-g21/2.webp",
      },
      {
        public_id: "g21-3",
        url: "https://cdn.dummyjson.com/product-images/smartphones/nokia-g21/3.webp",
      },
    ],
    numOfReviews: 0,
  },
  {
    title: "Brown Leather Belt Watch",
    description:
      "The Brown Leather Belt Watch is a stylish timepiece with a classic design. Featuring a genuine leather strap and a sleek dial, it adds a touch of sophistication to your look.",
    price: 599,
    discountPrice: 489, // price - 4.69%
    rating: 4.19,
    category: "Mens-watches",
    brand: "Fashion Timepieces",
    stock: 32,
    sku: "MEN-FAS-BRO-093",
    tags: ["watches", "Leather watches"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "brown-leather-belt-watch-1",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp",
      },
      {
        public_id: "brown-leather-belt-watch-2",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/2.webp",
      },
      {
        public_id: "brown-leather-belt-watch-3",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/3.webp",
      },
    ],
    reviews: [
      { name: "Sid", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Maggie", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Sasuke", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "Longines Master Collection",
    description:
      "The Longines Master Collection is an elegant and refined watch known for its precision and craftsmanship. With a timeless design, it's a symbol of luxury and sophistication.",
    price: 999,
    discountPrice: 899, // price - 4.69%
    rating: 3.25,
    category: "Mens-watches",
    brand: "Longines",
    stock: 24,
    sku: "MEN-LON-LON-094",
    tags: ["watches", "longines"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "longiness-watch-1",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp",
      },
      {
        public_id: "longiness-watch-2",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/2.webp",
      },
      {
        public_id: "longiness-watch-3",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/3.webp",
      },
    ],
    reviews: [
      { name: "Suzen", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Ribbeca", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Alto", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "Rolex Cellini Date Black Dial",
    description:
      "The Rolex Cellini Date with Black Dial is a classic and prestigious watch. With a black dial and date complication, it exudes sophistication and is a symbol of Rolex's heritage.",
    price: 8999,
    discountPrice: 7899,
    rating: 4.56,
    category: "Mens-watches",
    brand: "Rolex",
    stock: 24,
    sku: "MEN-ROL-ROL-078",
    tags: ["luxury-watches", "rolex"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "rolex-cellini-date-black-dial-1",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp",
      },
      {
        public_id: "rolex-cellini-date-black-dial-2",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/2.webp",
      },
      {
        public_id: "rolex-cellini-date-black-dial-3",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/3.webp",
      },
    ],
    reviews: [
      { name: "pickachu", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Naruto", rating: 5, comment: "Very happy with my purchase!" },
      { name: "arjun", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "Rolex Cellini Moonphase",
    description:
      "The Rolex Cellini Moonphase is a masterpiece of horology, featuring a moon phase complication and exquisite design. It reflects Rolex's commitment to precision and elegance.",
    price: 19999,
    discountPrice: 18999,
    rating: 4.97,
    category: "Mens-watches",
    brand: "Rolex",
    stock: 12,
    sku: "MEN-ROL-ROL-079",
    tags: ["luxury-watches", "rolex"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "rolex-cellini-moonphase-1",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp",
      },
      {
        public_id: "rolex-cellini-moonphase-2",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/2.webp",
      },
      {
        public_id: "rolex-cellini-moonphase-3",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/3.webp",
      },
    ],
    reviews: [
      { name: "Salman", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Abishek", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Aish", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "Rolex Datejust",
    description:
      "The Rolex Datejust is an iconic and versatile timepiece with a date window. Known for its timeless design and reliability, it's a symbol of Rolex's watchmaking excellence.",
    price: 15999,
    discountPrice: 13999,
    rating: 4.97,
    category: "Mens-watches",
    brand: "Rolex",
    stock: 10,
    sku: "MEN-ROL-ROL-097",
    tags: ["luxury-watches", "rolex"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "rolex-datejust-1",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/1.webp",
      },
      {
        public_id: "rolex-datejust-2",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/2.webp",
      },
      {
        public_id: "rolex-datejust-3",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/3.webp",
      },
    ],
    reviews: [
      {
        name: "Hazel Evans",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      {
        name: "Christopher West",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      { name: "Aubrey Garcia", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "Rolex Submariner Watch",
    description:
      "The Rolex Submariner is a legendary dive watch with a rich history. Known for its durability and water resistance, it's a symbol of adventure and exploration.",
    price: 39999,
    discountPrice: 34999, // price - 4.69%
    rating: 3.65,
    category: "Mens-watches",
    brand: "Rolex",
    stock: 12,
    sku: "MEN-ROL-ROL-098",
    tags: ["luxury-watches", "rolex"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "rolex-submariner-1",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner/1.webp",
      },
      {
        public_id: "rolex-submariner-2",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner/2.webp",
      },
      {
        public_id: "rolex-submariner-3",
        url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner/3.webp",
      },
    ],
    reviews: [
      {
        name: "Monkey D. Luffy",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      { name: "Tanjiro", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Maki", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "American Football",
    description:
      "The American Football is a classic ball used in American football games. It is designed for throwing and catching, making it an essential piece of equipment for the sport.",
    price: 399,
    discountPrice: 349, // price - 4.69%
    rating: 2.65,
    category: "Sports-accessories",
    brand: "Sportsy",
    stock: 20,
    sku: "SPO-BRD-AME-137",
    tags: ["sports equipment", "football"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "american-football-1",
        url: "https://cdn.dummyjson.com/product-images/sports-accessories/american-football/1.webp",
      },
    ],
    reviews: [
      { name: "Steve", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Tony", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Natasha", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "Baseball Ball",
    description:
      "The Baseball Ball is a standard baseball used in baseball games. It features a durable leather cover and is designed for pitching, hitting, and fielding in the game of baseball.",
    price: 199,
    discountPrice: 189, // price - 4.69%
    rating: 3.45,
    category: "Sports-accessories",
    brand: "Sportsy",
    stock: 24,
    sku: "SPO-BRD-BAS-138",
    tags: ["sports equipment", "baseball"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "baseball-ball-1",
        url: "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-ball/1.webp",
      },
    ],
    reviews: [
      { name: "Rogers", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Stark", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Romonoff", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "Baseball Glove",
    description:
      "The Baseball Glove is a protective glove worn by baseball players. It is designed to catch and field the baseball, providing players with comfort and control during the game.",
    price: 799,
    discountPrice: 689, // price - 4.69%
    rating: 3.65,
    category: "Sports-accessories",
    brand: "Sportsy",
    stock: 24,
    sku: "SPO-BRD-BAS-139",
    tags: ["sports equipment", "baseball"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "baseball-glove-1",
        url: "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/1.webp",
      },
      {
        public_id: "baseball-glove-2",
        url: "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/2.webp",
      },
      {
        public_id: "baseball-glove-3",
        url: "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/3.webp",
      },
    ],
    reviews: [
      {
        name: "Hazel Evans",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      {
        name: "Christopher West",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      { name: "Aubrey Garcia", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "Cricket Ball",
    description:
      "The Cricket Ball is a hard leather ball used in the sport of cricket. It is bowled and batted in the game, and its hardness and seam contribute to the dynamics of cricket play.",
    price: 590,
    discountPrice: 560, // price - 4.69%
    rating: 4.56,
    category: "Sports-accessories",
    brand: "SG Cricket",
    stock: 89,
    sku: "SPO-BRD-CRI-140",
    tags: ["sports equipment", "cricket"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "cricket-ball-1",
        url: "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-ball/1.webp",
      },
    ],
    reviews: [
      {
        name: "Siraj",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      {
        name: "Ashwin",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      { name: "Bumrah", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "Cricket Bat",
    description:
      "The Cricket Bat is an essential piece of cricket equipment used by batsmen to hit the cricket ball. It is made of wood and comes in various sizes and designs",
    price: 789,
    discountPrice: 750, // price - 4.69%
    rating: 3.99,
    category: "Sports-accessories",
    brand: "SG Cricket",
    stock: 32,
    sku: "SPO-BRD-CRI-141",
    tags: ["sports equipment", "cricket"],
    availabilityStatus: "In Stock",
    images: [
      {
        public_id: "cricket-bat-1",
        url: "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-bat/1.webp",
      },
    ],
    reviews: [
      {
        name: "virat",
        rating: 5,
        comment: "B* Very happy with my purchase!",
      },
      {
        name: "kohli",
        rating: 5,
        comment: "Very happy with my purchase! B*",
      },
      { name: "Sharma", rating: 4, comment: "Vo is very good" },
    ],
    numOfReviews: 3,
  },
  {
    title: "",
    description: "",
    price: 1999.99,
    discountPrice: 1906.2, // price - 4.69%
    rating: 3.65,
    category: "",
    brand: "",
    stock: 24,
    sku: "",
    tags: ["", ""],
    availabilityStatus: "In Stock",
    images: [
      { public_id: "", url: "" },
      { public_id: "", url: "" },
      { public_id: "", url: "" },
    ],
    reviews: [
      {
        name: "Hazel Evans",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      {
        name: "Christopher West",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      { name: "Aubrey Garcia", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "",
    description: "",
    price: 1999.99,
    discountPrice: 1906.2, // price - 4.69%
    rating: 3.65,
    category: "",
    brand: "",
    stock: 24,
    sku: "",
    tags: ["", ""],
    availabilityStatus: "In Stock",
    images: [
      { public_id: "", url: "" },
      { public_id: "", url: "" },
      { public_id: "", url: "" },
    ],
    reviews: [
      {
        name: "Hazel Evans",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      {
        name: "Christopher West",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      { name: "Aubrey Garcia", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "",
    description: "",
    price: 1999.99,
    discountPrice: 1906.2, // price - 4.69%
    rating: 3.65,
    category: "",
    brand: "",
    stock: 24,
    sku: "",
    tags: ["", ""],
    availabilityStatus: "In Stock",
    images: [
      { public_id: "", url: "" },
      { public_id: "", url: "" },
      { public_id: "", url: "" },
    ],
    reviews: [
      {
        name: "Hazel Evans",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      {
        name: "Christopher West",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      { name: "Aubrey Garcia", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
    title: "",
    description: "",
    price: 1999.99,
    discountPrice: 1906.2, // price - 4.69%
    rating: 3.65,
    category: "",
    brand: "",
    stock: 24,
    sku: "",
    tags: ["", ""],
    availabilityStatus: "In Stock",
    images: [
      { public_id: "", url: "" },
      { public_id: "", url: "" },
      { public_id: "", url: "" },
    ],
    reviews: [
      {
        name: "Hazel Evans",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      {
        name: "Christopher West",
        rating: 5,
        comment: "Very happy with my purchase!",
      },
      { name: "Aubrey Garcia", rating: 4, comment: "Very satisfied!" },
    ],
    numOfReviews: 3,
  },
  {
  "title": "Essence Mascara Lash Princess",
  "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  "price": 799,
  "discountPrice": 689,
  "category": "Beauty",
  "brand": "Essence",
  "stock": 24,
  "sku": "BEA-ESS-ESS-001",
  "tags": ["Beauty", "Mascara"],
  "images": [
    {
      "public_id": "Essence-Mascara-Lash-Princess-1",
      "url": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
    }
  ]
},
{
  "title": "Calvin Klein Heel Shoes",
  "description": "Calvin Klein Heel Shoes are elegant and sophisticated, designed for formal occasions. With a classic design and high-quality materials, they complement your stylish ensemble.",
  "price": 4999,
  "discountPrice": 4599,
  "category": "Women-shoes",
  "brand": "Calvin Klein",
  "stock": 24,
  "sku": "WOM-CAL-CAL-186",
  "tags": ["Footwear", "Heels"],
  "images": [
    {
      "public_id": "Calvin-Klein-Heel-Shoes-1",
      "url": "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp"
    },
     {
      "public_id": "Calvin-Klein-Heel-Shoes-2",
      "url": "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/2.webp"
    },
     {
      "public_id": "Calvin-Klein-Heel-Shoes-3",
      "url": "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/3.webp"
    }
    ,
     {
      "public_id": "Calvin-Klein-Heel-Shoes-4",
      "url": "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/4.webp"
    }
  ]
}

];

// Seeder function
const seedProducts = async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
