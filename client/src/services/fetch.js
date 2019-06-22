/**
 * This module wraps the github/fetch polyfill in a CommonJS module for browserification,
 * and avoids appending anything to the window,
 * instead returning a setup function when fetch-ponyfill is required.
 *
 * https://github.com/qubyte/fetch-ponyfill
 */

const { fetch, Request, Response, Headers } = require('fetch-ponyfill')({
  Promise
});

export {
  fetch,
  Request,
  Response,
  Headers
};
