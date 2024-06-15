import  { Fragment, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useUserdetailsQuery } from "../Redux/api/userAPI";
import { decryptCode } from "../Utils/util";
import ProtectedRoute from "./ProctedRoutes/ProctedRoute";
import AllProduct from "../Pages/MainScreen/Product/AllProduct";
import Shipping from "../Pages/MainScreen/Cart/Shipping";
import AddAddress from "../Pages/MainScreen/Address/AddAddress";
import EditAddress from "../Pages/MainScreen/Address/EditAddress";
import ProctedRoute from "./ProctedRoutes/ProctedRoute";
import UserProfile from "../Pages/MainScreen/Profile/UserProfile";
import AllOrders from "../Pages/MainScreen/Profile/AllOrders";

// importing routes for main
const Home = lazy(() => import("../Pages/MainScreen/Home"));
const ProductDetails = lazy(
  () => import("../Pages/MainScreen/Product/ProductDetails")
);
const Cart = lazy(() => import("../Pages/MainScreen/Cart/Cart"));
const LoginForm = lazy(() => import("../Components/AuthComponent/Login"));
const RegisterForm = lazy(() => import("../Components/AuthComponent/Register"));

// importing routes for admin
const Dashboard = lazy(() => import("../Pages/admin/dashboard"));
const Products = lazy(() => import("../Pages/admin/products"));
const Customers = lazy(() => import("../Pages/admin/customers"));
const Transaction = lazy(() => import("../Pages/admin/transaction"));
const Barcharts = lazy(() => import("../Pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("../Pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("../Pages/admin/charts/linecharts"));

const NewProduct = lazy(() => import("../Pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("../Pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("../Pages/admin/management/transactionmanagement")
);

const Routing = () => {
  const userid = localStorage.getItem("$I") || "";
  const id = decryptCode({ token: userid }).trim().replace(/\W/g, "");

  const userdetails = useUserdetailsQuery(id);
  const role =
    userdetails.data && userdetails.data.user && userdetails.data.user.role
      ? userdetails.data.user.role
      : null;

  return (
    <Fragment>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id/:id" element={<ProductDetails />} />
          <Route path="/checkout/cart" element={<Cart />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route
            path="/product/shippinginfo"
            element={
              <ProtectedRoute isAuthnticated={userid ? true : false}>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthnticated={userid ? false : true}>
                <LoginForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addaddress"
            element={
              <ProtectedRoute isAuthnticated={userid ? true : false}>
                <AddAddress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editaddress/:id"
            element={
              <ProtectedRoute isAuthnticated={userid ? true : false}>
                <EditAddress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProctedRoute isAuthnticated={userid ? true : false}>
                <UserProfile />
              </ProctedRoute>
            }
          />
          <Route
            path="/allorders"
            element={
              <ProtectedRoute isAuthnticated={userid ? true : false}>
                <AllOrders />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterForm />} />
          {/* define routes for admin */}
          <Route
            element={
              <ProtectedRoute
                isAuthnticated={true}
                adminRoute={true}
                isAdmin={role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
       

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>
          ;
        </Routes>
      </div>
      <Toaster position="top-center" />
    </Fragment>
  );
};

export default Routing;
