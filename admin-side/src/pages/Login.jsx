import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../stores/actionTypes/actionTypes";
import Swal from "sweetalert2";

function Login() {
  const [input, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputLogin({
      ...input,
      [name]: value,
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(BASE_URL + `/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      let data = await response.json();
      if (data.err) throw data.message;
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.username);
      navigate("/");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Log in success!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
      });
    }
  };
  return (
    <Container
      fluid
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "black" }}
      id="login-section"
    >
      <Container
        className="container h-50 justify-content-center align-items-center"
        style={{ transform: "scale(90%)" }}
      >
        <Row className="d-flex justify-content-center align-items-center">
          <Form
            onSubmit={handleOnSubmit}
            className="w-50 p-3 m-auto rounded-4 mt-5 justify-content-center align-items-center"
          >
            <Row className="d-flex justify-content-center align-items-center">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/Letterboxd_vertical_logo.png"
                }
                width="500"
                height="auto"
                alt="Logo"
                className="d-flex align-items-center justify-content-center"
              />
            </Row>
            <h1 className="text-center mb-4 text-light">
              Sign in to your account
            </h1>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="text-light">Email address</Form.Label>
                <Form.Control
                  value={input.email}
                  onChange={handleOnChange}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="text-light">Password</Form.Label>
                <Form.Control
                  value={input.password}
                  onChange={handleOnChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </Container>
  );
}

export default Login;
