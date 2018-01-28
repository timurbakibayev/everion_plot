import { combineReducers } from 'redux';
import * as actions from '../actionTypes';

const fieldsListReducer = (state = [], action) => {
    switch (action.type) {
        case actions.ACTION_FIELDS_LOADED:
            return action.data;
        default:
            return state;
    }
};

const updateResultsReducer = (state = [], action) => {
    switch (action.type) {
        case actions.ACTION_FILES_STARTED_LOADING:
        case actions.ACTION_FIELDS_STARTED_UPDATING:
            return [];
        case actions.ACTION_FIELDS_UPDATED:
            return action.data;
        default:
            return state;
    }
};

const fieldsOrderNoReducer = (state = [], action) => {
    switch (action.type) {
        case actions.ACTION_FIELDS_LOADED:
            return action.orderNo;
        default:
            return "";
    }
};

const isLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_FIELDS_STARTED_LOADING:
            return true;
        case actions.ACTION_FIELDS_LOADED:
        case actions.ACTION_FIELDS_FAILED_TO_LOAD:
            return false;
        default:
            return state;
    }
};

const isUpdatingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_FIELDS_STARTED_UPDATING:
            return true;
        case actions.ACTION_FIELDS_UPDATED:
        case actions.ACTION_FIELDS_FAILED_TO_UPDATE:
            return false;
        default:
            return state;
    }
};

const errorMessageReducer = (state = "", action) => {
    switch (action.type) {
        case actions.ACTION_FIELDS_FAILED_TO_LOAD:
            return action.data;
        case actions.ACTION_FIELDS_STARTED_LOADING:
            return "";
        default:
            return state;
    }
};

const fieldsReducer = combineReducers({
    list: fieldsListReducer,
    orderNo: fieldsOrderNoReducer,
    isLoading: isLoadingReducer,
    isUpdating: isUpdatingReducer,
    updateResults: updateResultsReducer,
    errorMessage: errorMessageReducer,
});

export default fieldsReducer;