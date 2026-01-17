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
    discountPrice: 1906.20, // price - 4.69%
    rating: 3.65,
    category: "laptops",
    brand: "Apple",
    stock: 24,
    sku: "LAP-APP-APP-078",
    tags: ["laptops", "apple"],
    availabilityStatus: "In Stock",
    images: [
      { public_id: "macbook14-1", url: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp" },
      { public_id: "macbook14-2", url: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp" },
      { public_id: "macbook14-3", url: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/3.webp" }
    ],
    reviews: [
      { name: "Hazel Evans", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Christopher West", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Aubrey Garcia", rating: 4, comment: "Very satisfied!" }
    ],
    numOfReviews: 3
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
      { public_id: "shirt-1", url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp" },
      { public_id: "shirt-2", url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/2.webp" },
      { public_id: "shirt-3", url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/3.webp" },
      { public_id: "shirt-4", url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/4.webp" }
    ],
    reviews: [
      { name: "Logan Lee", rating: 1, comment: "Waste of money!" },
      { name: "Zachary Lee", rating: 5, comment: "Very satisfied!" },
      { name: "Aurora Rodriguez", rating: 4, comment: "Fast shipping!" }
    ],
    numOfReviews: 3
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
      { public_id: "frock-1", url: "https://cdn.dummyjson.com/product-images/tops/blue-frock/1.webp" },
      { public_id: "frock-2", url: "https://cdn.dummyjson.com/product-images/tops/blue-frock/2.webp" },
      { public_id: "frock-3", url: "https://cdn.dummyjson.com/product-images/tops/blue-frock/3.webp" },
      { public_id: "frock-4", url: "https://cdn.dummyjson.com/product-images/tops/blue-frock/4.webp" }
    ],
    reviews: [
      { name: "Victoria McDonald", rating: 4, comment: "Great product!" },
      { name: "Benjamin Foster", rating: 4, comment: "Fast shipping!" },
      { name: "Addison Ward", rating: 4, comment: "Would buy again!" }
    ],
    numOfReviews: 3
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
      { public_id: "ipadmini-1", url: "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/1.webp" },
      { public_id: "ipadmini-2", url: "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/2.webp" },
      { public_id: "ipadmini-3", url: "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/3.webp" },
      { public_id: "ipadmini-4", url: "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/4.webp" }
    ],
    reviews: [
      { name: "Eleanor Collins", rating: 4, comment: "Highly impressed!" },
      { name: "Leo Rivera", rating: 5, comment: "Very happy with my purchase!" },
      { name: "Carter Rivera", rating: 4, comment: "Would buy again!" }
    ],
    numOfReviews: 3
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
      { public_id: "jordan-1", url: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp" },
      { public_id: "jordan-2", url: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/2.webp" },
      { public_id: "jordan-3", url: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/3.webp" },
      { public_id: "jordan-4", url: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/4.webp" }
    ],
    reviews: [
      { name: "Elena Long", rating: 5, comment: "Highly impressed!" },
      { name: "Addison Wright", rating: 4, comment: "Very happy with my purchase!" },
      { name: "Mason Wright", rating: 1, comment: "Waste of money!" }
    ],
    numOfReviews: 3
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
      { public_id: "iphone5s-1", url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/1.webp" },
      { public_id: "iphone5s-2", url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/2.webp" },
      { public_id: "iphone5s-3", url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "iphone6-1", url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/1.webp" },
      { public_id: "iphone6-2", url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/2.webp" },
      { public_id: "iphone6-3", url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "iphone13pro-1", url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp" },
      { public_id: "iphone13pro-2", url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/2.webp" },
      { public_id: "iphone13pro-3", url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/3.webp" },
      { public_id: "iphone13pro-4", url: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/4.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "s8-1", url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/1.webp" },
      { public_id: "s8-2", url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/2.webp" },
      { public_id: "s8-3", url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "s21-1", url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s21/1.webp" },
      { public_id: "s21-2", url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s21/2.webp" },
      { public_id: "s21-3", url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s21/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "f19-1", url: "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19/1.webp" },
      { public_id: "f19-2", url: "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19/2.webp" },
      { public_id: "f19-3", url: "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "p30-1", url: "https://cdn.dummyjson.com/product-images/smartphones/huawei-p30/1.webp" },
      { public_id: "p30-2", url: "https://cdn.dummyjson.com/product-images/smartphones/huawei-p30/2.webp" },
      { public_id: "p30-3", url: "https://cdn.dummyjson.com/product-images/smartphones/huawei-p30/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "hot9-1", url: "https://cdn.dummyjson.com/product-images/smartphones/infinix-hot-9/1.webp" },
      { public_id: "hot9-2", url: "https://cdn.dummyjson.com/product-images/smartphones/infinix-hot-9/2.webp" },
      { public_id: "hot9-3", url: "https://cdn.dummyjson.com/product-images/smartphones/infinix-hot-9/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "note12-1", url: "https://cdn.dummyjson.com/product-images/smartphones/redmi-note-12/1.webp" },
      { public_id: "note12-2", url: "https://cdn.dummyjson.com/product-images/smartphones/redmi-note-12/2.webp" },
      { public_id: "note12-3", url: "https://cdn.dummyjson.com/product-images/smartphones/redmi-note-12/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "narzo50-1", url: "https://cdn.dummyjson.com/product-images/smartphones/realme-narzo-50/1.webp" },
      { public_id: "narzo50-2", url: "https://cdn.dummyjson.com/product-images/smartphones/realme-narzo-50/2.webp" },
      { public_id: "narzo50-3", url: "https://cdn.dummyjson.com/product-images/smartphones/realme-narzo-50/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "y20-1", url: "https://cdn.dummyjson.com/product-images/smartphones/vivo-y20/1.webp" },
      { public_id: "y20-2", url: "https://cdn.dummyjson.com/product-images/smartphones/vivo-y20/2.webp" },
      { public_id: "y20-3", url: "https://cdn.dummyjson.com/product-images/smartphones/vivo-y20/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "edge40-1", url: "https://cdn.dummyjson.com/product-images/smartphones/motorola-edge-40/1.webp" },
      { public_id: "edge40-2", url: "https://cdn.dummyjson.com/product-images/smartphones/motorola-edge-40/2.webp" },
      { public_id: "edge40-3", url: "https://cdn.dummyjson.com/product-images/smartphones/motorola-edge-40/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "11r-1", url: "https://cdn.dummyjson.com/product-images/smartphones/oneplus-11r/1.webp" },
      { public_id: "11r-2", url: "https://cdn.dummyjson.com/product-images/smartphones/oneplus-11r/2.webp" },
      { public_id: "11r-3", url: "https://cdn.dummyjson.com/product-images/smartphones/oneplus-11r/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "pixel7-1", url: "https://cdn.dummyjson.com/product-images/smartphones/google-pixel-7/1.webp" },
      { public_id: "pixel7-2", url: "https://cdn.dummyjson.com/product-images/smartphones/google-pixel-7/2.webp" },
      { public_id: "pixel7-3", url: "https://cdn.dummyjson.com/product-images/smartphones/google-pixel-7/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "rog6-1", url: "https://cdn.dummyjson.com/product-images/smartphones/asus-rog-phone-6/1.webp" },
      { public_id: "rog6-2", url: "https://cdn.dummyjson.com/product-images/smartphones/asus-rog-phone-6/2.webp" },
      { public_id: "rog6-3", url: "https://cdn.dummyjson.com/product-images/smartphones/asus-rog-phone-6/3.webp" }
    ],
    numOfReviews: 0
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
      { public_id: "g21-1", url: "https://cdn.dummyjson.com/product-images/smartphones/nokia-g21/1.webp" },
      { public_id: "g21-2", url: "https://cdn.dummyjson.com/product-images/smartphones/nokia-g21/2.webp" },
      { public_id: "g21-3", url: "https://cdn.dummyjson.com/product-images/smartphones/nokia-g21/3.webp" }
    ],
    numOfReviews: 0
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
