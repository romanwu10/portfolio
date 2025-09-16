import { useContext } from "react";

import { Context } from "../../../context/context";

import classes from "./Home.module.css";

const Home = () => {
  const contentCtx = useContext(Context);

  const navigateTo = (section: string) => {
    contentCtx.changeContent(section);
  };

  return (
    <section className={classes.hero}>
      <div className={classes.heroGlow} aria-hidden="true" />
      <div className={classes.heroContent}>
        <span className={classes.heroBadge}>Full-stack engineer · Product-minded</span>
        <h1 className={classes.heroTitle}>Hi, I'm Roman Wu</h1>
        <p className={classes.heroSubtitle}>
          I craft resilient web experiences with clean architecture, thoughtful UX, and an eye
          for performance.
        </p>
        <div className={classes.heroDivider} />
        <p className={classes.heroDescription}>
          From API integrations to pixel-perfect interfaces, I love shipping impactful solutions
          that feel effortless to use.
        </p>
        <div className={classes.heroCtaGroup}>
          <button
            type="button"
            className={classes.heroPrimaryCta}
            onClick={() => navigateTo("Projects")}
          >
            Explore projects
          </button>
          <button
            type="button"
            className={classes.heroSecondaryCta}
            onClick={() => navigateTo("Contact")}
          >
            Let's collaborate
          </button>
        </div>
        <dl className={classes.heroStats}>
          <div>
            <dt>Years of experience</dt>
            <dd>6+</dd>
          </div>
          <div>
            <dt>Successfully delivered projects</dt>
            <dd>20+</dd>
          </div>
          <div>
            <dt>Focused domains</dt>
            <dd>FinTech · SaaS · Analytics</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Home;
