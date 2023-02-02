import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single-product" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
