import { db } from "../../firebase-config";
import { getDocs } from "firebase/firestore";
export const fetchAllItems = async (qry) => {
  try {
    const querySnap = await getDocs(qry);
    const itemsArr = [];
    querySnap.forEach((doc) => {
      return itemsArr.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return itemsArr;
  } catch (err) {
    console.log(err);
  }
};
