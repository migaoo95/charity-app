import classes from "../styles/modules/Form.module.scss";
import { BsFilter } from "react-icons/bs";
import Select, { components } from "react-select";
import { useRef } from "react";
import { customStylesCreate } from "../styles/customStyles/customSelect.js";
import { db } from "../firebase-config";
import {
  serverTimestamp,
  addDoc,
  collection,
  increment,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// eslint-disable-next-line no-unused-vars
import { parse, v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
function Form() {
  const countAddItem = async () => {
    const countRef = doc(db, "count", "T9wguA8kalgZYEnMJpQn");
    await updateDoc(countRef, {
      count: increment(1),
    });
  };
  const [itemData, setItemData] = useState({
    name: "",
    type: "",
    desc: "",
    condition: "",
    price: parseFloat(null),
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
        [e.target.name]: +e.target.value || e.target.value,
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
            // eslint-disable-next-line no-unused-vars
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
              case "paused":
                break;
              case "running":
                break;
              default:
            }
          },
          (error) => {
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
    countAddItem();
    const itemDataCopy = {
      ...itemData,
      imageUrls,
      listingTimeStamp: serverTimestamp(),
      listingUser: auth.currentUser.displayName,
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
      condition: "",
      price: null,
      images: {},
    });
  };

  const myRef = useRef(null);
  const handleClick = () => {
    myRef.current.click();
  };
  const handleChangeTwo = (e) => {
    console.log(e.type);
    setItemData({
      ...itemData,
      [e.type]: e.value,
    });
  };
  const typesArr = [
    { value: "clothing", label: "Fashion", type: "type" },
    { value: "electronic", label: "Electronics", type: "type" },
    { value: "toys", label: "Toys", type: "type" },
    { value: "HnB", label: "Health & Beauty", type: "type" },
    { value: "Home", label: "Home appliances ", type: "type" },
    { value: "Sport", label: "Sport ", type: "type" },
    { value: "Education", label: "Education ", type: "type" },
    { value: "Music", label: "Music ", type: "type" },
  ];
  const condition = [
    { value: "Brand New", label: "Brand New", type: "condition" },
    { value: "Used", label: "Used", type: "condition" },
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
        <div className={classes.formContainer__itemNameContainer__name}>
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
        <div className={classes.formContainer__itemNameContainer__condition}>
          <p>Condition</p>
          <Select
            name="condition"
            onChange={handleChangeTwo}
            options={condition}
            styles={customStylesCreate}
            components={{ DropdownIndicator }}
          />
        </div>
      </div>
      <div className={classes.formContainer__priceSelect}>
        <div className={classes.formContainer__priceSelect__priceInput}>
          <p>Price £</p>
          <input
            onChange={handleChange}
            value={parseFloat(price)}
            name="price"
            type="number"
            placeholder="£0.00"
            min="0"
            step=".01"
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
          placeholder="Brief descryption of the product that you want to list"
        ></textarea>
      </div>
      <div className={classes.formContainer__fileInputContainer}>
        <p>
          Images <small className="ml-5">Select upto three images</small>
        </p>

        <div
          onClick={handleClick}
          className={classes.formContainer__fileInputContainer__customFileInput}
        >
          <label htmlFor="file">
            {images.length > 0 ? (
              Object.keys(images).map((key, i) => {
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
