import * as actionTypes from '../actionTypes';
import * as api from '../api/readingsApi';

export const refreshReadings = (orderNo) => async (dispatch, getState) => {
    if (getState().readings.isLoading) {
        //return Promise.resolve();
    }

    dispatch({
        type: actionTypes.ACTION_READINGS_STARTED_LOADING
    });

    try {
        const response = await api.loadReadings(orderNo, getState().auth.auth.token);
        const text = await response.text();
        console.log("Readings: trying to parse list...", response);
        if (response.status === 200) {
            dispatch({
                type: actionTypes.ACTION_READINGS_LOADED,
                data: JSON.parse(text)
            });
        } else if (response.status === 401) {
            dispatch({
                type: actionTypes.ACTION_READINGS_FAILED_TO_LOAD,
                data: getState().settings.list.language === "russian"?"Ошибка авторизации":"Please, authenticate",
            })
        } else {
            dispatch({
                type: actionTypes.ACTION_READINGS_FAILED_TO_LOAD,
                data: JSON.parse(text).detail
            })
        }
    } catch (error) {
        console.log(actionTypes.ACTION_READINGS_FAILED_TO_LOAD);
        dispatch({
            type: actionTypes.ACTION_READINGS_FAILED_TO_LOAD,
            data: error.message
        });
    }

    return Promise.resolve();
};