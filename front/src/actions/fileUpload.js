import * as actionTypes from '../actionTypes';
import * as api from '../api/fileUploadApi';

export const requestUploadFile = (patientNo, file) => async (dispatch, getState) => {
    if (getState().fileUpload.isUploading) {
        return Promise.resolve();
    }

    dispatch({
        type: actionTypes.ACTION_FILE_STARTED_UPLOADING
    });

    try {
        const response = await api.uploadFile(patientNo, file, getState().auth.auth.token);
        const text = await response.text();
        console.log("File Upload: trying to parse response...", response);
        if (response.status === 204) {
            dispatch({
                type: actionTypes.ACTION_FILE_UPLOADED,
                data: ""
            });
        } else if (response.status === 401) {
            dispatch({
                type: actionTypes.ACTION_FILE_FAILED_TO_UPLOAD,
                data: getState().settings.list.language === "russian"?"Ошибка авторизации":"Please, authenticate",
            })
        } else {
            dispatch({
                type: actionTypes.ACTION_FILE_FAILED_TO_UPLOAD,
                data: JSON.parse(text).detail
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.ACTION_FILE_FAILED_TO_UPLOAD,
            data: error.message
        });
    }

    return Promise.resolve();
};