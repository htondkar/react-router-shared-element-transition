import React, { Component } from 'react'

import { Route, Switch, withRouter } from 'react-router'

import HomePage from './HomePage'
import ListPage from './ListPage'
import SinglePage from './SinglePage'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './App.css'
import { TransitionConsumer } from './TransitionContext'

class App extends Component {
  onEnter = transitionContext => node => {
    transitionContext.setTheEnteringNode(node)
  }

  render() {
    return (
      <TransitionConsumer>
        {transitionContext => (
          <div className="App">
            <TransitionGroup component={null}>
              <CSSTransition
                key={this.props.location.key}
                timeout={transitionContext.durationMS}
                classNames="fade"
                onEnter={this.onEnter(transitionContext)}
              >
                <Switch location={this.props.location}>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/details/:id" component={SinglePage} />
                  <Route path="/list" component={ListPage} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        )}
      </TransitionConsumer>
    )
  }
}

export default withRouter(App)
