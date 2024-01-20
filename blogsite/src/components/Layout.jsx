import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div>
      <a id="Home" />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}