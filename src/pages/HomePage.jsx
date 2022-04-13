import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase-config";
import Listings from "./Listings";
import Item from "../components/Item";
import classes from "../styles/modules/Home.module.scss";
import { BiSearchAlt } from "react-icons/bi";
function HomePage() {
  const [items, setAllItems] = useState();
  const auth = getAuth();

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const itemRef = collection(db, "listing");
        const qry = query(
          itemRef,
          orderBy("listingTimeStamp", "desc"),
          limit(10)
        );
        const querySnap = await getDocs(qry);
        const itemsArr = [];
        // console.log(querySnap);
        querySnap.forEach((doc) => {
          return itemsArr.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setAllItems(itemsArr);
        console.log(itemsArr);
      } catch (err) {
        console.log(err);
        toast.error("Could not fetch listings");
      }
    };
  }, []);
  return (
    <div className={classes.container}>
      <p>All Products</p>
      <div className={classes.container__inputContainer}>
        <div class={classes.inputWithIcon}>
          <input type="text" placeholder="Your name" />
          <span>
            <BiSearchAlt size={25} />
          </span>
        </div>
        <select name="" id="">
          <option value="">Clothing</option>
        </select>
      </div>
      <div
        className={`${classes.container__itemContainer} m-auto grid grid-cols-3 gap-8 `}
      >
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}

export default HomePage;
{
  /* <div style={{}}>
<div className="">Search</div>
<div style={{}} className={` max-w-[840px] m-auto grid grid-cols-3 `}> */
}
