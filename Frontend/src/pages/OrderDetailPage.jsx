import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleOrder } from "../slice/OrderSlice";
import {
  ChevronLeft,
  Package,
  MapPin,
  Phone,
  Mail,
  User,
  Truck,
  CheckCircle,
  Clock,
  CreditCard,
} from "lucide-react";
import Loading from "../components/Loading";

function OrderDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentOrder, loading } = useSelector((state) => state.order);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleOrder(id));
    }
  }, [dispatch, id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <Clock className="w-6 h-6" />;
      case "Shipped":
        return <Truck className="w-6 h-6" />;
      case "Delivered":
        return <CheckCircle className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case "Processing":
        return 33;
      case "Shipped":
        return 66;
      case "Delivered":
        return 100;
      default:
        return 0;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!currentOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Order not found
          </h2>
          <button
            onClick={() => navigate("-1")}
            className="text-[#FF735C] hover:underline"
          >
            Back to orders
          </button>
        </div>
      </div>
    );
  }

  const order = currentOrder;
  const item = order.orderItems[0];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Order Details
            </h1>
            <p className="text-gray-500 mt-1 font-mono text-sm">
              {order.orderId}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Status
                </h2>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {getStatusIcon(order.orderStatus)}
                  <span className="font-semibold">{order.orderStatus}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div
                    className="bg-[#FF735C] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getStatusProgress(order.orderStatus)}%` }}
                  ></div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        getStatusProgress(order.orderStatus) >= 33
                          ? "bg-[#FF735C] text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <Clock size={20} />
                    </div>
                    <span className="text-xs text-gray-600 text-center">
                      Processing
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        getStatusProgress(order.orderStatus) >= 66
                          ? "bg-[#FF735C] text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <Truck size={20} />
                    </div>
                    <span className="text-xs text-gray-600 text-center">
                      Shipped
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        getStatusProgress(order.orderStatus) >= 100
                          ? "bg-[#FF735C] text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <CheckCircle size={20} />
                    </div>
                    <span className="text-xs text-gray-600 text-center">
                      Delivered
                    </span>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Placed</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {order.deliveredAt && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Delivered On</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(order.deliveredAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.deliveredAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Product Details
              </h2>

              <div className="flex gap-6">
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain bg-gray-50 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Price per unit</p>
                      <p className="text-lg font-bold text-[#FF735C]">
                        ${item.price}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {item.quantity}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/home/${item.product}`)}
                    className="mt-4 text-[#FF735C] hover:text-[#ff6347] font-semibold text-sm"
                  >
                    View Product →
                  </button>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#FF735C]" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Shipping Address
                </h2>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                {order.shippingInfo.name && (
                  <p className="font-semibold text-gray-900 mb-2">
                    {order.shippingInfo.name}
                  </p>
                )}
                <p className="text-gray-700">
                  {order.shippingInfo.addressLine1}
                </p>
                {order.shippingInfo.addressLine2 && (
                  <p className="text-gray-700">{order.shippingInfo.addressLine2}</p>
                )}
                <p className="text-gray-700">
                  {order.shippingInfo.city}, {order.shippingInfo.state} -{" "}
                  {order.shippingInfo.pinCode}
                </p>
                <p className="text-gray-700">{order.shippingInfo.country}</p>

                {order.shippingInfo.phone && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-700">{order.shippingInfo.phone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${order.itemsPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900">
                    ${order.shippingPrice.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#FF735C]">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-[#FF735C]" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Details
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-semibold text-gray-900">
                    {order.paymentMethod}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <p
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      order.paidAt
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.paidAt ? "Paid" : "Pending"}
                  </p>
                </div>

                {order.paidAt && (
                  <div>
                    <p className="text-sm text-gray-500">Paid On</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(order.paidAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Information */}
            {order.user && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-[#FF735C]" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Customer Info
                  </h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold text-gray-900">{order.user.name}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-700">{order.user.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;