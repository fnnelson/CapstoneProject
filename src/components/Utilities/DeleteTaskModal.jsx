function DeleteTaskModal({ taskToDelete, onDeleteTask, onCloseDeleteModal }) {

    const handleDeleteTask = () => {
        // calling onDeleteTask function passed from TaskItem
        onDeleteTask(taskToDelete);
        // call function to close modal in TaskItem
        onCloseDeleteModal();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Delete Task</h2>
                <p>Are you sure you want to delete the task: {taskToDelete.description}?</p>
                <button onClick={handleDeleteTask} className='delete-button'>Delete</button>
                <button onClick={onCloseDeleteModal}>Cancel</button>
            </div>
        </div>
    );
}

export default DeleteTaskModal;
