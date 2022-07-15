import classes from "../styles/modules/Input.module.scss";
import { BiSearchAlt } from "react-icons/bi";

function SearchBar({ handleChange }) {
  return (
    <div className={classes.inputWithIcon}>
      <input
        onChange={(e) => {
          handleChange(e);
        }}
        type="text"
        placeholder="Find your items here..."
      />
      <span>
        <BiSearchAlt size={25} />
      </span>
    </div>
  );
}

export default SearchBar;
