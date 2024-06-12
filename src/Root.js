import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider  } from "./context/AuthContext";
import Nav from "./components/Navbar/Nav";

export default function Root() {
  return (
    <AuthProvider>
      <Nav/>
      <Outlet />
    </AuthProvider>
  );
}
