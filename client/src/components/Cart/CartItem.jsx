import classes from "../../styles/modules/Cart/CartItem.module.scss";
import shirt from "../../assets/jpeg/shirt.jpg";
import { AiFillHeart, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

function CartItem({
  data,
  removeItem,
  btn_one,
  like,
  removeLike,
  id,
  addToCart,
}) {
  useEffect(() => {
    // console.log(window.location.pathname === "cart");
    // console.log(data);
    console.log(data);
  }, []);
  return (
    <Link to={`/${like ? id : data.item_id}`}>
      <div className={classes.container}>
        <div className={classes.container__imageContainer}>
          <img src={data.imageUrls[0]} alt="" />
        </div>
        <div className={classes.container__infoContainer}>
          <div className={classes.container__infoContainer__descPrice}>
            <div className={classes.container__infoContainer__descPrice__desc}>
              <h1>{data.name}</h1>
            </div>
            <div className={classes.container__infoContainer__descPrice__price}>
              <h1>{data.price}£</h1>
            </div>
          </div>
          <div className={classes.container__infoContainer__sizeBtns}>
            <div className={classes.container__infoContainer__sizeBtns__size}>
              <h1>
                Size: <span>XL</span>
              </h1>
            </div>
            <div className={classes.container__infoContainer__sizeBtns__btns}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  like && addToCart(data, id);
                }}
              >
                {btn_one.icon}
                <p>{btn_one.text}</p>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  !like ? removeItem(data.item_id, data.docID) : removeLike();

                  // toast.success("Product removed from cart ");
                }}
              >
                <AiFillDelete />
                <p>Remove</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CartItem;
