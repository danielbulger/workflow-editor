<template>
  <div id="editor">
    <delete-node-dialog v-if="showDeleteNodeDialog"></delete-node-dialog>
    <add-node-dialog v-if="showAddNodeDialog"></add-node-dialog>
    <graph/>
  </div>
</template>

<script>

import Graph from '@/editor/Graph.vue';
import AddNodeDialog from '@/node/AddNodeDialog';
import DeleteNodeDialog from '@/node/DeleteNodeDialog';

export default {
  name: 'Editor',
  components: {
    DeleteNodeDialog,
    AddNodeDialog,
    Graph,
  },
  props: [
    'id',
  ],
  data() {
    return {};
  },
  computed: {

    showDeleteNodeDialog() {
      return this.$store.getters['nodes/showDeleteDialog']();
    },

    showAddNodeDialog() {
      return this.$store.getters['nodes/showAddDialog']();
    },
  },
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