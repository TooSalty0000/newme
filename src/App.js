// import logo from './logo.svg';
import "./App.css";
import { useState } from "react";
import Main from "./components/Main.js";
import Login from "./components/Login.jsx";
import SignUp from "./components/Signup.jsx";
import Home from "./components/Home.js";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/Home" element={<Home />}></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
