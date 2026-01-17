import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";
//get logged in user's wishlist
export const getUserWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
    "items.product",
  );

  if (!wishlist) {
    return res.status(200).json({ success: true, wishlist: { items: [] } });
  }

  res.status(200).json({
    success: true,
    wishlist,
  });
};
//Add product to wishlist
export const addToWishlist = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = new Wishlist({
      user: userId,
      items: [{ product: productId }],
    });
  } else {
    const alreadyExists = wishlist.items.find(
      (item) => item.product.toString() === productId,
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    wishlist.items.push({ product: productId });
  }

  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Product added to Wishlist",
    wishlist,
  });
};
//Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    return res.status(404).json({ message: "Wishlist not found" });
  }

  wishlist.items = wishlist.items.filter(
    (item) => item.product.toString() !== productId
  );

  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Item removed from wishlist",
    wishlist,
  });
};
