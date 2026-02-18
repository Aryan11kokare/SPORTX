import { Link } from "react-router-dom";
import { BASE_URL } from "../redux";

function ProductCard({ product }) {
  return (
    <div className="group bg-white border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <img
          src={`${BASE_URL}/${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.inStock && (
          <span className="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1 font-semibold">
            IN STOCK
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
            {product.category}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-2 text-black group-hover:text-gray-700 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.averageRating)
                    ? "text-black"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.averageRating}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-black">
            &#8377;{product.price.toFixed(2)}
          </span>
          <Link
            to={`/details/${product._id}`}
            // onClick={() => onAddToCart(product)}
            className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
