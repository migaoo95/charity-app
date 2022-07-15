import classes from "../styles/modules/ItemCharity.module.scss";
import twitter from "../assets/png/twt.png";
import facebook from "../assets/png/fcb.png";
import instagram from "../assets/png/insta.png";
import { CgArrowRightR } from "react-icons/cg";
import { spliter, urlShortener, stringShortener } from "../helpers/helpers";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { v4 as uuidv4 } from "uuid";
function Charity({ data, size }) {
  const { v4: uuidv4 } = require("uuid");
  // console.log(data);
  let logo;
  if (data.image) {
    logo = true;
    if (data.image.logo.small === null) {
      logo = false;
    }
  } else {
    logo = false;
  }

  const navigate = useNavigate();
  //

  return (
    <div
      onClick={
        size.width <= 969
          ? () => {
              navigate(`/charities/${data.id}`);
            }
          : null
      }
      className={classes.container}
    >
      <div className={classes.container__topContainer}>
        <div className={classes.container__topContainer__logo}>
          {logo ? (
            <img src={data.image.logo.small} alt="" />
          ) : (
            <p>{spliter(data.name)}</p>
          )}
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
            <h1>
              {stringShortener(data.objectives, size.width < 936 ? 100 : 115)}
            </h1>
          </div>
          <div className={classes.container__bottomContainer__desc__links}>
            <div
              className={
                classes.container__bottomContainer__desc__links__urlLink
              }
            >
              <a rel="noreferrer" target="_blank" href={data.website}>
                {urlShortener(data.website)}
              </a>
            </div>
            <div
              className={
                classes.container__bottomContainer__desc__links__social
              }
            >
              {data.contact.social.length >= 1
                ? // eslint-disable-next-line array-callback-return
                  data.contact.social.map((social) => {
                    if (social.platform === "facebook") {
                      return (
                        <a
                          key={uuidv4()}
                          target="_blank"
                          rel="noreferrer"
                          href={`https://www.facebook.com/${social.handle}`}
                        >
                          <img src={facebook} alt="" />
                        </a>
                      );
                    } else if (social.platform === "instagram") {
                      return (
                        <a
                          key={uuidv4()}
                          target="_blank"
                          rel="noreferrer"
                          href={`https://www.instagram.com/${social.handle}`}
                        >
                          <img src={instagram} alt="" />
                        </a>
                      );
                    } else if (social.platform === "twitter") {
                      return (
                        <a
                          key={uuidv4()}
                          target="_blank"
                          rel="noreferrer"
                          href={`https://www.twitter.com/${social.handle}`}
                        >
                          <img src={twitter} alt="" />
                        </a>
                      );
                    }
                  })
                : ""}
            </div>
          </div>
        </div>
        <div className={classes.container__bottomContainer__buttonContainer}>
          <Link to={`/charities/${data.id}`}>
            <div
              className={
                classes.container__bottomContainer__buttonContainer__btn
              }
            >
              <CgArrowRightR fill="white" color="white" size={26} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Charity;
