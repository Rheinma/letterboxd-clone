import { useDispatch } from "react-redux";
import { createGenre, fetchGenres } from "../stores/actions/genresAction";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddGenre() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    createdAt: "2023-05-19 22:28:47.388+07",
    updatedAt: "2023-05-19 22:28:47.388+07",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createGenre(form)).then(() => {
      navigate("/genre");
    });
  };

  return (
    <>
      <Container
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4 "
        style={{ minHeight: "100vh", transform: "scale(95%)" }}
      >
        <Row>
          <Col className="mt-5 bg-light">
            <h1 className="text-center mb-5">Create new genre</h1>

            <Form onSubmit={handleSubmit}>
              {/* Genre Name */}
              <Form.Group className="mb-3">
                <Form.Label>Genre Name</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddGenre;
