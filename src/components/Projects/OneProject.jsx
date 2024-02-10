import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import '../App/App.css'
import TaskItem from './TaskItem';

function OneProject() {
    const dispatch = useDispatch();
    const project = useSelector((store) => store.projects.oneProject);
    const tasks = useSelector((store) => store.tasks.singleProjectTasks)

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
            const req = await fetch(`${urlBase}/api/tasks/project/${projectId}`);
            const res = await req.json();
            setTasksFetched(res);
            console.log('tasks fetched:', res);
            // sending to reducer
            dispatch({ type: 'SET_ALL_TASKS', payload: tasksFetched })

        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    const incompleteTasks = tasks.filter(task => task.status === 'incomplete');
    const completeTasks = tasks.filter(task => task.status === 'complete');

    return (
        <>
            <h1>{project.project_name} Project</h1>
            <div>
                <p>Team Size: {project.team_size}</p>
                <p>Workload: {project.workload}</p>
                <p>Budget: {project.budget}</p>
                <p>Est Completion Time: {project.completion_time} {project.completion_time === 1 ? 'day' : 'days'}</p>
            </div>
            <h1>Project tasks</h1>
            <div className="tasks-container">
                <div className="incomplete-tasks">
                    <h2>Incomplete</h2>
                    {incompleteTasks.map((task) => (
                        <TaskItem key={task.task_id} task={task} fetchTasks={fetchTasks} urlBase={urlBase} />
                    ))}
                </div>
                <div className="complete-tasks">
                    <h2>Complete</h2>
                    {completeTasks.map((task) => (
                        <TaskItem key={task.task_id} task={task} fetchTasks={fetchTasks} urlBase={urlBase} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default OneProject;