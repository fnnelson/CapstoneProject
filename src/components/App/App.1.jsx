import { useEffect, useState } from 'react';

export function App() {
    const [count, setCount] = useState(0);
    const urlBase = 'http://localhost:3000';

    const [projectNameInput, setProjectNameInput] = useState("");
    const [projectsFetched, setProjectsFetched] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        const req = await fetch(`${urlBase}/api/projects`);
        const res = await req.json();
        setProjectsFetched(res);
        console.log('projects fetched:', projectsFetched);
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

    return (
        <>
            <h1>Project Management App</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <form>
                    <label htmlFor="task name">
                        <input
                            type='text'
                            name='project'
                            value={projectNameInput}
                            onChange={(event) => setProjectNameInput(event.target.value)} />
                        <button onClick={() => addNewProject()}>
                            Test server connection
                        </button>
                    </label>
                </form>

            </div>
        </>
    );
}
