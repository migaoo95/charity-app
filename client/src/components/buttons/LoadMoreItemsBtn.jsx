import classes from "../../styles/modules/Buttons/LoadMoreBtn.module.scss";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";

function LoadMoreItemsBtn({ inc, handleClick }) {
  const [itemsInDb, setItemsInDb] = useState(0);
  const [increase, setIncrease] = useState(9);
  const [hide, setHide] = useState(false);

  const getSize = async () => {
    const sizeRef = doc(db, "count", "T9wguA8kalgZYEnMJpQn");
    const snapSize = await getDoc(sizeRef);
    setItemsInDb(snapSize.data().count);
  };
  useEffect(() => {
    getSize();
  }, []);

  useEffect(() => {
    inc(increase);
    increase >= itemsInDb ? setHide(true) : setHide(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [increase, itemsInDb]);
  return (
    <div
      className={`${classes.bottomBtn} ${hide && classes.bottomBtn__hidden}`}
    >
      <button
        onClick={() => {
          itemsInDb <= increase && setHide(true);
          setIncrease((prev) => {
            return prev + 9;
          });
        }}
      >
        Load more products
      </button>
    </div>
  );
}

export default LoadMoreItemsBtn;
