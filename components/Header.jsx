import { useTheme } from "../hooks/useTheme";

const Header = () => {
  const [isDark, setIsDark] = useTheme();

  // if (isDark) {
  //   document.body.classList.add("dark");
  // } else {
  //   document.body.classList.remove("dark");
  // }
  return (
    <>
      <header className={`header-container ${isDark ? "dark" : ""} `}>
        <div className="header-content">
          <h2 className="title">
            <a href="/">Where in the world?</a>
          </h2>
          <p
            onClick={() => {
              setIsDark(!isDark);
              localStorage.setItem("isDarkMode", !isDark);
            }}
            className="theme-changer"
          >
            <i className={`fa-solid fa-${isDark ? "sun" : "moon"}`}></i>
            &nbsp;&nbsp;{`${isDark ? "Light Mode" : "Dark Mode"}`}
          </p>
        </div>
      </header>
    </>
  );
};
export default Header;
