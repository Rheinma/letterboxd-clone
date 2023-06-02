import { Button, Form, Row, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { useState } from "react";
import { BASE_URL } from "../stores/actionTypes/actionTypes";

function Register() {
  const [input, setInputRegister] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputRegister({
      ...input,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL + `/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(input),
      });
      let data = await response.json();
      if (data.err) throw data.message;
      setInputRegister({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Register new admin success!",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops, something's wrong!",
        text: err,
      });
    }
  };

  return (
    <Container
      className="col-md-9 ms-sm-auto col-lg-10 px-md-4 "
      style={{ minHeight: "100vh", transform: "scale(90%)" }}
    >
      {/* <Col className="col-md-9 ms-sm-auto col-lg-10 px-md-4"> */}
      <Row>
        <Row className="justify-content-start">
          {" "}
          <h1 className="mb-4 ">Register New Admin</h1>
          <h4 className="">Personal Information</h4>
          <h6 className="mb-4 ">
            Use a permanent address where you can receive mail.
          </h6>
        </Row>
        <Row className="justify-content-start">
          <Form onSubmit={handleOnSubmit}>
            <Row className="mb-3">
              <Form.Group ontrolId="formGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={input.username}
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Username"
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group controlId="formGridEmail">
                <Form.Label className="">Email</Form.Label>
                <Form.Control
                  name="email"
                  value={input.email}
                  onChange={handleOnChange}
                  type="email"
                  placeholder="Email"
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group controlId="formGridPassword">
                <Form.Label className="">Password</Form.Label>
                <Form.Control
                  name="password"
                  value={input.password}
                  onChange={handleOnChange}
                  type="password"
                  placeholder="Password"
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group controlId="formGridPhoneNumber">
                <Form.Label className="">Phone Number</Form.Label>
                <Form.Control
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Phone number"
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group controlId="formGridAddress">
                <Form.Label className="">Address</Form.Label>
                <Form.Control
                  name="address"
                  value={input.address}
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Address"
                  className="mb-3"
                />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Row>
      {/* </Col> */}
    </Container>
  );
}

export default Register;
