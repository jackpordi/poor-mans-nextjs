import React from "react"
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes";

const rootNode = document.getElementById("root")!;

ReactDOM.hydrateRoot(
  rootNode,
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>,
);
