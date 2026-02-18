import { useState, useEffect } from "react";
import { ShoppingCart, Package, IndianRupee, Ticket } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createReview,
  deleteItem,
  getItemById,
} from "../redux/actions/itemActions";
import { BASE_URL, clientServer } from "../redux";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import ProductCard from "../components/ProductCard";
import BuyForm from "../components/BuyForm";
import ReviewCard from "../components/ReviewCard";

export default function ProductDetails() {
  const itemState = useSelector((state) => state.item);
  const userState = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [showForm, setShowFrom] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(1);
  const [comment, setComment] = useState("");
  const path = window.location.href.split("/")[4];
  const dispatch = useDispatch();
  const route = useNavigate();

  const featchData = async () => {
    setLoading(true);
    const responce1 = await dispatch(getItemById({ id: path }));
    if (responce1?.error?.name === "JsonWebTokenError") {
      localStorage.removeItem("token");
      route("/login");
    }
    const responce = await clientServer.get(`/match/${path}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    setSuggestions(responce.data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route("/login");
    }
    featchData();
  }, [path]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const responce = await dispatch(
      createReview({ itemId: product._id, comment: comment, rating: value }),
    );

    if (responce?.error?.message === "Rejected") {
      await setLoading(false);
    } else {
      await dispatch(getItemById({ id: path }));
      setTimeout(() => {
        setComment("");
        setLoading(false);
      }, 1000);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    await dispatch(deleteItem({ id: product._id }));
    setLoading(false);
    route("/");
  };

  useEffect(() => {
    setProduct(itemState.item);
  }, [itemState?.item]);

  const handleClose = () => {
    setShowFrom(false);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Product not found</p>
          <button className="text-gray-400 hover:text-white transition-colors">
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showForm === true && <BuyForm onClose={handleClose} product={product} />}
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto md:mx-8 px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
              <img
                src={`${BASE_URL}/${product?.image}`}
                alt={product?.name}
                className="w-full h-[500px] object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-zinc-800 text-gray-300 text-sm rounded-full">
                  {product?.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-white mb-4">
                {product?.title}
              </h1>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-white">
                  &#8377;{product?.price}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Package size={20} className="text-gray-400" />
                <span className="text-gray-300">
                  {product?.inStock ? ` in stock` : "Out of stock"}
                </span>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {product?.description}
              </p>

              <button
                onClick={() => setShowFrom((c) => !c)}
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
          <hr className=" border rounded-full my-8 border-gray-200" />
          <div className="md:h-[90vh] md:flex  text-white">
            <div className="h-full md:w-[50%] md:pr-6  ">
              <form onSubmit={handleSubmit} className="w-full ">
                <label className="font-bold text-2xl" htmlFor="review">
                  Review this Product
                </label>
                <p className="text-gray-400 text-base mb-4">
                  Share your thoughts with other customers
                </p>
                <Box sx={{ "& > legend": { width: "100%" } }}>
                  <Rating
                    className="bg-zinc-800 rounded-full px-4 py-2"
                    size="large"
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
                <textarea
                  id="review"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write the event review"
                  required
                  rows={3}
                  className="bg-black w-full border mt-4 border-zinc-700 py-4 px-8 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                ></textarea>
                <br />
                <br />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black py-3 font-bold   focus:outline-none focus:ring-2  focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {loading ? "Adding Review...." : " Add Review"}
                </button>
              </form>
              <br />
              <hr />
              <br />
              {userState?.user?._id.toString() ===
              itemState?.item?.user._id.toString() ? (
                <button
                  onClick={handleDelete}
                  className="flex justify-center font-bold gap-2 w-full items-center bg-red-600 text-white py-2 px-4"
                >
                  {loading ? "Delete Product...." : "Delete Product"}
                </button>
              ) : null}
            </div>
            <div className="h-full md:w-[50%]  flex flex-col justify-start items-start ">
              <h4 className="font-bold text-xl" htmlFor="review">
                Customer Reviews
              </h4>
              <div className="mt-4 h-full border border-zinc-700 w-full reviewsDiv p-4 overflow-y-scroll">
                {product?.reviews.map((review) => {
                  return <ReviewCard key={review._id} review={review} />;
                })}
              </div>
            </div>
          </div>
          <hr className=" border rounded-full my-8 border-gray-200" />
          {suggestions?.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">
                You May Also Like
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {suggestions?.map((item) => (
                  <ProductCard product={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
