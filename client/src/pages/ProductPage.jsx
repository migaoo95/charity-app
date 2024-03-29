import classes from "../styles/modules/ProductPage.module.scss";
import { AiFillHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Firebase
import { db } from "../firebase-config";
import { doc, getDoc, where, query, getDocs } from "firebase/firestore";
import BackButton from "../components/buttons/BackButton";
import {
  getCartItems,
  getUpdatedCart,
} from "../helpers/cartFunctionality/cart";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
function ProductPage() {
  const auth = getAuth();
  const { productId } = useParams();
  const [item, setItem] = useState({});
  const [itemExistsInCart, setItemExists] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [itemId, setItemId] = useState("");
  const [existInLike, setExist] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);
  const check = (item) => {
    if (itemExistsInCart.includes(item)) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const fetchProduct = async () => {
    try {
      const docRef = doc(db, "listing", productId);
      const docSnap = await getDoc(docRef);
      setItem(docSnap.data());
      setItemId(docSnap.id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProduct();
    getUpdatedCart().then((data) => {
      setItemExists(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    check(itemId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemExistsInCart, item]);

  const imageSwap = (index) => {
    let items = [...item.imageUrls];
    let firstItem = items[0];
    items[0] = items[index];
    items[index] = firstItem;
    setItem({ ...item, imageUrls: items });
  };
  const handleClick = () => {
    getCartItems(null, item, productId);
  };
  const handleAdd = async (id, auth, item) => {
    // eslint-disable-next-line no-unused-vars
    const docRef = await addDoc(collection(db, "user_like"), {
      item_id: id,
      user_id: auth,
      item: item,
    });
    toast.success("Item added to watchlist");
  };
  // Get entire like list  && check for ids
  const getLikes = async () => {
    const q = query(
      collection(db, "user_like"),
      where("user_id", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (productId === doc.data().item_id) {
        setExist(true);
      }
    });
  };

  // Effect for cart and likes
  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  useEffect(() => {
    console.log(item);
    getLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.container__bckBtn}>
        <BackButton to="/" />
      </div>
      <div className={classes.container__sliderContainer}>
        <div className={classes.container__sliderContainer__slideShow}>
          <div
            className={
              classes.container__sliderContainer__slideShow__sideShowOne
            }
          >
            {item.imageUrls ? (
              <img id="image1" src={item.imageUrls[0]} alt="productImage1" />
            ) : (
              ""
            )}
          </div>

          <div
            className={
              classes.container__sliderContainer__slideShow__sideShowTwo
            }
          >
            {item.imageUrls
              ? // eslint-disable-next-line array-callback-return
                item.imageUrls.map((image, i) => {
                  if (i > 0) {
                    return (
                      <img
                        onClick={() => {
                          imageSwap(i);
                        }}
                        key={image}
                        id="image1"
                        src={item.imageUrls[i]}
                        alt="productImage1"
                      />
                    );
                  }
                })
              : ""}
          </div>
        </div>
      </div>
      <div className={classes.container__descContainer}>
        <div className={classes.container__descContainer__heading}>
          <h1>{item.name}</h1>
        </div>
        <div className={classes.container__descContainer__desc}>
          <p>{item.desc}</p>
        </div>
        <div className={classes.container__descContainer__priceBtn}>
          <div className={classes.container__descContainer__priceBtn__price}>
            <h2>Price:</h2>
            <p>{item.price}£</p>
          </div>
          <div className={classes.container__descContainer__priceBtn__wishBtn}>
            <button
              className={
                existInLike &&
                classes.container__descContainer__priceBtn__wishBtn__disable
              }
              onClick={() => {
                !existInLike &&
                  handleAdd(productId, auth.currentUser.uid, item);
                setExist(true);
              }}
            >
              {!existInLike && <AiFillHeart fill="white" size={23} />}
              <p>{existInLike ? "Item in wishlis" : "Add to wishlist"}</p>
            </button>
          </div>
        </div>
      </div>
      <div className={classes.container__btnContainer}>
        <button
          disabled={disableBtn}
          className={disableBtn ? classes.disabled : classes.enabled}
          onClick={() => {
            if (!disableBtn) {
              handleClick();
              setDisableBtn(true);
              toast.success("Product added in cart");
            }
          }}
        >
          {disableBtn ? "Item stored in cart" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
