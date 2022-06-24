function productButton({ icon, bg, text, addToCart }) {
  const styles = {
    background: bg,
  };
  return (
    <button
      style={styles}
      onClick={(e) => {
        e.preventDefault();
        addToCart();
      }}
    >
      {icon}
      <span> {text}</span>
    </button>
  );
}

export default productButton;
