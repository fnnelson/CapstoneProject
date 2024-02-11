import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import '../App/App.css'
import ProjectForm from "./ProjectForm";

function Projects() {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const allProjects = useSelector((store) => store.projects.allProjects);
    const user = useSelector((store) => store.user);

    const urlBase = 'http://localhost:3000'

    const [projectsFetched, setProjectsFetched] = useState([])

    useEffect(() => {
        // fetch all projects upon page load
        fetchProjects();
    }, []);

    useEffect(() => {
        // once the projects array exists from the fetch, will assign all projects to projects reducer
        if (projectsFetched[0]) {
            dispatch({ type: 'SET_ALL_PROJECTS', payload: projectsFetched });
        }
        // this useEffect is dependent on change of projectsFetched value (meaning the data has been fetched or changed)
    }, [projectsFetched]);

    async function fetchProjects() {
        try {
            const userId = user.user_id;
            const req = await fetch(`${urlBase}/api/projects/${userId}`);
            const res = await req.json();
            setProjectsFetched(res);
            console.log('projects fetched:', res);
            // sending to reducer
            dispatch({ type: 'SET_ALL_PROJECTS', payload: projectsFetched })

        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    const handleViewDetailsClick = (project) => {
        console.log("project to send to reducer", project);
        // send this project's data to the oneProject reducer
        dispatch({ type: 'SET_ONE_PROJECT', payload: project })
        // then go to details page for OneProject component
        navigateTo("/viewproject")
    };

    const handleViewEmployeeTasksClick = () => {
        navigateTo("/employeetasks")
    };

    return (
        <>
            <ProjectForm />        
            <button onClick={() => handleViewEmployeeTasksClick()} >View your tasks</button>
            <h1>Your Team's Projects</h1>
            <div className="projects">
                {projectsFetched.map((project) => (
                    <div key={project.project_id} className="project">
                        <h2>{project.project_name} Project</h2>
                        <p>Team Size: {project.team_size}</p>
                        <p>Workload: {project.workload}</p>
                        <p>Budget: {project.budget}</p>
                        <p>Est Completion Time: {project.completion_time} {project.completion_time === 1 ? 'day' : 'days'}</p>
                        <button onClick={() => handleViewDetailsClick(project)}>View Details</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Projects;