import { useState, useEffect } from "react";
import { Plus, Minus, ShieldCheck, MapPin, Phone, Edit2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { loadProfile } from "../slice/ProfileSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchProductById } from "../slice/ProductAction";
import { removeFromCart } from "../slice/CartSlice";
import { createOrder } from "../slice/OrderSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.products);
  // const productLoading = loading.product;
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile,
  );
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from"); // "cart" | "product"
  const cartItems = useSelector((state) => state.cart.items);
  useEffect(() => {
    dispatch(loadProfile());
  }, [dispatch]);

  useEffect(() => {
    if (productId && from !== "cart") {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, from]);
  const cartItem =
    from === "cart"
      ? cartItems.find((item) => item.product._id === productId)
      : null;
  const displayedProduct = cartItem ? cartItem.product : product;
  const [count, setCount] = useState(cartItem ? cartItem.quantity : 1);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [showPhoneSelector, setShowPhoneSelector] = useState(false);

  useEffect(() => {
    if (!user) return;

    const defaultAddress =
      user.addresses?.find((addr) => addr.isDefault) ||
      user.addresses?.[0] ||
      null;

    const primaryPhone =
      user.phones?.find((phone) => phone.isPrimary) || user.phones?.[0] || null;

    setSelectedAddress(defaultAddress);
    setSelectedPhone(primaryPhone);
  }, [user]);

  if (profileLoading || (from !== "cart" && loading.product)) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-red-500">You must be logged in to checkout</span>
      </div>
    );
  }

  if (!displayedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-red-500">Product not found</span>
      </div>
    );
  }
  // Price calculations
  const price = displayedProduct.discountPrice || displayedProduct.price;
  const subtotal = (count * price).toFixed(2);
  const shipping = 5.0;
  const total = (parseFloat(subtotal) + shipping).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (!selectedPhone) {
      toast.error("Please select a contact number");
      return;
    }
    // Build order items
    const orderItems = [
      {
        product: displayedProduct._id,
        name: displayedProduct.title,
        price: price,
        quantity: count,
        image: displayedProduct.images?.[0]?.url,
      },
    ];
    // 3️⃣ Shipping info (matches Order schema)
    const shippingInfo = {
      addressLine1: selectedAddress.line1,
      addressLine2: selectedAddress.line2,
      city: selectedAddress.city,
      state: selectedAddress.state,
      country: selectedAddress.country,
      pinCode: selectedAddress.pincode,
      phone: selectedPhone.number,
    };

    // 4️⃣ Price calculation
    const itemsPrice = count * price;
    const shippingPrice = shipping;
    const totalPrice = itemsPrice + shippingPrice;

    // 5️⃣ Final payload
    const orderData = {
      orderItems,
      shippingInfo,
      paymentMethod: "COD",
      itemsPrice,
      shippingPrice,
      totalPrice,
    };
    try {
      // 6️⃣ Dispatch Redux thunk
      const resultAction = await dispatch(createOrder(orderData));

      // ❌ If API failed
      if (createOrder.rejected.match(resultAction)) {
        throw new Error(resultAction.payload);
      }
      // If coming from cart, remove item from cart
      if (from === "cart" && cartItem) {
        await dispatch(removeFromCart(cartItem.product._id));
      }
      navigate("/order-success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full mb-5 md:mb-0">
      <form onSubmit={handleSubmit}>
        <div className="min-h-screen bg-gray-100 p-4 md:p-10">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex md:space-x-8 p-6 md:p-10">
            {/* Left Side - Shipping & Contact Info */}
            <div className="w-full md:w-2/3 space-y-6">
              <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

              {/* Personal Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-3">
                  Personal Information
                </h2>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Full Name
                    </label>
                    <p className="text-base font-semibold">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <p className="text-base font-semibold">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Contact Number Selection */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Phone size={20} /> Contact Number
                  </h2>
                  {user.phones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setShowPhoneSelector(!showPhoneSelector)}
                      className="text-[#FF735C] hover:text-[#ff6347] flex items-center gap-1 text-sm"
                    >
                      <Edit2 size={16} /> Change
                    </button>
                  )}
                </div>

                {showPhoneSelector ? (
                  <div className="space-y-2">
                    {user.phones.map((phone) => (
                      <div
                        key={phone._id}
                        onClick={() => {
                          setSelectedPhone(phone);
                          setShowPhoneSelector(false);
                        }}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedPhone?._id === phone._id
                            ? "border-[#FF735C] bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <p className="font-semibold">{phone.number}</p>
                        {phone.isPrimary && (
                          <span className="text-xs text-[#FF735C]">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <p className="font-semibold">{selectedPhone?.number}</p>
                  </div>
                )}
              </div>

              {/* Delivery Address Selection */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin size={20} /> Delivery Address
                  </h2>
                  {user.addresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setShowAddressSelector(!showAddressSelector)
                      }
                      className="text-[#FF735C] hover:text-[#ff6347] flex items-center gap-1 text-sm"
                    >
                      <Edit2 size={16} /> Change
                    </button>
                  )}
                </div>

                {showAddressSelector ? (
                  <div className="space-y-3">
                    {user.addresses.map((address) => (
                      <div
                        key={address._id}
                        onClick={() => {
                          setSelectedAddress(address);
                          setShowAddressSelector(false);
                        }}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedAddress?._id === address._id
                            ? "border-[#FF735C] bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[#FF735C]">
                            {address.label}
                          </span>
                          {address.isDefault && (
                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">
                          {address.line1}
                          {address.line2 && `, ${address.line2}`}
                        </p>
                        <p className="text-sm text-gray-700">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.country}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[#FF735C]">
                        {selectedAddress?.label}
                      </span>
                      {selectedAddress?.isDefault && (
                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">
                      {selectedAddress?.line1}
                      {selectedAddress?.line2 && `, ${selectedAddress.line2}`}
                    </p>
                    <p className="text-sm text-gray-700">
                      {selectedAddress?.city}, {selectedAddress?.state} -{" "}
                      {selectedAddress?.pincode}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedAddress?.country}
                    </p>
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center mt-4">
                <input type="checkbox" required className="mr-2 w-4 h-4" />
                <span className="text-sm">
                  I have read and agree to the Terms and Conditions.
                </span>
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="w-full md:w-1/2 mt-10 md:mt-0">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Product Details */}
              <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <img
                  src={displayedProduct.images?.[0]?.url}
                  alt={displayedProduct.title}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg border"
                />
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold mb-2">
                    {displayedProduct.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-lg font-bold text-[#FF735C]">
                      &#8377;{displayedProduct.discountPrice}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      &#8377;{displayedProduct.price}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={decrement}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {count}
                      </span>
                      <button
                        type="button"
                        onClick={increment}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discount Code */}
              <div className="mt-4 mb-4">
                <label className="text-sm font-medium">Discount Code</label>
                <div className="flex mt-2">
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter code"
                  />
                  <button
                    type="button"
                    className="px-4 bg-gray-200 border border-l-0 rounded-r-lg hover:bg-gray-300 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">&#8377;{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">&#8377;{shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-xl text-[#FF735C]">
                      &#8377;{total}
                    </span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Place Order
              </button>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={16} />
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
