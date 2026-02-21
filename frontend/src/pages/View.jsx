import { useEffect, useMemo, useState } from "react";

import { categories } from "../data/products";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllItems } from "../redux/actions/itemActions";
import ProductCard from "../components/ProductCard";

const View = () => {
  const path = window.location.href.split("/")[4];
  const itemState = useSelector((state) => state.item);
  const userState = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  const dispatch = useDispatch();
  const route = useNavigate();

  const fetchTickets = async () => {
    setLoading(true);
    const responce = await dispatch(getAllItems());
    if (responce?.error?.name === "JsonWebTokenError") {
      localStorage.removeItem("token");
      route("/login");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredProducts = useMemo(() => {
    return itemState?.items.filter((item) => item.category === path);
  }, [path, itemState?.items]);

  return (
    <div id="products" className="bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 mt-4">
          <h2 className="text-4xl font-bold text-black ">
            Our Collection for {path}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No products found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
