import React, { useEffect, useState } from "react";
import styles from "./css-modules/Calender.module.css";

export default function Calander({ setDateFocused, setMinMaxDate }) {
  const [month, setMonth] = useState(8);
  const [monthName, setMonthName] = useState("September");
  const [year, setYear] = useState(2023);
  const [dates, setDates] = useState([]);
  const [prevDateElement, setPrevDateElement] = useState();

  useEffect(() => {
    let now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();
    setMonth(month);
    setYear(year);

    //set month name
    let monthNames = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Augest",
      "September",
      "October",
      "November",
      "December",
    ];
    setMonthName(monthNames[month]);

    let dates = getDates(year, month);
    let datesArray = [];
    for (let i = 0; i < 6; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        week.push(dates[i * 7 + j]);
      }
      datesArray.push(week);
    }
    setDates(datesArray);
    setDateFocused(Date());
    setMinMaxDate(dates[0], dates[41]);
  }, []);

  const handleClick = (e) => {
    if (prevDateElement) {
      prevDateElement.classList.remove(styles["current-day"]);
    }
    setPrevDateElement(e.target);
    console.log(e.target);
    console.log(e.target.dataset.date);
    setDateFocused(e.target.dataset.date);
    e.target.classList.add(styles["current-day"]);
  };

  useEffect(() => {
    // get dates of the month from sunday to saturday, and the dates of the previous and next month
  }, [month, year]);

  return (
    <>
      <div className={styles.eventCalender}>
        <div className={styles["calendar-container"]}>
          <header className="border border-light">
            <div className="flex items-center justify-between">
              <div>
                <div className={styles.day}>--</div>
                <div className={styles.month}>{monthName}</div>
              </div>
              <div className={styles.year}>{year}</div>
            </div>
          </header>
          <table className={styles.calendar}>
            <thead>
              <tr>
                <td>Sun</td>
                <td>Mon</td>
                <td>Tue</td>
                <td>Wed</td>
                <td>Thu</td>
                <td>Fri</td>
                <td>Sat</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                {dates[0]?.map((date) => {
                  return (
                    <td
                      className={
                        date.getMonth() == month
                          ? ""
                          : `${styles["prev-month"]}`
                      }
                      key={
                        date.getMonth() == month
                          ? date.getDate()
                          : `prev${date.getDate()}`
                      }
                      onClick={handleClick}
                      data-date={date}
                    >
                      {date.getDate()}
                    </td>
                  );
                })}
              </tr>
              <tr>
                {dates[1]?.map((date) => {
                  return (
                    <td
                      key={date.getDate()}
                      onClick={handleClick}
                      data-date={date}
                    >
                      {date.getDate()}
                    </td>
                  );
                })}
              </tr>
              <tr>
                {dates[2]?.map((date) => {
                  return (
                    <td
                      key={date.getDate()}
                      onClick={handleClick}
                      data-date={date}
                    >
                      {date.getDate()}
                    </td>
                  );
                })}
              </tr>
              <tr>
                {dates[3]?.map((date) => {
                  return (
                    <td
                      key={date.getDate()}
                      onClick={handleClick}
                      data-date={date}
                    >
                      {date.getDate()}
                    </td>
                  );
                })}
              </tr>
              <tr>
                {dates[4]?.map((date) => {
                  return (
                    <td
                      className={
                        date.getMonth() == month
                          ? ""
                          : `${styles["next-month"]}`
                      }
                      key={
                        date.getMonth() == month
                          ? date.getDate()
                          : `next${date.getDate()}`
                      }
                      onClick={handleClick}
                      data-date={date}
                    >
                      {date.getDate()}
                    </td>
                  );
                })}
              </tr>
              <tr>
                {dates[5]?.map((date) => {
                  return (
                    <td
                      className={
                        date.getMonth() == month
                          ? ""
                          : `${styles["next-month"]}`
                      }
                      key={
                        date.getMonth() == month
                          ? date.getDate()
                          : `next${date.getDate()}`
                      }
                      onClick={handleClick}
                      data-date={date}
                    >
                      {date.getDate()}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <div className={styles["ring-left"]}></div>
          <div className={styles["ring-right"]}></div>
        </div>
      </div>
    </>
  );
}

function getDates(year, month) {
  // Create a date object with the given year and month
  let currentDate = new Date(year, month, 1);

  // Adjust to the beginning of the week (Sunday)
  while (currentDate.getDay() !== 0) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  // Array to store dates
  let dates = [];

  // Get 6 weeks of dates, since in some scenarios a month can span 6 weeks in a calendar view
  for (let i = 0; i < 42; i++) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
