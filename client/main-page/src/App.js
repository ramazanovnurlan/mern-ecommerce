import { Navigate, Route, Routes } from "react-router-dom";
import "../src/assets/scss/style.css";
// import Home from "./containers/home/Home";
import Shop from "./containers/shop/Shop";
import Detail from "./containers/detail/Detail";
// import Account from "./containers/account/Account";
import Register from "./containers/register/Register";
import Login from "./containers/login/Login";
import Favorites from "./containers/favorites/Favorites";
import Cart from "./containers/cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer style={{ width: 400 }} />
      <Routes>
        <Route path="/" element={<Navigate replace to="/shop" />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:productId" element={<Detail />} />

        {/* <Route path="/account" element={<Account />} /> */}
        <Route path="/account/register" element={<Register />} />
        <Route path="/account/login" element={<Login />} />

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route>Not Found</Route>
      </Routes>
    </>
  );
}

export default App;
