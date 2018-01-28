import { combineReducers } from 'redux';
import * as actions from '../actionTypes';


const filesListReducer = (state = [], action) => {
    switch (action.type) {
        case actions.ACTION_FILES_LOADED:
            return action.data;
        default:
            return state;
    }
};

const filesOrderNoReducer = (state = [], action) => {
    switch (action.type) {
        case actions.ACTION_FILES_LOADED:
            return action.orderNo;
        default:
            return "";
    }
};

const isLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_FILES_STARTED_LOADING:
            return true;
        case actions.ACTION_FILES_LOADED:
        case actions.ACTION_FILES_FAILED_TO_LOAD:
            return false;
        default:
            return state;
    }
};

const errorMessageReducer = (state = "", action) => {
    switch (action.type) {
        case actions.ACTION_FILES_FAILED_TO_LOAD:
            return action.data;
        case actions.ACTION_FILES_STARTED_LOADING:
            return "";
        default:
            return state;
    }
};

const filesReducer = combineReducers({
    list: filesListReducer,
    orderNo: filesOrderNoReducer,
    isLoading: isLoadingReducer,
    errorMessage: errorMessageReducer,
});

export default filesReducer;