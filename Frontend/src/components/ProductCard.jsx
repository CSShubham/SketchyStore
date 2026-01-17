import React from "react";
import { addToCart } from "../slice/CartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import WishlistButton from "./WishlistButton";
import { PrinterCheckIcon } from "lucide-react";
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
  return (
    <div
      //   key={product.id}
      onClick={() => navigate(`/home/${product._id}`)}
      className="border-1 p-2 sm:p-4  rounded-lg shadow  "
    >
      <div className="flex justify-between items-center">
        <p className="text-[10px] sm:text-sm text-gray-500 capitalize">
          {product.category}
        </p>
        <WishlistButton product={product} />
      </div>
      <img
        src={image}
        alt={product.title}
        className="w-full h-15 sm:h-30 md:h-35 object-contain"
      />

      <h3 className="text-[12px] sm:text-sm md:text-base font-semibold mt-2">
        {product.title}
      </h3>

      <span className="flex gap-2 items-center flex-wrap">
        <p className="text-green-600 font-semibold text-xs sm:text-md">
          &darr;{percentage}%
        </p>
        <p className="line-through text-xs sm:text-base">
          ${product.price.toFixed(0)}
        </p>
        <p className="text-black font-bold text-xs sm:text-sm md:text-lg">
          ${product.discountPrice}
        </p>
      </span>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-2 mx-1 gap-1.5">
        <button
          className="border-1 bg-[#FF735C] text-white text-[10px] lg:text-sm active:bg-white active:text-[#FF735C] active:scale-95 transition rounded-lg px-0.5 py-1 sm:px-2 sm:py-2.5 cursor-pointer w-full lg:w-auto"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              addToCart({
                productId: product._id,
                title: product.title,
                price: product.price,
                image,
                quantity: 1,
              }),
            );
            toast.success(`${product.title} added to cart!`);
          }}
        >
          Add To Cart
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/checkout/${product._id}`);
          }}
          className="border-1 rounded-lg text-[10px] lg:text-sm px-0.5 py-1 sm:px-2 sm:py-2.5 cursor-pointer w-full lg:w-auto"
        >
          Buy Now <span className="text-[10px]">&#9889;</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
