
import { toast } from "react-toastify";
function productButton({ icon, bg, text, clickFunc, disable, page, modal}) {
  const styles = {
    background: bg,
  };
  return (
    <button
      
      style={styles}
      onClick={(e) => {
        e.preventDefault();
        if(!disable){
          clickFunc();
        } else if(disable && page){
          toast.error('Item already exists in cart')
        }
      }}
    >
      {icon}
      <span> {text}</span>
    </button>
  );
}

export default productButton;
