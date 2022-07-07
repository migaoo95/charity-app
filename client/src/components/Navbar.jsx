import classes from "../styles/modules/Navbar.module.scss";
// ------------------------- { Icons }
import { ReactComponent as ShieldHeart } from "../assets/svg/shieldH.svg";
import { ReactComponent as ShopIcon } from "../assets/svg/shopIcon.svg";
import { ReactComponent as List } from "../assets/svg/listIcon.svg";
import { ReactComponent as Plus } from "../assets/svg/squarePlus.svg";
import { ReactComponent as Exit } from "../assets/svg/exitIcon.svg";
import { ReactComponent as Cart } from "../assets/svg/cartIcon.svg";
import { HiMenu } from "react-icons/hi";
import { GiLoveHowl } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
// ------------------------- { google Auth }
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useParams } from "react-router-dom";
function Navbar({ showModal, highlight }) {
  // ---------------------- { getParams }
  const { itemId, productId } = useParams();
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuToggle, setMenuToggle] = useState(true);
  const handleMenuToggle = () => {
    setMenuToggle((prev) => !prev);
  };
  // const [changeDetails, setChangeDetails] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: auth.currentUser.displayName,
  //   email: auth.currentUser.email,
  // });
  // const { name, email } = formData;
  const onLogout = () => {
    auth.signOut();
    navigate("/signup");
  };
  // Active class function
  const activeClassPath = (route) => {
    if (
      route === location.pathname ||
      `${route}/${itemId}` === location.pathname ||
      `${route}/${productId}` === location.pathname
    ) {
      return true;
    }
  };

  return (
    <div className="">
      <header className={`${classes.header} max-w-[1500px] m-auto`}>
        <div className={classes.header__main}>
          <div className={classes.header__main__toggler}>
            {menuToggle ? (
              <HiMenu onClick={handleMenuToggle} size={35} />
            ) : (
              <AiOutlineClose onClick={handleMenuToggle} size={35} />
            )}
          </div>
          <div className={classes.header__main__logo}>
            <GiLoveHowl size={45} />
            <p>Charity.io</p>
          </div>
          <nav
            className={`${classes.header__main__nav} ${
              menuToggle ? classes.header__main__hide : ""
            }`}
          >
            <ul
              className=""
              onClick={(e) => {
                handleMenuToggle();
              }}
            >
              <li
                onClick={() => navigate("/")}
                className={
                  activeClassPath("/") || location.pathname === `/${productId}`
                    ? classes.header__main__nav__active
                    : ""
                }
              >
                <div>
                  <ShopIcon width={33} />
                </div>
                <span>Marketplace</span>
              </li>
              <li
                onClick={() => navigate("/charities")}
                className={
                  activeClassPath("/charities")
                    ? classes.header__main__nav__active
                    : ""
                }
              >
                <div>
                  <ShieldHeart width={33} />
                </div>

                <span>Charities</span>
              </li>
              <li
                onClick={() => navigate("/listing")}
                className={
                  activeClassPath("/listing")
                    ? classes.header__main__nav__active
                    : ""
                }
              >
                <div>
                  <List width={33} />
                </div>

                <span>My Listings</span>
              </li>

              <li
                onClick={() => navigate("/create")}
                className={
                  activeClassPath("/create")
                    ? classes.header__main__nav__active
                    : ""
                }
              >
                <div>
                  <Plus width={33} />
                </div>

                <span>Create Listing</span>
              </li>

              <li
                className={classes.header__main__nav__logout}
                onClick={onLogout}
              >
                <span>
                  Logout
                  <Exit width={33} />
                </span>
              </li>
            </ul>
          </nav>
          <div className={classes.header__main__logcart}>
            <button
              className={
                location.pathname === "/cart"
                  ? classes.header__main__logcart__activeCart
                  : ""
              }
              onClick={() => {
                if (!menuToggle) {
                  handleMenuToggle();
                }
                navigate("/cart");
              }}
            >
              <span>Cart</span>
              <Cart width={27} />
            </button>
            <button
              className={highlight && classes.shadow}
              // className={
              //   location.pathname === "/cart"
              //     ? classes.header__main__logcart__activeCart
              //     : ""
              // }
              onClick={() => {
                showModal("Hello");
              }}
            >
              <AiFillHeart fill="white" size={25} />
            </button>
            <div>
              <Exit onClick={onLogout} className={classes.exitBtn} width={33} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
