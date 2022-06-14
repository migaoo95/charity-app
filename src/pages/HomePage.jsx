import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
// import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
// import Listings from "./Listings";
import Item from "../components/Item";
import classes from "../styles/modules/Home.module.scss";
import InputsContainer from "../components/InputsContainer";
import SearchBar from "../components/SearchBar";
import SelectIn from "../components/SelectIn";
// import { data } from "autoprefixer";
import { customStyles } from "../styles/customStyles/customSelect";
// import { type } from "@testing-library/user-event/dist/type";
import { MdAddShoppingCart } from "react-icons/md";

function HomePage() {
  const [hideShow, setHideShow] = useState(false);
  const [items, setAllItems] = useState();
  const [loading, setLoading] = useState(true);
  const [showAmout, setShowAmout] = useState(9);
  const [itemsInDb, setItemsInDb] = useState(0);
  //---------------------------------- whileSearch
  const [whileSearch, setWhileSearch] = useState(false);
  const [searchItemsAll, setSearchItemsAll] = useState();
  const [tempStoreItem, setTempStoreItem] = useState([]);
  //---------------------------------- handleChange
  const handleSearchBarChange = (e) => {
    if (e.target.value !== "") {
      setWhileSearch(true);
      let arr = [];
      searchItemsAll.forEach((item) => {
        if (item.data.name.toLowerCase().indexOf(e.target.value) !== -1) {
          !arr.includes(item) && arr.push(item);
        }
      });
      setTempStoreItem(arr);
      console.log(arr);
    } else {
      setWhileSearch(false);
    }
  };
  //---------------------------------- Fetch Items in a background
  const fetchAllItems = async () => {
    try {
      const itemRef = collection(db, "listing");
      const qry = query(itemRef, orderBy("listingTimeStamp", "desc"));
      const querySnap = await getDocs(qry);
      const itemsArr = [];
      querySnap.forEach((doc) => {
        return itemsArr.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setSearchItemsAll(itemsArr);
    } catch (err) {
      console.log(err);
    }
  };

  //----------------------------------
  // const [searchedItems, setSearchedItems] = useState();
  // Test state ------
  // const [whileSearch, setWhileSearch] = useState(false);
  // const getChildsProps = (data, allItems) => {
  //   console.log(allItems);
  //   setSearchedItems(data);
  //   setWhileSearch(true);
  // };
  const noItems = Array.isArray(items) && items.length === 0 && (
    <h1>No Items</h1>
  );
  useEffect(() => {
    getSize();
    fetchAllItems();
  }, []);
  // User request to display more items in UI ------------------
  useEffect(() => {
    fetchLimitItems(showAmout);
    if (itemsInDb < showAmout) {
      setHideShow(true);
    } else {
      setHideShow(false);
    }
  }, [showAmout, itemsInDb]);
  // Main items fetch with limit applied -----------------------
  const fetchLimitItems = async (lim) => {
    try {
      const itemRef = collection(db, "listing");
      const qry = query(
        itemRef,
        orderBy("listingTimeStamp", "desc"),
        limit(lim)
      );
      const querySnap = await getDocs(qry);
      const itemsArr = [];
      querySnap.forEach((doc) => {
        return itemsArr.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setAllItems(itemsArr);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Could not fetch listings");
    }
  };
  // Get count of all items within database -----------------------
  const getSize = async () => {
    const sizeRef = doc(db, "count", "T9wguA8kalgZYEnMJpQn");
    const snapSize = await getDoc(sizeRef);
    setItemsInDb(snapSize.data().count);
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.container__text}>
          <p>All Products</p>
        </div>

        <InputsContainer>
          <SearchBar handleChange={handleSearchBarChange} />{" "}
          <SelectIn customStyles={customStyles} />
        </InputsContainer>

        <div
          className={`${classes.container__itemContainer} m-auto grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 gap-2 md:gap-8 sm:gap-3 `}
        >
          {whileSearch &&
            tempStoreItem.map((item) => {
              return (
                <Item
                  bg={"#DD9788"}
                  key={item.id}
                  id={item.id}
                  data={item.data}
                  allListings={true}
                  icon={[<MdAddShoppingCart size={20} />]}
                />
              );
            })}
          {noItems}
          {!loading && !whileSearch ? (
            items.map((item) => {
              return (
                <Item
                  bg={"#DD9788"}
                  key={item.id}
                  id={item.id}
                  data={item.data}
                  allListings={true}
                  icon={[<MdAddShoppingCart size={20} />]}
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
          {/* {!whileSearch
            ? tempStoreItem.forEach((item) => {
                return (
                  <h1>Hello</h1>
                  // <Item
                  //   bg={"#DD9788"}
                  //   key={item.id}
                  //   id={item.id}
                  //   data={item.data}
                  //   allListings={true}
                  //   icon={[<MdAddShoppingCart size={20} />]}
                  // />
                );
              })
            : ""} */}
        </div>
      </div>
      {!hideShow && (
        <div className={classes.bottomBtn}>
          <button
            onClick={() => {
              setShowAmout((prev) => {
                if (prev < itemsInDb) {
                  return prev + 9;
                }
              });
            }}
          >
            Load more products
          </button>
        </div>
      )}
    </>
  );
}

export default HomePage;
