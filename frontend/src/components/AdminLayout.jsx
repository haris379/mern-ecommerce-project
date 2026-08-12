import { Outlet } from "react-router";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (<>
  <AdminNavbar/>
  <Outlet/>
  </>);
};

export default AdminLayout;
