import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="dark" expand="lg" style={{ height: 70 }}>
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="#home">
          <img
            src={process.env.PUBLIC_URL + "/assets/letterboxd-logo-dark.png"}
            width="200"
            height="auto"
            className="d-flex-inline-block align-top"
            alt="Letterboxd logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end align-items-center">
          <Nav className="justify-content-center">
            <Link to="/movies" className="nav-link text-white" href="#films">
              FILMS
            </Link>
            <Nav.Link
              className="nav-list-link text-white small"
              href="https://letterboxd.com/lists/"
            >
              LISTS
            </Nav.Link>
            <Nav.Link
              className="nav-list-link text-white small"
              href="https://letterboxd.com/members/"
            >
              MEMBERS
            </Nav.Link>
            <Nav.Link
              className="nav-list-link text-white small"
              href="https://letterboxd.com/journal/"
            >
              JOURNAL
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
