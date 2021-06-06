import axios from 'axios';
import { BASE_URL } from '../constants/projectSettings';

export const http = async ({
  method = 'get',
  url = '',
  data = {},
  options = {},
}) => {
  try {
    console.log('http', data);
    const auth = JSON.parse(localStorage.getItem('auth'));
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (auth) {
      const { user, token } = auth;
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }
    if (options && options.headers) {
      headers = { ...headers, ...options.headers };
    }
    const res = await axios({
      method,
      url,
      baseURL: BASE_URL,
      data,
      headers: headers,
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
    return res;
  } catch (err) {
    return err;
  }
};
