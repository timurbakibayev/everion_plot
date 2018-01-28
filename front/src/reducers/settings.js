import { combineReducers } from 'redux';
import * as actions from '../actionTypes';


const settingsListReducer = (state = [], action) => {
    switch (action.type) {
        case actions.SETTINGS_LOADED:
            return action.data;
        default:
            return state;
    }
};

const isLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.SETTINGS_LOADING:
            return true;
        case actions.SETTINGS_LOADED:
        case actions.SETTINGS_FAILED_TO_LOAD:
            return false;
        default:
            return state;
    }
};

const settingsReducer = combineReducers({
    list: settingsListReducer,
    isLoading: isLoadingReducer,
});

export default settingsReducer;