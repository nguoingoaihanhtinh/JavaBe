import { useContext, useState } from "react";
import { AuthContext } from "../../authProvider/AuthProvider.jsx";
import LogIn from "./LogIn.jsx";
import { FaXmark, FaChevronLeft } from "react-icons/fa6";
import ForgotPassword from "./ForgotPassword.jsx";
import Register from "./Register.jsx";

export default function LoginModal() {
  const { setShowLoginModal } = useContext(AuthContext);
  const [method, setMethod] = useState("signin");
  const handleTurnOffModal = (e) => {
    if (e.target.classList.contains("modal")) {
      setShowLoginModal(false);
    }
  };
  return (
    <div
      spellCheck={false}
      onMouseDown={(e) => handleTurnOffModal(e)}
      className=" modal z-[100] fixed bg-black/50 top-0 bottom-0 left-0 right-0 "
    >
      <div className="fixed px-8 py-8 rounded-2xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] bg-white w-[500px] ">
        {method === "signin" && <LogIn setMethod={setMethod} />}
        {method === "forgotPassword" && <ForgotPassword setMethod={setMethod} />}
        {method === "register" && <Register />}
        <div className="bg-gray-200 h-[1px] w-full mt-3"></div>
        <div className="flex justify-center pt-3 gap-2">
          <div>You dont have an account?</div>
          <div onClick={() => setMethod("register")} className="text-[#EF2950] font-semibold underline cursor-pointer">
            Sign Up
          </div>
        </div>
        <div
          onClick={() => setShowLoginModal(false)}
          className="bg-[#F5F6F6]  hover:bg-gray-300 transition-all flex items-center justify-center w-[45px] h-[45px] absolute top-[25px] right-[30px] cursor-pointer rounded-full"
        >
          <FaXmark className="text-xl" />
        </div>
        {(method === "forgotPassword" || method === "register") && (
          <div
            onClick={() => setMethod("signin")}
            className="bg-[#F5F6F6]  hover:bg-gray-300 transition-all flex items-center justify-center w-[45px] h-[45px] absolute rounded-full top-[25px] left-[30px] cursor-pointer"
          >
            <FaChevronLeft className="text-xl" />
          </div>
        )}
      </div>
    </div>
  );
}
