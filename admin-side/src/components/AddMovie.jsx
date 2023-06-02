import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "../stores/actions/genresAction";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { createMovie } from "../stores/actions/moviesAction";
import { useNavigate } from "react-router-dom";

function AddMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { genres } = useSelector((state) => {
    return state.genresReducer;
  });

  const [form, setForm] = useState({
    title: "",
    rating: "",
    synopsis: "",
    GenreId: "",
    imageUrl: "",
    trailerUrl: "",
    profilePict1: "",
    profilePict2: "",
    profilePict3: "",
    name1: "",
    name2: "",
    name3: "",
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
    dispatch(createMovie(form)).then(() => {
      navigate("/");
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
            <h1 className="text-center mb-5">Create movie</h1>

            <Form onSubmit={handleSubmit}>
              {/* Movie Name */}
              <Form.Group className="mb-3">
                <Form.Label>Movie Title</Form.Label>
                <Form.Control
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              {/* Synopsis */}
              <Form.Group className="mb-3">
                <Form.Label>Synopsis</Form.Label>
                <Form.Control
                  name="synopsis"
                  value={form.synopsis}
                  onChange={handleChange}
                  as="textarea"
                  rows={3}
                  placeholder=""
                />
              </Form.Group>

              {/* Rating */}
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  type="number"
                  placeholder=""
                />
              </Form.Group>

              {/* Select option */}
              <Form.Group className="mb-3">
                <Form.Label>Genre</Form.Label>

                <Form.Select
                  name="GenreId"
                  value={form.GenreId}
                  onChange={handleChange}
                >
                  {genres.map((el, index) => {
                    return (
                      <option value={el.id} key={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              {/* Image URL */}
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              {/* Trailer URL */}
              <Form.Group className="mb-3">
                <Form.Label>Trailer URL</Form.Label>
                <Form.Control
                  name="trailerUrl"
                  value={form.trailerUrl}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              {/* CAST PHOTO & NAME */}
              <Row>
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="formGridAddress1"
                >
                  <Form.Label>Cast Name</Form.Label>
                  <Form.Control
                    name="name1"
                    value={form.name1}
                    onChange={handleChange}
                    type="text"
                    placeholder=""
                  />
                  <br />
                  <Form.Control
                    name="name2"
                    value={form.name2}
                    onChange={handleChange}
                    type="text"
                    placeholder=""
                  />
                  <br />
                  <Form.Control
                    name="name3"
                    value={form.name3}
                    onChange={handleChange}
                    type="text"
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="formGridAddress1"
                >
                  <Form.Label>Cast Photo</Form.Label>
                  <Form.Control
                    name="profilePict1"
                    value={form.profilePict1}
                    onChange={handleChange}
                    type="text"
                    placeholder=""
                  />
                  <br />
                  <Form.Control
                    name="profilePict2"
                    value={form.profilePpict2}
                    onChange={handleChange}
                    type="text"
                    placeholder=""
                  />
                  <br />
                  <Form.Control
                    name="profilePict3"
                    value={form.profilePict3}
                    onChange={handleChange}
                    type="text"
                    placeholder=""
                  />
                  <br />
                </Form.Group>
              </Row>

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

export default AddMovie;
