import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "./store/features/themeSlice";

function Layout() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handleThemeChange = () => {
    dispatch(changeTheme());
  };

  console.log("normallay theme ", theme);

  return (
    <Theme accentColor="gray" radius="large" appearance={String(theme.theme)}>
      <Header handleThemeChange={handleThemeChange} theme={theme} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Theme>
  );
}

export default Layout;
