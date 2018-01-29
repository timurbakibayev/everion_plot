import { URL } from './url'

export const loadReadings = (patient_id, token) => {
    return fetch(
        `${URL}api/patients/${patient_id}/readings/`,
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