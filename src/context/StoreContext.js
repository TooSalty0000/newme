import { createContext, useContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { db } from "../firebase.js";
import { getDoc, setDoc, doc } from "firebase/firestore";

const StoreContext = createContext();


export const StoreContextProvider = ({ children }) => {
    const { user } = UserAuth();
    // const [userDB, setUserDB] = useState({});
    const [userData, setUserData] = useState({});


    const createUserField = async (_user, username) => {
        const docRef = await setDoc(doc(db, "userData", _user.uid), {
            username: username,
        });
    }

    const getUserData = async (uid) => {
        console.log("uid: ", uid)
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
    }


    // useEffect(() => {
    //     // if (user) {
    //     //     getUserData(user.uid).then((data) => {
    //     //         setUserData(data);
    //     //     });
    //     // }
    // }, [user]);


    return (
        <StoreContext.Provider value={{createUserField, getUserData, userData}}>
            {children}
        </StoreContext.Provider>
    )
}

export const Firestore = () => {
    return useContext(StoreContext);
}