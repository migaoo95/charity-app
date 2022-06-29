import classes from "../styles/modules/EditForm.module.scss";
import { BsFilter } from "react-icons/bs";
import Select, { components } from "react-select";
import { useRef } from "react";
import { customStylesCreate } from "../styles/customStyles/customSelect.js";
import { db } from "../firebase-config";
import {
  serverTimestamp,
  getDoc,
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
import blueT from '../assets/jpeg/blueT.jpeg'
import {  v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useParams} from 'react-router-dom'
import {MdDelete} from 'react-icons/md'
function EditProduct() {
    const {itemId } = useParams()
    const [item, setItem] = useState();
    const [fileSwitch, setFileSwitch] = useState(false);
    const [imageMax, setImageMax] = useState(3);
    const [triggerChange, setTrigger] = useState(0);
    const [imageStore, setImageStore] = useState()
    const getItem = async (item_id) =>{
    const docRef = doc(db, "listing", item_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setItem(docSnap.data())
        let editData = {
            name: docSnap.data().name,
            type: docSnap.data().type,
            desc: docSnap.data().desc,
            price: docSnap.data().price,
            images: docSnap.data().imageUrls,
        }
        setItemData(editData)
        console.log(docSnap.data());
    } else {
    console.log("No such document!");
}
    }
    useEffect(()=>{
 // TODO: Get listing from params
//  setImageStore(item.imageUrls);
 getItem(itemId)
    }, [triggerChange])
    const removeImage = (image) =>{
        let images = itemData.images.filter(img=>{
            return img !==image;
        })
        setItem({...item,
            imageUrls: images})
            // console.log(images);

        setItemData({...itemData,
        images: images})
       
        // console.log(images);
    }

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
    price: parseFloat(0),
    images: {},
  });
  useEffect(()=>{
 if(item){
    let imagesAllowed = 3 - item.imageUrls.length;
    setImageMax(imagesAllowed)
    console.log(imageMax);
    console.log(item.imageUrls);
 }
}, [item])
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
      setFileSwitch(true);
      
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
    console.log('Heyyyyyy');
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
    // TODO: 
    const imageUrls = item.imageUrls;
    const files =  await Promise.all(
        [...images].map((image) => imageStore(image))
      )
      .catch(() => {
        // toast.error("Images not uploaded");
        return;
      });
     if(fileSwitch){
        files.forEach(file=>{
            imageUrls.push(file);
          })
     }
      
      console.log(files);
    console.log( item.imageUrls, 'Files')
    console.log(imageUrls, 'Imageurks');
    // fileSwitch && files.map(file=>{
    //  return   imageUrls.push(file)
    // });
    // await Promise.all(
    //   [...images].map((image) => imageStore(image))
    // ).catch(() => {
    //   toast.error("Images not uploaded");
    //   return;
    // });
    countAddItem();
    const itemDataCopy = {
      ...itemData,
      imageUrls,
      listingTimeStamp: serverTimestamp(),
    };
    delete itemDataCopy.images;
    // console.log(itemDataCopy);
    // eslint-disable-next-line no-unused-vars
 if(imageMax !== 0 ){
    const docRef = doc(db, 'listing', itemId)
    await updateDoc(docRef, itemDataCopy);
   // clearFields();
   setTrigger((prev)=>{
    return prev + 1;
   })
   toast.success("Listing Created");
 } else {
    toast.error('Maximum 3 images make sure to delet an old image')
 }
    // countAddItem();
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
        <p>Edit product details</p>
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
          <p>Price £</p>
          <input
            onChange={handleChange}
            value={parseFloat(price)}
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
        <div className={classes.formContainer__fileInputContainer__containerOne}>
        <p>Add new image </p>
        <div
          onClick={handleClick}
          className={classes.formContainer__fileInputContainer__containerOne__customFileInput}
        >
          <label htmlFor="file">
            
            {images.length > 0 ? (
              Object.keys(images).map((key, i) => {
                // console.log(images[key].name);
                // console.log(typeof images[key], 'hey');
                return (typeof images[key]=== 'string' && i === 0 ? <span>Select</span>: <span key={key}>{images[key].name} </span>);
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
            max={imageMax}
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
        </div>
        </div>
        <div className={classes.formContainer__fileInputContainer__containerTwo}>
            <h1 className="text-center">Click red icon to delete an image</h1>
            <div className={classes.formContainer__fileInputContainer__containerTwo__imgs}>
          
            {item && item.imageUrls.map(image =>{
                return      (<div className={classes.formContainer__fileInputContainer__containerTwo__imgs__imgCon}>
                <div className={classes.formContainer__fileInputContainer__containerTwo__imgs__imgCon__icon}>
                    <MdDelete onClick={()=>{
                      removeImage(image)
                    }} fill="white" size={25}/>
                </div>
               <img src={image} alt="" srcset="" />
               </div>)
             
            })}
            </div>
        
        </div>
      </div>
    
      <div className={classes.formContainer__buttonContainer}>
        <button onClick={clearFields}>Cancel</button>
        <button onClick={handleSubmit}>Edit Product</button>
      </div>
    </form>
  );
}

export default EditProduct;
