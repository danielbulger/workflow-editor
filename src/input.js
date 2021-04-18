/**
 * Checks whether the mouse event was emitted by a right-click or not.
 * @param {MouseEvent} event The MouseEvent that will be checked
 * @return {boolean} true if the event was right-click, false otherwise.
 */
export function isRightClick(event) {
  return event.buttons === 2;
}