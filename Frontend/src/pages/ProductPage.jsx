import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../slice/CartSlice";
import ImageCarousel from "../components/ImageCarousel";
import Loading from "../components/Loading";
import API from "../api";
import { Star, ShoppingCart, Zap, Package, DollarSign,IndianRupee, Shield, ArrowLeft, Truck, Tag } from "lucide-react";

function ProductPage() {
  const { productId } = useParams();
  const { items } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.auth || {});
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${productId}`);
        setProduct(data.product);
      } catch (err) {
        setProduct(undefined);
      }
    };

    const found = items.find((p) => p._id === productId);
    if (found) {
      setProduct(found);
    } else {
      fetchProduct();
    }
  }, [items, productId]);

  const calculateDiscount = (price, discountPrice) => {
    if (price <= 0 || discountPrice < 0) return 0;
    const discount = price - discountPrice;
    return ((discount / price) * 100).toFixed(0);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
      })
    );
    toast.success(`${product.title} added to cart!`, { theme: "colored" });
  };

  const handleBuyNow = () => {
    navigate(`/checkout/${product._id}?from=productCard`);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please login to submit a review", { theme: "colored" });
      navigate("/login");
      return;
    }

    if (!reviewForm.comment.trim()) {
      toast.error("Please write a review comment", { theme: "colored" });
      return;
    }

    setSubmittingReview(true);
    try {
      const { data } = await API.post(`/products/${productId}/review`, {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      
      setProduct(data.product);
      setReviewForm({ rating: 5, comment: "" });
      toast.success("Review submitted successfully!", { theme: "colored" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review", {
        theme: "colored",
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  if (product === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#FF735C] text-white rounded-lg hover:bg-[#ff5a3f] transition"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return <Loading />;
  }

  const discountPercentage = calculateDiscount(product.price, product.discountPrice);

  return (
    <div className="min-w-screen bg-gray-50 overflow-x-hidden">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm sticky top-0 z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#FF735C] transition"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden bg-gray-100">
              <ImageCarousel images={product.images || []} />
            </div>
            
            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-1"
                  >
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Brand and Category */}
            <div className="flex items-center justify-between">
              <span className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {product.brand || "No Brand"}
              </span>
              <span className="px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg font-semibold">
                <span>{product.rating.toFixed(1)}</span>
                <Star size={16} fill="white" />
              </div>
              <span className="text-gray-600">
                {product.numOfReviews} {product.numOfReviews === 1 ? "Review" : "Reviews"}
              </span>
            </div>

            {/* Price Section */}
            <div className="space-y-2">
              <p className="text-green-600 font-semibold text-sm">Special Price</p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  &#8377;{product.discountPrice}
                </span>
                {product.price > product.discountPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      &#8377;{product.price}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span
                className={`px-4 py-2 rounded-lg font-semibold ${
                  product.availabilityStatus === "In Stock"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.availabilityStatus}
              </span>
              {product.stock > 0 && (
                <span className="text-gray-600">
                  {product.stock} items available
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={product.availabilityStatus !== "In Stock"}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#FF735C] text-white rounded-xl font-semibold hover:bg-[#ff5a3f] active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.availabilityStatus !== "In Stock"}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap size={20} />
                Buy Now
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl text-center">
                <Package className="text-blue-600 mb-2" size={24} />
                <span className="text-sm font-medium text-gray-700">
                  {product.returnPolicy || "Easy Returns"}
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl text-center">
                <IndianRupee className="text-green-600 mb-2" size={24} />
                <span className="text-sm font-medium text-gray-700">
                  Cash on Delivery
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-50 rounded-xl text-center">
                <Shield className="text-purple-600 mb-2" size={24} />
                <span className="text-sm font-medium text-gray-700">
                  {product.warrantyInformation || "Warranty"}
                </span>
              </div>
            </div>

            {/* Shipping Info */}
            {product.shippingInformation && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Truck className="text-gray-600" size={24} />
                <span className="text-gray-700 font-medium">
                  {product.shippingInformation}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("description")}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === "description"
                  ? "bg-[#FF735C] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === "details"
                  ? "bg-[#FF735C] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === "reviews"
                  ? "bg-[#FF735C] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Reviews ({product.numOfReviews})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 lg:p-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "details" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <DetailRow label="SKU" value={product.sku} />
                  <DetailRow label="Category" value={product.category} />
                  <DetailRow label="Brand" value={product.brand || "N/A"} />
                  <DetailRow label="Stock" value={`${product.stock} units`} />
                  <DetailRow
                    label="Availability"
                    value={product.availabilityStatus}
                  />
                </div>
                <div className="space-y-4">
                  <DetailRow
                    label="Warranty"
                    value={product.warrantyInformation || "N/A"}
                  />
                  <DetailRow
                    label="Return Policy"
                    value={product.returnPolicy || "N/A"}
                  />
                  <DetailRow
                    label="Shipping"
                    value={product.shippingInformation || "N/A"}
                  />
                  <DetailRow
                    label="Min Order Qty"
                    value={product.minimumOrderQuantity || "1"}
                  />
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Review Form */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Write a Review</h3>
                  <div onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setReviewForm({ ...reviewForm, rating: star })
                            }
                            className="focus:outline-none"
                          >
                            <Star
                              size={32}
                              className={
                                star <= reviewForm.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                      </label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) =>
                          setReviewForm({
                            ...reviewForm,
                            comment: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF735C] focus:border-transparent"
                        placeholder="Share your experience with this product..."
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleReviewSubmit}
                      disabled={submittingReview}
                      className="px-6 py-3 bg-[#FF735C] text-white rounded-lg font-semibold hover:bg-[#ff5a3f] active:scale-95 transition disabled:opacity-50"
                    >
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Customer Reviews</h3>
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {product.reviews.map((review, idx) => (
                        <div
                          key={idx}
                          className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#FF735C] text-white flex items-center justify-center font-bold text-lg">
                              {review.name?.charAt(0) || review.reviewerName?.charAt(0) || "U"}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">
                                {review.name || review.reviewerName || "Anonymous"}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      size={16}
                                      className={
                                        star <= review.rating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {review.rating}/5
                                </span>
                              </div>
                              <p className="mt-3 text-gray-700">
                                {review.comment}
                              </p>
                              {review.createdAt && (
                                <p className="mt-2 text-xs text-gray-500">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No reviews yet. Be the first to review this product!
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Detail Rows
function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-200">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold">{value}</span>
    </div>
  );
}

export default ProductPage;
