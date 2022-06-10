import classes from "../../styles/modules/Buttons/BackButton.module.scss";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
function BackButton({ to }) {
  const navigate = useNavigate();
  return (
    <div className={classes.bckBtn}>
      <button onClick={() => navigate(to)}>
        <BsFillArrowLeftCircleFill fill="white" />
        <p>Go back</p>
      </button>
    </div>
  );
}

export default BackButton;
