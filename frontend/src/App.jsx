import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import AddProduct from "./pages/AddProduct";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import MainLayout from "./layouts/MainLayout";
import Categories from "./pages/Categories";
import View from "./pages/View";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/view/:category" element={<View />} />
        <Route path="/categories" element={<Categories />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addProduct" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
