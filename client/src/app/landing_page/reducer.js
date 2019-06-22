/**
 * This file is managed all reducers of out application
 */
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'

import productReducer from './products/reducer'

const dashboardInitialState = Immutable.fromJS({
})

function adminDashboardReducer(state = dashboardInitialState, action = {}) {
  switch (action.type) {
    case 'EXAMPLE':
      break
    default:
      break
  }

  return state
}

export default combineReducers(
  Object.assign({
    dashboard: adminDashboardReducer,
    product: productReducer
  })
)
