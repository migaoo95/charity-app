import InputsContainer from "../components/InputsContainer";
import SearchBar from "../components/SearchBar";
import SelectIn from "../components/SelectIn";
import { customStyles } from "../styles/customStyles/customSelect";
import classes from "../styles/modules/Charity.module.scss";
import Charity from "../components/Charity";
import ClipLoader from "react-spinners/ClipLoader";
//-----------------
import { useState, useEffect } from "react";
import { query } from "firebase/firestore";
function Charities() {
  const [items, setItems] = useState([]);
  let [loading, setLoading] = useState(true);
  const QGL_QUERY = `
  query ListLimitSkip {
    CHC {
      getCharities(filters: {}) {
        list(limit: 10, skip: 30) {
          id
          name
          causes{
            name
          }
          website
          objectives
          operations{name}
         image{
          
          logo{
            small
          }
        }
          contact{
            social{
              platform
              handle
            }
          }
          
        }
      }
    }
  }  
  `;
  useEffect(() => {
    fetch("https://charitybase.uk/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Apikey 9447fa04-c15b-40e6-92b6-30307deeb5d1",
      },
      body: JSON.stringify({
        query: QGL_QUERY,
      }),
    })
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
      <div className="m-auto grid grid-cols-2 gap-6 ">
        {/* <Charity /> */}
        {!loading ? (
          items.map((item) => {
            return <Charity key={item.id} data={item} />;
          })
        ) : (
          <ClipLoader
            className="m-auto relative"
            color={`#559CF8`}
            loading={loading}
            size={150}
          />
        )}
      </div>
    </div>
  );
}
// options={typeArrState} customStyles={customStyles}
export default Charities;
