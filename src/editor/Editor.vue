<template>
  <div id="editor">
    <graph/>
  </div>
</template>

<script>

import Graph from '@/editor/Graph.vue';

export default {
  name: 'Editor',
  components: {
    Graph
  },
  props: [
    'id',
  ],
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
#editor {
  width: 100%;
  height: 100%;

  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}
</style>