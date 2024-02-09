import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import '../App/App.css'
import TaskItem from './TaskItem';

function OneProject() {
    const dispatch = useDispatch();
    const project = useSelector((store) => store.projects.oneProject);
    const tasks = useSelector((store) => store.tasks.allTasks)

    const urlBase = 'http://localhost:3000'

    const [tasksFetched, setTasksFetched] = useState([])

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        if (tasksFetched[0]) {
            dispatch({ type: 'SET_PROJECT_TASKS', payload: tasksFetched });
        }
    }, [tasksFetched]);

    async function fetchTasks() {
        try {
            console.log("project # is", project.project_id)
            let projectId = project.project_id;
            const req = await fetch(`${urlBase}/api/tasks/${projectId}`);
            const res = await req.json();
            setTasksFetched(res);
            console.log('tasks fetched:', res);
            // sending to reducer
            dispatch({ type: 'SET_ALL_TASKS', payload: tasksFetched })

        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    return (
        <>
            <h1>One Project</h1>
            <div>
                <h2>Project # {project.project_id}</h2>
                <p>Team Size: {project.team_size}</p>
                <p>Workload: {project.workload}</p>
                <p>Budget: {project.budget}</p>
                <p>Completion Time: {project.completion_time}</p>
            </div>
            <h1>Tasks Associated to this project</h1>
            <div className="tasks">
                {tasksFetched.map((task) => (
                    <TaskItem key={task.task_id} task={task} fetchTasks={fetchTasks} urlBase={urlBase} />
                ))}
            </div>
        </>
    )
}

export default OneProject;