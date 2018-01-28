import { combineReducers } from 'redux';
import patientsReducer from './patients';
import readingsReducer from './readings';
import filesReducer from './files';
import fieldsReducer from './fields';
import fileUploadReducer from './fileUpload';
import authReducer from './auth';
import settingsReducer from './settings';

const mainReducer = combineReducers({
    patients: patientsReducer,
    readings: readingsReducer,
    fileUpload: fileUploadReducer,
    files: filesReducer,
    fields: fieldsReducer,
    auth: authReducer,
    settings: settingsReducer,
});

export default mainReducer;