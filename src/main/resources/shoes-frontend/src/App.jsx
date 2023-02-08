import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div
      style={{
        backgroundColor: "rgb(240, 240, 240)",
        height: "100%",
        width: "100%",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/single-product" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
