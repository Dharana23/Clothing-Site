import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentuser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentuser] = useState(null);
  const value = { currentUser, setCurrentuser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentuser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
