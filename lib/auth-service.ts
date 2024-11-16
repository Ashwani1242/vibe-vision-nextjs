// src/services/authService.ts
import axios from 'axios';
import { setToken, removeToken } from './token-manager';
import { BASE_URL } from '@/config';

// const BASE_URL = 'http://localhost:8000'; // Your backend URL

export const login = async (
    data: { email: string; password: string },
    setToastMessage: Function,
    showToast: Function
) => {
    try {
        const url = `${BASE_URL}/api/auth/login`;
        const response = await axios.post(url, data);
        const { jwtToken, name, email } = response.data;

        setToken(jwtToken);

        setToastMessage('Logged in successfully!');
        showToast();
        window.location.href = "/entertainment-hub";
    } catch (error) {
        console.error(error);
        setToastMessage('Invalid email or password!');
        showToast();
    }
};

export const signup = async (
    data: { firstName: string; lastName: string; email: string; password: string },
    setToastMessage: Function,
    showToast: Function
) => {
    try {
        const url = `${BASE_URL}/api/auth/signup`;
        await axios.post(url, {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            password: data.password,
        });

        setToastMessage('Account created successfully! Please check your email to verify your account.');
        showToast();
        window.location.href = "/login";
    } catch (error) {
        console.error(error);
        setToastMessage('Something went wrong. Please try again.');
        showToast();
    }
};

// Function to handle Google OAuth login
export const googleLogin = () => {
    window.location.href = `${BASE_URL}/api/auth/google`;
};

// Function to handle logout
export const logout = () => {
    removeToken();
    window.location.href = '/'; // Redirect to login page
};
