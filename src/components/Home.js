import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";
import { UserAuth } from "../context/AuthContext.js";

export default function Home() {
  const username = "Username";
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-start p-3">
        <h1 className="text-lg">New Me</h1>
        <div className="mx-3 text-lg font-bold">
          <h1>{user && user.email}</h1>
        </div>
        <button className="ml-auto justify-self-end text-lg font-bold" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </>
  );
}
