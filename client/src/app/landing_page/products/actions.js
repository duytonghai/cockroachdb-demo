import * as API from '../../../api/products';

import * as actionConstants from './actionConstants'

const mockProducts = [
  {id: '1', name: 'Product 1'},
  {id: '2', name: 'Product 2'}
]

export function clearProductList () {
  return {
    type: actionConstants.CLEAR_PRODUCT_LIST
  }
}

export function setProductIsLoaded (data) {
  return {
    data,
    type: actionConstants.SET_IS_PRODUCT_LOADED
  }
}

export function fetchProducts (queryParams = {}) {
  return (dispatch, getState) => {
    return API.search(queryParams)
      .then(response => {
        return {
          data: response,
          type: actionConstants.FETCH_PRODUCT_LIST
        }
      })
      .catch((error) => {
        console.log('>>>>>>>>', error)
        return {
          data: mockProducts,
          meta: {},
          type: actionConstants.FETCH_PRODUCT_LIST
        }
      })
      .then(searchResultAction => {
        dispatch(searchResultAction)
      })
  }
}
