/**
 * This is is used for store token in the authentication process
 */
import store from 'store';

import * as myself from './auth';
export default myself;

export function save({token, user}) {
  store.set('token', token);
  store.set('user', user);
}

export function clear() {
  store.remove('token');
  store.remove('user');
}

export function get() {
  return {
    token: store.get('token'),
    user: store.get('user')
  };
}

export function getToken() {
  return store.get('token');
}

export function getUser() {
  return store.get('user');
}

export function setUser({user}) {
  store.set('user', user);
}
