import React from "react";
import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./Root";
import Login from "./components/auth/login/Login"
import Register from "./components/auth/registration/Register"
import Dashboard from "./components/dashboard/dashboard"

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index={true} element={<Login />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<Dashboard/>} />{" "}
      <Route path="/" exact element={<Login/>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
