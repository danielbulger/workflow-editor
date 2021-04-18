<template>
  <div class="add-node-modal">
    <div class="header">
      Add Node
    </div>

    <div class="definitions">
      <node-list v-on:selected="selectNode"/>
    </div>

    <div class="footer">
      <button class="cancel" @click.prevent="cancel">Cancel</button>
      <button class="add" @click.prevent="add">Add</button>
    </div>
  </div>
</template>

<script>
import NodeList from '@/node/NodeList';

export default {
  name: 'AddNodeDialog',
  components: {
    NodeList,
  },

  data() {
    return {
      selected: null,
    };
  },

  methods: {
    add() {
      if (this.selected != null) {
        this.$store.dispatch('nodes/addNode', {
          key: this.selected,
        });
      }
    },
    cancel() {
      this.reset();
      this.$store.commit('nodes/closeAddDialog');
    },
    reset() {
      this.selected = null;
    },
    selectNode(event) {
      this.selected = event.id;
    },
  },
};
</script>

<style scoped>
.add-node-modal {
  position: absolute;
  flex-direction: column;
  left: calc((100vw - 85vw) / 2);
  top: calc((100vh - 85vh) / 2);
  width: 85vw;
  max-height: 85vh;

  background-color: var(--background-empty-shade);
}

.add-node-modal > .header {
  font-weight: bold;
  background-color: var(--primary-colour);
  color: var(--text-colour);
  font-size: 1.5rem;
  line-height: 2rem;
  padding-left: 1rem;
}

.add-node-modal > .definitions {
  width: 100%;
}

.add-node-modal > .footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 1.25rem;
}

.add-node-modal > .footer > button {
  text-transform: uppercase;
  border: none;
  border-radius: 0;
  font-size: 0.8rem;
  padding: 0.8rem;
  width: 5.5rem;
}

.add-node-modal > .footer > button.add {
  background-color: var(--primary-colour);
  color: var(--text-colour);
}

.add-node-modal > .footer > button.cancel {
  color: var(--primary-colour);
  background-color: var(--text-colour);
}
</style>