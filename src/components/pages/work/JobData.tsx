import Job from "../../../models/job";
import { workTime } from "../../../utils/utils";
import classes from "./Work.module.css";

type JobDataProps = {
  job: Job;
};

const JobData = ({ job }: JobDataProps) => {
  const isCurrentRole = job.endMonth === "" && job.endYear === 0;
  const dateLabel = isCurrentRole
    ? `${job.startMonth} ${job.startYear} – Present`
    : `${job.startMonth} ${job.startYear} – ${job.endMonth} ${job.endYear}`;
  const durationLabel = workTime(
    job.startMonth,
    job.startYear.toString(),
    job.endMonth,
    job.endYear.toString()
  );

  return (
    <div className={classes.roleDetails}>
      <div className={classes.roleMeta}>
        {job.type && <span className={classes.rolePill}>{job.type}</span>}
        {job.location && <span className={classes.roleLocation}>{job.location}</span>}
      </div>
      {job.description && (
        <p className={classes.roleDescription}>{job.description}</p>
      )}
      <p className={classes.roleDates}>
        <span>{dateLabel}</span>
        <span className={classes.roleDuration}>{durationLabel}</span>
      </p>
    </div>
  );
};

export default JobData;
