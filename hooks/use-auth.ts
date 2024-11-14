import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

const useAuth = () => {
  const router = useRouter();

  // Function to check if the token is expired
  const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;

    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true; // If decoding fails, consider the token expired
    }
  };

  useEffect(() => {
    // Check if we're running in the browser
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');

    if (isTokenExpired(token) && token) {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('loggedInUserEmail');
      alert('Session expired. Please log in again.');
      router.push('/login'); // Redirect to the login page
    }
  }, [router]); // Run this effect when the router changes
};

export default useAuth;
