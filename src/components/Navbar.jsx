import { AiOutlinePlus } from "react-icons/ai";
import { FaUserNinja } from "react-icons/fa";
import { GiLoveHowl } from "react-icons/gi";
import { ImExit } from "react-icons/im";
// User details
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { getAuth } from "firebase/auth";
function Navbar() {
  const auth = getAuth();
  // const [changeDetails, setChangeDetails] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: auth.currentUser.displayName,
  //   email: auth.currentUser.email,
  // });
  // const { name, email } = formData;
  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/signup");
  };
  return (
    <nav className="bg-white z-10 shadow-2xl mb-5 h-[50px] flex justify-between">
      <div className="list-items w-3/6 flex  ">
        <div className="logoBox my-auto">
          <GiLoveHowl className="mx-auto" size="45px" />
        </div>

        <ul className="navList flex w-4/6 mx-auto h-full font-bold items-center justify-around ">
          <li className="sm:text-red-500 md:text-black">Home</li>
          <li>Sale</li>
          <li>Charities</li>

          <li>
            <Link to="/listing">YourListings</Link>
          </li>
        </ul>
      </div>
      <div className="profile-listing w-3/6 flex  ">
        <div className="profileContainer w-1/2  ">
          <div className="flex h-full items-center justify-center cursor-pointer">
            <FaUserNinja
              className="border-2 border-[#F0750B]  p-1 rounded-3xl mr-2"
              size="40px"
            />
            <p className="font-bold">Krystian</p>
          </div>
        </div>
        <div className="line border-2 my-auto h-[80%] border-[#F0750B] rounded"></div>
        <div className="buttonContainer w-1/2  flex justify-around border ">
          <Link to="/create">
            <button className="border-0 self-center text-sm text-black hover:text-white bg-[#F0750B] rounded-3xl flex font-bold px-3 py-1">
              <span className="my-auto">Create Listing</span>
              <AiOutlinePlus className=" " size="25px" />
            </button>
          </Link>
          <div className="exit align-middle my-auto cursor-pointer">
            <ImExit
              size="30px"
              onClick={onLogout}
              className="hover:text-[#F0750B]"
            />
            {/* <span>Log out</span> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
