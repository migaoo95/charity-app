import useFetch from "../hooks/useFetch";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase-config";
import { data } from "autoprefixer";
import Item from "../components/Item";
import { MdAddShoppingCart } from "react-icons/md";
import { useState } from "react";
function Test() {
  const [increase, setIncrease] = useState(1);
  // Fetch items using a hook
  const { items, count, func } = useFetch(
    query(
      collection(db, "listing"),
      orderBy("listingTimeStamp", "desc"),
      limit(increase)
    )
  );

  return (
    <>
      <div className="m-auto grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 gap-2 md:gap-8 sm:gap-3">
        {items &&
          items.map((item) => {
            return (
              <Item
                bg={"#DD9788"}
                key={item.id}
                id={item.id}
                data={item.data}
                allListings={true}
                icon={[<MdAddShoppingCart size={20} />]}
              />
            );
          })}
      </div>
      <button
        className="btn btn-primary"
        onClick={() => {
          setIncrease((prev) => {
            return prev + 1;
          });
          func();
        }}
      >
        Increase Limit
      </button>
    </>
  );
}

export default Test;
