import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

// Create a secure Axios instance
export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000' // Make sure this matches your backend URL
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = UseAuth();

    // Request interceptor to add the Authorization header for secure API calls
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        // Handle request errors
        return Promise.reject(error);
    });

    // Response interceptor to handle 401 and 403 errors
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            // Logout the user and navigate to login page on unauthorized errors
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;
