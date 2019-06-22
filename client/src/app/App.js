import React from 'react'
import PropTypes from 'prop-types'

import { hot } from 'react-hot-loader'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AppDashboardContainer from './landing_page/AppDashboardContainer'

const renderAppDashboardContainer = props => <AppDashboardContainer {...props} />

function App (props) {
  return (
    <BrowserRouter basename={props.basename}>
      <div>
        <Switch>
          <Route exact path='/' render={renderAppDashboardContainer} />
          <Route path='/app/:view' render={renderAppDashboardContainer} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

App.propTypes = {
  basename: PropTypes.string
}

export default hot(module)(App)
