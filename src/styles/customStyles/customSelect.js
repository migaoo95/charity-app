export const customStyles = {
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

export const customStylesCreate = {
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "rgb(0, 137, 255)" : "",
  }),
  container: (provided, state) => ({
    ...provided,
    borderRadius: "20px",
    width: "100%",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 0px 6px",
    border: "none",
  }),
  control: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    borderRadius: "12px",
    width: "100%",
    border: "1px solid rgba(80, 80, 80, 0.3)",
    background: "rgb(246, 250, 253)",
    padding: "1px",
    boxShadow: state.isFocused ? "0px 0px 6px rgb(0, 137, 255)" : "none",
  }),
};
