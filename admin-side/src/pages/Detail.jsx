import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { movieDetailById } from "../stores/actions/moviesAction";
import ClipLoader from "react-spinners/ClipLoader";

function MovieDetail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const { movieDetail, loading } = useSelector((state) => {
    return state.moviesReducer;
  });

  const MovieCast = movieDetail?.Casts ?? [0];
  useEffect(() => {
    dispatch(movieDetailById(id));
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
      <Container
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4 "
        style={{ minHeight: "100vh", transform: "scale(95%)" }}
      >
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
    </>
  );
}

export default MovieDetail;
