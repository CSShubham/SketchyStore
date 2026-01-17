import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Get logged-in user's cart
export const getUserCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );

  if (!cart) {
    return res.status(200).json({ success: true, cart: { items: [] } });
  }

  res.status(200).json({
    success: true,
    cart,
  });
};

// Add product to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
  }

  res.status(200).json({
    success: true,
    message: "Product added to cart",
    cart,
  });
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    return res.status(404).json({ success: false, message: "Item not found" });
  }

  item.quantity = quantity;
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart updated",
    cart,
  });
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Item removed from cart",
    cart,
  });
};
