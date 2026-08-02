import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProductDetails from "./Pages/productDetails";
import ProductList from "./admin/ProductList";
import AddPrduct from "./admin/AddPrduct";
import EditProduct from "./admin/EditProduct";
import Navbar from "./components/Navbar";

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

      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/add", element: <AddPrduct /> },
      { path: "/admin/products/update/:id", element: <EditProduct /> },
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
