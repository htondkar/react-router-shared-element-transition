import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import SharedElementTransitionGhostLayer from './SharedElementTransitionGhostLayer'
import { TransitionProvider, transitionContext } from './TransitionContext'

ReactDOM.render(
  <TransitionProvider value={transitionContext}>
    <SharedElementTransitionGhostLayer />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TransitionProvider>,
  document.getElementById('root')
)
