import { createContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const auth = getAuth();
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const navigate = useNavigate();
  // Log out the users ----------------- { logout }
  const onLogout = () => {
    auth.signOut();
    navigate("/signup");
  };
  return (
    <MainContext.Provider
      value={{
        name,
        email,
        onLogout,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
export default MainContext;
