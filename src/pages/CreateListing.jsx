import Form from "../components/Form";
import classes from "../styles/modules/CreateListing.module.scss";
const styles = {
  // position: "rel",
  // top: "0",
  // left: "0",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  // width: "100%",
  height: "100%",
  width: "100%",
  // border: "5px solid red",
};
function CreateListing() {
  return (
    <div className={classes.container} style={styles}>
      <Form />
    </div>
  );
}

export default CreateListing;
