<template>
  <div class="edge" v-if="toPosition !== undefined && fromPosition !== undefined" :style="this.computeStyle">
    <svg xmlns="http://www.w3.org/2000/svg" :width="this.width" :height="this.height">
      <line :x1="this.x1"
            :y1="this.y1"
            :x2="this.x2"
            :y2="this.y2"
            stroke-width="5"
            stroke="white"/>
    </svg>
  </div>
</template>

<script>

export default {
  name: 'Edge',
  components: {},
  props: [
    'id',
  ],
  data() {
    return {
      edge: this.$store.getters['edges/getEdgeById'](this.id),
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
  },
};
</script>

<style scoped>
.edge {
  position: absolute;
  z-index: var(--edge-layer);
}
</style>