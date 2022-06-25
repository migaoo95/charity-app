import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import classes from "../styles/modules/Input.module.scss";
import { BiSearchAlt } from "react-icons/bi";
import { useState, useEffect } from "react";
function SearchBar({ handleChange }) {
  const [allItems, setAllItems] = useState();

  // const handleChange = (e) => {
  //   if (e.target.value != "") {
  //     allItems.forEach((item) => {
  //       if (item.data.name.toLowerCase().indexOf(e.target.value) !== -1) {
  //         // console.log(item.data.name, item.id);
  //         childProp(item.data, allItems);
  //       }
  //     });
  //   }
  // };
  useEffect(() => {
    // childProp("siema ziome");
    // fetchAllItems();
  }, []);
  // Function to fetch all items in DB -------------------

  return (
    <div className={classes.inputWithIcon}>
      <input
        onChange={(e) => {
          handleChange(e);
        }}
        type="text"
        placeholder="Find your items here..."
      />
      <span>
        <BiSearchAlt size={25} />
      </span>
    </div>
  );
}

export default SearchBar;
