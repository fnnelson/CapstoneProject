import React, { useState, useEffect } from "react";

const ProjectForm = () => {
  const urlBase = "http://localhost:3000";
  const [project, setProject] = useState({
    team_size: "",
    budget: "",
    workload: "",
  });
  const [prediction, setPrediction] = useState("");

  useEffect(() => {
    console.log("Updated Prediction:", prediction);
  }, [prediction]); // This effect will run whenever 'prediction' changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value !== "" ? Number(value) : "";
    setProject({ ...project, [name]: numericValue });
  };

  const handleText = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("project to be sent:", project);
    try {
      const response = await fetch(`${urlBase}/api/projects/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      if (response.ok) {
        console.log("Project successfully added!");
        const data = await response.json();
        setPrediction(data.prediction);
      } else {
        console.error("You failed at adding a project!");
      }
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
            placeholder="min. 1"
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
            placeholder="min. $10000"
          />
        </label>
        <br />
        <label>
          Workload:
          <input
            type="text"
            name="workload"
            value={project.workload}
            onChange={handleText}
            pattern="[SMLsml]"
            placeholder="Enter S, M, or L"
          />
        </label>
        <br />
        <button type="submit">Predict Completion Time</button>
      </form>
      {prediction && <p>Predicted Completion Time: {prediction} days</p>}
    </div>
  );
};

export default ProjectForm;
