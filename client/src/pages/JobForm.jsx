import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJob, createJob, editJob } from "../services/api"; // Import API functions
import TextField from "@mui/material/TextField";  // MUI TextField for inputs
import Button from "@mui/material/Button";  // MUI Button
import Typography from "@mui/material/Typography";  // MUI Typography for text

const JobForm = ({ isEdit }) => {
  const { id } = useParams(); // Get job ID from URL for editing
  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // To navigate after form submission

  // Fetch job details if it's edit mode
  useEffect(() => {
    if (isEdit && id) {
      async function fetchJob() {
        try {
          const response = await getJob(id);
          console.log(response); // Fetch job details by ID
          setJob(response); // Set job details to state
        } catch (error) {
          setErrorMessage(
            error.response?.data?.message || "Error fetching job details"
          );
        }
      }
      fetchJob();
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await editJob(id, job); // Edit existing job
      } else {
        await createJob(job); // Create new job
      }
      navigate("/jobs"); // Navigate to the home page or job listing page
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", marginTop:"40px" }}>
      {errorMessage && (
        <Typography variant="body1" color="error" style={{ marginBottom: "1rem" }}>
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField
          label="Job Title"
          variant="outlined"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
          required
          fullWidth
        />
        <TextField
          label="Company"
          variant="outlined"
          value={job.company}
          onChange={(e) => setJob({ ...job, company: e.target.value })}
          required
          fullWidth
        />
        <TextField
          label="Location"
          variant="outlined"
          value={job.location}
          onChange={(e) => setJob({ ...job, location: e.target.value })}
          required
          fullWidth
        />
        <TextField
          label="Job Description"
          variant="outlined"
          multiline
          rows={4}
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          {isEdit ? "Edit Job" : "Create Job"}
        </Button>
      </form>
    </div>
  );
};

export default JobForm;
