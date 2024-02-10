import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import EditTaskModal from './EditTaskModal';
import '../App/App.css'

function TaskItem({ task, fetchTasks, fetchEmployeeTasks }) {
    const dispatch = useDispatch();
    const urlBase = 'http://localhost:3000'

    const [currentStatus, setCurrentStatus] = useState(task.status)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditTask = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdateTask = (updatedTask) => {

        console.log("Updated Task:", updatedTask);
        
        // Fetch updated tasks
        // fetchEmployeeTasks();
    };


    async function handleUpdateStatus() {
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
            <p>Estimated Duration: {task.estimated_duration} {task.estimated_duration === 1 ? 'hour' : 'hours'}</p>
            <br />

            <form onSubmit={handleUpdateStatus}>
                <label htmlFor="status">Update Status:</label>
                <select id="status" name="status" value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)}>
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                </select>
                <button>Update</button>
            </form>
            <button onClick={handleEditTask}>Edit Task</button>
            {isModalOpen && (
                <EditTaskModal
                    taskToEdit={task}
                    onUpdateTask={handleUpdateTask}
                    onCloseModal={handleCloseModal}
                />
            )}
        </div>
    )
}

export default TaskItem;