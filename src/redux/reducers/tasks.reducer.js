import { combineReducers } from "redux";

const singleProjectTasks = (state = [], action) => {
    if (action.type === 'SET_PROJECT_TASKS') {
        return action.payload;
    }
    return state;
}
const employeeTasks = (state = [], action) => {
    if (action.type === 'SET_EMPLOYEE_TASKS') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    singleProjectTasks,
    employeeTasks
});