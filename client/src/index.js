// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './app/App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA

/* globals HTMLElement */

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import appReducer from './app/landing_page/reducer'

import App from './app/App'

export function BlogDashboard (props = {}, elementId = 'root') {
  const element = document.getElementById(elementId)

  if (element instanceof HTMLElement) {
    // Create logger which can transform Immutable state
    const stateTransformer = state => {
      return Immutable.Iterable.isIterable(state) ? state.toJS() : state
    }
    const logger = createLogger({ stateTransformer })

    // Support for Redux DevTools Extension
    const composeEnhancers =
      typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          serialize: {
            immutable: Immutable
          }
        })
        : compose

    const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk, logger)))

    if (window && !window.UNIFIED_LOCAL_DEV) console.log('[render] blog...', props)

    return ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <App {...props} />
        </Provider>
      </AppContainer>,
      element
    )
  } else {
    throw new Error(`No HTML element found with ID "${elementId}"`)
  }
}

BlogDashboard();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
