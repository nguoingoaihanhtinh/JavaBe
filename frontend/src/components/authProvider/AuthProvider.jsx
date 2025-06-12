import authApi from "@/apis/authApi";
import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState([]);
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };
  const ckLogged = async () => {
    const response = await authApi.isLoggedIn();
    if (response?.message === "success") {
      setIsLoggedIn(true);
      setUserData(response.user);
      setCarts(response.user.userCart);
    }

    setLoading(false);
  };
  const updateAvatar = (newAvatarUrl) => {
    setUserData((prevData) => ({
      ...prevData,
      avatar: newAvatarUrl,
    }));
  };

  useEffect(() => {
    // console.log("User data:", userData); 
    ckLogged();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userData,
        setUserData,
        showLoginModal,
        setShowLoginModal,
        showLogoutModal,
        setShowLogoutModal,
        carts,
        setCarts,
        updateAvatar, 
      }}
    >
      {loading ? <div></div> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
