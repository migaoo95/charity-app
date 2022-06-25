import { useEffect, useState, useRef } from "react";
import { getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
const useFetch = (docRef) => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [change, setChange] = useState(0);
  const isMouted = useRef(true);
  const removeThis = (newItems) => {
    setChange((prev) => {
      return prev + 1;
    });
  };
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
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    return () => {
      isMouted.current = false;
    };
  }, [isMouted, count, change]);
  return { items, loading, incrementItemLimit, count, removeThis };
};

export default useFetch;
