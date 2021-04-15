<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       width="100%"
       height="100%"
       tabindex="-1"
       @wheel.prevent.stop="rescale"
       @mouseup.prevent.stop="onMouseUp"
       @mousedown.self.prevent.stop="startPanning"
       @mousemove.prevent.stop="onMouseMove"
       @keydown.self.prevent.stop="handleKeyInput">
    <g :transform="transform">
      <g>
        <node v-for="(node, nodeId) in nodes" :id="nodeId" :key="nodeId"/>
      </g>
      <g>
        <edge v-for="(edge, edgeId) in edges" :id="edgeId" :key="edgeId"/>
      </g>
    </g>
  </svg>
</template>

<script>

import Node from '@/node/Node.vue';
import Edge from '@/edge/Edge.vue';

export default {
  name: 'Graph',

  components: {
    Edge,
    Node,
  },

  data() {
    return {
      x: 0,
      y: 0,
      scale: 1,
      panning: false,
      panX: 0,
      panY: 0,
      offsetX: 0,
      offsetY: 0
    };
  },

  methods: {

    /**
     * Rescale and translate the canvas on a wheel event.
     * The graph will follow the mouse cursor while scrolling
     * @param {WheelEvent} event The wheel event
     */
    rescale(event) {

      const scaleThreshold = 2;

      const microScale = 0.1;
      const macroScale = 0.5;

      const minScale = 0.1;
      const maxScale = 5;

      const diffX = (event.clientX - this.x) / this.scale;
      const diffY = (event.clientY - this.y) / this.scale;

      let newScale = this.scale;

      if (event.deltaY > 0) {
        newScale -= (this.scale > scaleThreshold) ? macroScale : microScale;
        if (newScale < minScale) {
          newScale = minScale;
        }
      } else {
        newScale += (this.scale < scaleThreshold) ? microScale : macroScale;
        if (newScale > maxScale) {
          newScale = maxScale;
        }
      }

      this.scale = newScale;
      this.x = event.clientX - (diffX + this.offsetX) * newScale;
      this.y = event.clientY - (diffY + this.offsetY) * newScale;
    },

    /**
     * Try to delete the currently selected edge, if one exists.
     */
    deleteSelectedEdge() {
      if (this.$store.getters['editor/hasSelectedEdge']()) {
        this.$store.dispatch('edges/delete', this.$store.getters['editor/getSelectedEdge']());
      }
    },

    /**
     * Handle a key press from the user.
     * @param {KeyboardEvent} event
     */
    handleKeyInput(event) {
      switch (event.key) {
        case 'Delete':
        case 'Backspace':
          this.deleteSelectedEdge();
          break;
      }
    },
    /**
     * Move the selected node if one exists, by the current mouse event.
     * @param event The mouse move data.
     */
    moveSelectedNode(event) {
      const selectedNode = this.$store.getters['editor/getSelectedNode']();
      const nodeOffset = this.$store.getters['editor/getSelectedNodeMovementOffset']();

      const x = event.clientX + nodeOffset.x;
      const y = event.clientY + nodeOffset.y;

      this.$store.commit('nodes/move', {
        id: selectedNode,
        position: {
          x: x,
          y: y,
        },
      });
    },

    onMouseMove(event) {
      if (this.panning) {
        this.onPanGraph(event);
      } else if (this.$store.getters['editor/hasSelectedNode']()) {
        this.moveSelectedNode(event);
      }
    },

    onMouseUp() {
      if (this.panning) {
        this.stopPanning();
      } else if (this.$store.getters['editor/hasSelectedNode']()) {
        this.resetSelectedNode();
      }
    },

    /**
     * Reset the selected node once the mouse has been released.
     */
    resetSelectedNode() {
      this.$store.commit('editor/clearSelectedNode');
    },

    clearSelections() {
      this.$store.commit('editor/clearSelections');
    },

    startPanning(event) {
      this.clearSelections();
      this.panX = event.clientX;
      this.panY = event.clientY;
      this.panning = true;
    },

    onPanGraph(event) {
      const diffX = (event.clientX - this.panX);
      const diffY = (event.clientY - this.panY);
      this.offsetX += diffX;
      this.offsetY += diffY;

      this.panX = event.clientX;
      this.panY = event.clientY;
    },

    stopPanning() {
      this.panning = false;
      this.panX = this.panY = 0;
    },
  },

  computed: {

    /**
     * Get all the registered Node.
     * @return {Object} The Node data.
     */
    nodes() {
      return this.$store.getters['nodes/getNodes']();
    },
    /**
     * Gets all the edges registered within the network.
     * @return {Object} All the edges part of the network.
     */
    edges() {
      return this.$store.getters['edges/getEdges']();
    },

    transform() {
      return `translate(${this.x + this.offsetX}, ${this.y + this.offsetY}) scale(${this.scale})`;
    },
  },
};
</script>

<style scoped></style>