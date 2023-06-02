import { SET_GENRES, BASE_URL } from "../actionTypes/actionTypes";
import Swal from "sweetalert2";

export function setGenres(data) {
  return {
    type: SET_GENRES,
    payload: data,
  };
}

export function fetchGenres() {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + `/movies/genres`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (!response.ok) {
        throw new Error(`Something's wrong!`);
      }

      const genres = await response.json();

      dispatch(setGenres(genres));
    } catch (error) {
    }
  };
}

export function createGenre(genre) {
  return async function (dispatch) {
    try {
      let response = await fetch(BASE_URL + `/movies/genres`, {
        method: "POST",
        body: JSON.stringify(genre),
        headers: {
          access_token: localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        response = await response.json();
        throw response.message;
      }
      successSwal("New genre is created successfully");
      dispatch(fetchGenres());
    } catch (error) {
      errorSwal(error);
    }
  };
}

export function deleteGenre(id) {
  return (dispatch) => {
    try {
      confirmSwal().then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetch(BASE_URL + `/movies/genres/${id}`, {
            method: "DELETE",
            headers: { access_token: localStorage.getItem("access_token") },
          });
          if (!response.ok) {
            throw new Error("Internal Server Error");
          }
          Swal.fire("Deleted!", "Genre is deleted successfully", "success");
          dispatch(fetchGenres());
        }
      });
    } catch (err) {
      errorSwal(err);
    }
  };
}

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
