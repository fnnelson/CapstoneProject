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
            setTasksFetched(res);
            console.log('tasks fetched:', res);
            // sending to reducer
            dispatch({ type: 'SET_EMPLOYEE_TASKS', payload: tasksFetched })

        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }


    return (
        <div>
            <h1>Hello, valued employee # {user.user_id}!</h1>
            <h1>Your Tasks</h1>
            <div className="tasks">
                {tasksFetched.map((task) => (
                    <TaskItem key={task.task_id} task={task} fetchEmployeeTasks={fetchEmployeeTasks} urlBase={urlBase} />
                ))}
            </div>
        </div>
    )
};
export default EmployeeTasks;