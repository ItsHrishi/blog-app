import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  const [theme, setTheme] = useState("light");
  const handleThemeChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <Theme accentColor="gray" radius="large" appearance={theme}>
      <Header handleThemeChange={handleThemeChange} theme={theme} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Theme>
  );
}

export default Layout;
