import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    // baseURL: "http://localhost:1818/"
    baseURL: "https://online-ticket-server.vercel.app/"
})
const UseAxios = () => {
    return axiosSecure;
};

export default UseAxios;