import logRegImg from "../assets/png/imgShop.png";
import googleBtn from "../assets/png/googleBtn.png";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
function SignUp() {
  return (
    <>
      {/* IMAGE CONTAINER  */}

      <div className="container bg-white h-2/6 bg-opacity-60 shadow-2xl flex">
        <div className="m-auto  ">
          <img className="w-1/2 m-auto" src={logRegImg} alt="" />
          <p className="text-center mt-4 text-xl">Charityshop.io</p>
        </div>
      </div>
      {/* FORM CONTAINER */}
      <div className="container bg-white h-4/6 flex flex-col justify-between">
        {/* SIGN IN / SIGN UP BUTTONS */}
        <div className=" mb-4 flex justify-between text-center text-2xl">
          <div className="border-b-2 border-black p-3 w-1/2 flex items-center justify-center">
            <p className="">Sign up</p>
          </div>
          <div className="border-b-2 p-3 w-1/2 flex items-center justify-center">
            <p className="">Sign in</p>
          </div>
        </div>

        {/* GOOGLE BUTTON AND HR */}
        <div className="container px-7 h-4/6 ">
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
          <form>
            {/* INPUT NAME */}
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-outline"
                >
                  <FaUserAlt />
                </button>
              </span>
              <input
                type="search"
                name="q"
                className="py-2 text-sm text-white border w-[100%]  rounded-md pl-10 focus:outline-none focus:bg-white focus:border-[#F02E0B] focus:shadow-[4px_4px_20px_0px_rgba(240,117,11,1)] focus:text-gray-900"
                placeholder="johndoe"
                autocomplete="off"
              />
            </div>
            {/* INPUT EMAIL */}
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  class="p-1 focus:outline-none focus:shadow-outline"
                >
                  <MdEmail />
                </button>
              </span>
              <input
                type="search"
                name="q"
                class="py-2 text-sm text-white border w-[100%]  rounded-md pl-10 focus:outline-none focus:bg-white focus:border-[#F02E0B] focus:shadow-[4px_4px_20px_0px_rgba(240,117,11,1)] focus:text-gray-900"
                placeholder="john@gmail.com"
                autocomplete="off"
              />
            </div>
            {/* INPUT EMAIL */}
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  class="p-1 focus:outline-none focus:shadow-outline"
                >
                  <FaLock />
                </button>
              </span>
              <input
                type="search"
                name="q"
                className="py-2 text-sm text-white border w-[100%]  rounded-md pl-10 focus:outline-none focus:bg-white focus:border-[#F02E0B] focus:shadow-[4px_4px_20px_0px_rgba(240,117,11,1)] focus:text-gray-900"
                placeholder="*********"
                autocomplete="off"
              />
            </div>
          </form>
        </div>

        <button className="border bg-[#F45437] h-1/6 text-white text-xl">
          Button
        </button>
      </div>
    </>
  );
}

export default SignUp;
