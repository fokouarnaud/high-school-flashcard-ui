import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://revi-stack.herokuapp.com/'
});


export default instance;