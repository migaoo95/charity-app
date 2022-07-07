import classes from "../styles/modules/WatchList.module.scss";
import ClipLoader from "react-spinners/ClipLoader";
import CartItem from "./Cart/CartItem";
import useFetch from "../hooks/useFetch";
import { db } from "../firebase-config";
import {
  where,
  query,
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteField,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  getCartItems,
  getUpdatedCart,
} from "../helpers/cartFunctionality/cart";
// TODO: get all user likes

function WatchList({ handleHide, removed }) {
  const auth = getAuth();
  const [items, setItems] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const removeLike = async (docID) => {
    await deleteDoc(doc(db, "user_like", docID));
    setLoading(true);
    toast.success("Product removed from watchlist");
    removed();
  };
  const fetchLikes = async () => {
    const q = query(
      collection(db, "user_like"),
      where("user_id", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data(), "Data");
      arr.push({
        data: doc.data().item,
        docRef: doc.id,
        item_id: doc.data().item_id,
      });
    });
    // console.log(arr);
    setItems(arr);
    setLoading(false);
  };
  useEffect(() => {
    fetchLikes();
  }, [loading]);
  const handleAdd = (item, item_id) => {
    // console.log(item, item_id, "THISIS");
    getCartItems(null, item, item_id);
    toast.success("Product added to cart");
  };
  return (
    <>
      <div onClick={handleHide} className={classes.click}></div>
      <div className={classes.container}>
        {!loading ? (
          items.map((item) => {
            return (
              <CartItem
                btn_one={{
                  text: "Add to cart",
                  icon: <BsFillCartPlusFill />,
                }}
                data={item.data}
                id={item.item_id}
                like={true}
                addToCart={handleAdd}
                removeLike={() => {
                  removeLike(item.docRef);
                }}
              />
            );
          })
        ) : (
          <div className="flex justify-center">
            <ClipLoader color={`#559CF8`} loading={loading} size={150} />
          </div>
        )}
      </div>
    </>
  );
}

export default WatchList;
