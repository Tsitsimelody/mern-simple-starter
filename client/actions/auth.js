import axios from 'axios';
import cookie from 'react-cookie';
import { API_URL, CLIENT_ROOT_URL, errorHandler } from './index';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, PROTECTED_TEST } from './types';

//= ===============================
// Authentication actions
//= ===============================

// TO-DO: Add expiration to cookie
export function loginUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/login`, { email, password })
    .then((response) => {
      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = `${CLIENT_ROOT_URL}/account`;
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function registerUser({ email, firstName, lastName, password, username, imageUrl, age, sex, city, about, dob }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password, username, imageUrl, age, sex, city, about, dob })
    .then((response) => {
      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = `${CLIENT_ROOT_URL}/account`;
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function uploadImage(file){
  return function (dispatch) {
    axios.get('/upload', {
      params: {
        filename: file.name,
        filetype: file.type
      }
    }).then(res => {
      const options = {
        headers: {
          'Content-Type': file.type
        }
      };
      return axios.put(res.data.url, file, options);
    }).then(res => {
      const {name} = res.config.data;
      return {
        name,
        url: `https://zimelites.s3.amazonaws.com/${file.name}`
      };
      dispatch({ type: 'UPLOAD_IMAGE' });
    });
  }
}

export function logoutUser(error) {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });

    window.location.href = `${CLIENT_ROOT_URL}/login`;
  };
}

export function protectedTest() {
  return function (dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: { Authorization: cookie.load('token') },
    })
    .then((response) => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}
