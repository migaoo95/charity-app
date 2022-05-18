import classes from "../styles/modules/Form.module.scss";
import { BsFilter } from "react-icons/bs";
import Select, { components } from "react-select";
// import SelectIn from "./SelectIn";
import { useRef } from "react";
import { customStylesCreate } from "../styles/customStyles/customSelect.js";
// Interactivirt
//
//
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
function Form() {
  const [itemData, setItemData] = useState({
    name: "",
    type: "",
    desc: "",
    price: 0,
    images: {},
  });
  const { name, desc, price, images } = itemData;
  const auth = getAuth();
  // ------------------------------------- { Componend Did Mount }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setItemData({ ...itemData, userID: user.uid });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              default:
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

    // eslint-disable-next-line no-unused-vars
    const docRef = await addDoc(collection(db, "listing"), itemDataCopy);
    clearFields();
    toast.success("Listing Created");
  };
  const clearFields = () => {
    setItemData({
      name: "",
      type: "",
      desc: "",
      price: 0,
      images: {},
    });
  };
  //
  //

  const myRef = useRef(null);
  const handleClick = () => {
    myRef.current.click();
  };
  const handleChangeTwo = (e) => {
    console.log(e.label);
    setItemData({
      ...itemData,
      type: e.value,
    });
  };
  const typesArr = [
    { value: "clothing", label: "Fashion" },
    { value: "electronic", label: "Electronics" },
    { value: "toys", label: "Toys" },
    { value: "HnB", label: "Health & Beauty" },
    { value: "HnG", label: "Home & Garden" },
  ];
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <BsFilter size={25} />
      </components.DropdownIndicator>
    );
  };
  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      <div className={classes.formContainer__headingContainer}>
        <p>Create new listing</p>
        <hr />
      </div>
      <div className={classes.formContainer__itemNameContainer}>
        <p>Item name</p>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Enter Product Name"
          className=""
          onChange={handleChange}
        />
      </div>
      <div className={classes.formContainer__priceSelect}>
        <div className={classes.formContainer__priceSelect__priceInput}>
          <p>Price</p>
          <input
            onChange={handleChange}
            value={price}
            name="price"
            type="number"
            placeholder="£0.00"
          />
        </div>
        <div className={classes.formContainer__priceSelect__select}>
          <p>Item Type</p>
          <Select
            name="type"
            onChange={handleChangeTwo}
            options={typesArr}
            styles={customStylesCreate}
            components={{ DropdownIndicator }}
          />
        </div>
      </div>
      <div className={classes.formContainer__desc}>
        <p>Descryption</p>
        <textarea
          value={desc}
          name="desc"
          onChange={handleChange}
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div className={classes.formContainer__fileInputContainer}>
        <p>Images</p>

        <div
          onClick={handleClick}
          className={classes.formContainer__fileInputContainer__customFileInput}
        >
          <label htmlFor="file">
            {images.length > 0 ? (
              Object.keys(images).map((key, i) => {
                // console.log(images[key].name);
                return <span key={key}>{images[key].name} </span>;
              })
            ) : (
              <span>Browse</span>
            )}
          </label>
          <input
            ref={myRef}
            type="file"
            name="images"
            id="images"
            onChange={handleChange}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
        </div>
      </div>
      <div className={classes.formContainer__buttonContainer}>
        <button onClick={clearFields}>Clear</button>
        <button type="submit">Create Listing</button>
      </div>
    </form>
  );
}

export default Form;
