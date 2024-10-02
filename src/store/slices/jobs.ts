import { Job } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface JobState {
  jobsList: Job[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: JobState = {
  jobsList: [],
  status: "idle",
  error: null,
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await fetch("/api/jobs"); // Adjust the API endpoint if needed
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return await response.json();
});

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async (job: Job) => {
    const response = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    if (!response.ok) {
      throw new Error("Failed to update job");
    }
    return await response.json();
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    updateJob_Off: (state, action: PayloadAction<Job>) => { // update job only on redux
        state.jobsList = state.jobsList.map((job: Job) => (
            job.id == action.payload.id ? action.payload : job
        ))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'idle';
        state.jobsList = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || "Failed to fetch jobs";
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        console.log("state", state, "action", action);
        const index = state.jobsList.findIndex(
          (job) => job.id == action.payload.data?.id
        );
        if (index !== -1) {
          state.jobsList[index] = action.payload.data;
        }
      });
  },
});

export const { updateJob_Off } = jobsSlice.actions;
export default jobsSlice.reducer;
