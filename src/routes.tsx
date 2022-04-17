import React from "react";
import { Route, Routes } from "react-router";

import HomePage from "./pages";
import AnotherTestPage from "./pages/another-test";
import TestPage from "./pages/test";

const routes = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/another-test",
    Component: AnotherTestPage,
  },
  {
    path: "/test",
    Component: TestPage,
  },
];

export function AppRoutes() {
  return (
    <Routes>
      { routes.map((page) => (
        <Route key={page.path} path={page.path} element={(
          <page.Component/>
        )}/>
      ))}
    </Routes>
  );
}
