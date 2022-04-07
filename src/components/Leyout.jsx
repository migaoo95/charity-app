import classes from "../styles/modules/Leyout.module.scss";
function Leyout({ children }) {
  return <div className={classes.mainContainer}>{children}</div>;
}

export default Leyout;
