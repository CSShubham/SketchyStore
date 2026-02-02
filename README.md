# 🛍️ SketchyStore - Full Stack eCommerce Platform

<div align="center">

![SketchyStore Logo](public/Mascot.jpeg)

**A modern, full-stack eCommerce application built with the MERN stack**

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.19.0-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-success.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.22.1-lightgrey.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)
- [Support](#-support)

---

## 🎯 About

**SketchyStore** is a full-featured eCommerce platform that provides a seamless online shopping experience. Built with modern web technologies, it offers a robust backend API and an intuitive, responsive frontend interface.

### Why SketchyStore?

- 🚀 **Modern Stack**: Built with React 19, Node.js 20, and MongoDB 7
- 🎨 **Beautiful UI**: Responsive design with Tailwind CSS
- 🔒 **Secure**: JWT authentication and bcrypt password hashing
- 📱 **Mobile-First**: Optimized for all devices
- ⚡ **Fast**: Vite build tool and optimized backend
- 🛠️ **Maintainable**: Clean code architecture and comprehensive documentation

---

## ✨ Features

### 🛍️ Customer Features

#### Product Management
- ✅ Browse products with advanced filtering and sorting
- ✅ Search products by name, category, or brand
- ✅ View detailed product information with image carousel
- ✅ Read and write product reviews with star ratings
- ✅ Filter by categories and price ranges
- ✅ Sort by price, rating, discount, and name

#### Shopping Experience
- ✅ Add products to shopping cart
- ✅ Update cart quantities and remove items
- ✅ Save favorite products to wishlist
- ✅ Persistent cart across sessions
- ✅ Real-time cart updates

#### Checkout & Orders
- ✅ Streamlined checkout process
- ✅ Multiple payment methods (COD, Card, UPI)
- ✅ Multiple delivery address management
- ✅ Order tracking with status updates
- ✅ Order history and details
- ✅ Email notifications (planned)

#### User Management
- ✅ Secure user registration and login
- ✅ JWT-based authentication
- ✅ User profile management
- ✅ Multiple shipping addresses
- ✅ Multiple contact numbers
- ✅ Password encryption with bcrypt

### 👨‍💼 Admin Features

- ✅ Product CRUD operations
- ✅ Inventory management
- ✅ Order management
- ✅ Order status updates
- ✅ Sales analytics
- ✅ User management

### 🎨 UI/UX Features

- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Smooth animations with Lottie
- ✅ Toast notifications for user feedback
- ✅ Loading states and skeletons
- ✅ Empty state illustrations
- ✅ Intuitive navigation

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Library |
| Redux Toolkit | 2.11.2 | State Management |
| React Router | 7.12.0 | Routing |
| Tailwind CSS | 4.1.18 | Styling |
| Vite | 7.2.4 | Build Tool |
| Axios | 1.13.2 | HTTP Client |
| Lottie React | 2.4.1 | Animations |
| Lucide React | 0.562.0 | Icons |
| React Toastify | 11.0.5 | Notifications |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.19.0+ | Runtime |
| Express.js | 4.22.1 | Web Framework |
| MongoDB | 7.0+ | Database |
| Mongoose | 9.1.2 | ODM |
| JWT | 9.0.3 | Authentication |
| bcryptjs | 3.0.3 | Password Hashing |
| CORS | 2.8.5 | Cross-Origin Resource Sharing |
| Morgan | 1.10.1 | HTTP Logger |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   React    │  │  Redux     │  │  React     │            │
│  │   Pages    │  │  Store     │  │  Router    │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│         │              │                │                    │
│         └──────────────┴────────────────┘                    │
│                        │                                     │
│                   Axios HTTP                                 │
│                        │                                     │
└────────────────────────┼─────────────────────────────────────┘
                         │
                    REST API
                         │
┌────────────────────────┼─────────────────────────────────────┐
│                  Server Layer                                │
│                        │                                     │
│         ┌──────────────┴──────────────┐                     │
│         │                              │                     │
│    ┌────▼────┐                   ┌────▼────┐               │
│    │ Express │                   │  Auth   │               │
│    │ Routes  │                   │  JWT    │               │
│    └────┬────┘                   └────┬────┘               │
│         │                              │                     │
│    ┌────▼─────────────────────────────▼────┐               │
│    │          Controllers                   │               │
│    │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │               │
│    │  │ Auth │ │ Cart │ │Order │ │ User │ │               │
│    │  └──────┘ └──────┘ └──────┘ └──────┘ │               │
│    └────────────────┬───────────────────────┘               │
│                     │                                        │
│              ┌──────▼──────┐                                │
│              │  Mongoose   │                                │
│              │   Models    │                                │
│              └──────┬──────┘                                │
└─────────────────────┼───────────────────────────────────────┘
                      │
                 ┌────▼────┐
                 │ MongoDB │
                 │Database │
                 └─────────┘
```

### Data Flow

1. **User Action** → React Component triggers action
2. **Redux Action** → Dispatched to Redux store
3. **API Call** → Axios sends HTTP request to backend
4. **Backend Processing** → Express routes handle request
5. **Database Query** → Mongoose interacts with MongoDB
6. **Response** → Data flows back through the stack
7. **UI Update** → React re-renders with new data

---

## 📁 Project Structure

```
SketchyStore/
├── Backend/                      # Backend API
│   ├── config/                   # Configuration files
│   │   └── db.js                # Database connection
│   ├── controllers/              # Request handlers
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   ├── profileController.js
│   │   └── wishlistController.js
│   ├── middlewares/              # Custom middlewares
│   │   └── auth.js              # Authentication middleware
│   ├── models/                   # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   └── Wishlist.js
│   ├── routes/                   # API routes
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── profileRoutes.js
│   │   └── wishlistRoutes.js
│   ├── utils/                    # Utility functions
│   │   └── apiFeatures.js       # Search, filter, pagination
│   ├── .env                      # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── README.md                 # Backend documentation
│   └── server.js                 # Entry point
│
├── Frontend/                     # React frontend
│   ├── public/                   # Static assets
│   │   └── Mascot.jpeg
│   ├── src/
│   │   ├── api/                  # API configuration
│   │   │   └── index.js         # Axios setup
│   │   ├── assets/              # Images, animations
│   │   ├── components/          # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ImageCarousel.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ...
│   │   ├── layout/              # Layout components
│   │   │   └── MainLayout.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   └── ...
│   │   ├── routes/              # Route protection
│   │   │   └── Privateroutes.jsx
│   │   ├── services/            # API services
│   │   │   └── profileAPIs.js
│   │   ├── slice/               # Redux slices
│   │   │   ├── AuthSlice.js
│   │   │   ├── CartSlice.js
│   │   │   ├── OrderSlice.js
│   │   │   ├── ProductSlice.js
│   │   │   ├── ProfileSlice.js
│   │   │   └── Wishlist.js
│   │   ├── store/               # Redux store
│   │   │   └── Store.js
│   │   ├── App.jsx              # Root component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── .env                      # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── README.md                 # Frontend documentation
│   ├── vite.config.js
│   └── index.html
│
├── .gitignore                    # Root gitignore
├── LICENSE                       # MIT License
└── README.md                     # This file
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js**: v20.19.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **MongoDB**: v7.0 or higher ([Download](https://www.mongodb.com/try/download/community))
- **Git**: Latest version ([Download](https://git-scm.com/))

### Optional Tools

- **MongoDB Compass**: GUI for MongoDB ([Download](https://www.mongodb.com/products/compass))
- **Postman**: API testing ([Download](https://www.postman.com/))
- **VS Code**: Recommended code editor ([Download](https://code.visualstudio.com/))

### Verify Installation

```bash
# Check Node.js version
node --version  # Should be v20.19.0 or higher

# Check npm version
npm --version   # Should be v9.0.0 or higher

# Check MongoDB version
mongod --version # Should be v7.0 or higher

# Check Git version
git --version
```

---

## ⚡ Quick Start

Get the project up and running in 5 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/CSShubham/SketchyStore.git
cd SketchyStore

# 2. Setup Backend
cd Backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev

# 3. Setup Frontend (in a new terminal)
cd ../Frontend
npm install
cp .env.example .env
# Edit .env with your backend API URL
npm run dev

# 4. Open browser
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/CSShubham/SketchyStore.git
cd SketchyStore
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your credentials
nano .env  # or use your preferred editor
```

**Backend Environment Variables:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/SketchyStore
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/SketchyStore

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long

# CORS
FRONTEND_URL=http://localhost:5173
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd Frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file
nano .env  # or use your preferred editor
```

**Frontend Environment Variables:**

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Database Setup

#### Option A: Local MongoDB

```bash
# Start MongoDB service
# On macOS/Linux:
sudo systemctl start mongod

# On Windows:
net start MongoDB

# Verify MongoDB is running
mongo --eval "db.version()"
```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Add to `MONGO_URI` in backend `.env`

---

## 🏃‍♂️ Running the Application

### Development Mode

#### Option 1: Run Separately (Recommended for Development)

```bash
# Terminal 1 - Backend
cd Backend
npm run dev
# Backend runs on http://localhost:5000

# Terminal 2 - Frontend
cd Frontend
npm run dev
# Frontend runs on http://localhost:5173
```

#### Option 2: Using Concurrently (Optional)

Install concurrently in the root directory:

```bash
# In root directory
npm install -g concurrently

# Create a package.json in root with:
{
  "scripts": {
    "dev": "concurrently \"cd Backend && npm run dev\" \"cd Frontend && npm run dev\"",
    "install-all": "cd Backend && npm install && cd ../Frontend && npm install"
  }
}

# Run both servers
npm run dev
```

### Production Mode

#### Backend

```bash
cd Backend
npm start
```

#### Frontend

```bash
cd Frontend
npm run build
npm run preview
```

---

## 🌐 Environment Setup

### Development Environment

**Backend (.env):**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/SketchyStore
JWT_SECRET=dev_secret_key_change_in_production
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

### Production Environment

**Backend (.env):**
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/SketchyStore
JWT_SECRET=production_secret_key_at_least_32_characters_long
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend (.env):**
```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | User login | No |
| GET | `/auth/me` | Get current user | Yes |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get product by ID | No |
| GET | `/products/category/:category` | Get products by category | No |
| GET | `/products/categories` | Get all categories | No |
| POST | `/products` | Create product | Yes (Admin) |
| PUT | `/products/:id` | Update product | Yes (Admin) |
| DELETE | `/products/:id` | Delete product | Yes (Admin) |
| POST | `/products/:id/review` | Add review | Yes |

### Cart Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/cart` | Get user cart | Yes |
| POST | `/cart/add` | Add to cart | Yes |
| PUT | `/cart/update` | Update cart item | Yes |
| DELETE | `/cart/remove/:productId` | Remove from cart | Yes |

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/order/new` | Create order | Yes |
| GET | `/order/me` | Get user orders | Yes |
| GET | `/order/:id` | Get order details | Yes |
| GET | `/order/admin/all` | Get all orders | Yes (Admin) |
| PUT | `/order/admin/update/:id` | Update order status | Yes (Admin) |

### Wishlist Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/wishlist` | Get user wishlist | Yes |
| POST | `/wishlist/add` | Add to wishlist | Yes |
| DELETE | `/wishlist/remove/:productId` | Remove from wishlist | Yes |

### Profile Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile` | Get user profile | Yes |
| PUT | `/profile/name` | Update name | Yes |
| POST | `/profile/phone` | Add phone | Yes |
| DELETE | `/profile/phone/:phoneId` | Delete phone | Yes |
| POST | `/profile/address` | Add address | Yes |
| DELETE | `/profile/address/:addressId` | Delete address | Yes |
| PUT | `/profile/address/:addressId/default` | Set default address | Yes |

**📖 Full API Documentation:** See [Backend README](Backend/README.md)

---

## 📸 Screenshots

### Landing Page
![Landing Page](screenshots/landing.png)

### Product Catalog
![Product Catalog](screenshots/products.png)

### Product Details
![Product Details](screenshots/product-detail.png)

### Shopping Cart
![Shopping Cart](screenshots/cart.png)

### Checkout
![Checkout](screenshots/checkout.png)

### Order Tracking
![Order Tracking](screenshots/orders.png)

### User Profile
![User Profile](screenshots/profile.png)

---

## 🧪 Testing

### Backend Testing

```bash
cd Backend

# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Frontend Testing

```bash
cd Frontend

# Install testing dependencies
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

---

## 🚀 Deployment

### Backend Deployment

#### Deploy to Heroku

```bash
cd Backend

# Login to Heroku
heroku login

# Create app
heroku create SketchyStore-api

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

#### Deploy to Railway

```bash
cd Backend

# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Deploy to Render

1. Connect GitHub repository
2. Select "Web Service"
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables in dashboard

### Frontend Deployment

#### Deploy to Vercel

```bash
cd Frontend

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add VITE_API_URL
```

#### Deploy to Netlify

```bash
cd Frontend

# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

**📖 Detailed Deployment Guide:** See individual READMEs in [Backend](Backend/README.md) and [Frontend](Frontend/README.md)

---

## 🗺️ Roadmap

### Phase 1: Core Features (Completed ✅)
- [x] User authentication and authorization
- [x] Product catalog with CRUD operations
- [x] Shopping cart functionality
- [x] Wishlist feature
- [x] Order management
- [x] User profile management

### Phase 2: Enhanced Features (In Progress 🚧)
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Email notifications
- [ ] Product search with autocomplete
- [ ] Product recommendations
- [ ] Advanced analytics dashboard

### Phase 3: Advanced Features (Planned 📅)
- [ ] Real-time order tracking
- [ ] Live chat support
- [ ] Multi-language support (i18n)
- [ ] Dark mode
- [ ] Progressive Web App (PWA)
- [ ] Social media integration
- [ ] Product comparison feature
- [ ] Inventory alerts for low stock

### Phase 4: Scaling (Future 🔮)
- [ ] Microservices architecture
- [ ] Redis caching
- [ ] GraphQL API
- [ ] Mobile app (React Native)
- [ ] Admin mobile app
- [ ] Seller dashboard

---

## 🤝 Contributing

We love contributions! Here's how you can help:

### Getting Started

1. **Fork the repository**
   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/CSShubham/SketchyStore.git
   cd SketchyStore
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Write clean, documented code
   - Follow the existing code style
   - Test your changes

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: amazing feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

### Contribution Guidelines

#### Code Style
- Use meaningful variable and function names
- Write comments for complex logic
- Follow ESLint rules (Frontend)
- Use consistent formatting

#### Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Be descriptive but concise
- Reference issues when applicable

**Format:**
```
Type: Brief description

Detailed explanation (if needed)

Fixes #issue_number
```

**Types:**
- `Add:` New feature
- `Fix:` Bug fix
- `Update:` Changes to existing feature
- `Remove:` Removing code/files
- `Docs:` Documentation changes
- `Style:` Code style changes
- `Refactor:` Code refactoring
- `Test:` Adding tests

#### Pull Request Guidelines
- Keep PRs focused and small
- Update documentation if needed
- Add tests for new features
- Ensure all tests pass
- Link related issues

### Areas to Contribute

- 🐛 **Bug Fixes**: Fix reported issues
- ✨ **Features**: Implement new features from roadmap
- 📝 **Documentation**: Improve docs and guides
- 🎨 **UI/UX**: Enhance user interface
- 🧪 **Testing**: Add unit and integration tests
- 🌐 **Translations**: Add multi-language support
- ♿ **Accessibility**: Improve accessibility

---

## 👥 Team

### Core Team

**Shubham Raj** - *Lead Developer*
- GitHub: [@shubhamraj](https://github.com/CSShubham)
- Email: raj079097@gmail.com

### Contributors

Thanks to all the contributors who have helped make this project better!

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- Add contributors here -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

**Want to see your name here?** [Contribute to the project!](#-contributing)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

✅ Commercial use  
✅ Modification  
✅ Distribution  
✅ Private use  

❌ Liability  
❌ Warranty  

---

## 💬 Support

### Get Help

- 📧 **Email**: raj079097@gmail.com
- 💬 **Discord**: [Join our community](https://discord.gg/SketchyStore)
- 🐦 **Twitter**: [@SketchyStore](https://twitter.com/SketchyStore)
- 📖 **Documentation**: [Wiki](https://github.com/CSShubham/SketchyStore/wiki)

### Report Issues

Found a bug? [Open an issue](https://github.com/CSShubham/SketchyStore/issues/new/choose)

**Before reporting:**
1. Check if the issue already exists
2. Use the issue template
3. Provide detailed information
4. Include screenshots/logs if applicable

### Request Features

Have an idea? [Request a feature](https://github.com/CSShubham/SketchyStore/issues/new?labels=enhancement)

---

## 🙏 Acknowledgments

### Technologies
- **MongoDB** - Flexible NoSQL database
- **Express.js** - Fast web framework
- **React** - Powerful UI library
- **Node.js** - JavaScript runtime
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Next generation build tool

### Libraries & Tools
- **Mongoose** - MongoDB ODM
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **Axios** - HTTP client
- **Lottie** - Beautiful animations
- **Lucide** - Icon library

### Inspiration
- **Amazon** - eCommerce best practices
- **Shopify** - Store management features
- **Flipkart** - User interface inspiration

### Special Thanks
- Open source community
- Stack Overflow community
- MDN Web Docs
- All contributors and supporters

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/CSShubham/SketchyStore?style=social)
![GitHub forks](https://img.shields.io/github/forks/CSShubham/SketchyStore?style=social)
![GitHub issues](https://img.shields.io/github/issues/CSShubham/SketchyStore)
![GitHub pull requests](https://img.shields.io/github/issues-pr/CSShubham/SketchyStore)

---

## 🔗 Links

### Documentation
- [Backend Documentation](Backend/README.md)
- [Frontend Documentation](Frontend/README.md)
- [API Documentation](#-api-documentation)
- [Contributing Guide](#-contributing)

### Live Demo
- **Frontend**: [https://SketchyStore.vercel.app](https://sketchystore-frontend.vercel.app)
- **Backend**: [https://SketchyStore-api.herokuapp.com](https://api-node-sketchystore.onrender.com)
<!-- - **API Docs**: [https://SketchyStore-api.herokuapp.com/api-docs](https://SketchyStore-api.herokuapp.com/api-docs) -->

### Social
- **GitHub**: [github.com/CSShubham/SketchyStore](https://github.com/CSShubham/SketchyStore)
- **Website**: [www.SketchyStore.com](https://sketchystore-frontend.vercel.app)

---

## ⭐ Show Your Support

If you find this project helpful, please consider:

- ⭐ **Star this repository**
- 🍴 **Fork the project**
- 📢 **Share with others**
- 🐛 **Report bugs**
- 💡 **Suggest features**
- 🤝 **Contribute code**

---

## 📈 Project Status

**Status**: 🟢 Active Development

**Current Version**: 1.0.0

**Last Updated**: February 2026

---

<div align="center">

### Built with ❤️ by [Shubham Raj](https://github.com/CSShubham)

**⭐ Star this repo if you find it useful! ⭐**

[Report Bug](https://github.com/CSShubham/SketchyStore/issues) • [Request Feature](https://github.com/CSShubham/SketchyStore/issues) • [Contribute](https://github.com/CSShubham/SketchyStore/pulls)

</div>

---

**Happy Coding! 🚀**