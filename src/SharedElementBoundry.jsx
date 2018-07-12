import { Consumer } from '.'
import React, { Component } from 'react'

class SharedElementBoundry extends Component {
  constructor(props) {
    super(props)
    this.sharedElement = React.createRef()
  }

  onClickHandler = context => event => {
    const innerSharedElement = this.sharedElement.current.querySelector(
      '[data-shared-element]'
    )

    if (!innerSharedElement) return

    context.setSharedElementBoundry(this.sharedElement.current)
    context.setSharedElementBoundryRect(innerSharedElement.getBoundingClientRect())
  }

  render() {
    return (
      <Consumer>
        {transitionContext => (
          <div onClick={this.onClickHandler(transitionContext)} ref={this.sharedElement}>
            {this.props.children}
          </div>
        )}
      </Consumer>
    )
  }
}

export default SharedElementBoundry
