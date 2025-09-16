import { useEffect, useMemo, useState } from "react";
import classes from "./Work.module.css";
import { loadCompanies, workTime } from "../../../utils/utils";
import Company from "../../../models/company";
import Job from "../../../models/job";
import JobData from "./JobData";
import LoadingSpinner from "../../others/Loading/Loading";

const formatCompanyTimeline = (positions: Job[]) => {
  if (positions.length === 0) {
    return { range: "", duration: "" };
  }

  const sortedByStart = [...positions].sort((a, b) => {
    const startA = new Date(`${a.startMonth} 1, ${a.startYear}`);
    const startB = new Date(`${b.startMonth} 1, ${b.startYear}`);
    return startA.getTime() - startB.getTime();
  });

  const first = sortedByStart[0];
  const latest = sortedByStart[sortedByStart.length - 1];
  const endLabel =
    latest.endMonth === "" && latest.endYear === 0
      ? "Present"
      : `${latest.endMonth} ${latest.endYear}`;

  const range = `${first.startMonth} ${first.startYear} – ${endLabel}`;
  const duration = workTime(
    first.startMonth,
    first.startYear.toString(),
    latest.endMonth,
    latest.endYear.toString()
  );

  return { range, duration };
};

const Work = () => {
  const [companies, setCompanies] = useState([] as Company[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("data/jobs.json")
      .then((res) => res.json())
      .then((data) => {
        const loadedCompanies = loadCompanies(data);
        setCompanies(loadedCompanies);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const experiences = useMemo(() => {
    return companies.map((company) => {
      const { range, duration } = formatCompanyTimeline(company.positions);
      return {
        company,
        primaryRole: company.positions[0],
        range,
        duration,
      };
    });
  }, [companies]);

  if (error) {
    return (
      <section className={classes.workSection}>
        <h4 className={classes.sectionTitle}>Experience</h4>
        <p className={classes.errorState}>
          Sorry, we couldn't load the information. Please try again later.
        </p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className={classes.workSection}>
        <h4 className={classes.sectionTitle}>Experience</h4>
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section className={classes.workSection}>
      <header className={classes.sectionHeader}>
        <div>
          <h4 className={classes.sectionTitle}>Experience</h4>
          <p className={classes.sectionSubtitle}>
            High-impact roles across product, analytics, and engineering teams.
          </p>
        </div>
      </header>
      <ol className={classes.timeline}>
        {experiences.map(({ company, primaryRole, range, duration }) => (
          <li className={classes.timelineItem} key={company.name}>
            <span className={classes.timelineMarker} aria-hidden="true" />
            <article className={classes.companyCard}>
              <header className={classes.companyHeader}>
                <div className={classes.companyIdentity}>
                  {company.logo && (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className={classes.companyLogo}
                      loading="lazy"
                    />
                  )}
                  <div>
                    <p className={classes.companyName}>
                      {primaryRole?.company || company.name}
                    </p>
                    <p className={classes.companyMeta}>
                      {range}
                      {duration && <span> • {duration}</span>}
                    </p>
                  </div>
                </div>
                {company.positions.length > 1 && (
                  <span className={classes.roleCount}>
                    {company.positions.length} roles
                  </span>
                )}
              </header>
              <div className={classes.roles}>
                {company.positions.map((job) => (
                  <div
                    key={`${company.name}-${job.title}-${job.startMonth}-${job.startYear}`}
                    className={classes.role}
                  >
                    <h5 className={classes.roleTitle}>{job.title}</h5>
                    <JobData job={job} />
                  </div>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Work;
