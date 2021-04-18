import API from '@/api';

const resource = '/nodes';

export default {
  create(nodeId, x, y) {
    return Promise.resolve({
      id: 10,
      node: {
        name: 'com.workflow.compare.If',
        displayName: 'If',
        inputs: [11],
        outputs: [12, 13],
        position: {
          x: x,
          y: y,
        },
      },
      ports: {
        11: {
          parentId: 10,
          name: 'Input',
          type: 'Boolean',
        },
        12: {
          parentId: 10,
          name: 'True',
          type: 'Boolean',
        },
        13: {
          parentId: 10,
          name: 'False',
          type: 'Boolean',
        },
      },
    });
  },

  delete(nodeId) {
    return Promise.resolve();
  },
};