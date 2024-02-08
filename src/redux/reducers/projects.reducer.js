import { combineReducers } from "redux";

const allProjects = (state = [], action) => {
    if (action.type === 'SET_ALL_PROJECTS') {
        return action.payload;
    }
    return state;
}
const oneProject = (state = {}, action) => {
    if (action.type === 'SET_ONE_PROJECT') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    allProjects,
    oneProject
});