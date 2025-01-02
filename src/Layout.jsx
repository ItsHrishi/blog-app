import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "./store/features/themeSlice";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/features/authSlice";
import FullPageLoading from "./components/common/FullPageLoading";

function Layout() {
  const [loading, setLoading] = useState(true);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handleThemeChange = () => {
    dispatch(changeTheme());
  };
  const themeAppearance = theme?.theme || "light";

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <FullPageLoading />
  ) : (
    <Theme accentColor="gray" radius="large" appearance={themeAppearance}>
      <Header handleThemeChange={handleThemeChange} theme={theme} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Theme>
  );
}

export default Layout;
