import { createContext, useContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { db } from "../firebase.js";
import {
  getDoc,
  setDoc,
  doc,
  query,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";

const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const { user } = UserAuth();
  // const [userDB, setUserDB] = useState({});
  const [userData, setUserData] = useState({});

  const createUserField = async (_user, username) => {
    await setDoc(doc(db, "userData", _user.uid), {
      username: username,
      lastUpdate: Timestamp.fromDate(new Date()),
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
    return docSnap.docs.map((doc) => doc.data());
  };

  const addUserHabit = async (uid, habit) => {
    if (uid == "") return null;
    const colRef = collection(db, `userData/${uid}/Habits`);
    let res = await addDoc(colRef, habit);
    const docRef = doc(db, "userData", uid);
    const docSnap = await updateDoc(docRef, {
      habitIds: arrayUnion(res.id),
      lastUpdate: Timestamp.fromDate(new Date()),
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
      value={{
        createUserField,
        getUserData,
        userData,
        getUserHabits,
        addUserHabit,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const Firestore = () => {
  return useContext(StoreContext);
};
