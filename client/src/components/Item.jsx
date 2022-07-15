import classes from "../styles/modules/Item.module.scss";
import { GiHearts } from "react-icons/gi";
import { Link } from "react-router-dom";
import ProductButton from "./buttons/ProductButton";
import { AiFillHeart } from "react-icons/ai";
// eslint-disable-next-line no-unused-vars
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
function Item({
  data,
  id,
  allListings,
  icon,
  bg,
  addToCart,
  disable,
  removeItem,
  editItem,
  disableLike,
  getAllLikes,
}) {
  const auth = getAuth();
  const { v4: uuidv4 } = require("uuid");
  const like_item = async (id, auth, item) => {
    // eslint-disable-next-line no-unused-vars
    const docRef = await addDoc(collection(db, "user_like"), {
      item_id: id,
      user_id: auth,
      item: item,
    });
    getAllLikes();
    toast.success("Item added to watchlist");
  };
  // TODO: Set condition &&
  // useEffect(() => {
  //   console.log(data);
  // }, []);
  return (
    <Link to={`/${id}`}>
      <div className={`${classes.item}`}>
        <div className={classes.item__image}>
          {allListings && (
            <div
              onClick={(e) => {
                e.preventDefault();
                !disableLike
                  ? like_item(id, auth.currentUser.uid, data)
                  : toast.error("Product already in watchlist");
              }}
              className={`${classes.item__image__icon} ${
                disableLike && classes.item__image__iconDisabled
              }`}
            >
              <button>
                <GiHearts fill={!disableLike ? "white" : "grey"} size={18} />
              </button>
            </div>
          )}

          <img src={data.imageUrls[0]} alt="" />
        </div>
        <div className={classes.item__desc}>
          <div className={classes.item__desc__info}>
            <p>{data.name}</p>
            <h1>
              Condition: <span>Used</span>
            </h1>
            {allListings && (
              <h1 className="">
                Seller: <span>migao95</span>{" "}
              </h1>
            )}
          </div>
          <div className={classes.item__desc__priceCart__price}>
            <h1>
              Price:
              <span>{data.price}$</span>
            </h1>

            {!allListings && (
              <div className={classes.item__desc__priceCart__price__mobileBtn}>
                <ProductButton
                  key={uuidv4()}
                  text="Delete"
                  bg={bg}
                  icon={icon[0]}
                />
                <ProductButton
                  key={uuidv4()}
                  text="Edit"
                  bg={"#4AD17E"}
                  icon={icon[1]}
                  modal={true}
                />
              </div>
            )}

            {allListings && (
              <div className={classes.item__desc__priceCart__price__btns}>
                <div
                  className={classes.item__desc__priceCart__price__hiddenBtn}
                >
                  <ProductButton
                    key={uuidv4()}
                    text="Add to cart"
                    bg={"#fa5d43"}
                    icon={<AiFillHeart />}
                  />
                </div>
                {/* This button  */}
                <ProductButton
                  page={true}
                  disable={disable}
                  key={uuidv4()}
                  text={!disable ? "Add to Cart" : "Item in Cart"}
                  bg={!disable ? bg : "#6C6C6C"}
                  icon={!disable ? icon[0] : null}
                  clickFunc={() => {
                    addToCart(data, id);
                  }}
                />
              </div>
            )}
          </div>
          <div className={classes.item__desc__priceCartUser}>
            <div className=""></div>
            {!allListings && [
              <ProductButton
                key={uuidv4()}
                text="Delete"
                bg={bg}
                icon={icon[0]}
                clickFunc={() => {
                  removeItem(id);
                }}
              />,
              <ProductButton
                key={uuidv4()}
                text="Edit"
                bg={"#4AD17E"}
                icon={icon[1]}
                clickFunc={() => {
                  editItem();
                }}
              />,
            ]}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Item;
