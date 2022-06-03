import classes from "../styles/modules/Item.module.scss";
// import shirt from "../assets/jpeg/shirt.jpg";
import { GiHearts } from "react-icons/gi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import x from "../assets/png/x.png";
import { Link } from "react-router-dom";
import ProductButton from "./buttons/ProductButton";

function Item({ data, id, allListings }) {
  return (
    <Link to={`/${id}`}>
      <div className={`${classes.item}`}>
        <div className={classes.item__image}>
          <div className={classes.item__image__icon}>
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <GiHearts fill="white" size={18} />
            </button>
          </div>

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
          <div
            className={
              allListings
                ? classes.item__desc__priceCart
                : classes.item__desc__priceCartUser
            }
          >
            <div className={classes.item__desc__priceCart__price}>
              <h1>
                Price:
                <span>{data.price}$</span>
              </h1>
            </div>
            <div className={classes.item__desc__priceCart__likeCartDiv}>
              {" "}
              {/* <div
                className={classes.item__desc__priceCart__likeCartDiv__likeIcon}
              >
                <GiHearts fill="white" size={18} />
              </div> */}
              {/* <button
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <MdOutlineAddShoppingCart fill="white" size={18} />
                <span> Add to cart</span>
              </button> */}
              <ProductButton
                icon={<MdOutlineAddShoppingCart fill="white" size={18} />}
              />
              {!allListings && (
                <ProductButton
                  icon={<MdOutlineAddShoppingCart fill="white" size={18} />}
                />
              )}
              {/* <ProductButton /> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Item;
