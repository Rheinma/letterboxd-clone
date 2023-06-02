import NavBar from "../components/NavBar";
import SideBar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="container-fluid" style={{ minHeight: "100vh" }}>
        <div className="row">
          <SideBar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
