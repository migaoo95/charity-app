const style = {
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
};
function InputsContainer({ children }) {
  return <div style={style.div}>{children}</div>;
}

export default InputsContainer;
