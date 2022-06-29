import { Route, Routes } from "react-router-dom";
import Register from "./containers/register/Register";
import Login from "./containers/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListProducts from "./containers/ListProducts/ListProducts";
import AddProduct from "./containers/AddProduct/AddProduct";
import EditProduct from "./containers/EditProduct/EditProduct";

function App() {
  return (
    <>
      <ToastContainer style={{ width: 400 }} />
      <Routes>
        <Route path="admin/admin-register" element={<Register />} />
        <Route path="admin/admin-login" element={<Login />} />

        <Route path="admin/listProducts" element={<ListProducts />} />
        <Route path="admin/addProduct" element={<AddProduct />} />
        <Route path="admin/editProduct" element={<EditProduct />} />
        <Route>Not Found</Route>
      </Routes>
    </>
  );
}

export default App;
