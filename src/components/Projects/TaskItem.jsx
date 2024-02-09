import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import '../App/App.css'

function TaskItem({ urlBase, task, fetchTasks }) {
    const dispatch = useDispatch();

    const [currentStatus, setCurrentStatus] = useState(task.status)

    async function updateStatus() {
        event.preventDefault();
        try {
            console.log("status is now", currentStatus)
            console.log("task to update", task.task_id)

            //here having an issue with the json body being sent over - 
            //will need to look at that plus how to show the 
            //dropdown options as the current status on default

            const req = await fetch(`${urlBase}/api/tasks/task/${task.task_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentStatus)
            });
            if (response.ok) {
                console.log('Task successfully updated!');
                // fetching updated tasks
                // fetchTasks();
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
            <p>Due Date: {task.due_date}</p>
            <p>Estimated Duration: {task.estimated_duration}</p>
            <p>Status: {task.status}</p>
            <br />


            {/* <form onSubmit={updateStatus}>
                <label htmlFor="status">Update Status:</label>
                <select id="status" name="status">
                    <option value="Incomplete">Incomplete</option>
                    <option value="Complete">Complete</option>
                </select>
                <button>Update</button>
            </form> */}


        </div>
    )
}

export default TaskItem;