import { createContext, useContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { db } from "../firebase.js";
import { getDoc, setDoc, doc, query, getDocs, collection} from "firebase/firestore";

const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const { user } = UserAuth();
  // const [userDB, setUserDB] = useState({});
  const [userData, setUserData] = useState({});

  const createUserField = async (_user, username) => {
    await setDoc(doc(db, "userData", _user.uid), {
      username: username,
    });
    await setDoc(doc(db, `userData/${_user.uid}/Habits`, _user.uid));
  };

  const getUserData = async (uid) => {
    console.log("uid: ", uid);
    const docRef = doc(db, "userData", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let loadedData = docSnap.data();
      loadedData.loaded = true;
      return loadedData;
    } else {
      console.log("No such document!");
    }
    return null;
  };

  const getUserHabits = async (uid) => {
    if (uid == "") return null;
    const colRef = collection(db, `userData/${uid}/Habits`);
    const docSnap = await getDocs(colRef);
    return docSnap.docs.map(doc => doc.data());
  };

  const addUserHabit = async (uid, habit) => {
    if (uid == "") return null;
    const colRef = collection(db, `userData/${uid}/Habits`);
    await setDoc(doc(colRef, habit.id), {
      HabitName: habit.HabitName,
      HabitDescription: habit.HabitDescription,
      HabitFrequency: habit.HabitFrequency,
      HabitStartDate: habit.HabitStartDate,
      HabitEndDate: habit.HabitEndDate,
      HabitSuccesses: habit.HabitSuccesses,
    });
  };
  // useEffect(() => {
  //     // if (user) {
  //     //     getUserData(user.uid).then((data) => {
  //     //         setUserData(data);
  //     //     });
  //     // }
  // }, [user]);

  return (
    <StoreContext.Provider
      value={{ createUserField, getUserData, userData, getUserHabits }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const Firestore = () => {
  return useContext(StoreContext);
};
