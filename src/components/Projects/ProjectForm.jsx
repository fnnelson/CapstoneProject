// React Component
import React, { useState } from "react";

const ProjectForm = () => {
  const [project, setProject] = useState({
    team_size: "",
    budget: "",
    workload: "",
  });
  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value !== '' ? Number(value) : '';
  setProject({ ...project, [name]: numericValue });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/projects", {
        method: "POST", // Send a POST request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Project Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Team Size:
          <input
            type="number"
            name="team_size"
            value={project.team_size}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Budget:
          <input
            type="number"
            name="budget"
            value={project.budget}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Workload:
          <input
            type="number"
            name="workload"
            value={project.workload}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Predict Completion Time</button>
      </form>
      {prediction && <p>Predicted Completion Time: {prediction}</p>}
    </div>
  );
};

export default ProjectForm;
