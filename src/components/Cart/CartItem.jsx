import classes from "../../styles/modules/Cart/CartItem.module.scss";
import shirt from "../../assets/jpeg/shirt.jpg";
import { AiFillHeart, AiFillDelete } from "react-icons/ai";
function CartItem() {
  return (
    <div className={classes.container}>
      <div className={classes.container__imageContainer}>
        <img src={shirt} alt="" />
      </div>
      <div className={classes.container__infoContainer}>
        <div className={classes.container__infoContainer__descPrice}>
          <div className={classes.container__infoContainer__descPrice__desc}>
            <h1>Patagonia black Tshirt Flower love</h1>
          </div>
          <div className={classes.container__infoContainer__descPrice__price}>
            <h1>$400.99</h1>
          </div>
        </div>
        <div className={classes.container__infoContainer__sizeBtns}>
          <div className={classes.container__infoContainer__sizeBtns__size}>
            <h1>
              Size: <span>XL</span>
            </h1>
          </div>
          <div className={classes.container__infoContainer__sizeBtns__btns}>
            <button>
              <AiFillHeart />
              <p>Watch</p>
            </button>
            <button>
              <AiFillDelete />
              <p>Remove</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
