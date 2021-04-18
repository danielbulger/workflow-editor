import Vue from 'vue';

const state = {
  ports: {
    1: {
      parentId: 1,
      name: 'Input',
      type: 'Boolean',
    },
    2: {
      parentId: 1,
      name: 'True',
      type: 'Boolean',
    },
    3: {
      parentId: 1,
      name: 'False',
      type: 'Boolean',
    },
    4: {
      parentId: 2,
      name: 'Input',
      type: 'Boolean',
    },
    5: {
      parentId: 2,
      name: 'True',
      type: 'Boolean',
    },
    6: {
      parentId: 2,
      name: 'False',
      type: 'Boolean',
    },
  },
};

const getters = {
  /**
   * Get all the registered Ports
   * @param {Object} state
   * @return {function(): Object<number|Object>}
   */
  getPorts: (state) => () => {
    return state.ports;
  },
  /**
   * Get a specific port by the given id. If a port with the id does not exist
   * this will return undefined.
   * @param {Object} state
   * @return {function(number): Object|undefined}
   */
  getPortById: (state) => (id) => {
    return state.ports[id];
  },

  /**
   * Checks to see if all the ports id given are from the same parent
   * @param {Object} state
   * @return {function(...[string]): boolean}
   */
  isSibling: (state) => (...ports) => {
    for (let i = 0; i < ports.length - 1; ++i) {
      if (state.ports[ports[i]].parentId !==
        state.ports[ports[i + 1]].parentId) {
        return false;
      }
    }
    return true;
  },
};

const actions = {};

const mutations = {
  /**
   * Set the position of the port anchor relative to the viewport
   * @param {Object} state
   * @param payload {{id: string, position: {x: number, y: number}}}
   */
  setPosition(state, payload) {
    Vue.set(state.ports[payload.id], 'position', {
      x: payload.position.x,
      y: payload.position.y,
    });
  },

  addPorts(state, {ports}) {
    for (let portKey in ports) {
      if (ports.hasOwnProperty(portKey)) {
        Vue.set(state.ports, portKey, ports[portKey]);
      }
    }
  },

  deletePortsById(state, {portIds}) {
    for (let portKey in portIds) {
      if (portIds.hasOwnProperty(portKey)) {
        Vue.delete(state.ports, portKey);
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