import {
  where,
  collection,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
// ----------------------------- user_cart
const addToCart = async (item, item_id) => {
  // 1. ---------------------- Check if collection exists for a specific user
  console.log("works");
  const q = query(
    collection(db, "user_cart"),
    where("user_id", "==", auth.currentUser.uid)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    passCartId(doc.id, item, item_id);
  });

  // 2. ---------------------- if it does push product into array within DB || if not create a collection for this user
};
const passCartId = async (docID, data, item_id) => {
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
    await setDoc(doc(db, "user_cart", docID), {
      products_id: currentItemsArr,
      user_id: auth.currentUser.uid,
      docID: docID,
    });
    toast.success("Item added to cart !");
  } else {
    console.log("No such document!");
  }
  getFullCart();
};
