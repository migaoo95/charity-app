function productButton({ icon, bg, text }) {
  const styles = {
    background: bg,
  };
  return (
    <button
      style={styles}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {icon}
      <span> {text}</span>
    </button>
  );
}

export default productButton;
