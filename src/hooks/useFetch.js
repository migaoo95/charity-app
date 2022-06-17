import { useEffect, useState, useRef } from "react";
import { getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
const useFetch = (docRef) => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const isMouted = useRef(true);
  const incrementItemLimit = () => {
    setCount((prev) => {
      return prev + 1;
    });
  };
  // ---------------------- Fetch items from firebase once and when limit is changed
  useEffect(() => {
    const itemsArr = [];
    getDocs(docRef)
      .then((doc) => doc)
      .then((querySnapshot) => {
        if (isMouted) {
          querySnapshot.forEach((doc) => {
            return itemsArr.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setItems(itemsArr);
          setLoading(false);
          console.log(itemsArr, "customHook");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    return () => {
      isMouted.current = false;
    };
  }, [isMouted, count]);
  return { items, loading, incrementItemLimit, count };
};

export default useFetch;
