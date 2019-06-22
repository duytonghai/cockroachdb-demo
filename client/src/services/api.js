/**
 * This file will be general api to use for fetching API from server
 */
import { fetch } from './fetch';

import {
  errorCode, REQUEST_TIMEOUT
} from '../constants.js';

export const CONTENT_TYPE = {
  // for used as enum only should not be used in real request because form-data type should be auto added by browser
  form: 'multipart/form-data',
  json: 'application/json'
}

export function request(endpoint, { method, data }, paramInHeader = false, contentType = CONTENT_TYPE.json) {
  const init = {
    headers: {},
    method: method
  };

  const isQuery = ['GET', 'DELETE'].includes(method);
  // const token = Auth.getToken(); // TDB
  const token = undefined;

  if (paramInHeader) {
    for (let [key, value] of Object.entries(data)) {
      init.headers[key] = value
    }
  } else if (contentType === CONTENT_TYPE.json) {
    init.body = !isQuery ? JSON.stringify(data) : undefined;
  } else {
    init.body = data;
  }

  init.headers['X-Security-Token'] = token ? `${token}` : undefined;
  if (contentType !== CONTENT_TYPE.form) {
    init.headers['Content-Type'] = CONTENT_TYPE.json
  }

  const serializedData = serialize(data);
  let url = endpoint
  if (isQuery && serializedData) {
    url += `?${serializedData}`
  }

  return timeout(REQUEST_TIMEOUT, fetch(url, init))
    .then(checkStatus);
}

function timeout(ms, promise) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error("Timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

function checkStatus(response) {
  const { status } = response;
  if (status >= 200 && status < 300) {
    if (response.headers.get('X-Security-Token')) {
      return {
        token: response.headers.get('X-Security-Token'),
        user: response.headers.get('x-user-profile')
      };
    }
    return response.text().then(data => {
      return data ? JSON.parse(data) : {};
    });
  } else {
    return response.text().then(data => {
      let responseText = (data === undefined || data === '') ? '{}' : data;
      handleError(JSON.parse(responseText), response);
    });
  }
}

function handleError(errorData, response) {
  const { message, code } = errorData;

  let text = response.statusText;
  let statusCode = (code === undefined) ? response.status : code;

  switch (statusCode) {
    case errorCode.TOKEN_EXPIRED:
    case errorCode.TOKEN_INVALID:
      handleTokenExpiredOrInvalid(response);
      break;
    default:
      if (typeof message === 'string') text = message;
  }

  const error = new Error(text);
  error.response = response;
  error.data = errorData;

  throw error;
}

function handleTokenExpiredOrInvalid(response) {
  // skip login request
  if (response.url && response.url.indexOf('/login') !== -1) {
    return;
  }

  // Auth.clear();
  const currentUrl = window.location.href;
  if (currentUrl.indexOf('staff') !== -1) {
    //push('/admin');
    window.location.href = '/staff'; // go to admin login page and reload
  } else {
    //push('/');
    window.location.href = '/'; // go to home page and reload
  }
}

function serialize(obj, prefix) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      if (typeof obj[p] === 'undefined') continue;
      var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
      str.push(typeof v === 'object' ?
        serialize(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }
  return str.join('&');
}
