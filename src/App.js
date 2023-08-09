// import logo from './logo.svg';
import "./App.css";
import { useState } from "react";
import Login from "./components/Login.jsx";
import SignUp from "./components/Signup.jsx";
import Home, { } from "./components/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Error from "./components/Error";
import {
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { StoreContextProvider } from "./context/StoreContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Login" />,
  },
  { path: "/Login", element: <Login /> },
  { path: "/SignUp", element: <SignUp /> },
  {
    path: "/Home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <Error /> },
]);

function App() {
  return (
    <div>
      <AuthContextProvider>
        <StoreContextProvider>
          <RouterProvider router={router} />
        </StoreContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
