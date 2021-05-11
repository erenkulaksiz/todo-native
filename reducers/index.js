
import { combineReducers } from 'redux';

const INITIAL_STATE = {
    tasks: [],
    edit: {
        editing: false,
        id: 0,
    },
    loading: false,
};

const mainReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            let newState = { ...state };
            newState.tasks.push(addTaskDefault(action.payload));
            return newState
        case 'DEL_TASK':
            let theNewTasks = { ...state };
            theNewTasks.tasks.map(function (key, index) {
                console.log(key);
                if (key.id == action.payload) {
                    theNewTasks.tasks.splice(index, 1);
                }
            })
            console.log(theNewTasks);
            return theNewTasks
        case 'CHANGE_TARGET':
            if (action.payload.target == 'left') {
                state.tasks.map(function (key, index) {
                    if (parseInt(key.id) == action.payload.id) {
                        if (state.tasks[index].taskTarget > 0) {
                            state.tasks[index].taskTarget--;
                        }
                    }
                })
            } else if (action.payload.target == 'right') {
                state.tasks.map(function (key, index) {
                    if (parseInt(key.id) == action.payload.id) {
                        if (state.tasks[index].taskTarget < 2) {
                            state.tasks[index].taskTarget++;
                        }
                    }
                })
            }
            return state
        case 'EDIT_MODE':
            console.log("inside edit mode");
            state.edit.editing = !state.edit.editing;
            state.edit.id = action.payload;
            return state
        case 'EDIT_SUBMIT':
            console.log("state tasks: ", state.tasks);
            if (action.payload.data.title) {
                state.tasks[action.payload.taskIndex].taskName = action.payload.data.title;
                console.log("changed title to: " + action.payload.data.title);
            }
            if (action.payload.data.desc) {
                state.tasks[action.payload.taskIndex].taskDesc = action.payload.data.desc;
                console.log("changed desc to: " + action.payload.data.desc);
            }
            return state
        case 'SET_TASKS':
            state.tasks = action.payload;
            return state
        case 'SET_LOADING':
            state.loading = action.payload;
            console.log("set loading ", action.payload);
            return state
        default:
            return state
    }
};

export default combineReducers({
    reducer: mainReducer
});