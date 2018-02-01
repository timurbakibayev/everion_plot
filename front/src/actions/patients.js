import * as actionTypes from '../actionTypes';
import * as api from '../api/patientsApi';

export const refreshPatients = (filter, startFrom = 0) => async (dispatch, getState) => {
    if (getState().patients.isLoading) {
        return Promise.resolve();
    }

    dispatch({
        type: actionTypes.ACTION_PATIENTS_STARTED_LOADING
    });

    try {
        const response = await api.loadPatients(filter, startFrom, getState().auth.auth.token);
        const text = await response.text();
        console.log("trying to parse list...", response);
        if (response.status === 200) {
            dispatch({
                type: actionTypes.ACTION_PATIENTS_LOADED,
                data: JSON.parse(text),
            });
        } else if (response.status === 401) {
            dispatch({
                type: actionTypes.ACTION_PATIENTS_FAILED_TO_LOAD,
                data: getState().settings.list.language === "russian"?"Ошибка авторизации":"Please, authenticate",
            })
        } else {
                dispatch({
                    type: actionTypes.ACTION_PATIENTS_FAILED_TO_LOAD,
                    data: JSON.parse(text).detail
                })
        }
    } catch (error) {
        console.log(actionTypes.ACTION_PATIENTS_FAILED_TO_LOAD);
        dispatch({
            type: actionTypes.ACTION_PATIENTS_FAILED_TO_LOAD,
            data: error.message
        });
    }

    return Promise.resolve();
};


export const loadCurrentPatient = (id) => async (dispatch, getState) => {
    if (getState().patients.isLoadingCurrentPatient) {
        return Promise.resolve();
    }

    dispatch({
        type: actionTypes.ACTION_PATIENT1_STARTED_LOADING
    });

    try {
        const response = await api.loadCurrentPatient(id, getState().auth.auth.token);
        const text = await response.text();
        console.log("trying to parse 1 patient...", response);
        if (response.status === 200) {
            dispatch({
                type: actionTypes.ACTION_PATIENT1_LOADED,
                data: JSON.parse(text),
            });
        } else if (response.status === 401) {
            dispatch({
                type: actionTypes.ACTION_PATIENT1_FAILED_TO_LOAD,
                data: getState().settings.list.language === "russian"?"Ошибка авторизации":"Please, authenticate",
            })
        } else {
            dispatch({
                type: actionTypes.ACTION_PATIENT1_FAILED_TO_LOAD,
                data: JSON.parse(text).detail
            })
        }
    } catch (error) {
        console.log(actionTypes.ACTION_PATIENT1_FAILED_TO_LOAD);
        dispatch({
            type: actionTypes.ACTION_PATIENT1_FAILED_TO_LOAD,
            data: error.message
        });
    }

    return Promise.resolve();
};


export const putCurrentPatient = (body) => async (dispatch, getState) => {

    dispatch({
        type: actionTypes.ACTION_PATIENT1_STARTED_LOADING
    });

    try {
        const response = await api.putCurrentPatient(getState().patients.currentPatient.id, body, getState().auth.auth.token);
        const text = await response.text();
        console.log("trying to parse 1 patient...", response);
        if (response.status === 200) {
            dispatch({
                type: actionTypes.ACTION_PATIENT1_LOADED,
                data: JSON.parse(text),
            });
        } else if (response.status === 401) {
            dispatch({
                type: actionTypes.ACTION_PATIENT1_FAILED_TO_LOAD,
                data: getState().settings.list.language === "russian"?"Ошибка авторизации":"Please, authenticate",
            })
        } else {
            dispatch({
                type: actionTypes.ACTION_PATIENT1_FAILED_TO_LOAD,
                data: JSON.parse(text).detail
            })
        }
    } catch (error) {
        console.log(actionTypes.ACTION_PATIENT1_FAILED_TO_LOAD);
        dispatch({
            type: actionTypes.ACTION_PATIENT1_FAILED_TO_LOAD,
            data: error.message
        });
    }

    return Promise.resolve();
};
