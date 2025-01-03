import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="max-w-screen-lg m-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
