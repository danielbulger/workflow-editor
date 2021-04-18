<template>
  <path v-if="toPosition !== undefined && fromPosition !== undefined"
        :d="path"
        :class="{selected: selected}"
        :transform="transform"
        @click.prevent.stop="notifySelected"
  />
</template>

<script>
export default {
  name: 'Edge',
  props: [
    'id',
  ],
  data() {
    return {
    };
  },
  methods: {
    /**
     * Notify that the edge has been clicked
     * @param {MouseEvent} event
     */
    notifySelected(event) {
      // If it was already selected clear it
      if (this.selected) {
        this.$store.commit('editor/clearSelections');
      } else {
        this.$store.commit('editor/setSelectedEdge', {
          id: this.id,
        });
      }
    },
  },
  computed: {

    edge() {
      return this.$store.getters['edges/getEdgeById'](this.id);
    },

    path() {
      const x = this.toPosition.x - this.fromPosition.x;
      const y = this.toPosition.y - this.fromPosition.y;
      return `M0 0 L${x} ${y}`;
    },

    /**
     * Gets the pixel position of the from port anchor point
     * @return {{x: number, y: number}|undefined} The position of the from port if it exists, undefined otherwise
     */
    fromPosition() {
      return this.$store.getters['ports/getPortById'](this.edge.from).position;
    },

    /**
     * Gets the pixel position of the to port anchor point
     * @return {{x: number, y: number}|undefined} The position of the to port if it exists, undefined otherwise
     */
    toPosition() {
      return this.$store.getters['ports/getPortById'](this.edge.to).position;
    },

    /**
     * Gets whether this edge is the currently selected one or not.
     * @return {boolean}
     */
    selected() {
      return this.$store.getters['editor/isSelectedEdge'](this.id);
    },

    transform() {
      return `translate(${this.fromPosition.x}, ${this.fromPosition.y})`;
    }
  }
};
</script>

<style scoped>
path {
  cursor: pointer;
  stroke: var(--text-colour);
  stroke-width: 0.3rem;
}

path.selected {
  stroke: var(--visual-variant4);
}

</style>