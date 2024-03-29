import GoogleOAuth from "./GoogleOAuth";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Firebase imports --------------- { Firebase }
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// Import database
import { db } from "../firebase-config";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import { v4 as uuidv4 } from "uuid";
function SignUp() {
  const { v4: uuidv4 } = require("uuid");
  // Password visibility state toogler
  const [hideShowPass, setHideShow] = useState(false);
  // State form Data object
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // Destrucuture form data
  const { name, email, password } = formData;
  // Navigate - react router
  const navigate = useNavigate();
  // handleChange function ---------------------- { onChange Function }
  const handleChange = (e) => {
    // Update the entire form data object based on a target
    setFormData((prev) => ({
      ...prev,
      // Update exact element
      [e.target.name]: e.target.value,
    }));
  };
  const createCart = async (user) => {
    await setDoc(doc(db, "user_cart", uuidv4()), {
      user_id: user.uid,
      products_id: [],
    });
  };
  // handleSubmit function ---------------------- { onSubmit Function } - async
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userDetails = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userDetails.user;
      createCart(user);
      // Update profile/ with current user and update displayName with the formData name
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      // ---------------------------------- { update users document in db }
      const formDataClone = { ...formData };
      delete formDataClone.password;
      formDataClone.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataClone);

      navigate("/");
    } catch (error) {
      if (email === "" || password === "") {
        toast.error("Please fill in all fields");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address");
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        toast.error("Password must be longer than 6 characters");
      }
      console.log(error.message);
    }
  };
  return (
    <div className="px-7 h-4/6 md:w-5/6 mx-auto">
      <div className="text-center ">
        {/* <button className="px-8">
          <img className="h-1/2" src={googleBtn} alt="" />
        </button> */}
        <GoogleOAuth />
      </div>
      <div className="hrContainer my-4">
        <div className="web_dev">
          <hr />
          <p className="px-3">or</p>
          <hr />
        </div>
      </div>
      {/* FORM COTNAIENR */}
      <form className="" onSubmit={handleSubmit}>
        {/* INPUT NAME */}
        <label className="" htmlFor="name">
          Name
        </label>
        <div className="relative mb-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              disabled
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <FaUserAlt />
            </button>
          </span>
          <input
            type="search"
            value={name}
            onChange={handleChange}
            name="name"
            className="py-2 text-sm text-black border w-[100%]  rounded-md pl-10 focus:outline-none focus:bg-white focus:border-[#F02E0B] focus:shadow-[4px_4px_20px_0px_rgba(240,117,11,1)] focus:text-gray-900"
            placeholder="johndoe"
            autoComplete="off"
          />
        </div>
        {/* INPUT EMAIL */}
        <label className="" htmlFor="email">
          Email
        </label>
        <div className="relative mb-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              disabled
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <MdEmail />
            </button>
          </span>
          <input
            type="search"
            name="email"
            value={email}
            onChange={handleChange}
            className="py-2 text-sm text-black border w-[100%]  rounded-md pl-10 focus:outline-none focus:bg-white focus:border-[#F02E0B] focus:shadow-[4px_4px_20px_0px_rgba(240,117,11,1)] focus:text-gray-900"
            placeholder="john@gmail.com"
            autoComplete="off"
          />
        </div>
        {/* INPUT PASSWORD */}
        <label className="" htmlFor="password">
          Password
        </label>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              disabled
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <FaLock />
            </button>
          </span>
          <input
            name="password"
            value={password}
            onChange={handleChange}
            type={hideShowPass ? "text" : "password"}
            className="py-2 text-sm text-black border w-[100%]  rounded-md pl-10 focus:outline-none focus:bg-white focus:border-[#F02E0B] focus:shadow-[4px_4px_20px_0px_rgba(240,117,11,1)] focus:text-gray-900"
            placeholder="*********"
            autoComplete="off"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pl-2">
            <button
              onClick={() => {
                setHideShow((prev) => {
                  return !prev;
                });
              }}
              type="button"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              {hideShowPass ? (
                <AiFillEyeInvisible size="25px" />
              ) : (
                <AiFillEye size="25px" />
              )}
            </button>
          </span>
        </div>
        <div className="mt-6  border  bottom-0 left-0 w-full">
          <button className="border left-0 md:rounded-lg bg-[#F45437] h-6/6 p-2   md:h-full w-full   text-white text-xl">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
