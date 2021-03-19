const state = {
  selectedPort: undefined,
  selectedPortType: undefined,
  selectedNode: undefined,
  selectedNodeOffset: {
    x: 0,
    y: 0,
  },
};

const getters = {
  /**
   * Check if there is a currently selected Node.
   * @param {Object<string|Object>} state
   * @return {function(): boolean}
   */
  hasSelectedNode: (state) => () => {
    return state.selectedNode !== undefined;
  },
  /**
   * Get the currently selected Node id if one exists, otherwise undefined.
   * @param {Object<string|Object>} state
   * @return {function(): number|undefined}
   */
  getSelectedNode: (state) => () => {
    return state.selectedNode;
  },
  /**
   * Get the current movement offset.
   * @param {Object<string|Object>} state
   * @return {function(): {x: number, y: number}}
   */
  getSelectedNodeMovementOffset: (state) => () => {
    return state.selectedNodeOffset;
  },

  /**
   * Whether there is currently a selected port or not.
   * @param {Object<string|Object>} state 
   * @return {function(): boolean}
   */
  hasSelectedPort: (state) => () => {
    return state.selectedPort !== undefined;
  },

  /**
   * Whether the currently selected port matches the id given.
   * @param state
   * @return {function(string): boolean}
   */
  isSelectedPort: (state) => (id) => {
    return state.selectedPort === id;
  },

  /**
   * Get the id of the currently selected port
   * @param state
   * @return {function(): string|undefined}
   */
  getSelectedPort: (state) => () => {
    return state.selectedPort;
  },

  /**
   * Get the direction type of the currently selected port
   * @param state
   * @return {function(): string|undefined}
   */
  getSelectedPortType: (state) => () => {
    return state.selectedPortType;
  },
};

const actions = {};

const mutations = {
  /**
   * Set the currently selected node to the id given in the payload.
   * @param {Object<string|Object>} state
   * @param  {{id: string, offset: {x: number, y: number}}} payload
   */
  setSelectedNode(state, payload) {
    state.selectedNode = payload.id;
    state.selectedNodeOffset = {
      x: payload.offset.x,
      y: -payload.offset.y,
    };
  },
  /**
   * Clear the selected Node and the offset positions.
   * @param {Object<string|Object>} state
   */
  clearSelectedNode(state) {
    state.selectedNode = undefined;
    state.selectedNodeOffset.x = state.selectedNodeOffset.y = 0;
  },

  /**
   * Set the currently selected port to the id given in the payload.
   * @param {Object<string|Object>} state
   * @param {{id: string, type: string, direction: string}} payload
   */
  setSelectedPort(state, payload) {
    if (payload.direction === 'outgoing') {
      state.selectedPort = payload.id;
      state.selectedPortType = payload.type;
    }
  },

  /**
   * Clear the selected Port
   * @param {Object<string|Object>} state
   */
  clearSelectedPort(state) {
    state.selectedPort = undefined;
    state.selectedPortType = undefined;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};