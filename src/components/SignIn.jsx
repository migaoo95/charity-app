import googleBtn from "../assets/png/googleBtn.png";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
function SignIn() {
  return (
    <div className="px-7 md:w-5/6 md:mx-auto h-4/6 ">
      <div className="text-center pt-2">
        <button className="px-8">
          <img className="h-1/2" src={googleBtn} alt="" />
        </button>
      </div>
      <div className="hrContainer my-4">
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
            className="py-2 text-sm text-white border w-[100%]  rounded-md pl-10 focus:outline-none focus:bg-white focus:border-[#F02E0B] focus:shadow-[4px_4px_20px_0px_rgba(240,117,11,1)] focus:text-gray-900"
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
            type="search"
            name="password"
            className="py-2 text-sm text-white border w-[100%]  rounded-md pl-10 focus:outline-none focus:bg-white focus:border-[#F02E0B] focus:shadow-[4px_4px_20px_0px_rgba(240,117,11,1)] focus:text-gray-900"
            placeholder="*********"
            autoComplete="off"
          />
        </div>
      </form>
    </div>
  );
}

export default SignIn;
