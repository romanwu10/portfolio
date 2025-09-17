import { useEffect, useState } from "react";
import classes from "./DarkMode.module.css";

type ThemeOption = "auto" | "light" | "dark";

const THEME_SEQUENCE: ThemeOption[] = ["auto", "light", "dark"];

const themeLabels: Record<ThemeOption, string> = {
  auto: "Device default",
  light: "Light mode",
  dark: "Dark mode",
};

const DarkMode = () => {
  const [themePreference, setThemePreference] = useState<ThemeOption>(
    (localStorage.getItem("themePreference") as ThemeOption) || "auto"
  );
  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

  const applyTheme = (theme: "light" | "dark") => {
    document.querySelector("body")?.setAttribute("data-theme", theme);
    setActualTheme(theme);
  };

  const getSystemTheme = (): "light" | "dark" => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  };

  const updateActualTheme = (preference: ThemeOption) => {
    const newTheme =
      preference === "auto"
        ? getSystemTheme()
        : preference;

    applyTheme(newTheme);
  };

  const cycleTheme = () => {
    const currentIndex = THEME_SEQUENCE.indexOf(themePreference);
    const nextPreference = THEME_SEQUENCE[(currentIndex + 1) % THEME_SEQUENCE.length];
    setThemePreference(nextPreference);
    localStorage.setItem("themePreference", nextPreference);
    updateActualTheme(nextPreference);
  };

  useEffect(() => {
    // Migration from old theme system
    const oldTheme = localStorage.getItem("theme");
    const newThemePreference = localStorage.getItem("themePreference");

    let initialPreference: ThemeOption = "auto";

    if (newThemePreference) {
      initialPreference = newThemePreference as ThemeOption;
    } else if (oldTheme) {
      initialPreference = oldTheme === "dark" ? "dark" : "light";
      localStorage.setItem("themePreference", initialPreference);
      localStorage.removeItem("theme");
    }

    setThemePreference(initialPreference);
    updateActualTheme(initialPreference);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (event: MediaQueryListEvent) => {
      const currentPreference = (localStorage.getItem("themePreference") as ThemeOption) || "auto";
      if (currentPreference === "auto") {
        applyTheme(event.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const icon = {
    auto: (
      <svg className={classes.themeIcon} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v10a1.5 1.5 0 0 1-1.5 1.5H14l1 2h2a1 1 0 1 1 0 2h-8a1 1 0 1 1 0-2h2l1-2H5.5A1.5 1.5 0 0 1 4 15.5v-10Zm1.5-.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5h-13Z"
          fill="currentColor"
        />
        <rect x="6.5" y="6.5" width="11" height="7" rx="1" fill="currentColor" opacity="0.35" />
      </svg>
    ),
    light: (
      <svg className={classes.themeIcon} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="12" y1="3" x2="12" y2="5.2" />
          <line x1="12" y1="18.8" x2="12" y2="21" />
          <line x1="4.22" y1="4.22" x2="5.78" y2="5.78" />
          <line x1="18.22" y1="18.22" x2="19.78" y2="19.78" />
          <line x1="3" y1="12" x2="5.2" y2="12" />
          <line x1="18.8" y1="12" x2="21" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.78" y2="18.22" />
          <line x1="18.22" y1="5.78" x2="19.78" y2="4.22" />
        </g>
      </svg>
    ),
    dark: (
      <svg className={classes.themeIcon} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12.25 3.5a8.5 8.5 0 1 0 8.25 10.16 6.5 6.5 0 1 1-8.25-8.66Z"
          fill="currentColor"
        />
      </svg>
    ),
  }[themePreference];

  return (
    <div className={classes.themeSelector}>
      <button
        type="button"
        onClick={cycleTheme}
        className={classes.themeButton}
        aria-label={`${themeLabels[themePreference]} (click to switch theme)`}
        title={`${themeLabels[themePreference]}`}
      >
        {icon}
        {themePreference === "auto" && (
          <span
            className={`${classes.autoIndicator} ${actualTheme === "dark" ? classes.autoIndicatorDark : classes.autoIndicatorLight}`}
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
};

export default DarkMode;
