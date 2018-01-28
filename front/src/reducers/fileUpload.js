import { combineReducers } from 'redux';
import * as actions from '../actionTypes';


const isUploadingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_FILE_STARTED_UPLOADING:
            return true;
        case actions.ACTION_FILE_UPLOADED:
        case actions.ACTION_FILE_FAILED_TO_UPLOAD:
            return false;
        default:
            return state;
    }
};

const errorMessageReducer = (state = "", action) => {
    switch (action.type) {
        case actions.ACTION_FILE_FAILED_TO_UPLOAD:
            return action.data;
        case actions.ACTION_FILE_STARTED_UPLOADING:
            return "";
        default:
            return state;
    }
};

const fileUploadReducer = combineReducers({
    isUploading: isUploadingReducer,
    errorMessage: errorMessageReducer,
});

export default fileUploadReducer;