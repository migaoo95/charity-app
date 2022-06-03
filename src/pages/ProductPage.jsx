import classes from "../styles/modules/ProductPage.module.scss";
import blueT from "../assets/jpeg/blueT.jpeg";
import gShirt from "../assets/jpeg/gShirt.jpeg";
import shirt from "../assets/jpeg/shirt.jpg";
import { AiFillHeart } from "react-icons/ai";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Firebase
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
function ProductPage() {
  const { productId } = useParams();
  const [images, setImages] = useState([
    { image: blueT },
    { image: gShirt },
    { image: shirt },
  ]);
  const [item, setItem] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "listing", productId);
        const docSnap = await getDoc(docRef);
        setItem(docSnap.data());

        // console.log(docSnap.data());
        // console.log(productId);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
    check();
  }, []);
  const imageSwap = (index) => {
    // Make a copy of all items in state
    let items = [...item.imageUrls];
    // Store first item value
    let firstItem = items[0];
    // Make a copy of an element
    items[0] = items[index];
    // Change a value of indexed item to value of item[0]
    items[index] = firstItem;
    // Update the state
    setItem({ ...item, imageUrls: items });
  };
  // here ---- >
  const check = () => {};

  return (
    <div className={classes.container}>
      <div className={classes.container__sliderContainer}>
        {/* <div className={classes.container__sliderContainer__leftBtn}>
          <IoIosArrowBack color="white" size={35} />
        </div> */}
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
            {/* <img id="image1" src={item.imageUrls[0]} alt="productImage1" /> */}
            {/* <img id="image1" src={images[0].image} alt="productImage1" /> */}
          </div>

          <div
            className={
              classes.container__sliderContainer__slideShow__sideShowTwo
            }
          >
            {item.imageUrls
              ? item.imageUrls.map((image, i) => {
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
        {/* <div className={classes.container__sliderContainer__rightBtn}>
          <IoIosArrowForward color="white" size={35} />
        </div> */}
      </div>
      <div className={classes.container__descContainer}>
        <div className={classes.container__descContainer__heading}>
          <h1>Patagonia black T-Shirt Flower Lowe</h1>
        </div>
        <div className={classes.container__descContainer__desc}>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s,
          </p>
        </div>
        <div className={classes.container__descContainer__priceBtn}>
          <div className={classes.container__descContainer__priceBtn__price}>
            <h2>Price:</h2>
            <p>400$</p>
            <p>600$</p>
          </div>
          <div className={classes.container__descContainer__priceBtn__wishBtn}>
            <button>
              <AiFillHeart fill="white" size={23} />
              <p>Add to wishlist</p>
            </button>
          </div>
        </div>
      </div>
      <div className={classes.container__btnContainer}>
        <button>Add to cart</button>
      </div>
    </div>
  );
}

export default ProductPage;
