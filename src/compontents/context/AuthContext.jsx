import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const createUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error("Failed to create user: " + error.message);
    }
  };

  return (
    <UserContext.Provider value={{ createUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
