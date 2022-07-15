import { useEffect } from "react";
import { useState } from "react";
import success from "../../assets/png/success.png";
import CheckoutItem from "../../components/Checkout/CheckoutItem";
import classes from "../../styles/modules/Checkout/Success.module.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { db } from "../../firebase-config";
import { where, query, collection, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
function Success() {
  const auth = getAuth();
  const [counter, setCount] = useState(10);
  const [total, setTotal] = useState(0);
  const { items } = useFetch(
    query(
      collection(db, "user_cart"),
      where("user_id", "==", auth.currentUser.uid)
    )
  );
  const navigate = useNavigate("/");
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
  }, [items]);
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const intreval = setInterval(() => {
      setCount((prev) => {
        return prev - 1;
      });
    }, 1000);
  }, []);
  const clearBasket = async () => {
    await setDoc(doc(db, "user_cart", items[0].data.docID), {
      user_id: auth.currentUser.uid,
      products_id: [],
    });
  };
  useEffect(() => {
    if (counter <= 0) {
      navigate("/");
      clearBasket();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainContainer__heading}>
        <div className={classes.mainContainer__heading__text}>
          <h1>Congratulation</h1>
          <p>You have succesfully purchased following items</p>
          <p>
            You will be redirected in{" "}
            <span className="text-[red]">{`00:${counter}s`}</span>
          </p>
        </div>
        <img src={success} alt="" />
      </div>
      <div className={classes.mainContainer__info}>
        <div className="">
          {items &&
            items[0].data.products_id.map((item) => {
              return <CheckoutItem data={item} />;
            })}
        </div>
        <div className={classes.mainContainer__info__total}>
          <h1>Total : {total}$</h1>
        </div>
      </div>
    </div>
  );
}

export default Success;
