import React from "react";
import { useState } from "react";
import styles from "./css-modules/Signup.module.css";
import { UserAuth } from "../context/AuthContext.js";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(createUser);
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      try {
        console.log("creating user");
        await createUser(email, password);
      } catch (err) {
        setError("Failed to create an account");
        console.log(err.message);
      }
    }
  };

  return (
    <div className={styles.signupBase}>
      <div className={styles.signupDiv + " flex flex-col"}>
        <h1 className="flex-none text-3xl font-bold">Login</h1>
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
            <label className="py-2 font-medium" htmlFor="username">
              Username
            </label>
            <input
              className="border p-3 rounded-[15px]"
              type="text"
              id="email"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
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
          <div className="flex flex-col justify-center content-center">
            <label className="py-2 font-medium" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="border p-3 rounded-[15px]"
              type="password"
              id="password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="h-[50px] rounded-lg bg-highlightColor px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-highlightColorShade focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlightColor"
            type="submit"
          >
            Make Account
          </button>
        </form>
      </div>
    </div>
  );
}
