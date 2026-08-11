import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProductDetails from "./Pages/productDetails";
import ProductList from "./admin/ProductList";
import AddPrduct from "./admin/AddPrduct";
import EditProduct from "./admin/EditProduct";
import Navbar from "./components/Navbar";
import Cart from "./Pages/Cart";
import CheckoutAddress from "./Pages/CheckoutAddress";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const routerPath = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },

      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/add", element: <AddPrduct /> },
      { path: "/admin/products/update/:id", element: <EditProduct /> },
      { path: "/checkout-address", element: <CheckoutAddress /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/order-success/:id", element: <OrderSuccess /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      {" "}
      <RouterProvider router={routerPath} />;
    </>
  );
}
