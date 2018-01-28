import { combineReducers } from 'redux';
import * as actions from '../actionTypes';


const jactionsListReducer = (state = [  ], action) => {
    switch (action.type) {
        case actions.ACTION_JACTIONS_LOADED:
            return action.data;
        default:
            return state;
    }
};

const jactionsOrderNoReducer = (state = [  ], action) => {
    switch (action.type) {
        case actions.ACTION_JACTIONS_LOADED:
            return action.orderNo;
        default:
            return state;
    }
};

const isLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_JACTIONS_STARTED_LOADING:
            return true;
        case actions.ACTION_JACTIONS_LOADED:
        case actions.ACTION_JACTIONS_FAILED_TO_LOAD:
            return false;
        default:
            return state;
    }
};

const errorMessageReducer = (state = "", action) => {
    switch (action.type) {
        case actions.ACTION_JACTIONS_FAILED_TO_LOAD:
            return action.data;
        case actions.ACTION_JACTIONS_STARTED_LOADING:
            return "";
        default:
            return state;
    }
};

const jactionsReducer = combineReducers({
    list: jactionsListReducer,
    orderNo: jactionsOrderNoReducer,
    isLoading: isLoadingReducer,
    errorMessage: errorMessageReducer,
});

export default jactionsReducer;