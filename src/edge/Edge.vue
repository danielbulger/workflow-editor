<template>
  <div class="edge"
       v-if="toPosition !== undefined && fromPosition !== undefined"
       :style="this.computeStyle"
       :class="{selected: selected}"
       @click.prevent.stop="notifySelected">

    <svg xmlns="http://www.w3.org/2000/svg" :width="this.width" :height="this.height">
      <line :x1="this.x1"
            :y1="this.y1"
            :x2="this.x2"
            :y2="this.y2"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Edge',
  props: [
    'id',
  ],
  data() {
    return {
      edge: this.$store.getters['edges/getEdgeById'](this.id),
      deleteMenu: {
        visible: false,
        x: -1,
        y: -1,
      },
    };
  },
  methods: {
    /**
     * Compare the from & to position on a given axis with the specific function
     * @param {function(number, number)} func The comparison function either Math.max or Math.min
     * @param {string} axis The axis to compare the positions on
     * @return {number} The position as specified by the comparison function
     */
    compare(func, axis) {
      return func(this.fromPosition[axis], this.toPosition[axis]);
    },

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

    /**
     * The style properties to use for the component container
     * @return {{top: string, left: string, width: string, height: string}}
     */
    computeStyle() {
      return {
        left: `${this.minLeft}px`,
        top: `${this.minTop}px`,
        width: `${this.width}px`,
        height: `${this.height}px`,
      };
    },

    /**
     * The line SVG x1 parameter.
     * @return {number} The coordinates relative to the svg container.
     */
    x1() {
      return this.fromPosition.x - this.minLeft;
    },

    /**
     * The line SVG x2 parameter.
     * @return {number} The coordinates relative to the svg container.
     */
    x2() {
      return this.toPosition.x - this.minLeft;
    },

    /**
     * The line SVG y1 parameter.
     * @return {number} The coordinates relative to the svg container.
     */
    y1() {
      return this.fromPosition.y - this.minTop;
    },

    /**
     * The line SVG y2 parameter.
     * @return {number} The coordinates relative to the svg container.
     */
    y2() {
      return this.toPosition.y - this.minTop;
    },

    /**
     * Gets the left most position
     * @return {number} The left position in pixels
     */
    minLeft() {
      return this.compare(Math.min, 'x');
    },

    /**
     * Gets the top most position
     * @return {number} The left position in pixels
     */
    minTop() {
      return this.compare(Math.min, 'y');
    },

    /**
     * Gets the right most position
     * @return {number} The left position in pixels
     */
    maxLeft() {
      return this.compare(Math.max, 'x');
    },

    /**
     * Gets the bottom most position
     * @return {number} The left position in pixels
     */
    maxTop() {
      return this.compare(Math.max, 'y');
    },

    /**
     * The total width the edge line requires.
     * @return {number} The width in pixels
     */
    width() {
      return this.maxLeft - this.minLeft;
    },

    /**
     * The total height the edge line requires.
     * @return {number} The height in pixels
     */
    height() {
      return Math.max(this.maxTop - this.minTop, 20);
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
  },
};
</script>

<style scoped>
.edge {
  position: absolute;
  z-index: var(--edge-layer);
  cursor: pointer;
}

.edge > svg > line {
  stroke-width: 0.5rem;
  stroke: var(--text-colour);
}

.edge.selected > svg > line {
  stroke: var(--visual-variant4);
}

</style>