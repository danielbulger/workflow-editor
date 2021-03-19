<template>
  <div class="node"
       :style="{  left: `${this.node.position.x}px`, top: `${this.node.position.y}px`  }"
       @mousedown.prevent.stop="notifySelected"
       @contextmenu.prevent.stop="onContextMenu"
  >
    <div class="name-container">{{ this.node.name }}</div>

    <div class="port-container">
      <div class="input-ports">
        <port v-for="portId in this.node.inputs"
              :id="portId"
              :parent-id="id"
              :key="portId"
              direction="incoming"/>
      </div>

      <div class="output-ports">
        <port v-for="portId in this.node.outputs"
              :id="portId"
              :key="portId"
              :parent-id="id"
              direction="outgoing"/>
      </div>
    </div>
  </div>
</template>

<script>

import Port from '@/port/Port.vue';

export default {
  name: 'Node.vue',
  components: {
    Port,
  },
  props: [
    'id',
  ],
  data() {
    return {
      node: this.$store.getters['nodes/getNodeById'](this.id),
    };
  },
  computed: {},
  methods: {
    onContextMenu: function(event) {
    },
    /**
     * Notify the store that the node has been selected by the user.
     * @param {MouseEvent} event The mouse-client event
     */
    notifySelected: function(event) {
      this.$store.commit('editor/setSelectedNode', {
        id: this.id,
        offset: {
          x: -event.offsetX,
          y: event.offsetY,
        },
      });
    },
  },
};
</script>

<style scoped>
.node {
  position: absolute;
  color: var(--primary-text-colour);
  background-color: var(--primary-background-color);
  width: var(--node-width);
  z-index: var(--node-layer);

  cursor: pointer;
  user-select: none;
}

.name-container {
  font-weight: bold;
  text-align: center;
  background-color: var(--primary-colour);
  font-size: var(--node-heading-size);
}

.port-container {
  display: flex;
  flex-direction: row;
}

.port-container .input-ports > *,
.port-container .output-ports > * {
  margin-top: var(--port-margin-size);
  margin-bottom: var(--port-margin-size);
}

.port-container > div {
  width: 50%;
}

</style>