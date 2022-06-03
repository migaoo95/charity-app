import { GiPlainCircle } from "react-icons/gi";
import classes from "../styles/modules/CharityPage.module.scss";
import { spliter } from "../helpers/helpers";
import ULComponent from "./ULComponent";
import twitter from "../assets/png/twt.png";
import facebook from "../assets/png/fcb.png";
import instagram from "../assets/png/insta.png";
import { v4 as uuidv4 } from "uuid";
function PageCharitComp({ data }) {
  const { v4: uuidv4 } = require("uuid");
  return (
    <div className={classes.container}>
      <div className={classes.container__firstContainer}>
        <div className={classes.container__firstContainer__logo}>
          {data.image ? (
            <img src={data.image.logo.medium} alt="" />
          ) : (
            <p>{spliter(data.name)}</p>
          )}
        </div>
        <div className={classes.container__firstContainer__descContainer}>
          <div
            className={
              classes.container__firstContainer__descContainer__mainDesc
            }
          >
            <h1>{data.name}</h1>
            <h2>
              Chartiy Commision Id: <span>{data.orgIds[0].id}</span>
            </h2>
            <div
              className={
                classes.container__firstContainer__descContainer__mainDesc__regContainer
              }
            >
              <div
                className={
                  classes.container__firstContainer__descContainer__mainDesc__regContainer__regDate
                }
              >
                <div
                  className={
                    classes.container__firstContainer__descContainer__mainDesc__regContainer__regDate__circle
                  }
                ></div>
                <h2>{`Registered ${data.registrations[0].registrationDate}`}</h2>
              </div>
            </div>
          </div>
          <a href={data.website}>{data.website}</a>
        </div>
      </div>

      <div className={classes.container__secondContainer}>
        <p>{data.objectives}</p>
      </div>
      <div className={classes.container__thirdContainer}>
        <div className={classes.container__thirdContainer__contact}>
          <div className={classes.container__thirdContainer__contact__heading}>
            <h1>Contact</h1>
          </div>
          <div className={classes.container__thirdContainer__contact__innerDiv}>
            <div
              className={
                classes.container__thirdContainer__contact__innerDiv__dataContainer
              }
            >
              {Object.entries(data.contact).map(([keyy, val]) => {
                return keyy !== "social" ? (
                  <ULComponent
                    key={uuidv4()}
                    name={keyy}
                    data={val}
                    color="rgb(0, 137, 255)"
                  />
                ) : (
                  ""
                );
              })}
            </div>
            <div
              className={
                classes.container__thirdContainer__contact__innerDiv__socialContainer
              }
            >
              {data.contact.social.length >= 1
                ? data.contact.social.map((social) => {
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
                : console.log("empty social")}
            </div>
          </div>
        </div>
        <div className={classes.container__thirdContainer__people}>
          <div className={classes.container__thirdContainer__people__heading}>
            <h1>People</h1>
          </div>
          <div className={classes.container__thirdContainer__contact__innerDiv}>
            {/* Loop Here */}
            {Object.entries(data.numPeople).map(([keyy, val]) => {
              return keyy !== "social" ? (
                <ULComponent
                  key={uuidv4()}
                  name={keyy}
                  data={val}
                  color="#9795FD"
                />
              ) : (
                ""
              );
            })}
          </div>
        </div>
        <div className={classes.container__thirdContainer__causes}>
          <div className={classes.container__thirdContainer__causes__heading}>
            <h1>Causes</h1>
          </div>
          <div className={classes.container__thirdContainer__contact__innerDiv}>
            {data.causes.map((cause) => {
              return (
                <div
                  key={uuidv4()}
                  className={
                    classes.container__thirdContainer__contact__innerDiv__causes
                  }
                >
                  <div className="mr-2">
                    <GiPlainCircle fill="#4AD17E" />
                  </div>
                  <div className="">
                    <p>{cause.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageCharitComp;
