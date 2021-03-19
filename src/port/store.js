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
    4: {
      name: 'Input',
      type: 'Boolean',
    },
    5: {
      name: 'True',
      type: 'Boolean',
    },
    6: {
      name: 'False',
      type: 'Boolean',
    },
  },
};

const getters = {
  /**
   * Get all the registered Ports
   * @param {Object<string|Object>} state
   * @return {function(): Object<number|Object>}
   */
  getPorts: (state) => () => {
    return state.ports;
  },
  /**
   * Get a specific port by the given id. If a port with the id does not exist
   * this will return undefined.
   * @param {Object<string|Object>} state
   * @return {function(number): Object|undefined}
   */
  getPortById: (state) => (id) => {
    return state.ports[id];
  },
};

const actions = {};

const mutations = {
  /**
   *
   * @param state
   * @param payload
   */
  setPosition(state, payload) {
    state.ports = {
      ...state.ports,
      [payload.id]: {
        ...state.ports[payload.id],
        position: {
          x: payload.position.x,
          y: payload.position.y,
        }
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};