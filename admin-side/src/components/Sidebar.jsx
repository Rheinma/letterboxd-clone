import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Sidebar() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    Swal.fire("You have been logged out!");
    navigate(`/login`);
  };

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse "
    >
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Nav.Link
              onClick={() => navigate(`/`)}
              className="nav-link text-white small"
            >
              Dashboard
            </Nav.Link>
          </li>
          <li className="nav-item">
            <Nav.Link
              onClick={() => navigate(`/genre`)}
              className="nav-link text-white small"
            >
              Genre
            </Nav.Link>
          </li>
          <li className="nav-item">
            <Nav.Link
              onClick={() => navigate(`/register`)}
              className="nav-link text-white small"
            >
              Register Admin
            </Nav.Link>
          </li>
          <li className="nav-item">
            <Nav.Link
              onClick={() => logOut()}
              className="nav-link text-white small"
              href="#login"
            >
              Sign Out
            </Nav.Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
