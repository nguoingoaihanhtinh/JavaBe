import Header from "@/components/header/Header";
import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import LoginModal from "../modals/LoginModal/LoginModal";
import { Footer } from "../footer/Footer";

export default function DefaultLayout({ children }) {
  const { showLoginModal } = useContext(AuthContext);
  return (
    <div>
      <Header />
      {children}
      {showLoginModal === true && <LoginModal />}
      <Footer />
    </div>
  );
}
