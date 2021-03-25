import axios from 'axios';

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

const updateNumber = (id, updatedObject) => {
    const itemUrl = `${baseUrl}/${id}`;
    const request = axios.put(itemUrl, updatedObject);
    return request.then(response => response.data);
}

const deleteItem = id => {
    const itemUrl = `${baseUrl}/${id}`;
    return axios.delete(itemUrl);
};




export default { getAll, create, updateNumber, deleteItem };