<template>
  <div class="delete-node-dialog">
    <div class="header">Delete this Node?</div>
    <div class="footer">
      <button class="cancel" @click="cancel">Cancel</button>
      <button class="delete" @click="deleteNode">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteNodeDialog',
  methods: {
    cancel() {
      this.$store.commit('nodes/closeDeleteDialog');
    },
    deleteNode() {
      this.$store.dispatch('nodes/deleteNode', {
        nodeId: this.$store.getters['nodes/getSelectedDeleteNode'](),
      });
    },
  },
};
</script>

<style scoped>
.delete-node-dialog {
  position: absolute;
  top: 50%;
  width: 300px;
  left: calc(50% - (300px / 2));
  background-color: var(--background-empty-shade);
}

.delete-node-dialog > .header {
  font-weight: bold;
  background-color: var(--primary-colour);
  color: var(--text-colour);
  font-size: 1.5rem;
  line-height: 2rem;
  padding-left: 1rem;
}

.delete-node-dialog > .footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 1.25rem;
}

.delete-node-dialog > .footer > button {
  text-transform: uppercase;
  border: none;
  border-radius: 0;
  font-size: 0.8rem;
  padding: 0.8rem;
  width: 5.5rem;
}

.delete-node-dialog > .footer > button.delete {
  background-color: var(--danger-colour);
  color: var(--text-colour);
}

.delete-node-dialog > .footer > button.cancel {
  color: var(--primary-colour);
  background-color: var(--text-colour);
}

</style>