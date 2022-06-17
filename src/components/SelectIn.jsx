import Select, { components } from "react-select";
import { useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";
import { capitalize } from "../helpers/helpers";
const handleChange = ({ options }) => {
  // console.log("change");
};
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <BsFilter size={25} />
    </components.DropdownIndicator>
  );
};
function SelectIn({ customStyles, data, handleChange, test }) {
  const [focus, setFocus] = useState(false);
  const [options, setOptions] = useState([]);
  const inChange = (e) => {
    console.log(e.target.value);
  };
  useEffect(() => {
    let newArr = data.map((el) => {
      return capitalize(el.data.type);
    });
    newArr = [...new Set(newArr)].map((el) => {
      return { value: el, label: el };
    });
    newArr.unshift({ value: "all", label: "All Product" });
    setOptions(newArr);
    console.log(newArr, "Arrrr ----");
  }, [data]);
  // --------------------- Test
  useEffect(() => {
    // test(false);
  }, []);
  return (
    <>
      <Select
        // defaultValue={{ value: "Show All", label: "Show All" }}
        onFocus={(e) => {
          e.preventDefault();
          // setFocus(true);
        }}
        onChange={(e) => {
          handleChange(e, "filter");
        }}
        options={options}
        styles={customStyles}
        components={{ DropdownIndicator }}
      />
    </>
  );
}

export default SelectIn;
