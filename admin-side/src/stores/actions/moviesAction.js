import {
  SET_MOVIES,
  SET_MOVIE_DETAIL,
  BASE_URL,
  SET_MOVIE_DETAIL_SLUG,
  SET_LOADING,
} from "../actionTypes/actionTypes";
import Swal from "sweetalert2";

export function setMovies(data) {
  return {
    type: SET_MOVIES,
    payload: data,
  };
}

export function setMovieDetail(data) {
  return {
    type: SET_MOVIE_DETAIL,
    payload: data,
  };
}

export function setMovieDetailSlug(data) {
  return {
    type: SET_MOVIE_DETAIL_SLUG,
    payload: data,
  };
}

export function loadingProduct(loading) {
  return {
    type: SET_LOADING,
    loading: loading,
  };
}

export function fetchMovies() {
  return async (dispatch) => {
    dispatch(loadingProduct(true));
    try {
      const response = await fetch(BASE_URL + `/movies`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (!response.ok) {
        throw new Error(`Something's wrong!`);
      }

      const movies = await response.json();

      dispatch(setMovies(movies));
    } catch (error) {
      errorSwal(error);
    } finally {
      dispatch(loadingProduct(false));
    }
  };
}

export function createMovie(movie) {
  return async (dispatch) => {
    try {
      let response = await fetch(BASE_URL + `/movies`, {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          access_token: localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        response = await response.json();
        throw response.message;
      }
      successSwal("New movie is created successfully");
      dispatch(fetchMovies());
    } catch (error) {
      errorSwal(error);
    }
  };
}

export function deleteMovie(id) {
  return (dispatch) => {
    try {
      confirmSwal().then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetch(BASE_URL + `/movies/${id}`, {
            method: "DELETE",
            headers: { access_token: localStorage.getItem("access_token") },
          });
          if (!response.ok) {
            throw new Error("Internal Server Error");
          }
          Swal.fire("Deleted!", "Movie is deleted successfully", "success");
          dispatch(fetchMovies());
        }
      });
    } catch (err) {
      errorSwal(err);
    }
  };
}

export function updateMovie(movie, id) {
  return async (dispatch) => {
    try {
      let response = await fetch(BASE_URL + `/movies/${id}`, {
        method: "PUT",
        headers: {
          access_token: localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });
      if (!response.ok) {
        response = await response.json();
        throw response.message;
      }
      successSwal("Movie is updated successfully");
      dispatch(fetchMovies());
    } catch (err) {
      errorSwal(err);
    }
  };
}

export const movieDetailById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingProduct(true));
      let response = await fetch(BASE_URL + `/movies/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (!response.ok) {
        response = await response.json();
        throw response.message;
      }
      const data = await response.json();
      dispatch(setMovieDetail(data));
    } catch (err) {
      errorSwal(err);
    } finally {
      dispatch(loadingProduct(false));
    }
  };
};

function successSwal(message) {
  Swal.fire({
    position: "center",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

function errorSwal(message) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  });
}

function confirmSwal() {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, I'm sure!",
  });
}
