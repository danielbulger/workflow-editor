const state = {
  ports: {
    1: {
      name: 'Input',
      type: 'Boolean',
    },
    2: {
      name: 'True',
      type: 'Boolean',
    },
    3: {
      name: 'False',
      type: 'Boolean',
    },
  },
};

const getters = {
  /**
   * Get all the registered Ports
   * @param {Object<String|Object>} state
   * @return {Object<Number|Object>}
   */
  getPorts: (state) => () => {
    return state.ports;
  },
  /**
   * Get a specific port by the given id. If a port with the id does not exist
   * this will return undefined.
   * @param {Object<String|Object>} state
   * @return {Object|undefined}
   */
  getPortById: (state) => (id) => {
    return state.ports[id];
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