import Vue from 'vue';
import VueRouter from 'vue-router';

import {publicRoutes, privateRoutes} from '@/router/config';

Vue.use(VueRouter);

const routes = publicRoutes.concat(privateRoutes);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: routes
});

export default router;