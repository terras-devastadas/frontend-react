import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import HomePage from "./pages/Home/HomePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import RegistrationPage from "./pages/Registration/RegistrationPage.tsx";
import CreateClassCommunityPage from "./pages/CreateClassCommunity/CreateClassCommunityPage.tsx";
import CreateClassCommunityPageCopy from "./pages/CreateClassCommunity copy/CreateClassCommunityPageCopy.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
        path: "registration",
        element: <RegistrationPage />,
      },
      {
        path: "createClassCommunity",
        element: <CreateClassCommunityPage />,
      },
      {
        path: "teste",
        element: <CreateClassCommunityPageCopy />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
