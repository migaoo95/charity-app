import Select, { components } from "react-select";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const customStyles = {
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "rgb(0, 137, 255)" : "",
  }),
  container: (provided, state) => ({
    ...provided,
    borderRadius: "20px",
    width: "31%",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 0px 6px",
    border: "none",
  }),
  control: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    borderRadius: "20px",
    width: "100%",
    border: "none",
    boxShadow: state.isFocused ? "0px 0px 6px rgb(0, 137, 255)" : "none",
  }),
};
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <BsFilter size={25} />
    </components.DropdownIndicator>
  );
};
function SelectIn() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={customStyles}
        components={{ DropdownIndicator }}
      />
    </>
  );
}

export default SelectIn;
