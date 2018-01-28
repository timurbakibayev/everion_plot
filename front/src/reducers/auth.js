import {combineReducers} from 'redux';
import * as actions from '../actionTypes';


function loginReducer(state = [], action) {
    switch (action.type) {
        case actions.LOGIN_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isAuthenticated: false,
                user: action.creds
            });
        case actions.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isAuthenticated: true,
                errorMessage: '',
                user: action.creds,
                token: action.token.token,
                role: action.token.role,
                is_staff: action.token.is_staff,
            });
        case actions.LOGIN_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                isAuthenticated: false,
                user: '',
                errorMessage: action.errorMessage
            });
        case actions.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isAuthenticated: false,
                user: '',
                token: '',
            });
        default:
            return state
    }
}

const authReducer = combineReducers({
    auth: loginReducer,
});

export default authReducer;