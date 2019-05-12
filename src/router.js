import Vue from 'vue';
import Router from 'vue-router';
import Add from './views/Add';
import Main from './views/Main.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    },
    {
      path: '/q/:id',
      name: 'question',
      component: Main
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.query.token) {
    store.commit('loadToken', to.query.token);
    return next(to.path);
  }

  const old = localStorage.getItem('old-path');
  if (old && old !== 'undefined') {
    localStorage.removeItem('old-path');
    return next(old);
  }

  next();
});

export default router;
