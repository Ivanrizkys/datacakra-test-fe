import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Login = lazy(() => import("@/components/pages/Login"));
const Register = lazy(() => import("@/components/pages/Register"));

const Profile = lazy(() => import("@/components/pages/Profile"));
const Dashboard = lazy(() => import("@/components/pages/Dashboard"));
const TouristDetail = lazy(() => import("@/components/pages/TouristDetail"));

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/tourist/:id",
      element: <TouristDetail />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/register",
      element: <Register />,
    },
  ]);
};

export default Routes;
