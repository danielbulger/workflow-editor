<template>

  <svg :width="width" :height="height" :class="[{selected: selected, matchType: matchPortType}, direction]"
       v-if="port != null">
    <g v-if="direction === 'incoming'">
      <circle :r="radius" :cx="radius" :cy="radius"
              @click.prevent.stop="selectPort"
              @mousedown.prevent.stop></circle>
      <text x="30" y="18">
        <tspan>{{ this.port.name }}</tspan>
      </text>
    </g>

    <g v-else>
      <circle :r="radius" :cx="width - radius" :cy="radius"
              @click.prevent.stop="selectPort"
              @mousedown.prevent.stop
      ></circle>
      <text x="70" y="18" text-anchor="end">
        <tspan>{{ this.port.name }}</tspan>
      </text>
    </g>
  </svg>

</template>

<script>

export default {
  name: 'Port',
  components: {},
  props: [
    'id',
    'parentId',
    'direction',
    'position',
  ],
  data() {
    return {
      parent: this.$store.getters['nodes/getNodeById'](this.parentId),
      radius: 12,
      width: 100,
      height: 24,
    };
  },

  mounted() {
    // This may happen when a new node is created
    // a node is added to the node store before the port
    // has been added to the port store.
    if(this.port != null) {
      this.setAnchorPosition();
    }
  },

  methods: {

    /**
     * Notifies the store with the position (relative to the viewport)
     * of the anchor point. This is so other components know where to
     * attach to
     */
    setAnchorPosition() {

      // The position from the node is the top-left edge of the element
      // Make sure we adjust depending on which direction it's going to
      // center the edge within the port
      const offsetX = this.direction === 'outgoing' ? -this.radius : this.radius;

      this.$store.commit('ports/setPosition', {
        id: this.id,
        position: {
          x: this.position.x + offsetX,
          // Make sure the we are referencing the center of the anchor point.
          y: this.position.y + this.radius,
        },
      });
    },

    /**
     * Makes this port the currently selected port if it is valid to be
     * selected.
     */
    makeSelectedPort() {
      this.$store.commit('editor/setSelectedPort', {
        id: this.id,
        type: this.port.type,
        direction: this.direction,
      });
    },

    /**
     * Clears the currently selected port.
     */
    clearSelectedPort() {
      this.$store.commit('editor/clearSelectedPort');
    },

    /**
     * @return {boolean}
     */
    isJoinable() {
      return this.direction !== 'outgoing' && this.matchPortType;
    },

    createEdge() {

      const fromId = this.$store.getters['editor/getSelectedPort']();

      this.$store.dispatch('edges/create', {
        from: fromId,
        to: this.id,
        fromNode: this.$store.getters['ports/getPortById'](fromId).parentId,
        toNode: this.parentId
      });
    },

    /**
     * Notify the store that the user has selected this port.
     * @param {MouseEvent} event
     */
    selectPort(event) {

      // We already have selected a port.
      if (this.$store.getters['editor/hasSelectedPort']()) {
        // If it's the port we already selected, then clear it
        if (this.$store.getters['editor/isSelectedPort'](this.id)) {
          this.clearSelectedPort();
        } else {
          if (this.isJoinable()) {
            this.createEdge();
          } else {
            this.makeSelectedPort();
          }
        }
      } else {
        this.makeSelectedPort();
      }
    },
  },
  computed: {
    port() {
      return this.$store.getters['ports/getPortById'](this.id);
    },
    /**
     * Gets the position of the parent node
     * @return {{x: number, y: number}|undefined}
     */
    parentPosition() {
      return this.$store.getters['nodes/getNodePosition'](this.parentId);
    },
    /**
     * Gets whether this port has been selected or not.
     * @return {boolean}
     */
    selected() {
      return this.$store.getters['editor/isSelectedPort'](this.id);
    },
    /**
     * Gets whether this port's value type matches the one that has been
     * selected. This is for styling purposes.
     * @return {boolean}
     */
    matchPortType() {
      return this.direction === 'incoming' && this.$store.getters['editor/isSelectedPortType'](this.port.type) &&
          // We can't join two ports if the have the same parent
          !this.$store.getters['ports/isSibling'](
              this.id,
              this.$store.getters['editor/getSelectedPort'](),
          );
    },
  },
  watch: {
    port(newValue, oldValue) {
      this.setAnchorPosition();
    },
    // If the parent moves, we need to update our position to
    // let anyone following us (such as edges) that we have moved as well.
    parentPosition(newValue, oldValue) {
      this.setAnchorPosition();
    },
  },
};
</script>

<style scoped>

svg > g > text {
  fill: var(--text-colour);
}

svg > g > circle {
  fill: var(--text-colour);
  stroke: var(--background-light-shade);
  stroke-width: var(--port-border-size);
  cursor: crosshair;
}

svg.selected > g > circle {
  fill: var(--visual-variant8);
}

svg.matchType > g > circle {
  fill: var(--visual-variant1);
}

</style>