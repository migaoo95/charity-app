function productButton({ icon }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {icon}
      <span> Add to cart</span>
    </button>
  );
}

export default productButton;
