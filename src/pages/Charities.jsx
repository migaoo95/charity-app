import InputsContainer from "../components/InputsContainer";
import SearchBar from "../components/SearchBar";
import SelectIn from "../components/SelectIn";
import { customStyles } from "../styles/customStyles/customSelect";
import classes from "../styles/modules/Charity.module.scss";
import Charity from "../components/CharityComponent";
import ClipLoader from "react-spinners/ClipLoader";
//-----------------
import { useState, useEffect } from "react";
import { query } from "firebase/firestore";
import { QGL_QUERY } from "../API/queries";
import { getSingleCharity } from "../API/api";

function Charities() {
  const [items, setItems] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getSingleCharity(QGL_QUERY)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data.CHC.getCharities.list);
        setItems(data.data.CHC.getCharities.list);
        setLoading(false);
      });
  }, []);
  return (
    <div className={classes.container}>
      <p>Charities</p>
      <InputsContainer>
        <SearchBar />
        <SelectIn customStyles={customStyles} />
      </InputsContainer>
      <div
        className={
          !loading ? "m-auto grid grid-cols-2 gap-6 " : "flex justify-center"
        }
      >
        {!loading ? (
          items.map((item) => {
            return <Charity key={item.id} data={item} />;
          })
        ) : (
          <ClipLoader color={`#559CF8`} loading={loading} size={150} />
        )}
      </div>
    </div>
  );
}
// options={typeArrState} customStyles={customStyles}
export default Charities;
