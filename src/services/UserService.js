const axios = require('axios');
const base_url = 'http://localhost:3000/api/'
export async function getAllUsers() {
    try {
        const response = await axios.get(base_url + 'users');
        return response.data;
    } catch (error) {
        return [];
    }
}
export async function editUser(data) {
    try {
        const response = await axios.put(base_url + 'edit', { ...data });
        return response.data;
    } catch (error) {
        return [];
    }
}
export async function insertUsers() {
    try {
        const response = await axios.post(base_url + 'insert', {});
        return response.data;
    } catch (error) {
        return [];
    }
}