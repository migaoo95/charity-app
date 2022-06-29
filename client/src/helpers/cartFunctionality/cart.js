import {
    where,
    collection,
    query,
    doc,
    getDoc,
    setDoc,
    getDocs,
  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase-config";
const auth = getAuth();

export const getCartItems = async (user_id, item, item_id) =>{
   console.log("works");
   const q = query(
     collection(db, "user_cart"),
     where("user_id", "==", auth.currentUser.uid)
   );
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
     console.log(doc.id, " => ", doc.data());
     updateCartItems(doc.id, item, item_id);
     console.log("1. Passed Id ");
   });
}

export const updateCartItems = async (docID, data, item_id) => {
    console.log(docID, "docID");
    const docRef = doc(db, "user_cart", docID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let currentItemsArr = docSnap.data().products_id;
      let dataCopy = {
        ...data,
        item_id,
        docID,
      };
      currentItemsArr.push(dataCopy);
    //   console.log(item_id, "itemId");
      await setDoc(doc(db, "user_cart", docID), {
        products_id: currentItemsArr,
        user_id: auth.currentUser.uid,
        docID: docID,
      });
    //   console.log(currentItemsArr);
    //   console.log(docSnap.data());
    } else {
      console.log("No such document!");
    }
    // getUpdatedCart();
  };

  export const getUpdatedCart = async () => {
        const q = query(
      collection(db, "user_cart"),
      where("user_id", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      doc.data().products_id.forEach((item) => {
        arr.push(item.item_id);
      });

    //   console.log(doc.id, "My Data ", doc.data());
    //   console.log("1. Passed Id ");
    });
    // console.log(arr,'thius arr')
    return arr;
  }

  