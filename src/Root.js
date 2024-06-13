import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Nav from "./components/Navbar/Nav";

export default function Root() {
  return (
    <AuthProvider>
      <Nav />
    </AuthProvider>
  );
}
