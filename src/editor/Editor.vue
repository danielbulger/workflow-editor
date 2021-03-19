<template>
  <div id="editor"
       @mousemove.prevent.stop="moveSelectedNode"
       @mouseup.prevent.stop="resetSelectedNode"
  >
    <edge-list/>
    <node-list/>
  </div>

</template>

<script>

import NodeList from '@/node/NodeList.vue';
import EdgeList from '@/edge/EdgeList.vue';

export default {
  name: 'Editor',
  components: {
    NodeList,
    EdgeList,
  },
  props: [
    'id',
  ],
  data() {
    return {};
  },
  computed: {},
  methods: {
    /**
     * Move the selected node if one exists, by the current mouse event.
     * @param event The mouse move data.
     */
    moveSelectedNode(event) {
      if (this.$store.getters['editor/hasSelectedNode']()) {
        const selectedNode = this.$store.getters['editor/getSelectedNode']();
        const nodeOffset = this.$store.getters['editor/getSelectedNodeMovementOffset']();

        this.$store.commit('nodes/move', {
          id: selectedNode,
          position: {
            x: event.clientX + nodeOffset.x,
            y: event.clientY + nodeOffset.y,
          },
        });
      }
    },
    /**
     * Reset the selected node once the mouse has been released.
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