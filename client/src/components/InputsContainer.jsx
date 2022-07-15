import { customStyles } from "../styles/customStyles/customSelect";
import SelectIn from "./SelectIn";
import SearchBar from "./SearchBar";
import useFetch from "../hooks/useFetch";
const style = {
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
};
function InputsContainer({ func, qry }) {
  const { items } = useFetch(qry);
  // ------------------------- Handle element events
  const handleSearch = (e) => {
    let arr = [];
    if (e.target.value !== "") {
      items.forEach((item) => {
        item.data.name.toLowerCase().indexOf(e.target.value) !== -1 &&
          arr.push(item);
      });
      func(arr, true);
    } else {
      func([], false);
    }
  };
  const handleFilter = (e) => {
    let arr = [];
    if (e.value === "all") {
      func([], false);
    } else {
      items.forEach((item) => {
        item.data.type.toLowerCase() === e.value.toLowerCase() &&
          arr.push(item);
      });
      func(arr, true);
    }
  };

  return (
    <div style={style.div}>
      <SearchBar handleChange={handleSearch} />{" "}
      <SelectIn
        handleChange={handleFilter}
        data={items}
        customStyles={customStyles}
      />
    </div>
  );
}

export default InputsContainer;
