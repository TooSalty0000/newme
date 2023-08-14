import styles from "./css-modules/GoalList.module.css";
import React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import loader from "../assets/loader2.svg";

export default function GoalList({ userHabitData }) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/Home/new-goal");
  }, [navigate]);

  return (
    <div className={styles.GoalList}>
      {userHabitData.length == 0 ? (
        <div className="flex justify-center items-center">
          <img src={loader} alt="loader" className="w-20 h-20" />
        </div>
      ) : (
        userHabitData.map((habit, index) => {
          return (
            <div className={styles.Goal} key={index}>
              <h1>{habit.HabitName}</h1>
            </div>
          );
        })
      )}
      <button className={styles.AddButton} onClick={handleClick}>
        <span>+ New Goal + </span>
      </button>
    </div>
  );
}
