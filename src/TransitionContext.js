import React from 'react'
import {
  SyncPositionOfElementWithBoundingRect,
  getLayoutInfoOf,
  getGhostLayer,
  removeGhostLayerContentAfterMS,
  append,
  findPlaceholderElement,
  animateElementFromTo,
  removeScrollBar,
  setBodyOverFlowStateTo,
} from './transitionContextHelpers'

/*
  The Process:
    1, get the entering page => find the placeholder and set state.
    2, get the shared element clone => set the state and trigger animation
    3, get the bounding rect data of shared element and apply it to the clone
    4, get the bounding rect data of the placeholder, and transition the clone into that state.
*/

class TransitionContext {
  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  durationMS = 700
  sharedElementClone = null
  placeholderElement = null
  sharedElementInitialBoundingRect = null

  shouldStartAnimation = () =>
    Boolean(
      this.sharedElementClone &&
        this.sharedElementInitialBoundingRect &&
        this.placeholderElement
    )

  //
  // ─── MAIN SETTERS ───────────────────────────────────────────────────────────────
  //

  /**
   * find and set the placeholder element in the new page
   * and sets it in the state.
   * @param {HTMLElement} node - reference to the entering page
   */
  setTheEnteringNode = node => {
    this.placeholderElement = findPlaceholderElement(node)
    this.animateSharedElement()
  }

  /**
   * gets the clone of the shared element and sets it in the state
   * NOTE: this method is called before setTheEnteringNode.
   * @param {Object} obj - An object.
   * @param {HTMLElement} obj.node - clone of the original shared element.
   * @param {object} obj.boundingRect - bounding rect of the original shared element.
   */
  setSharedElementData = ({ node, boundingRect }) => {
    this.sharedElementClone = node
    this.sharedElementInitialBoundingRect = boundingRect
  }

  //
  // ─── ANIMATION ──────────────────────────────────────────────────────────────────
  //

  animateSharedElement = () => {
    if (!this.shouldStartAnimation()) {
      return
    }

    const ghostLayer = getGhostLayer()

    const sharedElement = append(ghostLayer, this.sharedElementClone)

    const finalBoundingRect = getLayoutInfoOf(this.placeholderElement)

    if (!this.sharedElementInitialBoundingRect || !finalBoundingRect) return

    SyncPositionOfElementWithBoundingRect(
      sharedElement,
      this.sharedElementInitialBoundingRect
    )

    const initialOverflowState = removeScrollBar()

    setTimeout(() => {
      removeGhostLayerContentAfterMS(ghostLayer)
      setBodyOverFlowStateTo(initialOverflowState)
    }, this.durationMS)

    animateElementFromTo(
      sharedElement,
      this.sharedElementInitialBoundingRect,
      finalBoundingRect,
      this.durationMS
    )

  }
}

export const transitionContext = new TransitionContext()

export const {
  Provider: TransitionProvider,
  Consumer: TransitionConsumer,
} = React.createContext(transitionContext)
