import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: "http://localhost:1818/"
})
const UseAxios = () => {
    return axiosSecure;
};

export default UseAxios;