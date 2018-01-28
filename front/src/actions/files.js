import * as actionTypes from '../actionTypes';
import * as api from '../api/filesApi';

export const refreshFiles = (patientNo) => async (dispatch, getState) => {

    console.log("Will load files of patient 1", patientNo);

    if (getState().files.isLoading) {
        return Promise.resolve();
    }

    console.log("Will load files of patient 2", patientNo);

    dispatch({
        type: actionTypes.ACTION_FILES_STARTED_LOADING
    });

    try {
        const response = await api.loadFiles(patientNo, getState().auth.auth.token);
        const text = await response.text();
        console.log("Files: trying to parse list...", response);
        if (response.status === 200) {
            dispatch({
                type: actionTypes.ACTION_FILES_LOADED,
                patientNo: patientNo,
                data: JSON.parse(text)
            });
        } else if (response.status === 401) {
            dispatch({
                type: actionTypes.ACTION_FILES_FAILED_TO_LOAD,
                data: getState().settings.list.language === "russian"?"Ошибка авторизации":"Please, authenticate",
            })
        } else {
            dispatch({
                type: actionTypes.ACTION_FILES_FAILED_TO_LOAD,
                data: JSON.parse(text).detail
            })
        }
    } catch (error) {
        console.log(actionTypes.ACTION_FILES_FAILED_TO_LOAD);
        dispatch({
            type: actionTypes.ACTION_FILES_FAILED_TO_LOAD,
            data: error.message
        });
    }

    return Promise.resolve();
};

export const putIntoFile = (patientNo, fileId, body) => async (dispatch, getState) => {

    console.log("Will put into file", patientNo);

    try {
        const response = await api.put(patientNo, fileId, body, getState().auth.auth.token);
    } catch (error) {
        console.log("Error putting into file", error.message);
    }

    return Promise.resolve();
};