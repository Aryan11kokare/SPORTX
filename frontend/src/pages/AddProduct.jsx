import { useEffect, useState } from "react";
import { Plus, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createItem } from "../redux/actions/itemActions.js";
import { useDispatch } from "react-redux";

const categories = [
  "Basketball",
  "Cricket",
  "Footwear",
  "Fitness",
  "Tennis",
  "Football",
  "Strength Training",
  "Swimming",
  "Boxing",
  "Cycling",
  "Golf",
  "Skateboarding",
];

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState();
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const route = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!category.trim()) {
      alert("Category is required");
      return;
    }

    setSuccess(false);
    setLoading(true);
    const responce = await dispatch(
      createItem({
        title: title,
        description: description,
        media: media,
        price: price,
        category: category,
      }),
    );

    if (responce?.error?.message === "Rejected") {
      await setLoading(false);
      await setError(JSON.stringify(responce.payload));
    } else {
      setSuccess(responce.payload);
      setTimeout(() => {
        setLoading(false);
        route("/");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          to={"/"}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Back to Store
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
          <div className="flex items-center gap-2 mb-6">
            <Plus className="text-white" size={24} />
            <h2 className="text-2xl font-bold text-white">Add New Product</h2>
          </div>

          {error && (
            <div className="bg-red-950 border border-red-900 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-950 border border-green-900 rounded-lg p-4 mb-6 flex items-start gap-3">
              <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
              <p className="text-green-200 text-sm">
                Product added successfully! Redirecting...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                  placeholder="Nike Air Max Running Shoes"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
                >
                  <option> Select the Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Detailed product description..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Price ($)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                  placeholder="99.99"
                />
              </div>
              <div>
                <label
                  htmlFor="image_url"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Image URL
                </label>
                <input
                  id="image_url"
                  name="image_url"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => setMedia(e.target.files[0])}
                  required
                  className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                  placeholder="https://images.pexels.com/..."
                />
                <p className="text-gray-500 text-xs mt-2">
                  Use high-quality images from Pexels or other sources
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
