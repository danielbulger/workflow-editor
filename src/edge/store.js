import EdgeApi from '@/edge/api';
import Vue from 'vue';
import {error} from '@/log';

const state = {
  edges: {
    1: {
      from: 3,
      to: 4,
      fromNode: 1,
      toNode: 2
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
   * @return {function(): Object}
   */
  getEdges: (state) => () => {
    return state.edges;
  },
};

const actions = {
  /**
   * Deletes an edge with the given id.
   * @param commit
   * @param {string} edgeId
   * @return {Promise<void>}
   */
  async delete({commit}, edgeId) {
    try {
      await EdgeApi.delete(edgeId);

      // Clean up the selections before deleting the edge from the store
      commit('editor/clearSelections', null, {root: true});
      // Delete the edge from the store
      commit('deleteById', {
        id: edgeId,
      });
    } catch (e) {
      error('Unable to delete edge', e, edgeId);
    }
  },

  /**
   * Creates a new edge with the given data.
   * @param commit
   * @param {{from: string, to: string, fromNode, toNode}} payload
   * @return {Promise<void>}
   */
  async create({commit}, payload) {
    try {
      const result = await EdgeApi.create(
        payload.from, payload.to, payload.fromNode, payload.toNode
      );
      // Clean up the selections before creating the edge
      commit('editor/clearSelections', null, {root: true});
      commit('create', result);
    } catch (e) {
      error('Unable to create edge', e, payload);
    }
  },
};

const mutations = {

  /**
   * Creates an Edge with the given data.
   * @param state
   * @param {{id: string, from: string, to:string, fromNode, toNode}} payload
   */
  create(state, payload) {
    Vue.set(state.edges, payload.id, {
      from: payload.from,
      to: payload.to,
      fromNode: payload.fromNode,
      toNode: payload.toNode
    });
  },

  /**
   * Deletes the Edge by the given id
   * @param state
   * @param {{id: string}} payload
   */
  deleteById(state, payload) {
    Vue.delete(state.edges, payload.id);
  },

  deleteByNode(state, {id}) {
    for (let edgeId in state.edges) {
      const edge = state.edges[edgeId];
      if (edge.fromNode == id || edge.toNode == id) {
        Vue.delete(state.edges, edgeId);
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