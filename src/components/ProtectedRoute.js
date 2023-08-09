import React from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.js";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  const userData = useLoaderData();
  
  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { userData });
    }
    return child;
  });
  
  return user ? (
    childrenWithProps
  ) : (
    <Navigate to="/" />
  );
}

export default ProtectedRoute;