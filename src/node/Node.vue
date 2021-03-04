<template>
  <div class="node"
       :style="{  transform: `translate(${this.node.position.x}px, ${this.node.position.y}px)`  }"
       @mousedown.prevent.stop="notifySelected"
       @contextmenu.prevent.stop="onContextMenu"
  >
    <div class="name-container">{{ this.node.name }}</div>

    <div class="port-container">

      <div class="input-ports">
        <port v-for="port in this.node.inputs"
              :id="port"
              direction="incoming"/>
      </div>

      <div class="output-ports">
        <port v-for="port in this.node.outputs"
              :id="port"
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
  props: {
    'id': String,
  },
  data() {
    return {
    };
  },
  computed: {
    node() {
      return this.$store.getters['nodes/getNodeById'](this.id);
    },
  },
  methods: {
    onContextMenu: function(event) {
    },
    notifySelected: function(event) {
      this.$store.commit('editor/setSelectedNode', {
        id: this.id,
        offset: {
          x: event.offsetX,
          y: event.offsetY
        }
      });
    }
  },
};
</script>

<style scoped>
.node {
  position: relative;
  color: var(--primary-text-colour);
  background-color: var(--primary-background-color);
  width: var(--node-width);

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