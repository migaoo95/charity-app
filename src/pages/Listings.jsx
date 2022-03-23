import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Getting entire collection
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
import { toast } from "react-toastify";
// import Spinner from "../components/Spinner";
function Listings() {
  const [listings, setListings] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get a reference to the colleciton
        const listingRef = collection(db, "listing");
        // Create a query
        const q = query(
          listingRef,
          // Use this to filter
          //   where("type", "==", "clothing"),
          orderBy("listingTimeStamp", "desc"),
          limit(10)
        );
        // Execute query -> get the documents for that specific query
        const querySnap = await getDocs(q);
        const listings = [];
        // Loop through a query snapshot
        console.log(querySnap);
        querySnap.forEach((doc) => {
          // Push object into listings
          return listings.push({
            // set the id to doc.id
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
        console.log(listings);
        // console.log("works");
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch listings");
      }
    };
    fetchListings();
  }, []);
  return (
    <>
      {/* <label for="my-modal-3" className=" modal-button">
        open modal
      </label> */}
      <p>Lisings</p>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Congratulations random Interner user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </div>
      </div>
    </>
  );
}

export default Listings;
