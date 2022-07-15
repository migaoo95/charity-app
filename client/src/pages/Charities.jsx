import SearchBar from "../components/SearchBar";
import SelectIn from "../components/SelectIn";
import { customStyles } from "../styles/customStyles/customSelect";
import classes from "../styles/modules/Charity.module.scss";
import Charity from "../components/CharityComponent";
import ClipLoader from "react-spinners/ClipLoader";
//-----------------
import { useState, useEffect } from "react";
import { QGL_QUERY } from "../API/queries";
import { fetchCharities } from "../API/api";
import { useWindowSize } from "../hooks/useWindowSize";

// -------------------------
function Charities() {
  const [items, setItems] = useState([]);
  let [loading, setLoading] = useState(true);
  const size = useWindowSize();
  const [screenSize, setScreenSize] = useState();
  const [filter, setFilter] = useState(false);
  const [limit, setLimit] = useState(10);
  const [searchItems, setSearchItems] = useState([]);
  const [tempItems, setTempItems] = useState([]);

  // ---------------------------- Fetch all Items for search
  useEffect(() => {
    fetchCharities(QGL_QUERY, { limit: 25 })
      .then((res) => res.json())
      .then((data) => {
        setSearchItems(data.data.CHC.getCharities.list);
        setLoading(false);
      });
  }, []);
  // ---------------------------- Limited items query
  useEffect(() => {
    fetchCharities(QGL_QUERY, { limit: limit })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data.CHC.getCharities.list);
        setLoading(false);
      });
  }, [limit]);
  // ---------------- custom Hook / Window size
  useEffect(() => {
    setScreenSize(size);
  }, [size]);
  // --------------------------- search Bar handler
  const handleChange = (e) => {
    setFilter(true);
    let arr = [];
    if (e.target.value !== "") {
      searchItems.forEach((item) => {
        item.name.toLowerCase().indexOf(e.target.value) !== -1 &&
          arr.push(item);
      });
      setTempItems(arr);
    } else {
      setFilter(false);
    }
  };
  const handleFilter = (e) => {
    setFilter(true);
    let arr = [];
    if (e.value === "all") {
      setFilter(false);
    } else {
      searchItems.forEach((item) => {
        item.causes[0].name.toLowerCase() === e.value.toLowerCase() &&
          arr.push(item);
      });
      setTempItems(arr);
    }
  };
  return (
    <>
      <div className={classes.container}>
        <p>Charities</p>
        <div className={classes.container__inputContainer}>
          <SearchBar handleChange={handleChange} />
          <SelectIn
            handleChange={handleFilter}
            charityData={searchItems}
            customStyles={customStyles}
          />
        </div>
        <div
          className={
            !loading
              ? "m-auto grid grid-cols-2 gap-3 sm:gap-3"
              : "flex justify-center"
          }
        >
          {!loading && items && !filter ? (
            items.map((item) => {
              return <Charity key={item.id} data={item} size={screenSize} />;
            })
          ) : (
            <ClipLoader color={`#559CF8`} loading={loading} size={150} />
          )}
          {filter &&
            tempItems.map((item) => {
              return <Charity key={item.id} data={item} size={screenSize} />;
            })}
        </div>
      </div>
      {limit !== 25 && !filter && (
        <div className={classes.bottomBtn}>
          <button
            onClick={() => {
              if (limit < 25) {
                setLimit((prev) => {
                  return prev + 5;
                });
              }
            }}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
// options={typeArrState} customStyles={customStyles}
export default Charities;
