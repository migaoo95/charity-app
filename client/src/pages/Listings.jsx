import { useState } from "react";
import InputsContainer from "../components/InputsContainer";
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
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Listings() {
  const auth = getAuth();
  const navigate = useNavigate("");
  const [tempStoreItem, setTempStoreItem] = useState([]);
  const [whileSearch, setWhileSearch] = useState(false);

  // ---------------------------- custom Hook data / query user items
  const { items, loading, removeThis } = useFetch(
    query(
      collection(db, "listing"),
      orderBy("listingTimeStamp", "desc"),
      where("userID", "==", auth.currentUser.uid)
    )
  );
  //---------------------------------- handleChange for searchBar && Filter
  const searchFilterData = (data, hidden) => {
    setWhileSearch(hidden);
    setTempStoreItem(data);
  };
  const removeItem = async (item_id) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      await deleteDoc(doc(db, "listing", item_id)).then(() => {
        removeThis();
        toast.success("Product succesfully deleted ");
      });
    } else {
      toast.success("Deletion cancelled");
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.container__text}>
          <p>My Listings</p>
        </div>
        <InputsContainer
          func={searchFilterData}
          qry={query(
            collection(db, "listing"),
            orderBy("listingTimeStamp", "desc"),
            where("userID", "==", auth.currentUser.uid)
          )}
        />
        <div className="m-auto grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 gap-2 md:gap-8 sm:gap-3">
          {whileSearch &&
            tempStoreItem.map((item) => {
              return (
                <Item
                  data={item.data}
                  id={item.id}
                  allListings={false}
                  bg={"#E21313"}
                  key={item.id}
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
                  key={item.id}
                  data={item.data}
                  id={item.id}
                  allListings={false}
                  bg={"#E21313"}
                  removeItem={removeItem}
                  editItem={() => {
                    navigate(`/edit/${item.id}`);
                  }}
                  icon={[
                    <AiOutlineDelete size={20} />,
                    <FaRegEdit size={20} fill="white" />,
                  ]}
                />
              );
            })
          ) : (
            <div className="flex justify-center w-full">
              <ClipLoader color={`#559CF8`} loading={loading} size={150} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Listings;
