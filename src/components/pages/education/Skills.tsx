import { useEffect, useState } from "react";
import classes from "./Skills.module.css";
import Skill from "../../../models/skill";
import Loading from "../../others/Loading/Loading";

interface SkillGroup {
  title: string;
  skills: Skill[];
}

/**
 * Skills Component
 *
 * Fetches skill groups from `data/skills.json` and renders them in a responsive grid.
 * Each group exposes a title and a collection of logo-backed skills so new categories
 * can be introduced without touching the component again.
 */
const Skills = () => {
  const [skillGroups, setSkillGroups] = useState([] as SkillGroup[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("data/skills.json")
      .then((res) => res.json())
      .then((data) => {
        setSkillGroups(data.groups ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <>
        <h4 className={classes.contentTitle}>Skills</h4>
        <p className={classes.justify}>
          Sorry, we couldn't load the information. Please, try again later.
        </p>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <h4 className={classes.contentTitle}>Skills</h4>
        <Loading />
      </>
    );
  }

  return (
    <>
      <h4 className={classes.contentTitle}>Skills</h4>
      <div className={classes.skills}>
        {skillGroups.map((group) => (
          <section key={group.title} className={classes.groupCard}>
            <h5 className={classes.groupTitle}>{group.title}</h5>
            <ul className={classes.skillList}>
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <img
                    className={classes.logo}
                    src={skill.logo}
                    alt={skill.name}
                  />
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
};

export default Skills;
