import { useState } from "react";

function AddTasksForm() {
    const urlBase = 'http://localhost:3000'

    const [taskNameInput, setTaskNameInput] = useState("");

    const addNewTask = async () => {
        event.preventDefault();

        const taskObject = {
            description: taskNameInput,
            // still need to add other data
        };

        console.log('project to be sent:', taskObject);

        // try {
        //     const response = await fetch(`${urlBase}/api/tasks`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(taskObject),
        //     });

        //     if (response.ok) {
        //         console.log('Task successfully added!');
        //     } else {
        //         console.error('You failed at adding a task!');
        //     }
        // } catch (error) {
        //     console.error('Error while sending data:', error);
        // }
    };

    return (
        <div className='project-form'>
            <form>
                <label htmlFor="task name">
                    <input
                        type='text'
                        name='task'
                        value={taskNameInput}
                        onChange={(event) => setTaskNameInput(event.target.value)}
                    />
                    <button onClick={() => addNewTask()}>
                        Add New Task
                    </button>
                </label>
            </form>
        </div>
    )
};

export default AddTasksForm;