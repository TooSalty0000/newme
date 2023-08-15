import React from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.js";
import loader from "../assets/loader.svg";

const ProtectedRoute = ({ children }) => {
  const { user, authLoaded } = UserAuth();
  const userData = useLoaderData();

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { userData });
    }
    return child;
  });

  return !authLoaded ? (
    <div className="flex h-[60vh] justify-center items-center">
      <img src={loader} alt="loader" className="w-20 h-20" />
    </div>
  ) : user ? (
    childrenWithProps
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
