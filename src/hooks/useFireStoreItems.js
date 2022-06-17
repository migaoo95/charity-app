import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { getDocs } from "firebase/firestore";
const useFireStoreItems = (qry) => {
  const [items, setItems] = useState(null);
  const querySnapShot = async (query) => {
    return await getDocs(query);
  };
  // Fire useEffect -----------------
  useEffect(() => {
    try {
      const querySnap = querySnapShot(qry);
      const itemsArr = [];
      querySnap.forEach((doc) => {
        return itemsArr.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setItems(itemsArr);
    } catch (err) {
      console.log(err);
    }
  }, [qry]);
  return { items };
};

export default useFireStoreItems;
