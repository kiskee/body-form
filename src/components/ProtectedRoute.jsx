import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../helpers/tokenValidator";

const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage.getItem("authToken"); // Obtén el token del almacenamiento local

  if (!isTokenValid(token)) {
    return <Navigate to="/" replace />; // Redirige al inicio si el token no es válido
  }

  return Component; // Renderiza el componente protegido
};

export default ProtectedRoute;
