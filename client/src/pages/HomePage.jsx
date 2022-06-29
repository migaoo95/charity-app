import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
// import { toast } from "react-toastify";
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
import Item from "../components/Item";
import classes from "../styles/modules/Home.module.scss";
import InputsContainer from "../components/InputsContainer";
import LoadMoreItemsBtn from "../components/buttons/LoadMoreItemsBtn";
import { MdAddShoppingCart } from "react-icons/md";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
function HomePage() {
  const { v4: uuidv4 } = require("uuid");
  const [cartData, setCartData] = useState();
  const [itemIdDisable, setItemIdDisable] = useState([]);
  const [increase, setIncrease] = useState(9);
  const auth = getAuth();
  // TODO:
  const check = (item) => {
    if (itemIdDisable.includes(item.id)) {
      return true;
    } else {
      return false;
    }
  };
  const getFullCart = async () => {
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

      console.log(doc.id, "My Data ", doc.data());
      console.log("1. Passed Id ");
    });
    setItemIdDisable(arr);
  };
  // ----------------------------- get user_id
  useEffect(() => {
    // console.log(getDate());
    getFullCart();
  }, []);
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
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      passCartId(doc.id, item, item_id);
      console.log("1. Passed Id ");
    });

    // 2. ---------------------- if it does push product into array within DB || if not create a collection for this user
  };
  const passCartId = async (docID, data, item_id) => {
    // console.log(data, "data");
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
      console.log(item_id, "itemId");
      await setDoc(doc(db, "user_cart", docID), {
        products_id: currentItemsArr,
        user_id: auth.currentUser.uid,
        docID: docID,
      });
      toast.success('Item added to cart !')
      console.log(currentItemsArr);
      console.log(docSnap.data());
    } else {
      console.log("No such document!");
    }
    getFullCart();
  };
  //---------------------------------- whileSearch
  const [whileSearch, setWhileSearch] = useState(false);
  const [tempStoreItem, setTempStoreItem] = useState([]);
  // ----------------- custom Hook param  ***
  // const [increase, setIncrease] = useState(9);
  const inc = (increaseValue) => {
    setIncrease(increaseValue);
    incrementItemLimit();
  };
  // ---------------------------- custom Hook data / query Items with Limit
  const { items, incrementItemLimit, loading } = useFetch(
    query(
      collection(db, "listing"),
      orderBy("listingTimeStamp", "desc"),
      limit(increase)
    )
  );
  //---------------------------------- handleChange for searchBar && Filter
  const searchFilterData = (data, hidden) => {
    setWhileSearch(hidden);
    setTempStoreItem(data);
  };
  //---------------------------------- Fetch Items in a background ------ ALl Items Search Bar
  const noItems = Array.isArray(items) && items.length === 0 && (
    <h1>No Items</h1>
  );
  return (
    <>
      <div className={classes.container}>
        <div className={classes.container__text}>
          <p>All Products</p>
        </div>
        <InputsContainer
          func={searchFilterData}
          qry={query(
            collection(db, "listing"),
            orderBy("listingTimeStamp", "desc")
          )}
        />
        <div
          className={`${classes.container__itemContainer} m-auto grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 gap-2 md:gap-8 sm:gap-3 `}
        >
          {whileSearch &&
            tempStoreItem.map((item) => {
              return (
                <Item
                  page={true}
                  bg={"#DD9788"}
                  key={item.id}
                  id={item.id}
                  data={item.data}
                  allListings={true}
                  icon={[<MdAddShoppingCart size={20} />]}
                  addToCart={addToCart}
                />
              );
            })}
          {noItems}
          {!loading && !whileSearch && items ? (
            items.map((item) => {
              console.log();
              return (
                <Item
                  disable={check(item)}
                  bg={"#DD9788"}
                  key={item.id}
                  id={item.id}
                  data={item.data}
                  allListings={true}
                  icon={[<MdAddShoppingCart size={20} />]}
                  addToCart={addToCart}
                />
              );
            })
          ) : (
            <div
              className={`${classes.container__loadingBarDiv} col-span-full`}
            >
              <ClipLoader color={`#559CF8`} loading={loading} size={150} />
            </div>
          )}
        </div>
      </div>

      <LoadMoreItemsBtn inc={inc} />
    </>
  );
}

export default HomePage;
