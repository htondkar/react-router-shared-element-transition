import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import SharedElementTransitionGhostLayer from './SharedElementTransitionGhostLayer'

class TransitionContext {
  enteringNode = null
  exitingNode = null
  sharedElementBoundry = null
  sharedElement = null
  placeholderElement = null
  sharedElementBoundryRect = null

  setTheEntringNode = node => {
    this.enteringNode = node
    const placeholder = this.findPlaceholderElement()
    this.placeholderElement = placeholder
  }

  setTheExitingNode = node => {
    this.exitingNode = node
    const sharedElement = this.findSharedElement()
    this.sharedElement = sharedElement

    this.animate()
  }

  animate = () => {
    if (!this.shouldStartAnimation()) return
    const ghostLayer = this.getGhostLayer()
    const clonedTransitionedElement = this.cloneCurrentSharedElementOntoGhostLayer(
      ghostLayer
    )
    const boundingRectOfPlaceholder = this.getLayoutInfoOf(this.placeholderElement)

    if (!this.sharedElementBoundryRect || !boundingRectOfPlaceholder) return

    this.SyncPositionOfElementWithBoundingRect(
      clonedTransitionedElement,
      this.sharedElementBoundryRect
    )

    this.removeGhostLayerCotentAfterMS(ghostLayer, 100000)
  }

  SyncPositionOfElementWithBoundingRect = (element, { left, top }) => {
    element.style.position = 'fixed'
    element.style.left = `${left}px`
    element.style.top = `${top}px`
  }

  getLayoutInfoOf = element =>
    element && element instanceof Element ? element.getBoundingClientRect() : null

  removeGhostLayerCotentAfterMS = (ghostLayer, ms) => {
    setTimeout(() => {
      while (ghostLayer.firstChild) {
        ghostLayer.removeChild(ghostLayer.firstChild)
      }
    }, ms)
  }

  shouldStartAnimation = () =>
    Boolean(
      this.sharedElement && this.setSharedElementBoundryRect && this.placeholderElement
    )

  setSharedElementBoundry = node => {
    this.sharedElementBoundry = node
  }

  setSharedElementBoundryRect = data => {
    this.sharedElementBoundryRect = data
  }

  findPlaceholderElement = () => {
    if (!this.enteringNode) return null
    return this.enteringNode.querySelector('[data-shared-element-placeholder]')
  }

  findSharedElement = () => {
    if (!this.sharedElementBoundry) return null
    return this.sharedElementBoundry.querySelector('.shared-element')
  }

  getGhostLayer = () => document.getElementById('shared-element-ghost-layer')

  cloneCurrentSharedElementOntoGhostLayer(ghostLayer) {
    return ghostLayer.appendChild(this.sharedElement.cloneNode(true))
  }
}

const transitionContextInstance = new TransitionContext()

export const { Provider, Consumer } = React.createContext(transitionContextInstance)

ReactDOM.render(
  <Provider value={transitionContextInstance}>
    <SharedElementTransitionGhostLayer />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
