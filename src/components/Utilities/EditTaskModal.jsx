import { useState } from 'react';

function EditTaskModal({ taskToEdit, onUpdateTask, onCloseModal }) {
    const [description, setDescription] = useState(taskToEdit.description);
    const [dueDate, setDueDate] = useState(taskToEdit.due_date);
    const [estimatedDuration, setEstimatedDuration] = useState(taskToEdit.estimated_duration);

    const handleUpdateTask = (event) => {
        event.preventDefault();
        // onUpdateTask was passed from TaskItem as prop
        // it's called to update task with edited details
        // updated object incl all task properties with changes in the desc/duedate/estdur from local state
        onUpdateTask({
            ...taskToEdit, // spread operator to incl all properties of the original task
            description: description, //updated properties
            due_date: dueDate,
            estimated_duration: estimatedDuration
        });
        // calling function (sent from TaskItem) to close modal after task details are updated
        onCloseModal();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Task</h2>
                <form onSubmit={handleUpdateTask}>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="dueDate">Due Date:</label>
                        <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="estimatedDuration">Est Duration (hours):</label>
                        <input type="number" id="estimatedDuration" value={estimatedDuration} onChange={(e) => setEstimatedDuration(e.target.value)} />
                    </div>
                    <button type="submit">Update Task</button>
                    <button onClick={onCloseModal}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditTaskModal;
