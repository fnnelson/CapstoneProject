import { combineReducers } from "redux";

const allTasks = (state = [], action) => {
    if (action.type === 'SET_PROJECT_TASKS') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    allTasks,
});