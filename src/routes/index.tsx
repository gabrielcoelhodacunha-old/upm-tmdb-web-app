import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppRoute from "./app"
import IRoute from "./IRoute"

const routes = [
  AppRoute
]

function renderRoute(
  {index, path, element, children} : IRoute
) {
  return (
    <Route index={index} path={path} element={element} key={`route-${path}`}>
      {children && children.map(renderRoute)}
    </Route>
  )
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(renderRoute)}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes