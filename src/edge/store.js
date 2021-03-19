const state = {
  edges: {
    1: {
      from: 3,
      to: 4,
    },
  },
};

const getters = {

  /**
   * Get the Edge by the given id if it exists, otherwise undefined.
   * @param state
   * @return {undefined|function(string|number): *}
   */
  getEdgeById: (state) => (id) => {
    return state.edges[id];
  },

  /**
   * Get all the Edges
   * @param state
   * @return {function(): Object}}
   */
  getEdges: (state) => () => {
    return state.edges;
  },
};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};