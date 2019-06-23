import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ProductListContainer from './products/ProductListContainer'

export class AppDashboard extends React.Component {
  componentDidMount () {
  }

  componentDidUpdate (prevProps, prevState) {
  }

  componentWillUnmount () {
  }

  renderDashboard () {
    return (
      <div>
        <h1>App Dashboard</h1>
        <Link to='/app/products'>Products</Link>
      </div>
    )
  }

  renderActiveView () {
    const { activeView } = this.props
    let view

    switch (activeView) {
      case 'products':
        view = <ProductListContainer {...this.props} />
        break

      default:
        view = this.renderDashboard()
        break
    }

    return view
  }

  render () {
    return (
      <div>
        {this.renderActiveView()}
      </div>
    )
  }
}

AppDashboard.propTypes = {
  activeView: PropTypes.string.isRequired
}
AppDashboard.displayName = 'AppDashboard'

export default AppDashboard
