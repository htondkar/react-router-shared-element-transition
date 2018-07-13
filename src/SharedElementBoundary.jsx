import React, { Component } from 'react'
import { TransitionConsumer } from './TransitionContext'

class SharedElementBoundary extends Component {
  constructor(props) {
    super(props)
    this.sharedElement = React.createRef()
  }

  onClickHandler = context => event => {
    const innerSharedElement = this.sharedElement.current.querySelector(
      '[data-shared-element]'
    )

    if (!innerSharedElement) return

    context.setSharedElementData({
      node: this.sharedElement.current
        .querySelector('[data-shared-element]')
        .cloneNode(true),
      boundingRect: innerSharedElement.getBoundingClientRect(),
    })
  }

  render() {
    return (
      <TransitionConsumer>
        {transitionContext => (
          <div onClick={this.onClickHandler(transitionContext)} ref={this.sharedElement}>
            {this.props.children}
          </div>
        )}
      </TransitionConsumer>
    )
  }
}

export default SharedElementBoundary
