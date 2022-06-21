import classes from "../styles/modules/Item.module.scss";
import { GiHearts } from "react-icons/gi";
import { Link } from "react-router-dom";
import ProductButton from "./buttons/ProductButton";
import { AiFillHeart } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
function Item({ data, id, allListings, icon, bg }) {
  const { v4: uuidv4 } = require("uuid");
  return (
    <Link to={`/${id}`}>
      <div className={`${classes.item}`}>
        <div className={classes.item__image}>
          {allListings && (
            <div className={classes.item__image__icon}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <GiHearts fill="white" size={18} />
              </button>
            </div>
          )}

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
          <div className={classes.item__desc__priceCart__price}>
            <h1>
              Price:
              <span>{data.price}$</span>
            </h1>

            {!allListings && (
              <div className={classes.item__desc__priceCart__price__mobileBtn}>
                <ProductButton
                  key={uuidv4()}
                  text="Delete"
                  bg={bg}
                  icon={icon[0]}
                />
                <ProductButton
                  key={uuidv4()}
                  text="Edit"
                  bg={"#4AD17E"}
                  icon={icon[1]}
                />
              </div>
            )}

            {allListings && (
              <div className={classes.item__desc__priceCart__price__btns}>
                <div
                  className={classes.item__desc__priceCart__price__hiddenBtn}
                >
                  <ProductButton
                    key={uuidv4()}
                    text="Add to cart"
                    bg={"#fa5d43"}
                    icon={<AiFillHeart />}
                  />
                </div>
                <ProductButton
                  key={uuidv4()}
                  text="Add to cart"
                  bg={bg}
                  icon={icon[0]}
                />
              </div>
            )}
          </div>
          <div className={classes.item__desc__priceCartUser}>
            <div className=""></div>
            {!allListings && [
              <ProductButton
                key={uuidv4()}
                text="Delete"
                bg={bg}
                icon={icon[0]}
              />,
              <ProductButton
                key={uuidv4()}
                text="Edit"
                bg={"#4AD17E"}
                icon={icon[1]}
              />,
            ]}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Item;
