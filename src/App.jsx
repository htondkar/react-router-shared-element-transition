import React, { Component } from 'react'

import { Route, Switch, withRouter } from 'react-router'

import HomePage from './HomePage'
import ListPage from './ListPage'
import SinglePage from './SinglePage'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './App.css'
import { Consumer } from '.'

class App extends Component {
  onEnter = transitionContext => node => {
    transitionContext.setTheEntringNode(node)
  }

  onExist = transitionContext => node => {
    transitionContext.setTheExitingNode(node)
  }

  render() {
    return (
      <Consumer>
        {transitionContext => (
          <div className="App">
            <TransitionGroup component={null}>
              <CSSTransition
                key={this.props.location.key}
                timeout={1000}
                classNames="fade"
                onEnter={this.onEnter(transitionContext)}
                onExit={this.onExist(transitionContext)}
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
      </Consumer>
    )
  }
}

export default withRouter(App)
