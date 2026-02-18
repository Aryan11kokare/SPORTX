import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { categories } from "../data/products";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllItems } from "../redux/actions/itemActions";

function ProductGrid() {
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
    // await dispatch(getUser());
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
    return itemState?.items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All Products" ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, itemState?.items]);

  return (
    <div id="products" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Our Collection</h2>
          <p className="text-gray-600 text-lg">
            Discover premium equipment for every sport
          </p>
        </div>

        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
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
}

export default ProductGrid;
