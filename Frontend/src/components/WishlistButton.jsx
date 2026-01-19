// src/components/WishlistButton.jsx
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../slice/Wishlist";
import { Heart } from "lucide-react";

export default function WishlistButton({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some(
    (item) => item.product._id === product._id,
  );
  const toggleWishlist = (e) => {
    e.stopPropagation();

    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.info(`${product.title} removed from wishlist!`);
    } else {
      dispatch(addToWishlist(product._id));
      toast.success(`${product.title} added to wishlist!`);
    }
  };

  return (
    <div className="absolute top-3 right-3 z-1">
      {/* <WishlistButton product={product} /> */}
      <button
        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(e);
        }}
      >
        <Heart
          size={18}
          className={`transition-colors ${
            isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"
          }`}
        />
      </button>
    </div>
  );
}
