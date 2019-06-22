import config from '../config';

import { request } from '../services/api';

import * as myself from './products';
export default myself;

const baseEndpoint = `${config.apiBaseURL}/products`;

export function search(params) {
  const endpoint = `${baseEndpoint}`;
  return request(endpoint, {
    method: 'GET',
    data: params
  });
}

export function get(id) {
  const endpoint = `${baseEndpoint}/${id}`;
  return request(endpoint, {
    method: 'GET'
  });
}

export function update(id, data) {
  const endpoint = `${baseEndpoint}/${id}`;
  return request(endpoint, {
    method: 'PATCH',
    data
  });
}
