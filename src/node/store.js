import NodeApi from '@/node/api';
import Vue from 'vue';
import {error} from '@/log';

const state = {
  showAddDialog: false,
  showDeleteDialog: false,
  deleteNode: null,
  addNode: {
    x: 0,
    y: 0,
  },
  definitions: {
    'com.workflow.compare.if-0.0.1': {
      name: 'com.workflow.compare.If',
      version: '0.0.1',
      tags: [
        'control flow',
      ],
      description: 'Logical compare',
    },
  },
  nodes: {
    1: {
      name: 'com.workflow.compare.If',
      displayName: 'If',
      inputs: [1],
      outputs: [2, 3],
      position: {
        x: 100,
        y: 200,
      },
    },
    2: {
      name: 'com.workflow.compare.If',
      displayName: 'If',
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

  showAddDialog: (state) => () => {
    return state.showAddDialog;
  },

  showDeleteDialog: (state) => () => {
    return state.showDeleteDialog;
  },

  getSelectedDeleteNode: (state) => () => {
    return state.deleteNode;
  },

  getDefinitions: (state) => () => {
    return state.definitions;
  },
  /**
   * Get all the registered Nodes
   * @param {Object} state
   * @return {function(): Object<number|Object>}
   */
  getNodes: (state) => () => {
    return state.nodes;
  },
  /**
   * Get a specific Node by the given id. If a Node with the id does not exist
   * this will return undefined.
   * @param {Object} state
   * @return {function(string): Object|undefined}
   */
  getNodeById: (state) => (id) => {
    return state.nodes[id];
  },

  /**
   *
   * @param state
   * @return {function(*): *}
   */
  getNodePosition: (state) => (id) => {
    return state.nodes[id].position;
  },
};

const mutations = {
  /**
   * Move the position of a Node within the editor.
   * @param {Object} state
   * @param {{id: string, position: {x: number, y: number}}} payload
   */
  move(state, payload) {
    Vue.set(state.nodes[payload.id], 'position', {
      x: payload.position.x,
      y: payload.position.y,
    });
  },

  addNode(state, {nodeId, node}) {
    Vue.set(state.nodes, nodeId, node);
  },

  showAddDialog(state, {x, y}) {
    state.showAddDialog = true;
    state.addNode = {
      x: x,
      y: y,
    };
  },

  closeAddDialog(state) {
    state.showAddDialog = false;
  },

  closeDeleteDialog(state) {
    state.showDeleteDialog = false;
    state.deleteNode = null;
  },

  showDeleteDialog(state, {id}) {
    state.showDeleteDialog = true;
    state.deleteNode = id;
  },

  deleteNodeById(state, {id}) {
    Vue.delete(state.nodes, id);
  }
};

const actions = {
  async addNode({commit, state}, {key}) {
    try {
      const result = await NodeApi.create(
        key,
        state.addNode.x,
        state.addNode.y,
      );
      commit('addNode', {
        id: result.id,
        node: result.node,
      });

      commit(
        'ports/addPorts',
        {
          ports: result.ports,
        },
        {
          root: true,
        },
      );
      commit('closeAddDialog');
    } catch (e) {
      error('Unable to create node', e, key);
    }
  },

  async deleteNode({commit, state}, {nodeId}) {
    try {
      await NodeApi.delete(nodeId);
      const node = state.nodes[nodeId];

      commit('ports/deletePortsById', {ports: node.inputs}, {root: true});
      commit('ports/deletePortsById', {ports: node.outputs}, {root: true});

      commit('edges/deleteByNode', {id: nodeId}, {root: true});

      commit('deleteNodeById', {
        id: nodeId,
      });

      commit('closeDeleteDialog');

    } catch (e) {
      error('Unable to delete node', e, nodeId);
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