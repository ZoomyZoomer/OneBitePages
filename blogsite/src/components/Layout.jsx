import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
    return(
        <main>
            <a id="Home"/>
            <Navbar />
            <Outlet />
        </main>
    )

    
}