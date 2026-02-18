import { BASE_URL } from "../redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ isOpen, onClose, cartItems, onRemoveItem }) {
  if (!isOpen) return null;

  const route = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route("/login");
    }
  }, []);

  const totalPrice = cartItems?.reduce((total, item) => {
    return total + item.totalAmount;
  }, 0);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm  bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col transform transition-transform">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                className="w-24 h-24 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems?.map((cart) => (
                <div
                  key={cart._id}
                  className="flex gap-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={`${BASE_URL}/${cart.item.image}`}
                    alt={cart.item.title}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-black mb-1">
                      {cart.item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {cart.item.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-300">
                        <span className="px-4 py-1 border-x border-gray-300">
                          {cart.quantity}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(cart._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-black font-bold mt-2">
                      &#8377;{cart.totalAmount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems?.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between mb-4 text-lg">
              <span className="font-semibold text-black">Subtotal</span>
              <span className="font-bold text-black">&#8377;{totalPrice}</span>
            </div>
            <button className="w-full bg-black text-white py-4 font-semibold hover:bg-gray-800 transition-colors duration-300">
              Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full mt-2 border-2 border-black text-black py-4 font-semibold hover:bg-black hover:text-white transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
