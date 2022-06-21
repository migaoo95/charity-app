import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
// import { toast } from "react-toastify";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase-config";
import Item from "../components/Item";
import classes from "../styles/modules/Home.module.scss";
import InputsContainer from "../components/InputsContainer";
import LoadMoreItemsBtn from "../components/buttons/LoadMoreItemsBtn";
import { MdAddShoppingCart } from "react-icons/md";
import useFetch from "../hooks/useFetch";
function HomePage() {
  //---------------------------------- whileSearch
  const [whileSearch, setWhileSearch] = useState(false);
  const [tempStoreItem, setTempStoreItem] = useState([]);
  // ----------------- custom Hook param  ***
  const [increase, setIncrease] = useState(9);
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
          {!loading && !whileSearch && items ? (
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
        </div>
      </div>

      <LoadMoreItemsBtn inc={inc} />
    </>
  );
}

export default HomePage;
