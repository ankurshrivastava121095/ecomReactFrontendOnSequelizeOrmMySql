import { Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from "./Frontend/Components/Navbar";
import Home from "./Frontend/Pages/Home";
import ProductDetail from "./Frontend/Pages/ProductDetail";
import Cart from "./Frontend/Pages/Cart";
import Login from "./Frontend/Pages/Login";
import Register from "./Frontend/Pages/Register";
import Dashboard from "./Admin/Pages/Dashboard/Dashboard";
import AdminNavbar from "./Admin/Components/Navbar";
import ProductList from "./Admin/Pages/Product/List";
import CategoryList from "./Admin/Pages/Category/List";
import Checkout from "./Frontend/Pages/Checkout";
import AdminLogin from "./Frontend/Pages/AdminLogin";
import AdminRegister from "./Frontend/Pages/AdminRegister";
import MyOrders from "./Frontend/Pages/MyOrders";
import OrderDetail from "./Frontend/Pages/OrderDetail";
import OrderList from "./Admin/Pages/Order/List";
import MyWishlist from "./Frontend/Pages/MyWishlist";
import Categories from "./Frontend/Pages/Categories";
import CategoryWiseProduct from "./Frontend/Pages/CategoryWiseProduct";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categoryProducts/:id" element={<CategoryWiseProduct />} />
          <Route path="/productDetail/:id" element={<ProductDetail pageName='Product' />} />
          <Route path="/orders" element={<MyOrders pageName='Orders' />} />
          <Route path="/wishlist" element={<MyWishlist pageName='Wishlist' />} />
          <Route path="/orderDetail/:id" element={<OrderDetail pageName='Order Detail' />} />
          <Route path="/cart" element={<Cart pageName='Cart' />} />
          <Route path="/checkout" element={<Checkout pageName='Checkout' />} />
          <Route path="/login" element={<Login pageName='Signin' />} />
          <Route path="/register" element={<Register pageName='Signup' />} />
          <Route path="/adminLogin" element={<AdminLogin pageName='Admin Signin' />} />
          <Route path="/adminRegister" element={<AdminRegister pageName='Admin Signup' />} />
        </Route>

        <Route path="/admin" element={<AdminNavbar />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<ProductList />} />
          <Route path="/admin/category" element={<CategoryList />} />
          <Route path="/admin/order" element={<OrderList />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
