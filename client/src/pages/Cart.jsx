import classes from "../styles/modules/Cart/Cart.module.scss";
import CartItem from "../components/Cart/CartItem";
import useFetch from "../hooks/useFetch";
import useFetchGql from "../hooks/useFetchGql";
import { QGL_QUERY } from "../API/queries";
import { db } from "../firebase-config";
import {
  where,
  query,
  collection,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
// eslint-disable-next-line no-unused-vars
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { getDate } from "../helpers/helpers";
// -------------------------- Stripe

import Checkout from "../components/Checkout";
import { AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import Select from "react-select";
function Cart() {
  // eslint-disable-next-line no-unused-vars
  const { data, loading } = useFetchGql(QGL_QUERY, { limit: 25 });
  const [gqlData, setGqlData] = useState([{}]);
  useEffect(() => {
    const dataClone = [];
    data &&
      data.data.CHC.getCharities.list.forEach((item) => {
        dataClone.push({
          value: item.id,
          label: item.name,
        });
      });
    setGqlData(dataClone);
  }, [data]);
  const { v4: uuidv4 } = require("uuid");
  const auth = getAuth();
  const [date, setDate] = useState();
  const [total, setTotal] = useState(0);
  const [sumTotal, setSumTotal] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [deliverPrices, setDeliveryPrices] = useState({
    standard: 5,
    express: 9,
  });
  const [test, setTest] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const { items, removeThis } = useFetch(
    query(
      collection(db, "user_cart"),
      where("user_id", "==", auth.currentUser.uid)
    )
  );
  useEffect(() => {
    items ? setTest(items[0].data.products_id) : setTest(null);
    if (test) {
      test.length !== 0 ? setDisabled(false) : setDisabled(true);
    }
  }, [test, items]);
  // ------------------- Sum all items price
  useEffect(() => {
    if (items) {
      let newArr = [];
      items[0].data.products_id.forEach((item) => {
        newArr.push(item.price);
      });
      let sum = newArr.reduce((prev, current) => {
        return prev + current;
      }, 0);
      setTotal(sum);
    }
  }, [items, total]);
  useEffect(() => {
    // ----------- Generate delivery estimation
    let generateDate;
    deliveryOption ? (generateDate = getDate(10)) : (generateDate = getDate(2));
    setDate(generateDate);
    // ---------- Sum total price with delivery cost
    const delivery = deliveryOption ? 5 : 9;
    const sum = total + delivery;
    setSumTotal(sum);
  }, [deliveryOption, total]);
  const removeItem = async (id, docID) => {
    const docRef = doc(db, "user_cart", docID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Filter through products array agains ID
      let itemsCopy = test.filter((item) => {
        return item.item_id !== id;
      });
      removeThis();
      toast.success("Product removed from cart");
      await setDoc(doc(db, "user_cart", docID), {
        products_id: itemsCopy,
        user_id: auth.currentUser.uid,
        docID: docID,
      });

      // Update state
    } else {
      console.log("doc dont exist");
    }
  };
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
            {test && test.length !== 0 ? (
              test.map((item) => {
                return (
                  <CartItem
                    removeItem={removeItem}
                    key={uuidv4()}
                    data={item}
                    btn_one={{ text: "Watch", icon: <AiFillHeart /> }}
                  />
                );
              })
            ) : (
              <h1>No items</h1>
            )}
          </div>
        </div>
        <div className={classes.container__checkOut__sumUp}>
          <div className={classes.container__checkOut__sumUp__heading}>
            <h1>Delivery</h1>
          </div>
          <div className={classes.container__checkOut__sumUp__type}>
            <div
              className={`${
                classes.container__checkOut__sumUp__type__standard
              } ${deliveryOption && classes.active}`}
              onClick={() => {
                setDeliveryOption(true);
              }}
            >
              <h1>Standard: 5.00$</h1>
            </div>
            <div
              className={`${
                classes.container__checkOut__sumUp__type__express
              } ${!deliveryOption && classes.active}`}
              onClick={() => {
                setDeliveryOption(false);
              }}
            >
              <h1>Express: 9.00$</h1>
            </div>
          </div>
          <div className={classes.container__checkOut__sumUp__type__delivery}>
            {/* TODO: Get a current date and add days depending on type of delivery */}
            <p>
              Estimated delivery date: <span>{date}</span>
            </p>
          </div>
          <div className={classes.container__checkOut__sumUp__total}>
            <div className={classes.container__checkOut__sumUp__total__details}>
              <p>Delivery</p>
              <p>
                $
                {deliveryOption
                  ? deliverPrices.standard.toFixed(2)
                  : deliverPrices.express.toFixed(2)}
              </p>
            </div>
            <div className={classes.container__checkOut__sumUp__total__details}>
              <p>Items Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <div
              className={
                classes.container__checkOut__sumUp__total__detailsTotal
              }
            >
              <p>Total</p>
              <p>${sumTotal.toFixed(2)}</p>
            </div>
          </div>
          <div className={classes.container__checkOut__sumUp__select}>
            <p>Select charity that will recive all funds from this purchase</p>
            <Select options={gqlData} />
          </div>
          <div className={classes.container__checkOut__sumUp__btnContainer}>
            <Checkout
              shipping={deliveryOption}
              items={test}
              disabled={disabled}
            />
            <button>Continue shopping</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
