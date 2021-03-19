<template>
  <div class="node-list">
    <node v-for="(node, nodeId) in nodes" :id="nodeId" :key="nodeId"/>
  </div>
</template>

<script>

import Node from '@/node/Node.vue';

export default {
  name: 'NodeList',
  components: {
    Node,
  },
  computed: {
    /**
     * Get all the registered Node.
     * @return {Object} The Node data.
     */
    nodes() {
      return this.$store.getters['nodes/getNodes']();
    },
  },
};
</script>