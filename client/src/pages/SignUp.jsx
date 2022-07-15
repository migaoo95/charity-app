import logRegImg from "../assets/png/imgShop.png";
import SignIn from "../components/SignIn";
import SignUpp from "../components/SignUp";
import { useState } from "react";
function SignUp() {
  const [sign, setSign] = useState(true);

  return (
    <>
      <div className="h-screen md:flex md:justify-center md:items-center ">
        <div className=" bg-white h-2/6 md:h-4/6 md:w-5/12 md:rounded-l-2xl bg-opacity-60 shadow-2xl flex md:max-h-[700px] min-h-[275px] md:min-h-[600px] md:max-w-[550px]">
          <div className="m-auto">
            <h1 className="hidden font-bold mb-10 md:block text-2xl text-center">
              Charityshop.io
            </h1>
            <img className="w-1/2 md:w-10/12 m-auto" src={logRegImg} alt="" />
            <p className="text-center mt-4 text-xl md:hidden">Charityshop.io</p>
            <p className="hidden md:block text-white text-2xl font-bold text-center w-5/6 mx-auto mt-10">
              You are only few steps away from your first purchase with us.
            </p>
          </div>
        </div>
        <div className="bg-white h-4/6 md:h-4/6 md:w-5/12 md:rounded-r-xl flex flex-col md:justify-between md:max-h-[700px] md:min-h-[600px] md:max-w-[550px]">
          <div className="hidden md:block mt-12 mx-auto w-5/6 ">
            <p className="text-2xl font-bold">
              {sign ? "Sign up with us today!" : "Welcome back please log in."}
            </p>

            <small className="text-[#9ca3af] text-md">
              {sign
                ? "Already have an account? "
                : "Need a new account click here! "}
              <span
                onClick={() => {
                  setSign((prev) => {
                    return !prev;
                  });
                }}
                className="text-[#F45437] font-bold cursor-pointer"
              >
                {sign ? "Log in" : "Sign up"}
              </span>
            </small>
          </div>
          <div className="mb-4 flex justify-between text-center text-2xl md:hidden">
            <div
              onClick={() => {
                setSign(true);
              }}
              className={`${
                sign ? "border-b-2 border-black" : "border-b-2"
              } p-3 w-1/2 flex items-center justify-center`}
            >
              <p className={sign ? "text-black" : "text-[#9ca3af]"}>Sign up</p>
            </div>
            <div
              onClick={() => {
                setSign(false);
              }}
              className={`${
                !sign ? "border-b-2 border-black" : "border-b-2"
              } p-3 w-1/2 flex items-center justify-center`}
            >
              <p className={sign ? "text-[#9ca3af]" : "text-black"}>Sign in</p>
            </div>
          </div>

          {sign ? <SignUpp /> : <SignIn />}
          <div className="button-container md:mx-auto md:mb-5 md:w-5/6 md:px-7 "></div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
