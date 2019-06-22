import Immutable from 'immutable'

import * as actionTypes from './actionConstants'

const initialState = Immutable.fromJS({
  isLoaded: false,
  productList: [],
  metaProductList: {}
})

export default function productReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_LIST:

      if (action.data) {
        state = state.updateIn(['productList'], productList => productList.concat(Immutable.fromJS(action.data)))
      }

      state = state
        .set('isLoaded', true)
        .set('metaProductList', action.meta)

      break

    default:
      break
  }

  return state
}
