import { RootState, useAppDispatch } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import JobCard from "../_components/JobCard";
import { Job } from "@/types";
import { fetchJobs, updateJob, updateJob_Off } from "@/store/slices/jobs";

const JobsPage = () => {
  const dispatch = useAppDispatch();
  const { jobsList, status, error } = useSelector(
    (state: RootState) => state.jobs
  );

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleUpdateJob = (updatedJob: Job) => {
    console.log("env", process.env.NEXT_PUBLIC_DATA_SOURCE);
    if (process.env.NEXT_PUBLIC_DATA_SOURCE == "db")
      dispatch(updateJob(updatedJob));
    else
      dispatch(updateJob_Off(updatedJob));
  };

  // if (status === "loading") return <p>Loading ...</p>;
  // if (status === "failed") return <p>Error: {error}</p>;
  return (
    <div className="flex flex-col items-center">
      {status === "loading" && <h2>Loading ...</h2>}
      {status === "failed" && <h2>Failed ...</h2>}

      <h2>Today's jobs</h2>
      {jobsList.map((job: Job) => (
        <JobCard
          data={job}
          key={job.id}
          onUpdate={handleUpdateJob}
          className="mb-2 w-[90vw] max-w-[450px]"
        />
      ))}
    </div>
  );
};

export default JobsPage;
