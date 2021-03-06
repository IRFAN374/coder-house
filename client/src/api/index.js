import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        'Aceept' : 'application/json',
    }
})


export const sendOtp =(data)=> api.post('/api/send-otp', data);
export const verifyOtp=(data)=> api.post('/api/verify-otp', data);
export const logout = () => api.post('/api/logout');
export const activate=(data)=> api.post('/api/activate',data);


// Interceptors
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    'http://localhost:5000/api/refresh',
                    {
                        withCredentials: true,
                    }
                );

                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);


export default api;