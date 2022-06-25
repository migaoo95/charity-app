import Select, { components } from "react-select";
import { useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";
import { capitalize } from "../helpers/helpers";
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <BsFilter size={25} />
    </components.DropdownIndicator>
  );
};
function SelectIn({ customStyles, data, handleChange, charityData }) {
  const [focus, setFocus] = useState(false);
  const [options, setOptions] = useState([]);
  const inChange = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    if (data && !charityData) {
      let newArr = data.map((el) => {
        return capitalize(el.data.type);
      });
      newArr = [...new Set(newArr)].map((el) => {
        return { value: el, label: el };
      });
      newArr.unshift({ value: "all", label: "All Product" });
      setOptions(newArr);
    }
    if (!data && charityData) {
      let newArr = charityData.map((el) => {
        return capitalize(el.causes[0].name);
      });
      newArr = [...new Set(newArr)].map((el) => {
        return { value: el, label: el };
      });
      newArr.unshift({ value: "all", label: "All Charities" });
      setOptions(newArr);
    }
    // console.log(charityData);
  }, [data, charityData]);
  return (
    <>
      <Select
        onFocus={(e) => {
          e.preventDefault();
        }}
        onChange={(e) => {
          handleChange(e);
        }}
        options={options}
        styles={customStyles}
        components={{ DropdownIndicator }}
      />
    </>
  );
}

export default SelectIn;
