import React, { useEffect, useMemo, useState } from "react";

import Content from "../models/content";

type ContentObj = {
  home: boolean;
  about: boolean;
  education: boolean;
  work: boolean;
  projects: boolean; // Added projects
  resume: boolean; // Added resume
  contact: boolean;
  changeContent: (text: string) => void;
};

export const Context = React.createContext<ContentObj>({
  home: true,
  about: false,
  education: false,
  work: false,
  projects: false, // Added projects
  resume: false, // Added resume
  contact: false,
  changeContent: (text: string) => {},
});

type Props = {
  children?: React.ReactNode;
};

/**
 * ContentProvider Component
 *
 * This component provides a context for managing the state of the website's content.
 * It uses the Context API and the useState hook for managing state.
 *
 * The component maintains a state object 'context' to keep track of which page is currently active.
 * The initial state is set to an object where 'home' is true and all other properties are false.
 *
 * The component includes a function 'changeContent' to update the state based on the provided text.
 * This function creates a new state object where all properties are false, then sets the property corresponding to the provided text to true.
 * If the provided text does not match any property, 'home' is set to true.
 *
 * The 'changeContent' function is included in the context value, so it can be called from any component that consumes the context.
 *
 * The component uses the Context.Provider component to provide the context value to its children.
 * The children are passed as props to the component.
 *
 */
const ContentProvider = (props: Props) => {
  const [context, setContext] = useState<Content>(() => {
    if (typeof window !== "undefined") {
      const p = window.location?.pathname ?? "/";
      return {
        ...{
          home: false,
          about: false,
          education: false,
          work: false,
          projects: false,
          resume: false,
          contact: false,
        },
        ...contentFromPath(p),
      } as Content;
    }
    return {
      home: true,
      about: false,
      education: false,
      work: false,
      projects: false,
      resume: false,
      contact: false,
    };
  });

  const pathFor = useMemo(
    () =>
      ({
        Home: "/",
        About: "/about",
        Education: "/education",
        Work: "/work",
        Projects: "/projects",
        Resume: "/resume",
        Contact: "/contact",
      } as const),
    []
  );

  function contentFromPath(path: string): Content {
    const p = path.replace(/\/$/, "");
    const base: Content = {
      home: false,
      about: false,
      education: false,
      work: false,
      projects: false,
      resume: false,
      contact: false,
    };
    switch (p) {
      case "":
      case "/":
        return { ...base, home: true };
      case "/about":
        return { ...base, about: true };
      case "/education":
        return { ...base, education: true };
      case "/work":
        return { ...base, work: true };
      case "/projects":
        return { ...base, projects: true };
      case "/resume":
        return { ...base, resume: true };
      case "/contact":
        return { ...base, contact: true };
      default:
        // Do not change to a known section for unknown routes (e.g., /privacy)
        return base;
    }
  }

  const changeContent = (text: string) => {
    const path = (pathFor as any)[text] ?? "/";
    // Push path to history for SPA navigation
    if (typeof window !== "undefined" && window.location?.pathname !== path) {
      window.history.pushState({}, "", path);
    }
    setContext(contentFromPath(path));
  };

  // Sync initial state and browser navigation (back/forward) with context
  useEffect(() => {
    const apply = () => setContext(contentFromPath(window.location.pathname));
    apply();
    const handler = () => apply();
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue: ContentObj = {
    home: context.home,
    about: context.about,
    education: context.education,
    work: context.work,
    projects: context.projects, // Added projects
    resume: context.resume, // Added resume
    contact: context.contact,
    changeContent: changeContent,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContentProvider;
