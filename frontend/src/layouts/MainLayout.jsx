import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cart from "../components/Cart";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getUser } from "../redux/actions/userActions";

const MainLayout = () => {
  const userState = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLogin, setIsLogin] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const featchData = async () => {
    setLoading(true);
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    await dispatch(getUser());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    featchData();
  }, []);

  const handleRemoveCart = async (id) => {
    await dispatch(deleteCart({ cartId: id }));
    setCartItems(cartItems.filter((el) => el._id !== id));
  };

  useEffect(() => {
    setCartItems(userState?.user?.cartItems);
  }, [userState?.user]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center  items-center bg-black">
        <div className="flex justify-center items-center">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-white via-gray-700 to-white bg-[length:200%] animate-[shimmer_2s_linear_infinite] bg-clip-text text-transparent">
            SPORTX
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        isLogin={isLogin}
        cartCount={cartItems?.length}
        onCartClick={() => setIsCartOpen(true)}
        onLogout={() => {
          localStorage.removeItem("token");
          setIsLogin(false);
        }}
      />
      <Outlet />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCart}
      />
    </div>
  );
};

export default MainLayout;
