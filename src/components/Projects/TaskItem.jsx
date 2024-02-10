import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import '../App/App.css'

function TaskItem({ task, fetchTasks, fetchEmployeeTasks }) {
    const dispatch = useDispatch();
    const urlBase = 'http://localhost:3000'

    const [currentStatus, setCurrentStatus] = useState(task.status)

    async function updateStatus() {
        event.preventDefault();
        try {
            console.log("status is now", currentStatus)
            console.log("task to update", task.task_id)

            const req = await fetch(`${urlBase}/api/tasks/task/${task.task_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: currentStatus })
            });
            if (req.ok) {
                console.log('Task successfully updated!');
                // fetching updated tasks
                fetchEmployeeTasks();
            } else {
                console.error('You failed at updating the status!');
            }

        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    return (

        <div className="task">
            <h2>Task: {task.description}</h2>
            <p>Task #: {task.task_id}</p>
            <p>Due Date: {task.due_date}</p>
            <p>Estimated Duration: {task.estimated_duration} hours</p>
            <br />


            <form onSubmit={updateStatus}>
                <label htmlFor="status">Update Status:</label>
                <select id="status" name="status" value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)}>
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                </select>
                <button>Update</button>
            </form>


        </div>
    )
}

export default TaskItem;