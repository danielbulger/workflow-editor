import API from '@/api';

const resource = '/edges';

export default {

  /**
   * Create a new edge between the two given ports
   * @param {string} fromId The outgoing port.
   * @param {string} toId The incoming port.
   */
  create(fromId, toId) {
    return Promise.resolve({
      id: Math.trunc(Math.random() * 0xFFFFFF).toString(),
      from: fromId,
      to: toId,
    });
  },

  /**
   * Request to delete the edge with the given id.
   * @param {string} edgeId The edge id that will be deleted.
   * @return {Promise<void>}
   */
  delete(edgeId) {
    return Promise.resolve();
  },
};