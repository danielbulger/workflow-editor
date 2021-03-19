import Vue from 'vue';

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
    2: {
      name: 'If',
      inputs: [4],
      outputs: [5, 6],
      position: {
        x: 400,
        y: 300,
      },
    },
  },
};

const getters = {
  /**
   * Get all the registered Nodes
   * @param {Object<string|Object>} state
   * @return {function(): Object<number|Object>}
   */
  getNodes: (state) => () => {
    return state.nodes;
  },
  /**
   * Get a specific Node by the given id. If a Node with the id does not exist
   * this will return undefined.
   * @param {Object<string|Object>} state
   * @return {function(string): Object|undefined}
   */
  getNodeById: (state) => (id) => {
    return state.nodes[id];
  },

  getNodePosition: (state) => (id) => {
    return state.nodes[id].position;
  },
};

const mutations = {
  /**
   * Move the position of a Node within the editor.
   * @param {Object<string|Object>} state
   * @param {{id: string, position: {x: number, y: number}}} payload
   */
  move(state, payload) {
    Vue.set( state.nodes[payload.id], 'position', {
      x: payload.position.x,
      y: payload.position.y,
    });
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