//
// ─── ANIMATION HELPERS ──────────────────────────────────────────────────────────
//

/**
 * set position of element to a new bounding rect state. but fixed
 * @param {HTMLElement} element
 * @param {object} boundingRect
 * @param {number} boundingRect.left
 * @param {number} boundingRect.top
 * @param {number} durationMS
 */
export const SyncPositionOfElementWithBoundingRect = (
  element,
  { left, top },
  durationMS
) => {
  document.body.style.setProperty('--shared-element-transition-duration', durationMS)

  element.style.position = 'fixed'
  element.style.left = `${left}px`
  element.style.top = `${top}px`
}

/**
 * animate element to a new bounding rect state
 * @param {HTMLElement} element
 *
 */
export const animateElementFromTo = (
  element,
  initialBoundingRect,
  finalBoundingRect,
  durationMS
) => {
  requestAnimationFrame(() => {
    const delta = calculateDelta(initialBoundingRect, finalBoundingRect)

    element.style.boxShadow = '0 0 7px 1px rgba(0, 0, 0, 0.3)'
    element.style.transformOrigin = 'top left'

    element.style.transition = `${durationMS *
      0.7}ms transform cubic-bezier(.61, 0, .01, 1.06)`

    element.style.transform = `
      translate(${delta.deltaX + 6}px, ${delta.deltaY - 2}px)
      scale(${delta.deltaW}, ${delta.deltaH})
      `
  })
}

const calculateDelta = (initial, final) => ({
  deltaX: final.left - initial.left,
  deltaY: final.top - initial.top,
  deltaW: final.width / initial.width,
  deltaH: final.height / initial.height,
})

//
// ─── GENERAL HELPERS ────────────────────────────────────────────────────────────
//

/**
 * @param {HTMLElement} element
 */
export const getLayoutInfoOf = element =>
  element && element instanceof Element ? element.getBoundingClientRect() : null

/**
 * @param {HTMLElement} node
 */
export const findPlaceholderElement = node => {
  if (!node) return null
  return node.querySelector('[data-shared-element-placeholder]')
}

//
// ─── GHOST LAYER HELPERS ────────────────────────────────────────────────────────
//

export const getGhostLayer = () => document.getElementById('shared-element-ghost-layer')

/**
 * @param {HTMLElement} ghostLayer
 */
export const removeGhostLayerContentAfterMS = ghostLayer => {
  while (ghostLayer.firstChild) {
    ghostLayer.removeChild(ghostLayer.firstChild)
  }
}

export const removeScrollBar = () => {
  const { body } = document
  const initialState = body.style.overflow

  body.style.overflow = 'hidden'
  body.style.maxHeight = '100vh'

  return initialState
}

export const setBodyOverFlowStateTo = state => {
  document.body.style.overflow = state
  document.body.style.maxHeight = 'unset'
}

/**
 * @param {HTMLElement} ghostLayer
 * @param {HTMLElement} sharedElementClone
 */
export const append = (ghostLayer, sharedElementClone) =>
  ghostLayer.appendChild(sharedElementClone)
