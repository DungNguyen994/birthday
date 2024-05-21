import React from "react";
import ReactDOM from "react-dom/client";
import Card from "./Card.jsx";
import "./index.css";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Cake from "./Cake.jsx";
import AudioPlayer from "./AudioPlayer";

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
    <AudioPlayer src="/music.mp3" title="Cute Audio Player" />
    <RouterProvider router={router} />
  </React.StrictMode>
);
