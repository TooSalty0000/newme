import { useEffect, useState } from "react";
import Habit from "./Habit.jsx";
import styles from "./css-modules/Daystats.module.css";

export default function Daystats({ dateFocused, monthHabitData }) {
  const [habitsToShow, setHabitsToShow] = useState([]);

  const changeDisplayHabits = () => {
    let toShow = [];
    monthHabitData.forEach((habit) => {
      let startDate = new Date(habit.HabitStartDate.seconds * 1000).getTime();
      let endDate = new Date(habit.HabitEndDate.seconds * 1000).getTime();
      if (startDate <= dateFocused && endDate >= dateFocused) {
        toShow.push(habit);
      }
    });
    setHabitsToShow(toShow);
  };

  useEffect(() => {
    changeDisplayHabits();
  }, [dateFocused, monthHabitData]);

  return (
    <div className={styles["dayStat-Container"]}>
      <h1 className="text-4xl font-bold text-center">Stats</h1>
      <div className="mt-[2.5rem]">
        {habitsToShow.length == 0 ? (
          <h1>No Goals for today</h1>
        ) : (
          habitsToShow.map((habit, index) => {
            return <Habit key={index} habit={habit} />;
          })
        )}
      </div>
    </div>
  );
}
