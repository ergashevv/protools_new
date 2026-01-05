import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for handling API responses
api.interceptors.response.use(
    (response) => {
        // If the response has a 'data' property, return it
        // This ensures backward compatibility with the old API format
        if (response.data && response.data.data !== undefined) {
            return {
                ...response,
                data: {
                    ...response.data,
                    data: response.data.data
                }
            };
        }
        return response;
    },
    (error) => {
        // Handle errors
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default api;
