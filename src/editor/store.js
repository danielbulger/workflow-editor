const state = {
  selectedNode: undefined,
  selectedNodeOffset: {
    x: 0,
    y: 0,
  },
};

const getters = {
  /**
   * Check if there is a currently selected Node.
   * @param {Object<String|Object>} state
   * @return {function(): boolean}
   */
  hasSelectedNode: (state) => () => {
    return state.selectedNode !== undefined;
  },
  /**
   * Get the currently selected Node id if one exists, otherwise undefined.
   * @param {Object<String|Object>} state
   * @return {function(): Number|undefined}
   */
  getSelectedNode: (state) => () => {
    return state.selectedNode;
  },
  /**
   * Get the current movement offset.
   * @param {Object<String|Object>} state
   * @return {function(): {x: number, y: number}}
   */
  getSelectedNodeMovementOffset: (state) => () => {
    return state.selectedNodeOffset;
  },
};

const actions = {};

const mutations = {
  /**
   * Set the currently selected node to the id given in the payload.
   * @param {Object<String|Object>} state
   * @param payload {{id: Number, offset: {x: Number, y: Number}}}
   */
  setSelectedNode(state, payload) {
    state.selectedNode = payload.id;
    state.selectedNodeOffset = {
      x: -payload.offset.x,
      y: -payload.offset.y,
    };
  },
  /**
   * Clear the selected Node and the offset positions.
   * @param {Object<String|Object>} state
   */
  clearSelectedNode(state) {
    state.selectedNode = undefined;
    state.selectedNodeOffset.x = state.selectedNodeOffset.y = 0;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};