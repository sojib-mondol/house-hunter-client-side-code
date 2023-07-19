import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main/Main";
import Home from "../pages/home/Home";
import PageNotFound from "../pages/shared/pageNotFound/PageNotFound";
import SignUp from "../pages/shared/signUp/SignUp";
import Login from "../pages/shared/login/Login";
import Dashboard from "../pages/dashboard/dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import AddHouse from "../pages/addHouse/AddHouse";
import UpdateHouse from "../pages/updateHouse/UpdateHouse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-house",
        element: (
          <PrivateRoutes>
            <AddHouse></AddHouse>
          </PrivateRoutes>
        ),
      },
      {
        path: "/update-house/:id",
        element: <PrivateRoutes><UpdateHouse></UpdateHouse></PrivateRoutes>
      },
    ],
  },
]);

export default router;
