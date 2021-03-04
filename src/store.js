import Vue from 'vue';
import Vuex from 'vuex';

import editor from '@/editor/store.js';
import node from '@/node/store.js';
import port from '@/port/store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    editor: editor,
    nodes: node,
    ports: port
  },
  strict: process.env.NODE_ENV !== "production"
});