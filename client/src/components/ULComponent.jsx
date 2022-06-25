import classes from "../styles/modules/CharityPage.module.scss";
import { GiPlainCircle } from "react-icons/gi";
function ULComponent({ name, data, color }) {
  return (
    <div className="flex">
      <div
        className={
          classes.container__thirdContainer__contact__innerDiv__dataContainer__name
        }
      >
        <GiPlainCircle fill={color} />
        <p>{name.charAt(0).toLocaleUpperCase() + name.slice(1)}</p>
      </div>
      <div
        className={
          classes.container__thirdContainer__contact__innerDiv__dataContainer__data
        }
      >
        <p>{data}</p>
      </div>
    </div>
  );
}

export default ULComponent;
