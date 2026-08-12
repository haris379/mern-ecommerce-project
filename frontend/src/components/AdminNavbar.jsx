import { Link } from "react-router";

const AdminNavbar = () => {
  return (
    <>
      <nav className="bg-gray-900 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>

          <div className="flex gap-6">
            <Link to="/admin/products">Products</Link>

            <Link to="/admin/products/add">Add Product</Link>

            <Link to="/">Back to Store</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
