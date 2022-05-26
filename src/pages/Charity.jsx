import classes from "../styles/modules/CharityPage.module.scss";

function Charity() {
  return (
    <div className={classes.container}>
      <div className={classes.container__firstContainer}>
        <div className={classes.container__firstContainer__logo}></div>
        <div className={classes.container__firstContainer__mainDesc}>
          <h1>Nuffield Health</h1>
          <h2>
            Chartiy Commision Id: <span>GB_20201_AUG</span>
          </h2>
        </div>
      </div>

      <div className={classes.container__secondContainer}>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry’s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more
        </p>
      </div>
      <div className={classes.container__thirdContainer}>
        <div className={classes.container__thirdContainer__contact}>
          <div className={classes.container__thirdContainer__contact__heading}>
            <h1>Contact</h1>
          </div>
          <div
            className={classes.container__thirdContainer__contact__innerDiv}
          ></div>
        </div>
        <div className={classes.container__thirdContainer__people}>
          <div className={classes.container__thirdContainer__people__heading}>
            <h1>People</h1>
          </div>
          <div
            className={classes.container__thirdContainer__contact__innerDiv}
          ></div>
        </div>
        <div className={classes.container__thirdContainer__causes}>
          <div className={classes.container__thirdContainer__causes__heading}>
            <h1>Causes</h1>
          </div>
          <div
            className={classes.container__thirdContainer__contact__innerDiv}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Charity;
