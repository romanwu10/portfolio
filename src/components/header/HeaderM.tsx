import { useContext, useEffect } from "react";

import classes from "./HeaderM.module.css";
import { Context } from "../../context/context";
import { Navbar, Nav } from "react-bootstrap";

/**
 * Header Mobile Component
 *
 * This component renders a navigation bar with links to different sections of the website.
 * It uses the React-Bootstrap library to create a responsive navigation bar.
 * The navigation bar includes links to Home, About, Education, Work, and Contact sections.
 *
 * It also observes changes to the 'data-theme' attribute on the body element of the document.
 * If the 'data-theme' attribute is set to 'dark', it sets the 'data-bs-theme' attribute on the navigation bar to 'dark'.
 * If the 'data-theme' attribute is not 'dark', it removes the 'data-bs-theme' attribute from the navigation bar.
 *
 * The component uses the Context API to manage state. When a navigation link is clicked, it calls the 'changeContent' function from the context to update the current content.
 *
 */
const Header = () => {
  const ContentCtx = useContext(Context);

  const handleClick = (e: React.MouseEvent<HTMLElement>, tab: string) => {
    // Allow new tab/window and modifier key behaviors
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      return;
    }
    e.preventDefault();
    ContentCtx.changeContent(tab);
  };

  useEffect(() => {
    const body = document.body;
    const nav = document.getElementsByTagName("nav")[0];

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          if (body.getAttribute("data-theme") === "dark") {
            nav.setAttribute("data-bs-theme", "dark");
          } else {
            nav.removeAttribute("data-bs-theme");
          }
        }
      });
    });

    observer.observe(body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={classes.mainHeader}>
      <Navbar collapseOnSelect expand="sm" className={classes.headerNavUl}>
        <Navbar.Brand as="div" className={classes.navbar_color}>
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className={classes.brandButton}
            aria-label="Go to home"
          >
            Roman Wu
          </button>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link
              href="/"
              onClick={(e: any) => handleClick(e, "Home")}
              className={`${classes.headerNavLi} ${classes.navbar_color}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/about"
              onClick={(e: any) => handleClick(e, "About")}
              className={`${classes.headerNavLi} ${classes.navbar_color}`}
            >
              About
            </Nav.Link>
            <Nav.Link
              href="/education"
              onClick={(e: any) => handleClick(e, "Education")}
              className={`${classes.headerNavLi} ${classes.navbar_color}`}
            >
              Education
            </Nav.Link>
            <Nav.Link
              href="/work"
              onClick={(e: any) => handleClick(e, "Work")}
              className={`${classes.headerNavLi} ${classes.navbar_color}`}
            >
              Work
            </Nav.Link>
            <Nav.Link
              href="/projects"
              onClick={(e: any) => handleClick(e, "Projects")}
              className={`${classes.headerNavLi} ${classes.navbar_color}`}
            >
              Projects
            </Nav.Link>
            <Nav.Link
              href="/resume"
              onClick={(e: any) => handleClick(e, "Resume")}
              className={`${classes.headerNavLi} ${classes.navbar_color}`}
            >
              Resume
            </Nav.Link>
            <Nav.Link
              href="/contact"
              onClick={(e: any) => handleClick(e, "Contact")}
              className={`${classes.headerNavLi} ${classes.navbar_color}`}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
