<template>
  <div class="edge-list">
    <edge v-for="(edge, edgeId) in edges" :id="edgeId" :key="edgeId"/>
  </div>
</template>

<script>

import Edge from '@/edge/Edge.vue';

export default {
  name: 'EdgeList',
  components: {
    Edge,
  },
  computed: {

    /**
     * Gets all the edges registered within the network.
     * @return {Object} All the edges part of the network.
     */
    edges() {
      return this.$store.getters['edges/getEdges']();
    },
  },
};
</script>