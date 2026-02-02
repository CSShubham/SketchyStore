# SketchyStore Frontend

A modern, responsive eCommerce web application built with React, Redux Toolkit, and Tailwind CSS. This frontend provides a seamless shopping experience with features like product browsing, cart management, wishlist, user authentication, and order tracking.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Key Features Documentation](#key-features-documentation)
  - [Authentication](#authentication)
  - [Product Browsing](#product-browsing)
  - [Shopping Cart](#shopping-cart)
  - [Wishlist](#wishlist)
  - [Checkout Process](#checkout-process)
  - [Order Management](#order-management)
  - [User Profile](#user-profile)
- [State Management](#state-management)
- [Routing](#routing)
- [Styling](#styling)
- [Components Overview](#components-overview)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Performance Optimization](#performance-optimization)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse products with advanced filtering and sorting
- **Category Navigation**: Filter products by categories
- **Product Search**: Text-based product search functionality
- **Product Details**: Detailed product pages with image carousel
- **Product Reviews**: Read and write product reviews with star ratings
- **Wishlist**: Save favorite products for later
- **Shopping Cart**: Add, update, and remove items from cart

### 👤 User Management
- **Authentication**: Secure login and registration
- **User Profile**: Manage personal information
- **Multiple Addresses**: Add and manage delivery addresses
- **Phone Numbers**: Store multiple contact numbers
- **Order History**: Track all past orders

### 📦 Order Management
- **Checkout Flow**: Streamlined checkout process
- **Multiple Payment Methods**: Support for COD, Card, and UPI
- **Order Tracking**: Real-time order status updates
- **Order Details**: View detailed order information

### 🎨 UI/UX Features
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Lottie animations for enhanced user experience
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Skeleton screens and loading indicators
- **Dark Mode Ready**: Built with Tailwind CSS for easy theming

---

## 🛠 Tech Stack

### Core Technologies
- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **Redux Toolkit 2.11.2** - State management
- **React Router DOM 7.12.0** - Client-side routing

### Styling & UI
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Lucide React 0.562.0** - Icon library
- **Lottie React 2.4.1** - Animation library

### HTTP & API
- **Axios 1.13.2** - HTTP client for API requests

### Notifications
- **React Toastify 11.0.5** - Toast notifications

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or yarn/pnpm)
- **Git**: For cloning the repository
- **Backend API**: The SketchyStore backend must be running

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/CSShubham/SketchyStore.git
cd SketchyStore/Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the Frontend directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file in the root of the Frontend directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Optional: For production
# VITE_API_URL=https://your-production-api.com/api
```

### Environment Variables Description

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API base URL | Yes | http://localhost:5000/api |

**Important Notes:**
- All Vite environment variables must be prefixed with `VITE_`
- Changes to `.env` require a dev server restart
- Never commit `.env` to version control

---

## 📁 Project Structure

```
Frontend/
├── public/                    # Static assets
│   └── Mascot.jpeg           # App mascot/logo
├── src/
│   ├── api/
│   │   └── index.js          # Axios configuration & interceptors
│   ├── assets/               # Images, animations, icons
│   │   ├── Online Shopping.json
│   │   ├── Empty Box.json
│   │   ├── No Item In Box.json
│   │   ├── Successfully done.json
│   │   └── empty ghost.json
│   ├── components/           # Reusable components
│   │   ├── AccountSidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── FrontBelow.jsx
│   │   ├── Header.jsx
│   │   ├── HomeAnimation.jsx
│   │   ├── ImageCarousel.jsx
│   │   ├── Loading.jsx
│   │   ├── Pagination.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProfileForm.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SplashLoading.jsx
│   │   └── WishlistButton.jsx
│   ├── layout/
│   │   └── MainLayout.jsx   # Main app layout wrapper
│   ├── pages/                # Page components
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── Account.jsx
│   │   ├── Cart.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── Front.jsx
│   │   ├── Home.jsx
│   │   ├── OrderDetailPage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── PaymentMethod.jsx
│   │   ├── Product.jsx
│   │   ├── ProductPage.jsx
│   │   └── WishlistPage.jsx
│   ├── routes/
│   │   └── Privateroutes.jsx # Protected route wrapper
│   ├── services/
│   │   └── profileAPIs.js    # Profile-related API calls
│   ├── slice/                # Redux slices
│   │   ├── AuthSlice.js
│   │   ├── CartSlice.js
│   │   ├── OrderSlice.js
│   │   ├── ProductAction.js
│   │   ├── ProductSlice.js
│   │   ├── ProfileSlice.js
│   │   └── Wishlist.js
│   ├── store/
│   │   └── Store.js          # Redux store configuration
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles & animations
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## 📜 Available Scripts

### Development

```bash
# Start development server
npm run dev

# Start dev server with specific port
npm run dev -- --port 3000
```

### Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint errors
npm run lint -- --fix
```

---

## 🔑 Key Features Documentation

### Authentication

#### Login
- **Route**: `/login`
- **Features**:
  - Email and password authentication
  - Password visibility toggle
  - Form validation
  - JWT token storage
  - Automatic redirect after successful login

#### Signup
- **Route**: `/signup`
- **Features**:
  - User registration with name, email, password
  - Password strength validation
  - Duplicate email check
  - Automatic login after registration

#### Protected Routes
- All shopping features require authentication
- Automatic redirect to login for unauthorized users
- Token-based session management

---

### Product Browsing

#### Home Page (`/home`)
- **Features**:
  - Grid layout of products
  - Pagination controls
  - Quick add to cart
  - Quick add to wishlist
  - Product ratings display
  - Discount badges

#### Category Filtering (`/home/category/:category`)
- **Features**:
  - Filter products by category
  - Sort options:
    - Price: Low to High / High to Low
    - Title: A → Z / Z → A
    - Discount: Low to High / High to Low
  - Category sidebar navigation

#### Product Details (`/home/:productId`)
- **Features**:
  - Image carousel
  - Product information
  - Price and discount display
  - Stock availability
  - Add to cart
  - Buy now (direct checkout)
  - Product reviews section
  - Write review functionality
  - Related product information
  - Shipping details
  - Warranty information

---

### Shopping Cart

#### Cart Page (`/cart`)
- **Features**:
  - View all cart items
  - Update item quantities
  - Remove items
  - Price calculations
  - Subtotal and shipping costs
  - Continue shopping button
  - Quick checkout
  - Empty cart state with animation

#### Cart Management
- Persistent cart (stored in backend)
- Real-time quantity updates
- Stock validation
- Price calculations
- Cart badge in header

---

### Wishlist

#### Wishlist Page (`/account/wishlist`)
- **Features**:
  - View all wishlisted items
  - Quick add to cart from wishlist
  - Remove from wishlist
  - Empty wishlist state with animation
  - Direct product navigation

#### Wishlist Functionality
- Toggle wishlist from product cards
- Heart icon indicator
- Persistent storage
- Quick access from header

---

### Checkout Process

#### Checkout Page (`/checkout/:productId`)
- **Features**:
  - **Personal Information**:
    - Name (from profile)
    - Email (from profile)
  - **Contact Selection**:
    - Choose from saved phone numbers
    - Add new phone number
  - **Delivery Address**:
    - Select from saved addresses
    - Add new address
    - Set default address
  - **Order Summary**:
    - Product details
    - Quantity adjustment
    - Price breakdown
    - Discount code input
  - **Payment Method**:
    - Cash on Delivery (COD)
    - Credit/Debit Card
    - UPI
  - Terms and conditions checkbox

#### Checkout Flow
1. Product selection (from cart or buy now)
2. Address and contact selection
3. Payment method selection
4. Order confirmation
5. Redirect to success page

---

### Order Management

#### Orders List (`/account/myorders`)
- **Features**:
  - All orders display
  - Order status indicators:
    - Processing (yellow)
    - Shipped (blue)
    - Delivered (green)
  - Order date
  - Order total
  - Quick view details
  - Empty orders state

#### Order Details (`/account/myorders/order/:id`)
- **Features**:
  - **Order Status**:
    - Visual progress bar
    - Status timeline
    - Estimated delivery
  - **Product Information**:
    - Product image
    - Name and price
    - Quantity
  - **Shipping Information**:
    - Delivery address
    - Contact details
  - **Payment Information**:
    - Payment method
    - Payment status
    - Transaction details
  - **Order Summary**:
    - Itemized pricing
    - Shipping costs
    - Total amount

#### Order Success Page (`/order-success`)
- Success animation
- Order confirmation message
- Auto-redirect to orders page
- Progress indicator

---

### User Profile

#### Profile Management (`/account`)
- **Personal Information**:
  - Update name
  - Email (read-only)
  - Profile picture display

- **Phone Numbers**:
  - Add multiple phone numbers
  - Delete phone numbers
  - Primary phone indicator

- **Addresses**:
  - Add multiple addresses
  - Address labels (Home, Work, Other)
  - Set default address
  - Delete addresses
  - Full address details (line1, line2, city, state, pincode, country)

#### Account Sidebar Navigation
- Profile
- My Orders
- Wishlist
- Payment Methods
- Logout

---

## 🔄 State Management

### Redux Store Structure

```javascript
{
  auth: {
    user: Object | null,
    token: String | null,
    loading: Boolean,
    error: String | null,
    isAuthenticated: Boolean
  },
  products: {
    items: Array,
    categoryItems: Array,
    product: Object | null,
    categories: Array,
    pagination: {
      currentPage: Number,
      totalPages: Number,
      totalItems: Number
    },
    loading: {
      products: Boolean,
      categories: Boolean,
      product: Boolean
    },
    error: String | null
  },
  cart: {
    items: Array,
    loading: Boolean
  },
  wishlist: {
    items: Array,
    loading: Boolean,
    error: String | null
  },
  order: {
    orders: Array,
    currentOrder: Object | null,
    loading: Boolean,
    error: String | null,
    success: Boolean
  },
  profile: {
    user: Object | null,
    loading: Boolean
  }
}
```

### Redux Slices

#### AuthSlice
- **Actions**:
  - `loginUser`: User login
  - `registerUser`: User registration
  - `loadUser`: Load user from token
  - `logout`: User logout

#### ProductSlice
- **Actions**:
  - `fetchAllProducts`: Get paginated products
  - `fetchProductById`: Get single product
  - `fetchProductsByCategory`: Filter by category
  - `fetchCategories`: Get all categories

#### CartSlice
- **Actions**:
  - `fetchCart`: Load user cart
  - `addToCart`: Add item to cart
  - `updateCart`: Update item quantity
  - `removeFromCart`: Remove item from cart
  - `clearCart`: Clear entire cart

#### WishlistSlice
- **Actions**:
  - `fetchWishlist`: Load user wishlist
  - `addToWishlist`: Add item to wishlist
  - `removeFromWishlist`: Remove item from wishlist
  - `clearWishlist`: Clear entire wishlist

#### OrderSlice
- **Actions**:
  - `createOrder`: Create new order
  - `fetchMyOrders`: Get user orders
  - `fetchSingleOrder`: Get order details
  - `clearOrderState`: Reset order state

#### ProfileSlice
- **Actions**:
  - `loadProfile`: Load user profile

---

## 🛣️ Routing

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/signup` - Registration page

### Protected Routes (Require Authentication)
- `/home` - Product catalog
- `/home/category/:category` - Category products
- `/home/:productId` - Product details
- `/cart` - Shopping cart
- `/checkout/:productId` - Checkout page
- `/account` - User account hub
- `/account/wishlist` - Wishlist
- `/account/myorders` - Order history
- `/account/myorders/order/:id` - Order details
- `/account/paymentmethod` - Payment methods
- `/order-success` - Order confirmation

### Mobile-Specific Routes
- `/account/mprofile` - Mobile profile
- `/account/mwishlist` - Mobile wishlist
- `/account/myorder` - Mobile orders
- `/account/mpaymentmethod` - Mobile payment methods

---

## 🎨 Styling

### Tailwind CSS Configuration

The app uses Tailwind CSS v4 with the Vite plugin for optimal performance.

#### Custom Animations

```css
/* Fade and slide in animation */
@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Fade in animation */
@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}

/* Progress bar animation */
@keyframes progressBar {
  from { width: 0% }
  to { width: 100% }
}

/* Bounce animation */
@keyframes bounceOnce {
  0% { transform: scale(0.8); opacity: 0.6; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
```

#### Color Scheme
- **Primary**: `#FF735C` (Coral/Orange)
- **Secondary**: `#ff6347` (Tomato)
- **Success**: Green shades
- **Error**: Red shades
- **Warning**: Yellow shades

#### Responsive Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

---

## 🧩 Components Overview

### Core Components

#### Header
- Navigation bar
- Logo
- Category dropdown
- Cart icon with badge
- Account link
- Mobile responsive

#### Footer
- Desktop: Links and copyright
- Mobile: Bottom navigation bar with icons

#### ProductCard
- Product image
- Title and description
- Price and discount
- Rating display
- Add to cart button
- Add to wishlist button
- Category badge

#### ImageCarousel
- Multiple image support
- Previous/Next navigation
- Dot indicators
- Touch/swipe support

#### Loading
- Splash screen loading
- Skeleton screens
- Spinner animations

#### Pagination
- Previous/Next buttons
- Page indicators
- Disabled state handling

### Form Components

#### ProfileForm
- Personal information editing
- Phone number management
- Address management
- Profile picture display

### Layout Components

#### MainLayout
- Header
- Main content area
- Footer
- Responsive container

#### AccountSidebar
- Profile navigation
- Active route highlighting
- Logout button

---

## 🔌 API Integration

### Axios Configuration

```javascript
// src/api/index.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Auto-attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

### API Endpoints Used

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

#### Products
- `GET /products` - Get all products (paginated)
- `GET /products/:id` - Get product by ID
- `GET /products/category/:category` - Get products by category
- `GET /products/categories` - Get all categories
- `POST /products/:id/review` - Submit product review

#### Cart
- `GET /cart` - Get user cart
- `POST /cart/add` - Add to cart
- `PUT /cart/update` - Update cart item
- `DELETE /cart/remove/:productId` - Remove from cart

#### Wishlist
- `GET /wishlist` - Get user wishlist
- `POST /wishlist/add` - Add to wishlist
- `DELETE /wishlist/remove/:productId` - Remove from wishlist

#### Orders
- `POST /order/new` - Create order
- `GET /order/me` - Get user orders
- `GET /order/:id` - Get order details

#### Profile
- `GET /profile` - Get user profile
- `PUT /profile/name` - Update name
- `POST /profile/phone` - Add phone number
- `DELETE /profile/phone/:phoneId` - Delete phone
- `POST /profile/address` - Add address
- `DELETE /profile/address/:addressId` - Delete address
- `PUT /profile/address/:addressId/default` - Set default address

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Set Environment Variables** in Vercel Dashboard:
   - `VITE_API_URL` = Your production API URL

### Deploy to Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Environment Variables**:
   - `VITE_API_URL` = Your production API URL

### Deploy to GitHub Pages

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://CSShubham.github.io/SketchyStore"
}
```

3. **Deploy**:
```bash
npm run deploy
```

---

## ⚡ Performance Optimization

### Current Optimizations

1. **Code Splitting**:
   - Lazy loading for Lottie animations
   - Route-based code splitting

2. **Image Optimization**:
   - Lazy loading images
   - Responsive images
   - Optimized image formats

3. **Bundle Optimization**:
   - Vite's built-in optimizations
   - Tree shaking
   - Minification

4. **Caching**:
   - LocalStorage for auth tokens
   - API response caching (in Redux)

### Recommended Improvements

1. **Implement React.lazy** for route components
2. **Add service worker** for offline support
3. **Optimize images** with next-gen formats (WebP, AVIF)
4. **Implement virtual scrolling** for long product lists
5. **Add CDN** for static assets
6. **Enable gzip/brotli compression**

---

## 🌐 Browser Support

- **Chrome**: ✅ Latest 2 versions
- **Firefox**: ✅ Latest 2 versions
- **Safari**: ✅ Latest 2 versions
- **Edge**: ✅ Latest 2 versions
- **Mobile browsers**: ✅ iOS Safari 12+, Chrome Android

---

## 🧪 Testing (Future Enhancement)

### Recommended Testing Stack

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom
```

### Test Structure

```
src/
├── __tests__/
│   ├── components/
│   ├── pages/
│   ├── slice/
│   └── utils/
```

---

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Standards

- Use functional components with hooks
- Follow ESLint rules
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add comments for complex logic
- Keep components small and focused

---

## 📱 Mobile Responsiveness

### Breakpoint Strategy

```css
/* Mobile First Approach */
.component {
  /* Mobile styles (default) */
}

@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}
```

### Mobile-Specific Features

- Bottom navigation bar
- Touch-friendly buttons
- Swipe gestures for carousel
- Optimized images for mobile
- Mobile-specific routes for better UX

---

## 🔒 Security Considerations

### Implemented Security Measures

1. **JWT Authentication**:
   - Secure token storage in localStorage
   - Token expiration handling
   - Automatic token attachment to requests

2. **Protected Routes**:
   - Authentication checks
   - Automatic redirects

3. **Input Validation**:
   - Form validation
   - XSS prevention (React's built-in)

### Recommended Improvements

1. **Implement HTTPS** in production
2. **Add rate limiting** for API calls
3. **Implement CSRF protection**
4. **Use HTTP-only cookies** for tokens
5. **Add input sanitization**
6. **Implement Content Security Policy (CSP)**

---

## 🐛 Known Issues

Currently, there are no known critical issues. Please report bugs through GitHub Issues.

---

## 📊 Performance Metrics

### Target Metrics

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1

### Lighthouse Scores (Target)

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 90+

---

## 🗺️ Roadmap

### Planned Features

- [ ] **Search functionality** with autocomplete
- [ ] **Product comparison** feature
- [ ] **Social sharing** for products
- [ ] **Live chat support**
- [ ] **Progressive Web App (PWA)** capabilities
- [ ] **Dark mode** toggle
- [ ] **Multi-language support** (i18n)
- [ ] **Order tracking** with real-time updates
- [ ] **Product recommendations** based on browsing history
- [ ] **Email notifications** for order updates
- [ ] **Admin dashboard** (separate route)

---

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)

### Tutorials
- [Redux Toolkit Tutorial](https://redux-toolkit.js.org/tutorials/quick-start)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/installation)
- [React Hooks Guide](https://react.dev/reference/react)

---

## 💡 Tips & Best Practices

### Development Tips

1. **Use Redux DevTools** for debugging state
2. **Use React Developer Tools** for component inspection
3. **Keep components small** and focused on a single responsibility
4. **Use meaningful variable names**
5. **Comment complex logic**
6. **Test on multiple devices**

### Performance Tips

1. **Lazy load images** and components
2. **Memoize expensive computations** with `useMemo`
3. **Prevent unnecessary re-renders** with `React.memo`
4. **Use `useCallback`** for event handlers
5. **Optimize bundle size** by removing unused dependencies

### UX Tips

1. **Provide loading states** for async operations
2. **Show error messages** clearly
3. **Confirm destructive actions** (delete, logout)
4. **Use optimistic UI updates** for better perceived performance
5. **Provide keyboard navigation** for accessibility

---

## 🙏 Acknowledgments

- **React Team** for the amazing library
- **Redux Team** for state management
- **Tailwind CSS Team** for the utility-first CSS framework
- **Lottie** for beautiful animations
- **Lucide** for the icon library
- All contributors and supporters

---

## 📞 Support

For support and queries:
- **Email**: support@sketchystore.com
- **GitHub Issues**: [Create an issue](https://github.com/CSShubham/SketchyStore/issues)
- **Documentation**: [Wiki](https://github.com/CSShubham/SketchyStore/wiki)

---

## 👨‍💻 Author

**Shubham Raj**

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using React, Redux, and Tailwind CSS**