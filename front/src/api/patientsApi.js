import {URL} from './url'

export const loadPatients = (filter, token) => {
    console.log("Fetching patients");
    return fetch(
        `${URL}api/patients/`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ token }`
            }
        }
    )
};

export const loadCurrentPatient = (id, token) => {
    return fetch(
        `${URL}api/patients/${id}/`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ token }`
            }
        }
    )
};
