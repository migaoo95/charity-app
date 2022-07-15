import { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const useUserStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  // Just like loading
  const [checkingStatus, setCheckingStatus] = useState(true);
  // Avoid a memory leak !! // cound remove
  const isMouted = useRef(true);
  const auth = getAuth();
  useEffect(() => {
    // Memory leak - cound remove
    if (isMouted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckingStatus(false);
      });
    }
    return () => {
      isMouted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouted]);
  return { loggedIn, checkingStatus };
};

export default useUserStatus;
