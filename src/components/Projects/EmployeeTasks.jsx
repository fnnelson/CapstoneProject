import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from './TaskItem';

function EmployeeTasks() {
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);
    const tasks = useSelector((store) => store.tasks.employeeTasks)

    const urlBase = 'http://localhost:3000'
    const [tasksFetched, setTasksFetched] = useState([])

    useEffect(() => {
        console.log("fetch employee tasks here")
        fetchEmployeeTasks();
    }, [])

    async function fetchEmployeeTasks() {
        try {
            console.log("employee # is", user.user_id)
            let userId = user.user_id;
            const req = await fetch(`${urlBase}/api/tasks/employee/${userId}`);
            const res = await req.json();
            console.log('tasks fetched:', res);
            const fetchedTasksFromDb = res;
            setTasksFetched(fetchedTasksFromDb)
            // sending to reducer
            dispatch({ type: 'SET_EMPLOYEE_TASKS', payload: fetchedTasksFromDb })

        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    const incompleteTasks = tasks.filter(task => task.status === 'incomplete');
    const completeTasks = tasks.filter(task => task.status === 'complete');

    return (
        <div>
            <h1>Hello, valued employee # {user.user_id}!</h1>
            <h1>Your Tasks</h1>
            <div className="tasks-container">
                <div className="incomplete-tasks">
                    <h2>Incomplete Tasks</h2>
                    {incompleteTasks.map((task) => (
                        <TaskItem
                            key={task.task_id}
                            task={task}
                            fetchEmployeeTasks={fetchEmployeeTasks}
                            urlBase={urlBase} />
                    ))}
                </div>
                <div className="complete-tasks">
                    <h2>Complete Tasks</h2>
                    {completeTasks.map((task) => (
                        <TaskItem
                            key={task.task_id}
                            task={task}
                            fetchEmployeeTasks={fetchEmployeeTasks}
                            urlBase={urlBase} />
                    ))}
                </div>
            </div>
        </div>
    );
}


export default EmployeeTasks;