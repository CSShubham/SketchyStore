import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "../slice/CartSlice";
import WishlistButton from "../components/WishlistButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import Lottie from "lottie-react";
import emptyCartAnimation from "../assets/Empty Box.json";
import { Heart, Trash2, Plus, Minus, ArrowRight,ShoppingBasket } from "lucide-react";
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-w-full min-h-screen">
      <div className="max-w-7xl mx-auto mb-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-3">
          <ShoppingCart className="text-[#FF735C]" size={40} />
          My Cart
        </h2>

        {/* Summary Bar */}
        <div className="bg-white rounded-2xl shadow-md p-4 flex justify-between items-center">
          <button
            className="px-0 py-1 md:px-0 pr-2 md:pr-3 md:py-2 border-1 rounded-xl flex items-center text-base md:text-lg text-white bg-[#FF735C] active:text-[#FF735C] active:bg-white"
            onClick={() => {
              navigate("/home");
            }}
          >
            {" "}
            <ChevronLeft
              className="flex justify-center items-center"
              size={30}
            />{" "}
            <span className="hidden md:inline">Continue Shopping{" "}</span>
          </button>
          <div className="flex gap-6">
            <div>
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="text-2xl font-bold text-gray-800">{cartQuantity}</p>
            </div>
            <div className="border-l pl-6">
              <p className="text-sm text-gray-500">Cart Total</p>
              <p className="text-2xl font-bold text-[#FF735C]">&#8377;{cartItems.reduce((sum, item) => sum + (item.product.discountPrice * item.quantity), 0).toFixed(2)}</p>
            </div>
          </div>
          <button className="bg-[#FF735C] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#ff6347] transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
            <span className="hidden md:inline">Checkout</span> <ArrowRight className="hidden md:inline" size={20} /><ShoppingBasket className="md:hidden" size={20} />
          </button>
        </div>
      </div>
      {cartItems.length === 0 ? (
        <div className="flex  flex-col justify-center items-center lg:h-150">
          <Lottie
            animationData={emptyCartAnimation}
            loop={true}
            className="h-50 w-50 md:h-80 md:w-80 lg:h-110 lg:w-110"
          />
          <p className="text-xl md:text-3xl text-[#FF735C] tracking-wider font-semibold ">
            Your Cart is Empty
          </p>
        </div>
      ) : (
        <>
          <div className="container mx-auto p-4 px-10">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/home/${item.product._id}`);
                  }}
                >
                  {/* Category Badge & Wishlist */}
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-0">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full capitalize shadow-md">
                        {item.product.category}
                      </span>
                    </div>
                    <WishlistButton product={item.product} />

                    {/* Product Image */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                      <img
                        src={item.product.images?.[0]?.url}
                        alt={item.product.title}
                        className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {item.product.title}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-[#FF735C]">
                        &#8377;{item.product.discountPrice}
                      </span>
                      <span className="text-sm text-gray-400">per item</span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-xl p-2">
                      <span className="text-sm font-medium text-gray-600 px-2">
                        Quantity
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (item.quantity > 1) {
                              await dispatch(
                                updateCart({
                                  productId: item.product._id,
                                  quantity: item.quantity - 1,
                                }),
                              );
                            }
                          }}
                          disabled={item.quantity <= 1}
                          className="w-9 h-9 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#FF735C] hover:text-[#FF735C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-bold text-lg text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            await dispatch(
                              updateCart({
                                productId: item.product._id,
                                quantity: item.quantity + 1,
                              }),
                            );
                          }}
                          className="w-9 h-9 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#FF735C] hover:text-[#FF735C] transition-colors font-bold"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          Subtotal
                        </span>
                        <span className="text-xl font-bold text-gray-800">
                          &#8377;
                          {(item.product.discountPrice * item.quantity).toFixed(
                            2,
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          await dispatch(removeFromCart(item.product._id));
                          toast.warn(
                            `${item.product.title} removed from cart!!`,
                          );
                        }}
                        className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2 border-2 border-transparent hover:border-red-200"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/checkout/${item.product._id}?from=cart`);
                        }}
                        className="flex-1 bg-[#FF735C] text-white py-3 rounded-xl font-semibold hover:bg-[#ff6347] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        Order <span className="text-base">⚡</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
