import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Card, Container, Row } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import { movieDetail } from "../stores/actions/movieAction";

function MovieDetail() {
  const dispatch = useDispatch();
  let { slug } = useParams();
  const { oneMovie, loading } = useSelector((state) => {
    return state;
  });

  const MovieGenre = oneMovie?.Genre?.name;

  const MovieCast = oneMovie?.Casts ?? [0];
  useEffect(() => {
    dispatch(movieDetail(slug));
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
    <>
      <Container className="container-fluid ">
        <Container className="mt-3 mb-3" />
        <Col className="mt-5" key={oneMovie.id}>
          <Row className="d-flex justify-content-center">
            <Col className="col-4">
              <Card.Img
                className="mb-3 d-flex align-items-center justify-content-center"
                variant="top"
                style={{ width: "22rem" }}
                src={oneMovie.imageUrl}
              />
            </Col>

            <Col className="col-5">
              <div className="box-body">
                <h2>{oneMovie.title}</h2>
                <p className="posted"> Rating: {oneMovie.rating}/5</p>
                <p className="text">Genre: {MovieGenre}</p>
                <p className="text">{oneMovie.synopsis}</p>
                <div className="cl">&nbsp;</div>
                <h4 style={{ color: "white" }}>Trailer</h4>
                <div>
                  <iframe
                    src={oneMovie.trailerUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Container />
        <Container>
          <Row className="d-flex justify-content-center">
            <h2 className="text-center">{movieDetail.title}</h2>
            <h3 className="text-center">Cast List</h3>
            <div
              id="rowDetail"
              className="row d-flex align-items-center justify-content-center"
            >
              {MovieCast.map((el) => {
                return (
                  <div
                    className="card m-3 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: "black", width: "13rem" }}
                  >
                    <img
                      id="imgCast"
                      className="p-2 d-flex align-items-center justify-content-center"
                      src={el.profilePict}
                      alt="Card image cap"
                      variant="top"
                      style={{ height: 300 }}
                    />
                    <div className="card-body">
                      <h6 className="card-title text-light">{el.name}</h6>
                    </div>
                  </div>
                );
              })}
            </div>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default MovieDetail;
