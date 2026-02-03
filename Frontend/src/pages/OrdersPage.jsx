import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyOrders } from "../slice/OrderSlice";
import { ChevronLeft, ArrowRight, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import OrderAnimation from "../assets/No Item In Box.json";
import Loading from "../components/Loading";

function OrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <Clock className="w-5 h-5" />;
      case "Shipped":
        return <Truck className="w-5 h-5" />;
      case "Delivered":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => navigate("/account")}
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-500 mt-1">
              {orders.length} {orders.length === 1 ? "order" : "orders"} total
            </p>
          </div>
        </div>

        {/* Empty Orders */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-sm">
            <Lottie
              animationData={OrderAnimation}
              loop
              className="w-64 h-64"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <button
              onClick={() => navigate("/home")}
              className="bg-[#FF735C] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#ff6347] transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          /* Orders Grid */
          <div className="grid gap-6">
            {orders.map((order) => {
              const item = order.orderItems[0];

              return (
                <div
                  key={order._id}
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-[#FF735C]" />
                        <div>
                          <p className="text-sm text-gray-500">Order ID</p>
                          <p className="font-mono font-semibold text-gray-900">
                            {order.orderId}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Order Date</p>
                          <p className="font-medium text-gray-900">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>

                        <div
                          className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {getStatusIcon(order.orderStatus)}
                          <span className="font-semibold text-sm">
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Content */}
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image & Info */}
                      <div className="flex gap-4 flex-1">
                        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain bg-gray-50 rounded-xl border border-gray-200"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Qty: {item.quantity}</span>
                            <span className="text-xl font-bold text-[#FF735C]">
                              &#8377;{item.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price Summary */}
                      <div className="md:border-l md:pl-6 md:min-w-[200px]">
                        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Order Summary
                          </h4>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-medium">
                              &#8377;{order.itemsPrice.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping</span>
                            <span className="font-medium">
                              &#8377;{order.shippingPrice.toFixed(2)}
                            </span>
                          </div>
                          <div className="border-t border-gray-200 pt-2 mt-2">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-900">Total</span>
                              <span className="text-xl font-bold text-[#FF735C]">
                                &#8377;{order.totalPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`order/${order._id}`);
                        }}
                        className="flex-1 md:flex-none bg-[#FF735C] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#ff6347] transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/home/${item.product}`);
                        }}
                        className="flex-1 md:flex-none border-2 border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
