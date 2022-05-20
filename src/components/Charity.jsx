import classes from "../styles/modules/ItemCharity.module.scss";
import twitter from "../assets/png/twt.png";
import boxarrow from "../assets/png/boxarrow.png";
import { BsBoxArrowInRight } from "react-icons/bs";
import { CgArrowRightR } from "react-icons/cg";
import { spliter } from "../helpers/helpers";
import { useEffect } from "react";
function Charity({ data }) {
  console.log(data);
  let logo;
  if (data.image) {
    logo = true;
    if (data.image.logo.small === null) {
      logo = false;
    }
  } else {
    logo = false;
  }
  // Target only first letter to uppercase
  const stringShortener = (str, length) => {
    return str.length > length
      ? str.substr(0, length - 1).toLowerCase() + "..."
      : str;
  };
  // Remove http from a string
  const urlShortener = (url) => {
    return url.replace(/^http:\/\//, "");
  };
  // useEffect(() => {

  // }, []);
  return (
    <div className={classes.container}>
      <div className={classes.container__topContainer}>
        <div className={classes.container__topContainer__logo}>
          {logo ? (
            <img src={data.image.logo.small} alt="" />
          ) : (
            <p>{spliter(data.name)}</p>
          )}
          {/* <img src={data.image.logo.small} alt="" /> */}
        </div>
        <div className={classes.container__topContainer__text}>
          <span>{data.name}</span>
          <h1>{data.causes[0].name}</h1>
        </div>
        <div className={classes.container__topContainer__value}>
          <h1>$993m</h1>
        </div>
      </div>
      <div className={classes.container__bottomContainer}>
        <div className={classes.container__bottomContainer__desc}>
          <div className={classes.container__bottomContainer__desc__mainDesc}>
            <h1>{stringShortener(data.objectives, 105)}</h1>
          </div>
          <div className={classes.container__bottomContainer__desc__links}>
            <a href={data.website}>{urlShortener(data.website)}</a>
            <img src={twitter} alt="" />
            <img src={twitter} alt="" />
            <img src={twitter} alt="" />
          </div>
        </div>
        <div className={classes.container__bottomContainer__buttonContainer}>
          <div
            className={classes.container__bottomContainer__buttonContainer__btn}
          >
            <CgArrowRightR fill="white" color="white" size={26} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charity;
