import { combineReducers } from 'redux';
import * as actions from '../actionTypes';


const readingsListReducer = (state = [  ], action) => {
    switch (action.type) {
        case actions.ACTION_READINGS_STARTED_LOADING:
            return [];
        case actions.ACTION_READINGS_LOADED:
            return action.data.sort((a,b) => {
                return a.time_iso > b.time_iso?1:-1
            });
        default:
            return state;
    }
};


const isLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_READINGS_STARTED_LOADING:
            return true;
        case actions.ACTION_READINGS_LOADED:
        case actions.ACTION_READINGS_FAILED_TO_LOAD:
            return false;
        default:
            return state;
    }
};

const errorMessageReducer = (state = "", action) => {
    switch (action.type) {
        case actions.ACTION_READINGS_FAILED_TO_LOAD:
            return action.data;
        case actions.ACTION_READINGS_STARTED_LOADING:
            return "";
        default:
            return state;
    }
};

const readingsReducer = combineReducers({
    list: readingsListReducer,
    isLoading: isLoadingReducer,
    errorMessage: errorMessageReducer,
});

export default readingsReducer;