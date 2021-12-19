import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://serene-savannah-65465.herokuapp.com'
});

export default instance;