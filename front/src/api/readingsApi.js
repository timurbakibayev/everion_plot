import { URL } from './url'

export const loadReadings = (patient_id, token) => {
    var date_from = localStorage.getItem("date_from")?localStorage.getItem("date_from"):"2018-01-20";
    var time_from = localStorage.getItem("time_from")?localStorage.getItem("time_from"):"00:00";
    var date_to = localStorage.getItem("date_to")?localStorage.getItem("date_to"):"2018-02-20";
    var time_to = localStorage.getItem("time_to")?localStorage.getItem("time_to"):"23:59";
    return fetch(
        `${URL}api/patients/${patient_id}/readings/?date_from=${date_from}&date_to=${date_to}&time_from=${time_from}&time_to=${time_to}`,
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