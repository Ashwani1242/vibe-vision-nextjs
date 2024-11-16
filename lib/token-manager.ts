import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { NextPageContext } from 'next';

export const getToken = (ctx?: NextPageContext) => {
  const cookies = parseCookies(ctx);
  return cookies.token || null;
};

export const setToken = (token: string) => {
  setCookie(null, 'token', token, {
    maxAge: 30 * 24 * 60 * 60, 
    path: '/',
    secure: true, 
    sameSite: 'strict', 
  });
};

export const removeToken = () => {
  destroyCookie(null, 'token', { path: '/' });
};

