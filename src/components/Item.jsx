import classes from "../styles/modules/Item.module.scss";
// import shirt from "../assets/jpeg/shirt.jpg";
import { GiHearts } from "react-icons/gi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
function Item({ data }) {
  return (
    <div className={`${classes.item}`}>
      <div className={classes.item__image}>
        <div className={classes.item__image__icon}>
          <GiHearts fill="white" size={18} />
        </div>

        <img src={data.imageUrls[0]} alt="" />
      </div>
      <div className={classes.item__desc}>
        <p className="">Seller: migao95</p>
        <p>{data.name}</p>
        <p>Price:</p>
        <div className={classes.item__desc__priceCart}>
          <p>
            {data.price}
            <span>$600</span>
          </p>
          <div className={classes.item__desc__priceCart__likeCartDiv}>
            {" "}
            <div
              className={classes.item__desc__priceCart__likeCartDiv__likeIcon}
            >
              <GiHearts fill="white" size={18} />
            </div>
            <button>
              <MdOutlineAddShoppingCart fill="white" size={18} />
              <span> Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
