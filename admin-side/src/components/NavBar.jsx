import { Navbar } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Navbar.Brand href="#home">
        <img
          src={process.env.PUBLIC_URL + "/assets/letterboxd-logo-dark.png"}
          height="auto"
          width="300"
          className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
          alt="Letterboxd logo"
        />
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-center"></Navbar.Collapse>
    </Navbar>
  );
}
