import googleBtn from "../assets/png/googleBtn.png";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// State and Router
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function SignIn() {
  // Show and Hide password from an input
  const [hideShowPass, setHideShow] = useState(false);
  // Collect data from the form into a object --> with default empty values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // To use values above we destructure that state content data
  const { email, password } = formData;
  // Navigate - react router
  const navigate = useNavigate();
  // Handle Change ----------------------------- { onChange Function }
  const handleChange = (e) => {
    // 1. Get previous state with an arrow function ()=>{}
    // 2. Return a object
    setFormData((prev) => ({
      // 3. Spread a previous state values
      ...prev,
      // 4. Change the value based on the name property
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="px-7 md:w-5/6 md:mx-auto m-auto mt-[5%] h-4/6  ">
      <div className="text-center pt-2">
        <button className="px-8">
          <img className="h-1/2" src={googleBtn} alt="" />
        </button>
      </div>
      <div className="hrContainer my-4 md:mb-9">
        <div className="web_dev">
          <hr />
          <p className="px-3">or</p>
          <hr />
        </div>
      </div>
      {/* FORM COTNAIENR */}
      <form className="">
        {/* INPUT EMAIL */}
        <label className="" htmlFor="email">
          Email
        </label>
        <div className="relative mb-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <MdEmail id="icon" />
            </button>
          </span>
          <input
            id="try"
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
        <label htmlFor="password">Password</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <FaLock />
            </button>
          </span>
          <input
            name="password"
            type={hideShowPass ? "text" : "password"}
            value={password}
            onChange={handleChange}
            className="py-2 text-sm text-black border w-[100%]  rounded-md pl-10 focus:outline-none focus:bg-white focus:border-[#F02E0B] focus:shadow-[4px_4px_20px_0px_rgba(240,117,11,1)] focus:text-gray-900"
            placeholder="*********"
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
        <Link to="/forgotPass">
          <small className="cursor-pointer hover:text-[#F02E0B] float-right">
            Forgot your password ?{" "}
          </small>
        </Link>
        <div className="mt-10 bottom-0 w-full">
          <button className="md:rounded-lg bg-[#F45437] h-6/6 p-2   md:h-full w-full   text-white text-xl">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
