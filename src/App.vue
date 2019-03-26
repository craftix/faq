<template>
  <div id="app">
    <div id="nav">
      <div id="logo">
        ? F.A.Q.
      </div>

      <button v-if="!user" id="login" @click="login()">Se connecter</button>
      <div v-if="user" id="user">
        <img id="avatar" :src="user.avatar" />
        <div id="user-infos">
          <span id="username">{{ user.fullName }}</span>
          <button id="logout" @click="logout()">Se deconnecter</button>
        </div>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    computed: {
      ...mapState(['user'])
    },
    methods: {
      login() {
        this.$store.dispatch('login');
      },
      logout() {
        this.$store.dispatch('logout');
      }
    },
    beforeMount() {
      const token = localStorage.getItem('faq-token');
      if (token) {
        this.$store.commit('loadToken', token)
      }
    }
  }
</script>

<style lang="scss">
  $nav-height: 75px;

  html, body {
    margin: 0;
    padding: 0;
  }

  button {
    margin-right: 25px;
    padding: 7px 14px;

    background-color: #ddd;
    color: black;

    border: none;
    border-radius: 3px;

    transition: background-color 75ms ease;
  }

  button:hover {
    background-color: #e4e4e4;
    cursor: pointer;
  }

  #nav {
    height: $nav-height;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px -1px;

    z-index: 3;

    display: flex;
    justify-content: space-between;
    align-items: center;

    #logo {
      margin-left: 25px;

      font-size: 32px;
      font-weight: bold;

      margin-top: -4px;
    }

    #user {
      display: flex;
      margin-right: 15px;

      #avatar {
        height: $nav-height - 20px;
        margin-right: 13px;

        border-radius: 4px;
      }

      #user-infos {
        display: flex;
        flex-direction: column;

        margin-top: -1px;

        #username {
          margin-top: -2px;
        }

        #logout {
          font-size: 14px;

          margin-top: 4px;

          padding-top: 5px;
          padding-bottom: 5px;
        }
      }
    }

    #login {
      margin-right: 25px;
    }
  }
</style>
