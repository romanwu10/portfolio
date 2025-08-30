import { useContext, useMemo } from "react";

import classes from "./Header.module.css";
import { Context } from "../../context/context";

/**
 * Header Component
 *
 * This component renders a navigation bar with links to different sections of the website.
 * It uses CSS modules for styling, and the Context API for managing state.
 *
 * The component maintains a state variable 'currentPage' to keep track of the currently selected page.
 * When a navigation button is clicked, the 'changeTab' function is called, which updates the 'currentPage' state and calls the 'changeContent' function from the context to update the current content.
 *
 * The navigation bar includes links to Home, About, Education, Work/Projects, and Contact sections.
 * The 'changeTab' function is attached to the 'onClick' event of each button.
 * The button for the current page is highlighted by adding the 'buttonActive' class.
 *
 * The component also conditionally renders a heading with the text 'Roman Wu' when the current page is not 'Home'.
 *
 */
const Header = () => {
  const ContentCtx = useContext(Context);

  const changeTab = (text: string) => {
    ContentCtx.changeContent(text);
  };

  const isHomeRoute = useMemo(() => {
    if (typeof window === "undefined") return true;
    const p = window.location.pathname.replace(/\/$/, "");
    return p === "" || p === "/";
  }, [typeof window !== "undefined" ? window.location.pathname : "/"]);

  return (
    <header className={`${classes.mainHeader} ${isHomeRoute ? classes.notHomePage : ""}`}>
      {!isHomeRoute && (
        <button
          type="button"
          onClick={() => {
            window.location.href = "https://romanwu.com";
          }}
          className={`${classes.fadeInElement} ${classes.brandButton}`}
          aria-label="Go to romanwu.com"
        >
          Roman Wu
        </button>
      )}
      <nav>
        <ul className={classes.headerNavUl}>
          <li className={classes.headerNavLi}>
            <button
              className={`${classes.headerNavButton} ${
                ContentCtx.home ? classes.buttonActive : ""
              }`}
              onClick={() => {
                changeTab("Home");
              }}
            >
              Home
            </button>
          </li>
          <li className={classes.headerNavLi}>
            <button
              className={`${classes.headerNavButton} ${
                ContentCtx.about ? classes.buttonActive : ""
              }`}
              onClick={() => {
                changeTab("About");
              }}
            >
              About
            </button>
          </li>
          <li className={classes.headerNavLi}>
            <button
              className={`${classes.headerNavButton} ${
                ContentCtx.education ? classes.buttonActive : ""
              }`}
              onClick={() => {
                changeTab("Education");
              }}
            >
              Education
            </button>
          </li>
          <li className={classes.headerNavLi}>
            <button
              className={`${classes.headerNavButton} ${
                ContentCtx.work ? classes.buttonActive : ""
              }`}
              onClick={() => {
                changeTab("Work");
              }}
            >
              Work
            </button>
          </li>
          <li className={classes.headerNavLi}>
            <button
              className={`${classes.headerNavButton} ${
                ContentCtx.projects ? classes.buttonActive : ""
              }`}
              onClick={() => {
                changeTab("Projects");
              }}
            >
              Projects
            </button>
          </li>
          <li className={classes.headerNavLi}>
            <button
              className={`${classes.headerNavButton} ${
                ContentCtx.resume ? classes.buttonActive : ""
              }`}
              onClick={() => {
                changeTab("Resume");
              }}
            >
              Resume
            </button>
          </li>
          <li className={classes.headerNavLi}>
            <button
              className={`${classes.headerNavButton} ${
                ContentCtx.contact ? classes.buttonActive : ""
              }`}
              onClick={() => {
                changeTab("Contact");
              }}
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
