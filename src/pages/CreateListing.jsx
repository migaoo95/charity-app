// Import Database
import { db } from "../firebase-config";
// Import documents and set documents
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
// Get user credentials
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function CreateListing() {
  const [itemData, setItemData] = useState({
    name: "",
    type: "",
    desc: "",
    price: 0,
  });
  // Destructure itemData
  const { name, desc, type, price } = itemData;
  const auth = getAuth();

  // ------------------------------------- { Componend Did Mount }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setItemData({ ...itemData, userID: user.uid });
      }
    });
  }, []);

  // ------------------------------------- { Handle Input Change }
  const handleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    });
  };

  // ------------------------------------- { Submit Form Function }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setItemData({
      ...itemData,
      listingTimeStamp: serverTimestamp(),
    });
    const docRef = await addDoc(collection(db, "listing"), itemData);
  };
  return (
    <div className="createListingContainer ">
      <form
        onSubmit={handleSubmit}
        className="border-2 w-1/2 flex flex-col items-center m-auto form-control"
      >
        <input
          type="text"
          name="name"
          placeholder="Enter Product Name"
          className="input w-full max-w-xs mb-2"
          value={name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Product Type"
          className="input w-full max-w-xs mb-2"
          value={type}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="input w-full max-w-xs mb-2"
          value={price}
          onChange={handleChange}
        />
        <textarea
          name="desc"
          value={desc}
          onChange={handleChange}
          className="textarea textarea-bordered h-24 w-full max-w-xs"
          placeholder="Bio"
        ></textarea>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default CreateListing;
