import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const useStatus = () => {
  // user status state
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setLoading(false);
    });
  });
  return { loggedIn, loading };
};

export default useStatus;
