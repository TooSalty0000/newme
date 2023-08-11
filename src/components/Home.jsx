// utilities
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLoaderData } from "react-router-dom";
import { auth } from "../firebase.js";
import { UserAuth } from "../context/AuthContext.js";
import { Firestore } from "../context/StoreContext.js";
import loader from "../assets/loader.svg";
import styles from "./css-modules/Home.module.css";

// components
import Calender from "./Calender.jsx";
import Daystats from "./Daystats.jsx";
import Badges from "./Badges.jsx";

export default function Home() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const { getUserData, getUserHabits } = Firestore();
  const [userData, setUserData] = useState({});
  const [userHabitData, setUserHabitData] = useState([]);
  const [dateFocused, setDateFocused] = useState(Date());
  const [minMaxDate, setMinMaxDate] = useState([Date(), Date()]);
  const [monthFocused, setMonthFocused] = useState(
    parseInt(new Date().getMonth()) + 1
  );
  const [currentMonthHabits, setCurrentMonthHabits] = useState([]);

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
        getUserData(user.uid).then((res) => {
          console.log(res);
          setUserData(res);
          getUserHabitData();
          return true;
        });
      }
      return false;
    };

    const getUserHabitData = async () => {
      if (user.uid !== undefined) {
        getUserHabits(user.uid, monthFocused).then((res) => {
          console.log(res);
          setUserHabitData(res);
          handleMonthChange(res);
        });
      }
    };

    if (getUser()) {
      console.log("user data loaded");
    } else {
      console.log("user data not loaded");
      navigate("/");
    }
  }, [user]);

  const handleMonthChange = (userHabitData) => {
    console.log(userHabitData);
    let dataFromMonth = [];
    userHabitData.forEach((habit) => {
      let startTime = new Date(habit.startTime.seconds * 1000);
      let endTime = new Date(habit.endTime.seconds * 1000);
      console.log(startTime, endTime);
      if (startTime <= dateFocused[2] && endTime >= dateFocused[1]) {
        dataFromMonth.push(habit);
      }
    });
    console.log(dataFromMonth);
    setCurrentMonthHabits(dataFromMonth);
  };

  useEffect(() => {
    handleMonthChange(userHabitData);
  }, [monthFocused]);

  useEffect(() => {
    let d = new Date(dateFocused[0]);
    console.log(dateFocused);
    setMonthFocused(parseInt(d.getMonth()) + 1);
  }, [dateFocused]);

  if (!userData?.loaded) {
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
        <button
          className="ml-auto justify-self-end text-lg font-bold"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-center items-center">
        {/* left */}
        <div className={styles.section + " " + styles.left}>
          {/* Top */}
          <div className="flex flex-[3] justify-center min-w-full p-6 transition-all">
            <Calender
              setDateFocused={setDateFocused}
              setMinMaxDate={setMinMaxDate}
            />
            <Daystats />
          </div>
          {/* Bottom */}
          <div className="flex-[1] w-full">
            <Badges />
          </div>
        </div>
        {/* right */}
        <div className={styles.section + " " + styles.right}>
          <div className={styles.nav}>
            <h1 className="text-3xl font-bold">My Goals</h1>
          </div>
        </div>
      </div>
    </>
  );
}
