# SketchyStore Backend API

A robust and scalable REST API for an eCommerce platform built with Node.js, Express, and MongoDB. This backend provides comprehensive features for product management, user authentication, shopping cart, orders, and wishlist functionality.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Products](#products)
  - [Cart](#cart)
  - [Orders](#orders)
  - [Wishlist](#wishlist)
  - [User Profile](#user-profile)
- [Data Models](#data-models)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Security Features](#security-features)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### User Management
- 🔐 JWT-based authentication
- 👤 User registration and login
- 🔒 Password encryption with bcrypt
- 📱 Multiple phone number support
- 📍 Multiple address management
- ✏️ Profile management

### Product Management
- 📦 Complete CRUD operations for products
- 🔍 Advanced search with text indexing
- 🏷️ Category-based filtering
- ⭐ Product ratings and reviews
- 📊 Stock management
- 💰 Dynamic pricing with discounts

### Shopping Experience
- 🛒 Shopping cart functionality
- ❤️ Wishlist management
- 📝 Order creation and tracking
- 💳 Multiple payment methods (COD, CARD, UPI)
- 📦 Order status tracking
- 📧 Order history

### Admin Features
- 👨‍💼 Role-based access control
- 📊 Product inventory management
- 📦 Order management and status updates
- 📈 Sales tracking

---

## 🛠 Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **CORS:** CORS middleware
- **Logging:** Morgan
- **Environment Variables:** dotenv

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v20.19.0 or higher)
- MongoDB (v7.0 or higher)
- npm or yarn package manager
- Git (for cloning the repository)

---

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CSShubham/SketchyStore.git
   cd SketchyStore/Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the Backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/sketchystore

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# CORS Origins (comma-separated)
FRONTEND_URL=http://localhost:5173
```

### Environment Variables Description

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Port number for the server | No | 5000 |
| `NODE_ENV` | Environment (development/production) | No | development |
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT token generation | Yes | - |
| `FRONTEND_URL` | Frontend application URL for CORS | Yes | - |

---

## 📁 Project Structure

```
Backend/
├── config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── cartController.js     # Cart operations
│   ├── orderController.js    # Order management
│   ├── productController.js  # Product CRUD operations
│   ├── profileController.js  # User profile management
│   └── wishlistController.js # Wishlist operations
├── middlewares/
│   └── auth.js              # Authentication & authorization middleware
├── models/
│   ├── Cart.js              # Cart schema
│   ├── Order.js             # Order schema
│   ├── Product.js           # Product schema
│   ├── User.js              # User schema
│   └── Wishlist.js          # Wishlist schema
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── cartRoutes.js        # Cart routes
│   ├── orderRoutes.js       # Order routes
│   ├── productRoutes.js     # Product routes
│   ├── profileRoutes.js     # Profile routes
│   └── wishlistRoutes.js    # Wishlist routes
├── utils/
│   └── apiFeatures.js       # API utilities (search, filter, pagination)
├── .env                     # Environment variables (not in repo)
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
├── package-lock.json       # Locked dependencies
└── server.js               # Application entry point
```

---

## 📚 API Documentation

Base URL: `http://localhost:5000/api`

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

### Products

#### Get All Products
```http
GET /api/products?keyword=laptop&category=electronics&page=1&limit=10&sort=-rating
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `keyword` | string | Search term for products |
| `category` | string | Filter by category |
| `page` | number | Page number for pagination |
| `limit` | number | Items per page |
| `sort` | string | Sort field (prefix with `-` for descending) |
| `price[gte]` | number | Minimum price filter |
| `price[lte]` | number | Maximum price filter |
| `rating[gte]` | number | Minimum rating filter |

**Response:**
```json
{
  "success": true,
  "count": 10,
  "totalCount": 45,
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Laptop Pro 15",
      "description": "High-performance laptop...",
      "price": 1299.99,
      "discountPrice": 1199.99,
      "rating": 4.5,
      "category": "electronics",
      "brand": "TechBrand",
      "stock": 50,
      "images": [
        {
          "public_id": "image123",
          "url": "https://example.com/image.jpg"
        }
      ],
      "availabilityStatus": "In Stock",
      "numOfReviews": 25,
      "reviews": []
    }
  ]
}
```

#### Get Product by ID
```http
GET /api/products/:id
```

#### Get Products by Category
```http
GET /api/products/category/:category
```

#### Get All Categories
```http
GET /api/products/categories
```

**Response:**
```json
{
  "success": true,
  "categories": [
    "electronics",
    "clothing",
    "books",
    "home",
    "sports"
  ]
}
```

#### Create Product (Admin Only)
```http
POST /api/products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with 6 buttons",
  "price": 29.99,
  "discountPrice": 24.99,
  "category": "electronics",
  "brand": "TechBrand",
  "stock": 100,
  "sku": "WM-001",
  "tags": ["wireless", "mouse", "ergonomic"],
  "images": [
    {
      "public_id": "img123",
      "url": "https://example.com/mouse.jpg"
    }
  ]
}
```

#### Update Product (Admin Only)
```http
PUT /api/products/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "stock": 75,
  "price": 27.99
}
```

#### Delete Product (Admin Only)
```http
DELETE /api/products/:id
Authorization: Bearer <admin-token>
```

#### Create/Update Product Review
```http
POST /api/products/:id/review
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent product! Highly recommended."
}
```

---

### Cart

#### Get User Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "cart": {
    "_id": "507f1f77bcf86cd799439011",
    "user": "507f1f77bcf86cd799439012",
    "items": [
      {
        "product": {
          "_id": "507f1f77bcf86cd799439013",
          "title": "Wireless Mouse",
          "price": 29.99,
          "images": [...]
        },
        "quantity": 2
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

#### Add to Cart
```http
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439013",
  "quantity": 2
}
```

#### Update Cart Item
```http
PUT /api/cart/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439013",
  "quantity": 3
}
```

#### Remove from Cart
```http
DELETE /api/cart/remove/:productId
Authorization: Bearer <token>
```

---

### Orders

#### Create Order
```http
POST /api/order/new
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderItems": [
    {
      "product": "507f1f77bcf86cd799439013",
      "name": "Wireless Mouse",
      "price": 29.99,
      "quantity": 2,
      "image": "https://example.com/mouse.jpg"
    }
  ],
  "shippingInfo": {
    "name": "John Doe",
    "phone": "1234567890",
    "addressLine1": "123 Main St",
    "addressLine2": "Apt 4B",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "pinCode": "10001"
  },
  "paymentMethod": "COD",
  "paymentInfo": {
    "id": "",
    "status": "PENDING"
  },
  "itemsPrice": 59.98,
  "shippingPrice": 5.00,
  "totalPrice": 64.98
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "orderId": "ORD-1705318200000-456",
    "_id": "507f1f77bcf86cd799439014",
    "user": "507f1f77bcf86cd799439012",
    "orderItems": [...],
    "shippingInfo": {...},
    "paymentMethod": "COD",
    "itemsPrice": 59.98,
    "shippingPrice": 5.00,
    "totalPrice": 64.98,
    "orderStatus": "Processing",
    "createdAt": "2024-01-15T12:30:00.000Z"
  }
}
```

#### Get My Orders
```http
GET /api/order/me
Authorization: Bearer <token>
```

#### Get Single Order
```http
GET /api/order/:id
Authorization: Bearer <token>
```

#### Get All Orders (Admin Only)
```http
GET /api/order/admin/all
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "totalAmount": 12450.50,
  "count": 145,
  "orders": [...]
}
```

#### Update Order Status (Admin Only)
```http
PUT /api/order/admin/update/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "Shipped"
}
```

**Order Status Values:**
- `Processing`
- `Shipped`
- `Delivered`

---

### Wishlist

#### Get User Wishlist
```http
GET /api/wishlist
Authorization: Bearer <token>
```

#### Add to Wishlist
```http
POST /api/wishlist/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439013"
}
```

#### Remove from Wishlist
```http
DELETE /api/wishlist/remove/:productId
Authorization: Bearer <token>
```

---

### User Profile

#### Get Profile
```http
GET /api/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "phones": [
      {
        "_id": "507f1f77bcf86cd799439015",
        "number": "1234567890",
        "isPrimary": true
      }
    ],
    "addresses": [
      {
        "_id": "507f1f77bcf86cd799439016",
        "label": "Home",
        "line1": "123 Main St",
        "line2": "Apt 4B",
        "city": "New York",
        "state": "NY",
        "pincode": "10001",
        "country": "India",
        "isDefault": true
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Name
```http
PUT /api/profile/name
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith"
}
```

#### Add Phone Number
```http
POST /api/profile/phone
Authorization: Bearer <token>
Content-Type: application/json

{
  "number": "9876543210"
}
```

#### Delete Phone Number
```http
DELETE /api/profile/phone/:phoneId
Authorization: Bearer <token>
```

#### Add Address
```http
POST /api/profile/address
Authorization: Bearer <token>
Content-Type: application/json

{
  "label": "Office",
  "line1": "456 Business Ave",
  "line2": "Suite 200",
  "city": "Los Angeles",
  "state": "CA",
  "pincode": "90001",
  "country": "USA"
}
```

#### Delete Address
```http
DELETE /api/profile/address/:addressId
Authorization: Bearer <token>
```

#### Set Default Address
```http
PUT /api/profile/address/:addressId/default
Authorization: Bearer <token>
```

---

## 🗄️ Data Models

### User Model

```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, immutable),
  password: String (required, min 6 chars, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  avatar: {
    public_id: String,
    url: String
  },
  phones: [{
    number: String,
    isPrimary: Boolean (default: false)
  }],
  addresses: [{
    label: String (default: 'Home'),
    line1: String (required),
    line2: String,
    city: String (required),
    state: String (required),
    pincode: String (required),
    country: String (default: 'India'),
    isDefault: Boolean (default: false)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model

```javascript
{
  title: String (required, max 100 chars),
  description: String (required, max 2000 chars),
  price: Number (required, min 0),
  discountPrice: Number (default: 0, min 0),
  rating: Number (min 0, max 5, default: 0),
  category: String (required),
  brand: String,
  stock: Number (required, default: 0, min 0),
  sku: String (unique, required),
  tags: [String],
  availabilityStatus: String (enum: ['In Stock', 'Out of Stock']),
  images: [{
    public_id: String,
    url: String
  }],
  reviews: [{
    user: ObjectId (ref: 'User'),
    name: String,
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  numOfReviews: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model

```javascript
{
  orderId: String (unique, required),
  user: ObjectId (ref: 'User', required),
  orderItems: [{
    product: ObjectId (ref: 'Product', required),
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  shippingInfo: {
    name: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    country: String,
    pinCode: String
  },
  paymentMethod: String (enum: ['COD', 'CARD', 'UPI'], default: 'COD'),
  paymentInfo: {
    id: String,
    status: String (default: 'PENDING')
  },
  itemsPrice: Number (required),
  shippingPrice: Number (required),
  totalPrice: Number (required),
  orderStatus: String (enum: ['Processing', 'Shipped', 'Delivered']),
  paidAt: Date,
  deliveredAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Model

```javascript
{
  user: ObjectId (ref: 'User', unique, required),
  items: [{
    product: ObjectId (ref: 'Product', required),
    quantity: Number (required, min 1, default: 1)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Wishlist Model

```javascript
{
  user: ObjectId (ref: 'User', unique, required),
  items: [{
    product: ObjectId (ref: 'Product', required)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Middleware

### Authentication Middleware (`isAuthenticatedUser`)

Verifies JWT token and attaches user to request object.

```javascript
// Usage in routes
router.get('/protected', isAuthenticatedUser, controller);
```

### Authorization Middleware (`authorizeRoles`)

Restricts access to specific user roles.

```javascript
// Usage in routes
router.post('/admin/product', isAuthenticatedUser, authorizeRoles('admin'), createProduct);
```

---

## ⚠️ Error Handling

### Error Response Format

```json
{
  "success": false,
  "message": "Error description here"
}
```

### Common Error Codes

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## 🔐 Security Features

1. **Password Hashing**: All passwords are hashed using bcryptjs before storage
2. **JWT Authentication**: Secure token-based authentication with 7-day expiry
3. **CORS Protection**: Configured allowed origins
4. **Input Validation**: Mongoose schema validation
5. **Role-Based Access Control**: Admin and user role separation
6. **Immutable Email**: Prevents email changes after registration
7. **Stock Verification**: Prevents orders when stock is insufficient

---

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Uses nodemon for automatic server restart on file changes.

### Production Mode
```bash
npm start
```

---

## 🧪 Testing

### Manual Testing with Postman

1. Import the API collection (if provided)
2. Set environment variables:
   - `base_url`: http://localhost:5000
   - `token`: JWT token after login

### Testing Workflow

1. **Register a user**
2. **Login to get JWT token**
3. **Create products (as admin)**
4. **Browse products**
5. **Add to cart**
6. **Create an order**
7. **Check order status**

---

## 📦 Deployment

### Deploying to Render

1. Connect your GitHub repository
2. Select "Web Service"
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables in dashboard

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string and update `MONGO_URI`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- Use ES6+ syntax
- Follow consistent naming conventions
- Add comments for complex logic
- Keep functions small and focused
- Handle errors appropriately

---

## 📝 API Rate Limiting (Future Enhancement)

Consider implementing rate limiting for production:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 🔄 Versioning

Current Version: **1.0.0**

### Version History

- **1.0.0** - Initial release with core features

---

## 📧 Support

For support and queries:
- Email: raj079097@gmail.com
- Issues: [GitHub Issues](https://github.com/CSShubham/SketchyStore/issues)

---

## 👨‍💻 Author

**Shubham Raj**

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- MongoDB team for the powerful database
- All contributors and supporters

---

## 📊 Project Statistics

- **Total Routes**: 30+
- **Models**: 5
- **Controllers**: 6
- **Middleware**: 2
- **Dependencies**: 7 core packages

---

## 🗺️ Roadmap

- [ ] Add payment gateway integration (Stripe/Razorpay)
- [ ] Implement email notifications
- [ ] Add product image upload with Cloudinary
- [ ] Implement advanced analytics
- [ ] Add product recommendations
- [ ] Implement caching with Redis
- [ ] Add GraphQL support
- [ ] Implement real-time order tracking
- [ ] Add unit and integration tests
- [ ] Implement API versioning

---

## 📱 Frontend Integration

This backend is designed to work with the SketchyStore frontend application. Make sure to:

1. Update CORS origins in `server.js`
2. Ensure frontend uses correct base URL
3. Handle JWT token storage in frontend
4. Implement proper error handling

---

## 💡 Tips & Best Practices

1. **Always validate user input** before processing
2. **Use transactions** for critical operations (orders, payments)
3. **Implement logging** for debugging and monitoring
4. **Keep secrets secure** - never commit .env files
5. **Regular backups** of your database
6. **Monitor API performance** and optimize slow queries
7. **Keep dependencies updated** for security patches

---

## 🐛 Known Issues

Currently, there are no known issues. Please report any bugs through GitHub Issues.

---

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)

---

**Happy Coding! 🚀**