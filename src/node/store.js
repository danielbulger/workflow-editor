const state = {
  nodes: {
    1: {
      name: 'If',
      inputs: [1],
      outputs: [2, 3],
      position: {
        x: 100,
        y: 200,
      },
    },
  },
};

const getters = {
  /**
   * Get all the registered Nodes
   * @param {Object<String|Object>} state
   * @return {Object<Number|Object>}
   */
  getNodes: (state) => () => {
    return state.nodes;
  },
  /**
   * Get a specific Node by the given id. If a Node with the id does not exist
   * this will return undefined.
   * @param {Object<String|Object>} state
   * @return {Object|undefined}
   */
  getNodeById: (state) => (id) => {
    return state.nodes[id];
  },
};

const mutations = {
  /**
   * Move the position of a Node within the editor.
   * @param {Object<String|Object>} state
   * @param {{id: Number, position: {x: Number, y: Number}}} payload
   */
  move(state, payload) {
    state.nodes[payload.id].position = {
      x: payload.position.x,
      y: payload.position.y,
    };
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};