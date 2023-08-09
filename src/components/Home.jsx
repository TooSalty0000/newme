import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLoaderData } from "react-router-dom";
import { auth } from "../firebase.js";
import { UserAuth } from "../context/AuthContext.js";
import { Firestore } from "../context/StoreContext.js";
import loader from "../assets/loader.svg";

export default function Home() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const { getUserData } = Firestore();
  const [userData, setUserData] = useState({});


  

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      if (user.uid !== undefined) {
        console.log(user);
        getUserData(user.uid).then((res) => {
          setUserData(res);
        });
      }
    };
    getUser();
  }, [user]);

  if (!userData.loaded) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <img src={loader} alt="loader" className="w-20 h-20" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-start p-3">
        <h1 className="text-lg">New Me</h1>
        <div className="mx-3 text-lg font-bold">
          <h1>{user && userData.username}</h1>
        </div>
        <button className="ml-auto justify-self-end text-lg font-bold" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </>
  );
}
