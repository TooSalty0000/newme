// utilities
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.js";
import { Firestore } from "../context/StoreContext.js";
import { Timestamp } from "firebase/firestore";
import loader from "../assets/loader.svg";
import styles from "./css-modules/Home.module.css";

// components
import Calender from "./Calender.jsx";
import Daystats from "./Daystats.jsx";
import Badges from "./Badges.jsx";
import GoalList from "./GoalList.jsx";
import { get } from "jquery";

export default function Home() {
  const { user, authLoaded } = UserAuth();
  const [loaded, setLoaded] = useState(false);
  const { getUserData, getUserHabits } = Firestore();
  const [userData, setUserData] = useState({});
  const [userHabitData, setUserHabitData] = useState([]);
  const [dateFocused, setDateFocused] = useState(Date());
  const [minMaxDate, setMinMaxDate] = useState([new Date(), new Date()]);
  const [monthFocused, setMonthFocused] = useState(
    parseInt(new Date().getMonth()) + 1
  );
  const [currentMonthHabits, setCurrentMonthHabits] = useState([]);

  useEffect(() => {
    loadData();
  }, [user]);

  useEffect(() => {
    setDateFocused(new Date().setHours(0, 0, 0, 0));
    handleMonthChange(userHabitData);
  }, [userHabitData]);

  useEffect(() => {
    if (userHabitData.length > 0) {
      handleMonthChange(userHabitData);
    }
  }, [minMaxDate]);

  useEffect(() => {
    let d = new Date(dateFocused[0]);
    setMonthFocused(parseInt(d.getMonth()) + 1);
  }, [dateFocused]);

  const getUser = async () => {
    setLoaded(false);
    if (user.uid !== undefined) {
      console.log("uid", user.uid);
      let res = await getUserData(user.uid);
      setUserData(res);
      let res2 = await getUserHabitData(res);
      setUserHabitData(res2);
      setLoaded(true);
      setDateFocused(new Date().setHours(0, 0, 0, 0));
      return true;
    }
    return false;
  };

  const getUserHabitData = async (_userData) => {
    if (user.uid !== undefined) {
      let lastUpdate = localStorage.getItem("lastUpdate", new Date());
      let lastUpdateFromDB = new Date(_userData.lastUpdate.seconds * 1000);
      if (lastUpdate == lastUpdateFromDB) {
        let _userHabitData = JSON.parse(localStorage.getItem("userHabitData"));
        return _userHabitData;
      }
      let res = await getUserHabits(user.uid, monthFocused);
      localStorage.setItem(
        "lastUpdate",
        new Date(_userData.lastUpdate.seconds * 1000)
      );
      localStorage.setItem("userHabitData", JSON.stringify(res));
      return res;
    }
    return undefined;
  };

  const loadData = async () => {
    if (getUser()) {
      console.log("user data loaded");
      console.log("user", user);
    } else {
      console.log("user data not loaded");
    }
  };

  const handleDateFocus = (date) => {
    setDateFocused(date);
  };

  const handleMinMaxDate = (minMax) => {
    setMinMaxDate([minMax[0], minMax[1]]);
  };

  const handleMonthChange = (userHabitData) => {
    let dataFromMonth = [];
    userHabitData.forEach((habit) => {
      let startTime = new Date(habit.HabitStartDate.seconds * 1000).getTime();
      let endTime = new Date(habit.HabitEndDate.seconds * 1000).getTime();
      if (
        startTime <= minMaxDate[1].getTime() &&
        endTime >= minMaxDate[0].getTime()
      ) {
        dataFromMonth.push(habit);
      }
    });
    setCurrentMonthHabits(dataFromMonth);
  };

  // if (!loaded) {
  //   return (
  //     <div className="flex flex-col justify-center items-center h-screen">
  //       <img src={loader} alt="loader" className="w-20 h-20" />
  //     </div>
  //   );
  // }

  return (
    <div className="flex justify-center items-center">
      {/* left */}
      <div className={styles.section + " " + styles.left}>
        {/* Top */}
        {!loaded ? (
          <div className="flex h-[60vh] justify-center items-center">
            <img src={loader} alt="loader" className="w-20 h-20" />
          </div>
        ) : (
          <div className="flex flex-col justify-center min-w-full p-6 transition-all xl:flex-row">
            <Calender
              dateFocused={dateFocused}
              setDateFocused={handleDateFocus}
              setMinMaxDate={handleMinMaxDate}
            />
            <Daystats
              dateFocused={dateFocused}
              monthHabitData={currentMonthHabits}
            />
          </div>
        )}

        {/* Bottom */}
        <div className="w-full px-6">
          <Badges />
        </div>
      </div>
      {/* right */}
      <div className={styles.section + " " + styles.right}>
        <div className={styles.nav}>
          <h1 className="text-3xl font-bold">My Goals</h1>
          <GoalList userHabitData={userHabitData} />
        </div>
      </div>
    </div>
  );
}
