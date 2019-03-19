import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.query.token) {
    store.commit('loadToken', to.query.token);
    return next(to.path);
  }

  const old = localStorage.getItem('old-path');
  if (old) {
    localStorage.removeItem('old-path');
    return next(old);
  }

  next();
});

export default router;
