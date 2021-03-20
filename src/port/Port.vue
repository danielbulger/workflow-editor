<template>
  <div class="port"
       :class="[{selected: selected, matchType: matchPortType}, direction]">
    <w-text>{{ this.port.name }}</w-text>
    <div class="connection-point"
         @click.prevent.stop="selectPort"
         @mousedown.prevent.stop></div>
  </div>
</template>

<script>

import WText from '@/components/WText.vue';

export default {
  name: 'Port',
  components: {
    WText,
  },
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

      let offsetX = 0;

      if (this.direction === 'outgoing') {
        offsetX = anchorPoint.clientWidth;
      }

      this.$store.commit('ports/setPosition', {
        id: this.id,
        position: {
          x: position.left + offsetX,
          // Make sure the we are referencing the center of the anchor point.
          y: position.top + anchorPoint.clientHeight / 2,
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
      this.$store.dispatch('edges/create', {
        from: this.$store.getters['editor/getSelectedPort'](),
        to: this.id,
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
  background: var(--text-colour);
  border: var(--port-border-size) solid var(--background-light-shade);
  border-radius: 50%;
  cursor: crosshair;
}

.port.selected > .connection-point {
  background-color: var(--visual-variant8);
}

.port.matchType > .connection-point {
  background-color: var(--visual-variant1);
}

</style>