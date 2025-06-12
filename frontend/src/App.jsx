import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import { publicRoutes } from "./routes/routes";
import { adminRoutes } from "./routes/adminRoutes";
import AdminLayout from "./components/admin/layout/DefaultLayout";
import LoginAdminPage from "./pages/LoginAdmin/LoginAdminPage";
import { isLoggedIn } from './utils/checkLoginAdmin';

function App() {
  return (
    <Router>
      <div
        spellCheck={false}
        id='appjs'
        className=' font-body text-base overflow-hidden font-medium bg-white  '>
        <Routes>
          {publicRoutes.map((el, idx) => {
            const Layout = el.layout || DefaultLayout;
            return (
              <Route
                key={idx}
                path={el.path}
                element={
                  <Layout>
                    <el.component></el.component>
                  </Layout>
                }
              />
            );
          })}
        </Routes>
        <Routes>
          {adminRoutes.map((el, idx) => {
            const Layout = el.layout || AdminLayout;
            return (
              <Route
                key={idx}
                path={el.path}
                element={
                  isLoggedIn() ? (
                    <Layout>
                      <el.component></el.component>
                    </Layout>
                  ) : (
                    <Navigate to="/loginAdmin" />
                  )
                }
              />
            );
          })}
          <Route path='/loginAdmin' element={<LoginAdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
