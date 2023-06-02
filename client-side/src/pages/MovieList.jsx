import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row } from "react-bootstrap";
import React from "react";
import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../stores/actions/movieAction";
import ClipLoader from "react-spinners/ClipLoader";

function MovieList() {
  const { movies, loading } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  if (loading) {
    return (
      <>
        <Container
          className="col-md-9 ms-sm-auto col-lg-10 px-md-4 "
          style={{ minHeight: "100vh", transform: "scale(95%)" }}
        >
          <Container className="text-center mt-5 mb-3">
            <h1>Loading the page...</h1>
            <ClipLoader
              color="#36d7b7"
              size={100}
              aria-label="Loading Spinner"
            />
          </Container>
        </Container>
      </>
    );
  }

  return (
    <Container>
      <Row>
        <Row className="mt-5 mb-7 text-center text-muted">
          <h2>POPULAR FILMS THIS WEEK</h2>
        </Row>
        {movies.map((el, index) => {
          return <MovieCard movie={el} />;
        })}
      </Row>
    </Container>
  );
}

export default MovieList;
