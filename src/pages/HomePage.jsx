import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
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
import InputsContainer from "../components/InputsContainer";
import SearchBar from "../components/SearchBar";
import SelectIn from "../components/SelectIn";
import { data } from "autoprefixer";
import { customStyles } from "../styles/customStyles/customSelect";
import { type } from "@testing-library/user-event/dist/type";

function HomePage() {
  const [items, setAllItems] = useState();
  let [loading, setLoading] = useState(true);
  const [typeArrState, setTypeArr] = useState([]);
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
        const typeArr = [];
        // console.log(querySnap);
        querySnap.forEach((doc) => {
          return itemsArr.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setAllItems(itemsArr);
        setLoading(false);
        itemsArr.forEach((item) => {
          if (typeArr.indexOf(item.data.type.toLowerCase()) === -1) {
            // typeArr.push({
            //   value: item.data.type.toLowerCase(),
            //   label: item.data.type.toLowerCase(),
            // });
            typeArr.push(item.data.type);
          }
        });
        typeArr.forEach((item) => {
          setTypeArr([
            {
              value: item,
              label: item,
            },
          ]);
        });
        // setStypeArr({});
        console.log(typeArr, "typearr");
        console.log(itemsArr);
      } catch (err) {
        console.log(err);
        toast.error("Could not fetch listings");
      }
    };
    fetchAllItems();
  }, []);
  return (
    <div className={classes.container}>
      <p>All Products</p>
      <InputsContainer>
        <SearchBar />{" "}
        <SelectIn options={typeArrState} customStyles={customStyles} />
      </InputsContainer>

      <div
        className={`${classes.container__itemContainer} m-auto grid grid-cols-2  md:grid-cols-3 gap-8 `}
      >
        {!loading ? (
          items.map((item) => {
            return <Item key={item.id} data={item.data} />;
          })
        ) : (
          <div className={`${classes.container__loadingBarDiv} col-span-full`}>
            <ClipLoader color={`#559CF8`} loading={loading} size={150} />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
