import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Card from "./Card.jsx";
import "./index.css";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Cake from "./Cake.jsx";

const router = createMemoryRouter([
  {
    path: "/",
    element: <Cake />,
  },
  {
    path: "/card",
    element: <Card />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
