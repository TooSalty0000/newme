import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./css-modules/Login.module.css";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");

  const navigate = useNavigate();

  const { login } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("logging in user");
      await login(email, password).then((res) => {
        navigate("/Home");
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={styles.loginbase}>
      <div className={styles.loginDiv + " flex flex-col"}>
        <h1 className="flex-none text-3xl font-bold text-center">Login</h1>
        <form
          className="flex-1 flex flex-col justify-evenly content-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-center content-center">
            <label className="py-2 font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="border p-3 rounded-[15px]"
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center content-center">
            <label className="py-2 font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="border p-3 rounded-[15px]"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassowrd(e.target.value)}
            />
          </div>
          <button
            className="rounded-lg bg-highlightColor px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-highlightColorShade focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlightColor"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="flex-[0.2] text-center">
          <p> Do not have an account?</p>
          <Link to="/Signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
