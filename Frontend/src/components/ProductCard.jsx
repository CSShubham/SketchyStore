import React from "react";
import { addToCart } from "../slice/CartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import WishlistButton from "./WishlistButton";
import { PrinterCheckIcon ,Tag, Heart ,ShoppingCart ,Zap} from "lucide-react";
function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const discountPercentage = (price, discountPrice) => {
    if (price <= 0 || discountPrice < 0) {
      return "Invalid price values";
    }

    const discount = price - discountPrice;
    return ((discount / price) * 100).toFixed(2);
  };

  const percentage = discountPercentage(product.price, product.discountPrice);
  // Correct formula: original = discountedPrice / (1 - discountPercentage/100)
  // const discount = product.discountPercentage || 0;
  // const originalPrice = (price, discount) => {
  //   const df = 1 - discount / 100;
  //   return df > 0 ? price / df : price;
  // };

  // const original = originalPrice(product.price, discount);

  const image = product.images[0]?.url || "../assets/react.svg";

  // console.log(product)
  // return (
  //    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
  //     <div className="max-w-7xl mx-auto">
  //       <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Products</h2>
        
  //       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  //         {product.map((product) => {
  //           const percentage = discountPercentage(product.price, product.discountPrice);
  //           const image = product.images[0]?.url;

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
                  <div 
                    className="absolute top-3 right-3 z-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* <WishlistButton product={product} /> */}
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-red-50 transition-colors">
                      <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
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
                        dispatch(addToCart({
                          productId: product._id,
                          quantity: 1,
                        }));
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
                        alert('Buy Now clicked! Replace this with your navigate function.');
                        navigate(`/checkout/${product._id}`);
                      }}
                    >
                      <Zap size={16} className="text-[#FF735C]" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>
    // <div
    //   //   key={product.id}
    //   onClick={() => navigate(`/home/${product._id}`)}
    //   className="border-1 p-2 sm:p-4  rounded-lg shadow  "
    // >
    //   <div className="flex justify-between items-center">
    //     <p className="text-[10px] sm:text-sm text-gray-500 capitalize">
    //       {product.category}
    //     </p>
    //     <WishlistButton product={product} />
    //   </div>
    //   <img
    //     src={image}
    //     alt={product.title}
    //     className="w-full h-15 sm:h-30 md:h-35 object-contain"
    //   />

    //   <h3 className="text-[12px] sm:text-sm md:text-base font-semibold mt-2">
    //     {product.title}
    //   </h3>

    //   <span className="flex gap-2 items-center flex-wrap">
    //     <p className="text-green-600 font-semibold text-xs sm:text-md">
    //       &darr;{percentage}%
    //     </p>
    //     <p className="line-through text-xs sm:text-base">
    //       ${product.price.toFixed(0)}
    //     </p>
    //     <p className="text-black font-bold text-xs sm:text-sm md:text-lg">
    //       ${product.discountPrice}
    //     </p>
    //   </span>
    //   <div className="flex flex-col sm:flex-row justify-between items-center mt-2 mx-1 gap-1.5">
    //     <button
    //       className="border-1 bg-[#FF735C] text-white text-[10px] lg:text-sm active:bg-white active:text-[#FF735C] active:scale-95 transition rounded-lg px-0.5 py-1 sm:px-2 sm:py-2.5 cursor-pointer w-full lg:w-auto"
    //       onClick={(e) => {
    //         e.stopPropagation();
    //         dispatch(
    //           addToCart({
    //             productId: product._id,
    //             // title: product.title,
    //             // price: product.price,
    //             // image,
    //             quantity: 1,
    //           }),
    //         );
    //         toast.success(`${product.title} added to cart!`);
    //       }}
    //     >
    //       Add To Cart
    //     </button>
    //     <button
    //       onClick={(e) => {
    //         e.stopPropagation();
    //         navigate(`/checkout/${product._id}`);
    //       }}
    //       className="border-1 rounded-lg text-[10px] lg:text-sm px-0.5 py-1 sm:px-2 sm:py-2.5 cursor-pointer w-full lg:w-auto"
    //     >
    //       Buy Now <span className="text-[10px]">&#9889;</span>
    //     </button>
    //   </div>
    // </div>
  );
}

export default ProductCard;
