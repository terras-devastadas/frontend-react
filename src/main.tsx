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
import PageProfile from "./pages/Profile/EditProfilePage.tsx";
import CreateCommunityPage from "./pages/CreateCommunity/CreateCommunityPage.tsx";
import CreateClassCommunityPage from "./pages/CreateClassCommunity/CreateClassCommunityPage.tsx";
import CreatePostPage from "./pages/CreatePost/CreatePostPage.tsx";
import CommunityPage from "./pages/Community/CommunityPage.tsx";

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
        element: <PageProfile />,
      },
      {
        path: "criar-comunidade",
        element: <CreateCommunityPage />,
      },
      {
        path: "criar-comunidade-professor",
        element: <CreateClassCommunityPage />,
      },
      {
        path: "criar-post",
        element: <CreatePostPage />,
      },
      {
        path: "comunidade/:id",
        element: <CommunityPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
