import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        'Aceept' : 'application/json',
    }
})


export const sendOtp =(data)=> api.post('/api/v1/send-otp', data);

export const verifyOtp=(data)=> api.post('/api/v1/verify-otp', data);


export const activate=(data)=> api.post('/api/v1/activate',data);

export default api;