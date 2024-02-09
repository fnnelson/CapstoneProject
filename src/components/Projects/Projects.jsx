import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import '../App/App.css'
import { useNavigate } from 'react-router-dom';
// import OneProject from "./OneProject";

function Projects({ urlBase }) {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const allProjects = useSelector((store) => store.projects.allProjects);

    const [projectNameInput, setProjectNameInput] = useState("");
    const [projectsFetched, setProjectsFetched] = useState([])

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        if (projectsFetched[0]) {
            dispatch({ type: 'SET_ALL_PROJECTS', payload: projectsFetched });
        }
    }, [projectsFetched]);

    async function fetchProjects() {
        try {
            const req = await fetch(`${urlBase}/api/projects`);
            const res = await req.json();
            setProjectsFetched(res);
            console.log('projects fetched:', res);
            // sending to reducer
            dispatch({ type: 'SET_ALL_PROJECTS', payload: projectsFetched })

        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    const addNewProject = async () => {
        event.preventDefault();

        const projectObject = {
            name: projectNameInput,
        };

        console.log('project to be sent:', projectObject);

        try {
            const response = await fetch(`${urlBase}/api/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectObject),
            });

            if (response.ok) {
                console.log('Project successfully added!');
            } else {
                console.error('You failed at adding a project!');
            }
        } catch (error) {
            console.error('Error while sending data:', error);
        }
    };

    const handleViewDetailsClick = (project) => {
        console.log("project to send to reducer", project);
        // send this project's data to the oneProject reducer
        dispatch({ type: 'SET_ONE_PROJECT', payload: project })
        // then go to details page for OneProject component
        navigateTo("/project")
    };

    return (
        <>
            <div className='project-form'>
                <form>
                    <label htmlFor="task name">
                        <input
                            type='text'
                            name='project'
                            value={projectNameInput}
                            onChange={(event) => setProjectNameInput(event.target.value)}
                        />
                        <button onClick={() => addNewProject()}>
                            Add New Task
                        </button>
                    </label>
                </form>
            </div>

            <h1>Your Projects</h1>
            <div className="projects">
                {projectsFetched.map((project) => (
                    <div key={project.id} className="project">
                        <h2>{project.title}</h2>
                        <p>Brand: {project.brand}</p>
                        <p>Category: {project.category}</p>
                        <p>Description: {project.description}</p>
                        <p>Price: {project.price}</p>
                        <img style={{ height: '100px' }} src={project.thumbnail} alt="Thumbnail" />
                        <br />
                        <button onClick={() => handleViewDetailsClick(project)}>View Details</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Projects;