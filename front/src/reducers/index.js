import { combineReducers } from 'redux';
import patientsReducer from './patients';
import jactionsReducer from './jactions';
import filesReducer from './files';
import fieldsReducer from './fields';
import fileUploadReducer from './fileUpload';
import authReducer from './auth';
import settingsReducer from './settings';

const mainReducer = combineReducers({
    patients: patientsReducer,
    jactions: jactionsReducer,
    fileUpload: fileUploadReducer,
    files: filesReducer,
    fields: fieldsReducer,
    auth: authReducer,
    settings: settingsReducer,
});

export default mainReducer;