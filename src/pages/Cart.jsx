import classes from "../styles/modules/Cart/Cart.module.scss";
import CartItem from "../components/Cart/CartItem";
function Cart() {
  return (
    <div className={classes.container}>
      <div className={classes.container__heading}>
        <h1>Checkout</h1>
      </div>
      <div className={classes.container__checkOut}>
        <div className={classes.container__checkOut__cart}>
          <div className={classes.container__checkOut__cart__headingCart}>
            <h1>Cart</h1>
          </div>
          <div className={classes.container__checkOut__cart__containItems}>
            <CartItem />
            <CartItem />
          </div>
        </div>
        <div className={classes.container__checkOut__sumUp}>
          <div className={classes.container__checkOut__sumUp__heading}>
            <h1>Delivery</h1>
          </div>
          <div className={classes.container__checkOut__sumUp__type}>
            <div className={classes.container__checkOut__sumUp__type__standard}>
              <h1>Standard: 5.00$</h1>
            </div>
            <div className={classes.container__checkOut__sumUp__type__express}>
              <h1>Express: 9.00$</h1>
            </div>
          </div>
          <div className={classes.container__checkOut__sumUp__type__delivery}>
            <p>
              Estimated delivery date: <span>June 24, 2022</span>
            </p>
          </div>
          <div className={classes.container__checkOut__sumUp__total}>
            <div className={classes.container__checkOut__sumUp__total__details}>
              <p>Delivery</p>
              <p>$5.00</p>
            </div>
            <div className={classes.container__checkOut__sumUp__total__details}>
              <p>Items Total</p>
              <p>$800.00</p>
            </div>
            <div
              className={
                classes.container__checkOut__sumUp__total__detailsTotal
              }
            >
              <p>Total</p>
              <p>$805.00</p>
            </div>
          </div>
          <div className={classes.container__checkOut__sumUp__btnContainer}>
            <button>Proceed to checkout</button>
            <button>Continue shopping</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
