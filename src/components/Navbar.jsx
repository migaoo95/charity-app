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
import { useNavigate, Link } from "react-router-dom";
// ------------------------- { google Auth }
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
function Navbar() {
  const auth = getAuth();
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
  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/signup");
  };
  return (
    <header className={classes.header}>
      <div className={classes.header__main}>
        <div className={classes.header__main__toggler}>
          {menuToggle ? (
            <HiMenu onClick={handleMenuToggle} size={35} />
          ) : (
            <AiOutlineClose onClick={handleMenuToggle} size={35} />
          )}
        </div>
        <div className={classes.header__main__logo}>
          <GiLoveHowl size={50} />
          <p>Charity.io</p>
        </div>
        <nav
          className={`${classes.header__main__nav} ${
            menuToggle ? classes.header__main__hide : ""
          }`}
        >
          <ul className="">
            <li className="">
              <div>
                <ShopIcon width={33} />
              </div>
              <span>Marketplace</span>
            </li>
            <li>
              <div>
                <ShieldHeart width={33} />
              </div>

              <span>Charity</span>
            </li>
            <li className={classes.header__main__nav__active}>
              <div>
                <List width={33} />
              </div>

              <span>
                <Link to="/listing">My Listings</Link>
              </span>
            </li>
            <li>
              <div>
                <Plus width={33} />
              </div>

              <span>Create Listing</span>
            </li>
          </ul>
        </nav>
        <div className={classes.header__main__logcart}>
          <button>
            <span>Cart</span>
            <Cart width={27} />
          </button>

          <Exit className={classes.exitBtn} width={33} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
