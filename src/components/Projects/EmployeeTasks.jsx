import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from './TaskItem';

function EmployeeTasks() {
    const dispatch = useDispatch();

    // this is how data is obtained into this component from the redux store (reducers)
    const user = useSelector((store) => store.user);
    const tasks = useSelector((store) => store.tasks.employeeTasks)

    const urlBase = 'http://localhost:3000'

    // local state might be redundant/unncessary here (and in fetchEmployeeTasks) but I'm leaving it for now since it's working
    const [tasksFetched, setTasksFetched] = useState([])

    useEffect(() => {
        console.log("fetch employee tasks here")
        fetchEmployeeTasks();
    }, [])

    async function fetchEmployeeTasks() {
        try {
            console.log("employee # is", user.user_id)
            let userId = user.user_id;
            // getting all tasks associated with currently logged in user
            const req = await fetch(`${urlBase}/api/tasks/employee/${userId}`);
            const res = await req.json();
            console.log('tasks fetched:', res);
            // needed to redeclare variable to make sure payload is sent when value has been updated
            // wasn't working if sending payload of res
            const fetchedTasksFromDb = res;
            setTasksFetched(fetchedTasksFromDb)
            // sending to reducer
            dispatch({ type: 'SET_EMPLOYEE_TASKS', payload: fetchedTasksFromDb })

        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    // splitting tasks between incomplete and complete to render separately
    const incompleteTasks = tasks.filter(task => task.status === 'incomplete');
    const completeTasks = tasks.filter(task => task.status === 'complete');

    return (
        <div>
            <h1>Welcome back, Valued Employee # {user.user_id}!</h1>
            <h1>Your Assigned Tasks</h1>
            <div className="tasks-container">
                <div className="incomplete-tasks">
                    <h2>Incomplete ({incompleteTasks.length})</h2>
                    {incompleteTasks.map((task) => (
                        <TaskItem
                            key={task.task_id}
                            task={task}
                            fetchAppropriateTasks={fetchEmployeeTasks}
                            urlBase={urlBase} />
                    ))}
                </div>
                <div className="complete-tasks">
                    <h2>Complete ({completeTasks.length})</h2>
                    {completeTasks.map((task) => (
                        <TaskItem
                            key={task.task_id}
                            task={task}
                            fetchAppropriateTasks={fetchEmployeeTasks}
                            urlBase={urlBase} />
                    ))}
                </div>
            </div>
        </div>
    );
}


export default EmployeeTasks;