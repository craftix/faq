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
  @font-face {
    font-family: 'Helvetica-Neue';
    src: url("./assets/fonts/HelveticaNeueLight.woff") format("woff2");
    font-weight: 400;
  }

  @font-face {
    font-family: 'Helvetica-Neue';
    src: url("./assets/fonts/HelveticaNeueLightItalic.woff") format("woff2");
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'Helvetica-Neue';
    src: url("./assets/fonts/HelveticaNeue-Roman.woff") format("woff2");
    font-weight: normal;
  }

  @font-face {
    font-family: 'Helvetica-Neue';
    src: url("./assets/fonts/HelveticaNeueItalic.woff") format("woff2");
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'Helvetica-Neue';
    src: url("./assets/fonts/HelveticaNeueBold.woff") format("woff2");
    font-weight: bold;
  }

  @font-face {
    font-family: 'Helvetica-Neue';
    src: url("./assets/fonts/HelveticaNeueBoldItalic.woff") format("woff2");
    font-weight: bold;
    font-style: italic;
  }

  $nav-height: 75px;

  html, body {
    margin: 0;
    padding: 0;
  }

  button {
    margin-right: 25px;
    padding: 6px 14px;

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

    z-index: 10;
    position: relative;

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
      margin-right: 10px;

      #avatar {
        height: $nav-height - 22px;
        margin-right: 14px;

        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.2) 0 0 4px -1px;
      }

      #user-infos {
        display: flex;
        flex-direction: column;

        margin-top: -1px;

        #logout {
          font-size: 13px;

          margin-top: 4px;

          padding-top: 4px;
          padding-bottom: 4px;
        }
      }
    }

    #login {
      margin-right: 25px;
    }
  }
</style>
