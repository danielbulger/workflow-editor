<template>
  <div id="editor"
       @mousemove.prevent.stop="moveSelectedNode"
       @mouseup.prevent.stop="resetSelectedNode"
  >
    <node v-for="(node, nodeId) in nodes" :id="nodeId" :key="nodeId"/>
  </div>

</template>

<script>

import Node from '@/node/Node.vue';

export default {
  name: 'Editor',
  components: {
    Node,
  },
  props: [
    'id',
  ],
  data() {
    return {};
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
  methods: {
    /**
     * Move the selected node if one exists, by the current mouse event.
     * @param event The mouse move data.
     */
    moveSelectedNode(event) {
      if (this.$store.getters['editor/hasSelectedNode']()) {
        const selectedNode = this.$store.getters['editor/getSelectedNode']();
        const offset = this.$store.getters['editor/getSelectedNodeMovementOffset']();

        this.$store.commit('nodes/move', {
          id: selectedNode,
          position: {
            x: event.clientX + offset.x,
            y: event.clientY + offset.y,
          },
        });
      }
    },
    /**
     * Reset the selected node once the mouse has been unclicked.
     * @param event The mouse click data.
     */
    resetSelectedNode(event) {
      if (this.$store.getters['editor/hasSelectedNode']()) {
        this.$store.commit('editor/clearSelectedNode');
      }
    },
  },
};
</script>

<style scoped>
#editor {
  width: 100%;
  height: 100%;

  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}
</style>