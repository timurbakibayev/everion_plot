import { URL } from './url'

export const uploadFile = (patientNo, file, token) => {
    return fetch(
        `${URL}api/patients/${patientNo}/files/upload/${file.name}`,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': file.type,
                'Authorization': `JWT ${ token }`
            },
            body: file,
        }
    )
};