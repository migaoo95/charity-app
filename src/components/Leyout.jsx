import { useState, useEffect } from "react";
import classes from "../styles/modules/Leyout.module.scss";
function Leyout({ children }) {
  const [scroll, setScroll] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScroll(position);
    console.log(scroll);
  };
  useEffect(() => {
    console.log(window.scrollY);
  }, []);
  console.log(window.pageYOffset);
  return (
    <div style={{}} className={classes.mainLeyout}>
      {children}
    </div>
  );
}

export default Leyout;
{
  /* <div className={`${classes.mainContainerr}  max-w-[1500px] m-auto`}>
<div className="m-auto overflow-auto  max-w-[840px]">{children}</div>
</div> */
}
