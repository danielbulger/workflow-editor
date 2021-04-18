<template>
  <div class="node-list">
    <div class="search">
      <input type="search" placeholder="Filter" v-model="query">
    </div>

    <div class="definition-header">
      <div>Type</div>
      <div>Version</div>
      <div>Tags</div>
    </div>

    <div class="nodes">
      <div v-for="(definition, key) in filtered" @click.prevent="selectNode(key, definition)"
           :class="{selected: selected === key}">
        <div>{{ definition.name }}</div>
        <div>{{ definition.version }}</div>
        <div>{{ definition.tags.join(',') }}</div>
      </div>
    </div>

    <div class="selected-node-container" v-if="selectedNode != null">
      <div class="selected-node-name">{{ this.selectedNode.name }} - {{ this.selectedNode.version }}</div>
      <div>{{ this.selectedNode.description }}</div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'NodeList',
  data() {
    return {
      query: '',
      selected: null,
      timeout: null,
      definitions: this.$store.getters['nodes/getDefinitions'](),
      filtered: this.$store.getters['nodes/getDefinitions'](),
    };
  },

  methods: {
    selectNode(key, definition) {
      this.selected = key;
      this.$emit('selected', {
        id: key,
      });
    },

    filterDefinitions() {
      const search = this.searchQuery;
      const definitions = this.$store.getters['nodes/getDefinitions']();

      let filtered = {};
      for (let key in definitions) {
        if (!definitions.hasOwnProperty(key)) {
          continue;
        }
        const definition = definitions[key];
        // First check to see if the name matches the filter
        if (definition.name.toLowerCase().includes(search)) {
          filtered[key] = definition;
        } else {
          // If it doesn't then check all the tags
          for (let tag of definition.tags) {
            if (tag.toLowerCase().includes(search)) {
              filtered[key] = definition;
            }
          }
        }
      }
      return filtered;
    },
  },

  computed: {

    selectedNode() {
      return this.selected !== null ? this.definitions[this.selected] : null;
    },

    searchQuery() {
      return this.query.toLowerCase().trim();
    },
  },

  watch: {
    // Async filter so we don't block the main thread
    // on each keypress. We have a timeout of `N`milliseconds
    // so typing quickly doesn't consistently filter
    searchQuery(newValue, oldValue) {
      // Cancel a pending filter operation
      if (this.timeout != null) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      if (newValue.length === 0) {
        this.filtered = this.$store.getters['nodes/getDefinitions']();
      } else {
        this.timeout = setTimeout(() => {
          this.filtered = this.filterDefinitions();
        }, 250);
      }
    },
  },
};

</script>

<style scoped>
.node-list {
  background-color: var(--background-lighest-shade);
  color: var(--text-colour);
  padding: 1.25rem;
  height: 100%;
}

.node-list > .search {
  display: flex;
  justify-content: flex-end;
}

.node-list > .search > input {
  border-radius: 0;
  border-width: 1px;
  border-style: solid;
  height: 2rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
}

.node-list > .definition-header {
  display: flex;
  flex-direction: row;
  background-color: var(--primary-colour);
}

.node-list > .nodes,
.node-list > .nodes > div {
  width: 100%;
}

.node-list > .nodes {
  max-height: 65%;
  font-size: 0.8rem;
  margin-bottom: 1.25rem;

  overflow-y: scroll;
  background-color: var(--background-empty-shade);
}

.node-list > .nodes > div {
  display: flex;
  flex-direction: row;
  cursor: pointer;
}

.node-list > .nodes > div.selected {
  color: var(--visual-variant10);
}

.node-list > .nodes > div > div {
  width: calc(100% / 3);
  max-width: calc(100% / 3);
  padding: 0.5rem;
  border-width: 1px;
  border-color: var(--text-colour);
  border-right-style: solid;
  border-bottom-style: solid;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.node-list > .nodes > div > div:last-of-type {
  border-right-style: none;
}

.node-list > .nodes > div > div:first-of-type {
  text-align: center;
}

.node-list > .definition-header > div {
  width: calc(100% / 3);
  border-right: white;
  padding-left: 4px;
}

.node-list > .selected-node-container {
  margin-bottom: 1.25rem;
}

.node-list > .selected-node-container > .selected-node-name {
  color: var(--visual-variant10);
  font-size: 1.25rem;
  padding-bottom: 0.5rem;
}

</style>