import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Genre from "../pages/Genre";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Layout from "../layouts/Layout";
import AddMovie from "../components/AddMovie";
import AddGenre from "../components/AddGenre";
import EditMovie from "../components/EditMovie";
import Detail from "../pages/Detail";

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      if (!localStorage.getItem("access_token")) throw redirect("/login");
    },
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/genre",
        element: <Genre />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: `/add-movie`,
        element: <AddMovie />,
      },
      {
        path: `/add-genre`,
        element: <AddGenre />,
      },
      {
        path: `/edit-movie/:id`,
        element: <EditMovie />,
      },
      {
        path: "/movies/:id",
        element: <Detail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.getItem("access_token")) throw redirect("/");
    },
  },
]);

export default router;
