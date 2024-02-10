import { useState } from "react";

function AddProjectsForm() {
    const urlBase = 'http://localhost:3000'

    const [projectNameInput, setProjectNameInput] = useState("");

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

    return (
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
                        Add New Project
                    </button>
                </label>
            </form>
        </div>
    )
};

export default AddProjectsForm;