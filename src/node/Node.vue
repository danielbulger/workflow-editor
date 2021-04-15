<template>

  <g :transform="transform"
     @mousedown.stop="notifySelected">
    <rect :width="width" :height="height" class="container"></rect>
    <rect :width="width" :height="headerSize" class="name-container"></rect>
    <text :x="width / 2" y="35" text-anchor="middle">
      <tspan>{{ this.node.name }}</tspan>
    </text>

    <g class="input-ports" :transform="`translate(0, ${headerSize + margin})`">
      <g :transform="`translate(0, ${index * portHeight})`" v-for="(portId, index) in this.node.inputs">
        <port
            :id="portId"
            :parent-id="id"
            :key="portId"
            :position="{
              x: node.position.x,
              y: node.position.y + (index * portHeight) + headerSize + margin
            }"
            direction="incoming"/>
      </g>
    </g>

    <g class="output-ports" :transform="`translate(100, ${headerSize + margin})`">
      <g :transform="`translate(0, ${index * portHeight})`" v-for="(portId, index) in this.node.outputs">
        <port
            :id="portId"
            :parent-id="id"
            :key="portId"
            :position="{
              x: node.position.x + width,
              y: node.position.y + (index * portHeight) + headerSize + margin
            }"
            direction="outgoing"/>
      </g>
    </g>
  </g>
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
      width: 200,
      headerSize: 50,
      margin: 10,
      portHeight: 35,
      node: this.$store.getters['nodes/getNodeById'](this.id),
    };
  },
  computed: {
    height() {
      return (this.headerSize + this.margin) + (
          (Math.max(this.node.inputs.length + this.node.outputs.length) - 1) * this.portHeight
      );
    },

    transform() {
      return `translate(${this.node.position.x}, ${this.node.position.y})`;
    },

    scale() {
      return this.$store.getters['editor/getScale']();
    },
  },
  methods: {
    /**
     * Notify the store that the node has been selected by the user.
     * @param {MouseEvent} event The mouse-client event
     */
    notifySelected: function(event) {

      this.$store.commit('editor/setSelectedNode', {
        id: this.id,
        // We don't want the transform to snap to the left corner
        // after moving, so we offset the transform by where the user
        // has clicked relative to the node so the node stays under
        // the mouse in the correct spot
        offset: {
          x: this.node.position.x - event.x,
          y: this.node.position.y - event.y,
        },
      });
    },
  },
};
</script>

<style scoped>

g {
  cursor: pointer;
  user-select: none;
}

g > .container {
  fill: var(--background-lighest-shade);
}

g > .name-container {
  fill: var(--primary-colour);
}

g > text {
  fill: var(--text-colour);
  font-size: 1.5rem;
}
</style>