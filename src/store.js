import Vue from 'vue';
import Vuex from 'vuex';

import decode from 'jwt-decode';
import { API_URL, httpPost } from "./request";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null
  },
  mutations: {
    loadToken(state, token) {
      const data = decode(token).data;

      state.token = token;
      state.user = data;

      localStorage.setItem('faq-token', token);
    }
  },
  actions: {
    login() {
      localStorage.setItem('old-path', window.location.path);
      window.location.href = API_URL + '/auth/login?r=' + encodeURIComponent(window.location.origin + '/')
    },
    async logout() {
      console.log(await httpPost('/auth/logout'))
    }
  }
});
