import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../authProvider/AuthProvider.jsx";
import { FaUser, FaKey, FaCircleNotch } from "react-icons/fa6";
import authApi from "@/apis/authApi";
function LogIn({ setMethod }) {
  const { login, setShowLoginModal } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await authApi.login({
      email,
      password,
    });
    if (response?.status === "success") {
      window.location.reload();
    } else {
      setShowError(true);
    }
  };
  return (
    <>
      <header className="text-center text-4xl font-bold text-gray-800 mb-6 ">Sign in</header>
      <p className="text-base ml-2 font-bold mb-1">Email</p>
      <form>
        <div className="flex items-center relative">
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FaUser />
          </div>
          <input
            placeholder="Email"
            value={email}
            required
            onChange={(e) => {
              setShowErrorEmail(false);
              setShowError(false);
              setEmail(e.target.value);
            }}
            className={` w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full ${
              (showErrorEmail || showError) && "border-red-400 bg-red-100"
            }`}
          ></input>
        </div>
        {showErrorEmail && <p className="text-xs text-red-600 ml-2 mt-1 font-medium">Please provide an email !!!</p>}
        <p className="ml-2 font-bold mt-3 mb-1">Password</p>
        <div className="flex items-center relative">
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FaKey />
          </div>
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setShowErrorPassword(false);
              setShowError(false);
              setPassword(e.target.value);
            }}
            className={`dark:bg-[#3A3B3C] dark:border-[0px] w-full bg-[#F1EFF1] outline-none px-12 font-semibold py-3 border-[1px] border-[#F1EFF1] rounded-full ${
              (showErrorPassword || showError) && "border-red-400 bg-red-100"
            }`}
          ></input>
        </div>
        {showErrorPassword && (
          <p className="text-xs text-red-600 ml-2 mt-1 font-medium">Please provide a password !!!</p>
        )}
        {showError && (
          <p className="text-xs text-red-600 ml-2 mt-1 font-medium">Email hoặc mật khẩu không đúng !!!</p>
        )}
        {/* <p
          onClick={() => setMethod("forgotPassword")}
          className="text-xs font-medium ml-2 inline-block underline mt-1 cursor-pointer"
        >
          Forgot your password ?
        </p> */}
        <button
          onClick={(e) => handleLogin(e)}
          className={` mt-[15px] block select-none cursor-pointer transition-all  mx-auto text-center bg-primary-color w-[150px] px-6 py-3 rounded-full text-white text-lg font-semibold ${
            loading ? "opacity-70" : "hover:opacity-80"
          }`}
        >
          {loading ? <div>{<FaCircleNotch />}</div> : <p>Login</p>}
        </button>
      </form>
    </>
  );
}

export default LogIn;
