import React from "react";
import { addToCart } from "../slice/CartSlice";
import { addToWishlist, removeFromWishlist } from "../slice/Wishlist";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PrinterCheckIcon, Tag, Heart, ShoppingCart, Zap } from "lucide-react";
function ProductCard({ product }) {
  const navigate = useNavigate();
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
  const discountPercentage = (price, discountPrice) => {
    if (price <= 0 || discountPrice < 0) {
      return "Invalid price values";
    }

    const discount = price - discountPrice;
    return ((discount / price) * 100).toFixed(2);
  };

  const percentage = discountPercentage(product.price, product.discountPrice);
 

  const image = product.images[0]?.url || "../assets/react.svg";

  return (
    <div
      key={product._id}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
      onClick={() => {
        navigate(`/home/${product._id}`);
      }}
    >
      {/* Header with Category and Wishlist */}
      <div className="relative">
        {/* Discount Badge */}
        {percentage > 0 && (
          <div className="absolute top-3 left-3 z-0">
            <div className="bg-gradient-to-r from-[#f8563a] to-[#FF735C] text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <Tag size={12} />
              {percentage}% OFF
            </div>
          </div>
        )}

        {/* Wishlist Button */}
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

        {/* Product Image */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
          <img
            src={image}
            alt={product.title}
            className="w-full h-32 sm:h-40 md:h-48 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 md:p-4">
        {/* Category */}
        <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
          {product.category}
        </p>

        {/* Product Title */}
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-800  md:mb-2 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="mb-3 md:mb-4">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-base sm:text-lg md:text-xl font-bold text-[#FF735C]">
              ${product.discountPrice}
            </span>
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ${product.price.toFixed(0)}
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-green-600 font-semibold mt-1">
            You save ${(product.price - product.discountPrice).toFixed(2)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            className="w-full bg-[#FF735C] text-white text-xs sm:text-sm font-bold py-2.5 sm:py-3 md:py-3 rounded-xl hover:bg-[#ff6347] active:scale-95 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              // alert('Add to Cart clicked! Replace this with your dispatch function.');
              dispatch(
                addToCart({
                  productId: product._id,
                  quantity: 1,
                }),
              );
              toast.success(`${product.title} added to cart!`);
            }}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          <button
            className="w-full bg-gradient-to-r from-orange-100 to-red-100 text-gray-800 text-xs sm:text-sm font-bold py-2.5 sm:py-3 md:py-3 rounded-xl hover:from-orange-200 hover:to-red-200 transition-all border-2 border-transparent hover:border-[#FF735C] flex items-center justify-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/checkout/${product._id}?from=productCard`);
            }}
          >
            <Zap size={16} className="text-[#FF735C]" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
