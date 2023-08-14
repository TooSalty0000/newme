import React from "react";
import { useState } from "react";
import styles from "./css-modules/NewGoal.module.css";
import { Firestore } from "../context/StoreContext.js";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

export default function NewGoal() {
  {
    /* Needed states: Goal Name, Goal start and end date, Goal check Frequency (Daily, Weekly, Monthy)*/
  }
  const [goalName, setGoalName] = useState("");
  const [goalStartDate, setGoalStartDate] = useState("");
  const [goalEndDate, setGoalEndDate] = useState("");
  const [goalCheckFrequency, setGoalCheckFrequency] = useState("daily");
  const [goalCheckFrequencyValue, setGoalCheckFrequencyValue] = useState(1);

  const { addUserHabit } = Firestore();
  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    let goal = {
      HabitName: goalName,
      HabitStartDate: Timestamp.fromDate(new Date(goalStartDate)),
      HabitEndDate: Timestamp.fromDate(new Date(goalEndDate)),
      HabitCheckFrequency: goalCheckFrequency,
      HabitCheckFrequencyValue: goalCheckFrequencyValue,
    };
    await addUserHabit(user.uid, goal);
    navigate("/Home");
  };

  return (
    <div className={styles.NewGoal}>
      <h1 className="text-3xl text-center font-bold">New Goal</h1>
      <form className="flex flex-col justify-center items-center">
        {/* Needed inputs: Goal Name, Goal start and end date, Goal check Frequency (Daily, Weekly, Monthy)*/}
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="goalName">Goal Name</label>
          <input
            type="text"
            name="goalName"
            id="goalName"
            placeholder="Goal Name"
            onChange={(e) => {
              setGoalName(e.target.value);
            }}
            className="border-2 border-gray-400 rounded-md p-2 m-2"
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <label htmlFor="goalStartDate">Goal Start Date</label>
            <input
              type="date"
              name="goalStartDate"
              id="goalStartDate"
              className="border-2 border-gray-400 rounded-md p-2 m-2"
              onChange={(e) => {
                setGoalStartDate(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <label htmlFor="goalEndDate">Goal End Date</label>
            <input
              type="date"
              name="goalEndDate"
              id="goalEndDate"
              className="border-2 border-gray-400 rounded-md p-2 m-2"
              onChange={(e) => {
                setGoalEndDate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="goalCheckFrequency">Goal Check Frequency</label>
          <select
            name="goalCheckFrequency"
            id="goalCheckFrequency"
            className="border-2 border-gray-400 rounded-md p-2 m-2"
            onChange={(e) => {
              setGoalCheckFrequency(e.target.value);
            }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          {goalCheckFrequency === "daily" ? (
            <Daily />
          ) : goalCheckFrequency === "weekly" ? (
            <Weekly />
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center">
          <input
            type="submit"
            value="Submit"
            className={styles.submit}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

function Daily() {
  return (
    <div>
      <input
        type="number"
        name="dailyGoal"
        id="dailyGoal"
        placeholder="Daily Goal"
        min={1}
        max={24}
        className="border-2 border-gray-400 rounded-md p-2 m-2"
      />
    </div>
  );
}

function Weekly() {
  return (
    <div className="flex justify-evenly items-center">
      {/* 7 checkboxes for each day of the week */}
      <label htmlFor="sunday">S</label>
      <input
        type="checkbox"
        name="sunday"
        id="sunday"
        className="border-2 border-gray-400 rounded-md p-2 m-2"
      />
      <label htmlFor="monday">M</label>
      <input
        type="checkbox"
        name="monday"
        id="monday"
        className="border-2 border-gray-400 rounded-md p-2 m-2"
      />
      <label htmlFor="tuesday">T</label>
      <input
        type="checkbox"
        name="tuesday"
        id="tuesday"
        className="border-2 border-gray-400 rounded-md p-2 m-2"
      />
      <label htmlFor="wednesday">W</label>
      <input
        type="checkbox"
        name="wednesday"
        id="wednesday"
        className="border-2 border-gray-400 rounded-md p-2 m-2"
      />
      <label htmlFor="thursday">T</label>
      <input
        type="checkbox"
        name="thursday"
        id="thursday"
        className="border-2 border-gray-400 rounded-md p-2 m-2"
      />
      <label htmlFor="friday">F</label>
      <input
        type="checkbox"
        name="friday"
        id="friday"
        className="border-2 border-gray-400 rounded-md p-2 m-2"
      />
      <label htmlFor="saturday">S</label>
      <input
        type="checkbox"
        name="saturday"
        id="saturday"
        className="border-2 border-gray-400 rounded-md p-2 m-2"
      />
    </div>
  );
}
