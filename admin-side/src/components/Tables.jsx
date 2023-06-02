import RowsMovie from "../components/RowsMovie";
import RowsGenre from "../components/RowsGenre";
import { Table, Container } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../stores/actions/moviesAction";
import { fetchGenres } from "../stores/actions/genresAction";
import ClipLoader from "react-spinners/ClipLoader";

export default function Tables(props) {
  const dispatch = useDispatch();
  const { status, head } = props;
  const { movies, loading } = useSelector((state) => {
    return state.moviesReducer;
  });

  const { genres } = useSelector((state) => {
    return state.genresReducer;
  });

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchGenres());
  }, []);

  let tBody;
  const tHead = head.map((e, i) => {
    return <th key={i + "x"}>{e}</th>;
  });
  if (status === "dashboard") {
    tBody = movies.map((e, i) => <RowsMovie key={e.id} movie={e} no={i} />);
  } else {
    tBody = genres.map((e, i) => <RowsGenre key={e.id} genre={e} no={i} />);
  }

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
    <div>
      <br />
      <Table bordered hover width="100%" className="table w-full">
        <thead>
          <tr>{tHead}</tr>
        </thead>
        <tbody className="max-w-xs">{tBody}</tbody>
      </Table>
    </div>
  );
}
