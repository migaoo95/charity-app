import classes from "../styles/modules/Item.module.scss";
import shirt from "../assets/jpeg/shirt.jpg";
import { GiHearts } from "react-icons/gi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
function Item() {
  return (
    <div className={`${classes.item}`}>
      <div className={classes.item__image}>
        <div className={classes.item__image__icon}>
          <GiHearts fill="white" size={18} />
        </div>

        <img src={shirt} alt="" />
      </div>
      <div className={classes.item__desc}>
        <p className="">Seller: migao95</p>
        <p>Patagonia black T-Shirt Flower Love</p>
        <p>Price:</p>
        <div className="">
          <p>
            $400 <span>$600</span>
          </p>
          <button>
            <MdOutlineAddShoppingCart fill="white" size={18} />
            <span> Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
