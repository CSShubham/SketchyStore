import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchProductsByCategory } from "../slice/ProductAction";
import ProductCard from "../components/ProductCard";
function Product() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("---Sort by---");
  const [sortBy, setsortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const { categoryItems, loading } = useSelector((state) => state.products);

  const options = [
    { value: "discountPrice", label: "Price: Low to High", order: "asc" },
    { value: "discountPrice", label: "Price: High to Low", order: "desc" },
    { value: "title", label: "Title: A → Z", order: "asc" },
    { value: "title", label: "Title: Z → A", order: "desc" },
    {
      value: "discountPercentage",
      label: "Discount: Low to High",
      order: "asc",
    },
    {
      value: "discountPercentage",
      label: "Discount: High to Low",
      order: "desc",
    },
  ];
  const handleSelect = (option) => {
    setSelected(option.label);
    setsortBy(option.value);
    setOrder(option.order);
    setIsOpen(false);
    // console.log("Sorting by:", option.value ,option.label);
    // You can call a sort function or set a parent state here
  };

  const dispatch = useDispatch();
  const { category } = useParams();
  // console.log(category);
  // const { productByCategories } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProductsByCategory({ category }));
  }, [dispatch, category]);

 const sortedProducts = useMemo(() => {
  if (!sortBy) return categoryItems;

  const sorted = [...categoryItems].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // If discountPercentage, calculate dynamically
    if (sortBy === "discountPercentage") {
      aValue = ((a.price - a.discountPrice) / a.price) * 100;
      bValue = ((b.price - b.discountPrice) / b.price) * 100;
    }

    if (typeof aValue === "string") {
      // String comparison for title
      return order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      // Number comparison for price/discount
      return order === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  return sorted;
}, [categoryItems, sortBy, order]);


  return (
    <>
      <div className="flex min-h-screen w-full px-0 ">
        <Sidebar />
        <div className="w-full h-screen px-2 py-4 sm:px-4 md:px-10 overflow-y-auto">
          {/* <Sidebar /> */}
          <div className="flex justify-between sm:items-center mb-4">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold md:font-bold mb-4 capitalize">
              {category}
            </h2>
            <div className="relative inline-block w-45 sm:w-64 md:w-70 lg:w-76">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm text-sm md:text-base font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {selected}
              </button>
              {isOpen && (
                <div className="absolute z-1 mt-2 w-full rounded-xl border-1 bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(option)}
                        className="w-full text-left block px-4 py-2 text-[12px] md:text-base text-gray-700 hover:bg-gray-100"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {loading.products ? (
            <p>Loading...</p>
          ) : sortedProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Product;
