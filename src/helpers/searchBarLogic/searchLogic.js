import { db } from "../../firebase-config";
import { getDocs } from "firebase/firestore";
export const fetchAllItems = async (qry) => {
  try {
    // const itemRef = collection(db, "listing");
    // const qry = query(itemRef, orderBy("listingTimeStamp", "desc"));
    const querySnap = await getDocs(qry);
    const itemsArr = [];
    querySnap.forEach((doc) => {
      return itemsArr.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    //   setSearchItemsAll(itemsArr);
    // console.log("returned");
    return itemsArr;
    // console.log(itemsArr, "all");
  } catch (err) {
    console.log(err);
  }
};
