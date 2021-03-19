<template>
  <div class="port"
       :class="[{selected: selected, matchType: matchPortType}, direction]"
       @click.prevent.stop="selectPort">
    <div class="name">{{ this.port.name }}</div>
    <div class="connection-point"></div>
  </div>
</template>

<script>
export default {
  name: 'Port',
  props: [
    'id',
    'parentId',
    'direction',
  ],
  data() {
    return {
      port: this.$store.getters['ports/getPortById'](this.id),
      parent: this.$store.getters['nodes/getNodeById'](this.parentId),
    };
  },
  mounted() {
    this.setAnchorPosition();
  },
  methods: {

    /**
     * Notifies the store with the position (relative to the viewport)
     * of the anchor point. This is so other components know where to
     * attach to
     */
    setAnchorPosition() {
      const anchorPoint = this.$el.querySelector('.connection-point');
      const position = anchorPoint.getBoundingClientRect();

      this.$store.commit('ports/setPosition', {
        id: this.id,
        position: {
          // Make sure the we are referencing the center of the anchor point.
          x: position.left + (anchorPoint.clientWidth / 2),
          y: position.top + (anchorPoint.clientHeight / 2),
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
      return this.direction !== 'outgoing';
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
            //
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
      return this.direction === 'incoming' && this.$store.getters['editor/getSelectedPortType']() === this.port.type;
    },
  },
  watch: {
    // If the parent moves, we need to update our position to
    // let anyone following us (such as edges) that we have moved as well.
    parentPosition(newValue, oldValue) {
      this.setAnchorPosition();
    },
  },
};
</script>

<style scoped>

.port {
  width: 100%;
  display: inline-flex;
  align-items: center;
  font-size: var(--port-name-size);
}

.port.incoming {
  justify-content: flex-end;
  flex-direction: row-reverse;
}

.port.outgoing {
  justify-content: flex-end;
  flex-direction: row;
}

.port > .connection-point {
  width: var(--port-size);
  height: var(--port-size);
  background: var(--port-background-colour);
  border: var(--port-border-size) solid black;
  border-radius: 50%;
  cursor: crosshair;
}

.port.selected > .connection-point {
  background-color: var(--port-selected-background-colour);
}

.port.matchType > .connection-point {
  background-color: var(--port-match-type-background-colour);
}

</style>