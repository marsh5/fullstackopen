import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getPersons = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newObj => {
    const request = axios.post(baseUrl, newObj);
    return request.then(response => response.data)
}

const update = (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, person);
    return request.then(response => response.data);
}

const deletePerson = (id, person) => {
    const request = axios.delete(`${baseUrl}/${id}`, person);
    return request.then();

}

export default { getPersons, create, update, deletePerson }