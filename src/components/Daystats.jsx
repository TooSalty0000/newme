import Habit from "./Habit.jsx";
import styles from "./css-modules/Daystats.module.css";


export default function Daystats() {
  return (
    <div className={styles["dayStat-Container"]}>
      <h1 className="text-4xl font-bold text-center">Stats</h1>
      <div className="mt-[2.5rem]">
        <Habit />
        <Habit />
        <Habit />
        <Habit />
      </div>
    </div>
  );
}
