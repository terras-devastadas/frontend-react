import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.tsx";
import HomePage from "./pages/Home/HomePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import RegistrationPage from "./pages/Registration/RegistrationPage.tsx";
import ProfilePage from "./pages/Profile/ProfilePage.tsx";
import EditProfilePage from "./pages/Profile/EditProfile.tsx";
import CreateCommunityPage from "./pages/CreateCommunity/CreateCommunityPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "cadastro",
        element: <RegistrationPage />,
      },
      {
        path: "perfil",
        element: <ProfilePage />,
      },
      {
        path: "editar-perfil",
        element: <EditProfilePage />,
      },
      {
        path: "criar-comunidade",
        element: <CreateCommunityPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
