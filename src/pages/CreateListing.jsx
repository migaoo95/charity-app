// Import Database
import { db } from "../firebase-config";
// Import documents and set documents
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
// Get user credentials
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CreateListing() {
  const [itemData, setItemData] = useState({
    name: "",
    type: "",
    desc: "",
    price: 0,
    images: {},
  });
  // Destructure itemData
  const { name, desc, type, price, images } = itemData;
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
    // If target is files assign it to images
    if (e.target.files) {
      setItemData({
        ...itemData,
        images: e.target.files,
      });
    } else {
      setItemData({
        ...itemData,
        [e.target.name]: e.target.value,
      });
    }
  };
  // ------------------------------------- { Submit Form Function }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Store Images --->
    const imageStore = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        // Storage reference
        const storageRef = ref(storage, "images/" + fileName);

        // Create upload task
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Upload task snippet ------
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // console.log("File available at", downloadURL);
              return resolve(downloadURL);
            });
          }
        );
      });
    };
    const imageUrls = await Promise.all(
      [...images].map((image) => imageStore(image))
    ).catch(() => {
      toast.error("Images not uploaded");
      return;
    });

    const itemDataCopy = {
      ...itemData,
      imageUrls,
      listingTimeStamp: serverTimestamp(),
    };
    delete itemDataCopy.images;
    console.log(itemDataCopy);

    const docRef = await addDoc(collection(db, "listing"), itemDataCopy);
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
        <input
          type="file"
          name="images"
          id="images"
          onChange={handleChange}
          max="6"
          accept=".jpg,.png,.jpeg"
          multiple
          required
        />
        <button className="btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default CreateListing;
