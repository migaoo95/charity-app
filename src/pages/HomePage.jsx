import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
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
import Item from "../components/Item";
import classes from "../styles/modules/Home.module.scss";
import InputsContainer from "../components/InputsContainer";
import SearchBar from "../components/SearchBar";
import SelectIn from "../components/SelectIn";
import { customStyles } from "../styles/customStyles/customSelect";
import { MdAddShoppingCart } from "react-icons/md";
// import { fetchAllItems } from "../helpers/searchBarLogic/searchLogic.js";
import { fetchAllItems } from "../helpers/searchBarLogic/searchLogic";
function HomePage() {
  const [hideShow, setHideShow] = useState(false);
  const [items, setAllItems] = useState();
  const [loading, setLoading] = useState(true);
  const [showAmout, setShowAmout] = useState(9);
  const [itemsInDb, setItemsInDb] = useState(0);
  //---------------------------------- whileSearch
  const [whileSearch, setWhileSearch] = useState(false);
  const [searchItemsAll, setSearchItemsAll] = useState([]);
  const [tempStoreItem, setTempStoreItem] = useState([]);
  //---------------------------------- handleChange
  const handleSearchBarChange = (e, from) => {
    // console.log(typeof e.target);
    setWhileSearch(true);
    let arr = [];
    searchItemsAll.forEach((item) => {
      if (from === "search") {
        if (item.data.name.toLowerCase().indexOf(e.target.value) !== -1) {
          !arr.includes(item) && arr.push(item);
        }
      } else if (from === "filter") {
        if (item.data.type.toLowerCase() === e.value.toLowerCase()) {
          return arr.push(item);
        }
      } else {
        setWhileSearch(false);
      }
    });
    if (from === "filter" && e.value === "all") {
      setWhileSearch(false);
    }
    setTempStoreItem(arr);
    console.log(arr);
  };

  //---------------------------------- Fetch Items in a background

  const noItems = Array.isArray(items) && items.length === 0 && (
    <h1>No Items</h1>
  );
  useEffect(() => {
    getSize();
    fetchAllItems(
      query(collection(db, "listing"), orderBy("listingTimeStamp", "desc"))
    ).then((data) => setSearchItemsAll(data));
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
  const test = (e, from) => {
    console.log(e.value, from);
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
          <SelectIn
            handleChange={handleSearchBarChange}
            data={searchItemsAll}
            customStyles={customStyles}
          />
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
      {!hideShow && !whileSearch && (
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
