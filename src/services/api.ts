import axios from 'axios';

import {
  user,
  admin,
  global,
  AdminType,
  GlobalType,
  UserType
} from './app_api';

export const baseApi = axios.create({
  baseURL: 'https://slinked-test.herokuapp.com',
});

export const slinkedApiToken = '@slinked:token';

export const localStorageToken = localStorage.getItem(slinkedApiToken);

baseApi.defaults.headers.common['Authorization'] = `Bearer ${localStorageToken}`;

export const api = {
  admin,
  user,
  global
};

export {
  AdminType,
  GlobalType,
  UserType
}