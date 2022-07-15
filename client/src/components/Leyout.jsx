import { useState } from "react";
import classes from "../styles/modules/Leyout.module.scss";
function Leyout({ children }) {
  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScroll(position);
  };

  return (
    <div style={{}} className={classes.mainLeyout}>
      {children}
    </div>
  );
}

export default Leyout;
