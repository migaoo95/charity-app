import Select, { components } from "react-select";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const handleChange = () => {
  // console.log("change");
};
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <BsFilter size={25} />
    </components.DropdownIndicator>
  );
};
function SelectIn({ customStyles, options, handleChangee }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        components={{ DropdownIndicator }}
      />
    </>
  );
}

export default SelectIn;
