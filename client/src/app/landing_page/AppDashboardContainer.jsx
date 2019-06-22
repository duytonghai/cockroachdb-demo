import { connect } from 'react-redux'
import camelCase from 'lodash/camelCase'
import reduce from 'lodash/reduce'
import get from 'lodash/get'

import AppDashboard from './AppDashboard'

export const mapStateToProps = (state, ownProps) => {
  const { view } = ownProps.match.params

  const activeView = camelCase(view)

  return Object.assign({}, ownProps, {
    activeView
  })
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDashboard)
