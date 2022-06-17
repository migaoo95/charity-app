import { useEffect, useState } from "react";
import InputsContainer from "../components/InputsContainer";
import SearchBar from "../components/SearchBar";
import SelectIn from "../components/SelectIn";
import { customStyles } from "../styles/customStyles/customSelect";
import classes from "../styles/modules/Listing.module.scss";
import ClipLoader from "react-spinners/ClipLoader";
import Item from "../components/Item";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
// ---------- Firebase
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { fetchAllItems } from "../helpers/searchBarLogic/searchLogic";

function Listings() {
  const auth = getAuth();
  const [tempStoreItem, setTempStoreItem] = useState([]);
  const [whileSearch, setWhileSearch] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItemsAll, setSearchItemsAll] = useState([]);
  //---------------------- Change function
  const handleSearchBarChange = (e, from) => {
    // console.log(typeof e.target);
    setWhileSearch(true);
    let arr = [];
    searchItemsAll.forEach((item) => {
      if (from === "search" && e.target.value !== "") {
        if (item.data.name.toLowerCase().indexOf(e.target.value) !== -1) {
          !arr.includes(item) && arr.push(item);
          console.log(whileSearch);
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
  // ------------------------ Fetch effect
  useEffect(() => {
    fetchAllItems(
      query(
        collection(db, "listing"),
        // where("userID", "==", auth.currentUser.uid),
        orderBy("listingTimeStamp", "desc")
      )
    ).then((data) => setSearchItemsAll(data));
  }, []);
  useEffect(() => {
    const fetchUserListings = async () => {
      const q = query(
        collection(db, "listing"),
        where("userID", "==", auth.currentUser.uid)
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((listing) => {
        return listings.push({
          id: listing.id,
          data: listing.data(),
        });
      });
      setItems(listings);
      setLoading(false);
    };
    fetchUserListings();
    // console.log(auth.currentUser.uid);
  }, [auth.currentUser.uid]);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.container__text}>
          <p>My Listings</p>
        </div>
        <InputsContainer>
          <SearchBar handleChange={handleSearchBarChange} />
          <SelectIn
            handleChange={handleSearchBarChange}
            data={searchItemsAll}
            customStyles={customStyles}
          />
        </InputsContainer>
        <div className="m-auto grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 gap-2 md:gap-8 sm:gap-3">
          {whileSearch &&
            tempStoreItem.map((item) => {
              return (
                <Item
                  data={item.data}
                  id={item.id}
                  allListings={false}
                  bg={"#E21313"}
                  icon={[
                    <AiOutlineDelete size={20} />,
                    <FaRegEdit size={20} fill="white" />,
                  ]}
                />
              );
            })}
          {!loading && !whileSearch ? (
            items.map((item) => {
              return (
                <Item
                  data={item.data}
                  id={item.id}
                  allListings={false}
                  bg={"#E21313"}
                  icon={[
                    <AiOutlineDelete size={20} />,
                    <FaRegEdit size={20} fill="white" />,
                  ]}
                />
              );
            })
          ) : (
            <div>
              <ClipLoader color={`#559CF8`} loading={loading} size={150} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Listings;
