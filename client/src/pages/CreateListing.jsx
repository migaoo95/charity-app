import Form from "../components/Form";
import classes from "../styles/modules/CreateListing.module.scss";
const styles = {
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  height: "100%",
  width: "100%",
};
function CreateListing() {
  return (
    <div className={classes.container} style={styles}>
      <Form />
    </div>
  );
}

export default CreateListing;
