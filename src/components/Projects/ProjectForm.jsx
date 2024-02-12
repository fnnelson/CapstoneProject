import React, { useState, useEffect } from "react";

const img2 =
  "https://www.pngall.com/wp-content/uploads/5/Pokemon-Pikachu-PNG-Image-File.png";

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

  const handleSelect = (e) => {
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
      <h3>DEADLINE INSIGHT</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Team Size:&nbsp;
          <input
            type="number"
            name="team_size"
            value={project.team_size}
            onChange={handleChange}
            placeholder="min. 1"
            min="1"
            step="1"
            max="10"
          />
        </label>
        <br />
        <label>
          Budget:&nbsp;
          <input
            type="number"
            name="budget"
            value={project.budget}
            onChange={handleChange}
            placeholder="min. $10000"
            min="10000"
            step="1000"
          />
        </label>
        <br />
        <label>
          Workload:&nbsp;
          <select
            name="workload"
            value={project.workload}
            onChange={handleSelect}
          >
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </label>
        <br />
        <button type="submit">Predict Completion Time</button>
      </form>
      {prediction && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3
            style={{
              display: "inline-block",
              marginLeft: "10px",
              color: "green",
            }}
          >
            Estimated Completion Time: {prediction} days
          </h3>
          &nbsp;&nbsp;
          <img src={img2} alt="Poke Mon Go Logo 2" width="50" height="50" />
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
