import {combineReducers} from 'redux';
import * as actions from '../actionTypes';


const patientsListReducer = (state = [], action) => {
    switch (action.type) {
        case actions.ACTION_PATIENTS_CLEAR:
            return [];
        case actions.ACTION_PATIENTS_LOADED:
            return action.data;
        default:
            return state;
    }
};


const currentPatientReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ACTION_PATIENTS_CLEAR:
            return {};
        case actions.ACTION_PATIENT1_STARTED_LOADING:
        case actions.ACTION_PATIENT1_FAILED_TO_LOAD:
            return {};
        case actions.ACTION_PATIENT1_LOADED:
            return action.data;
        default:
            return state;
    }
};

const newPatientReducer = (state = [], action) => {
    switch (action.type) {
        case actions.ACTION_NEW_PATIENT_READY_TO_CREATE:
            return action.data;
        default:
            return state;
    }
};



const createdPatientReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ACTION_NEW_PATIENT_CREATING:
        case actions.ACTION_NEW_PATIENT_READY_TO_CREATE:
            return {};
        case actions.ACTION_NEW_PATIENT_CREATED:
            return action.data;
        default:
            return state;
    }
};


const closedPatientReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ACTION_PATIENT_CLOSING:
            return {};
        case actions.ACTION_PATIENT_CLOSED:
            return action.data;
        default:
            return state;
    }
};

const forwardedPatientReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ACTION_PATIENT_FORWARDING:
        case actions.ACTION_NEW_PATIENT_READY_TO_CREATE:
            return {};
        case actions.ACTION_PATIENT_FORWARDED:
            return action.data;
        default:
            return state;
    }
};

const isCreatingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_NEW_PATIENT_CREATING:
            return true;
        case actions.ACTION_NEW_PATIENT_CREATED:
        case actions.ACTION_NEW_PATIENT_READY_TO_CREATE:
        case actions.ACTION_NEW_PATIENT_FAILED_TO_CREATE:
            return false;
        default:
            return state;
    }
};


const isForwardingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_PATIENT_FORWARDING:
            return true;
        case actions.ACTION_PATIENT_FAILED_TO_FORWARD:
        case actions.ACTION_PATIENT_FORWARDED:
            return false;
        default:
            return state;
    }
};

const isClosingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_PATIENT_CLOSING:
            return true;
        case actions.ACTION_PATIENT_FAILED_TO_CLOSE:
        case actions.ACTION_PATIENT_CLOSED:
            return false;
        default:
            return state;
    }
};

const isLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_PATIENTS_STARTED_LOADING:
            return true;
        case actions.ACTION_PATIENTS_LOADED:
        case actions.ACTION_PATIENTS_FAILED_TO_LOAD:
            return false;
        default:
            return state;
    }
};

const isLoadingCurrentPatientReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_PATIENT1_STARTED_LOADING:
            return true;
        case actions.ACTION_PATIENT1_LOADED:
        case actions.ACTION_PATIENT1_FAILED_TO_LOAD:
            return false;
        default:
            return state;
    }
};

const isPreparingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_NEW_PATIENT_PREPARING:
            return true;
        case actions.ACTION_NEW_PATIENT_FAILED_TO_PREPARE:
        case actions.ACTION_NEW_PATIENT_READY_TO_CREATE:
            return false;
        default:
            return state;
    }
};

const errorMessageReducer = (state = "", action) => {
    switch (action.type) {
        case actions.ACTION_NEW_PATIENT_FAILED_TO_PREPARE:
        case actions.ACTION_PATIENT_FAILED_TO_FORWARD:
        case actions.ACTION_NEW_PATIENT_FAILED_TO_CREATE:
        case actions.ACTION_PATIENTS_FAILED_TO_LOAD:
        case actions.ACTION_PATIENT_FAILED_TO_CLOSE:
            return action.data;
        case actions.ACTION_PATIENT_FORWARDING:
        case actions.ACTION_PATIENTS_STARTED_LOADING:
        case actions.ACTION_NEW_PATIENT_CREATING:
        case actions.ACTION_PATIENT_CLOSING:
            return "";
        default:
            return state;
    }
};

const filterReducer = (state = "", action) => {
    switch (action.type) {
        case actions.ACTION_PATIENTS_FILTER_BY_TYPE:
            return action.filterType;
        default:
            return state;
    }
};

const filterByTextReducer = (state = "", action) => {
    switch (action.type) {
        case actions.ACTION_PATIENTS_FILTER_BY_TEXT:
            return action.filterText;
        default:
            return state;
    }
};

const patientsReducer = combineReducers({
    list: patientsListReducer,
    isLoading: isLoadingReducer,
    isLoadingCurrentPatient: isLoadingCurrentPatientReducer,
    currentPatient: currentPatientReducer,
    errorMessage: errorMessageReducer,
    filter: filterReducer,
    filterByText: filterByTextReducer,
});

export default patientsReducer;