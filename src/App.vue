<template>
  <div id="app">
    <div id="nav">
      <div id="left-nav">
        <div id="logo">
          <router-link to="/home">? F.A.Q.</router-link>
        </div>

        <router-link class="nav-el" to="/q/help">Aide</router-link>
        <router-link class="nav-el" to="/analyst">Analyseur d'erreur</router-link>
        <router-link class="nav-el" to="/pack">Générateur de pack</router-link>
        <router-link class="nav-el" to="/pack">Téléchargements</router-link>
        <router-link class="nav-el" to="/discord">Discord</router-link>
        <router-link class="nav-el" to="/pack">Github</router-link>
        <router-link class="nav-el" to="/about">À Propos</router-link>
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
  @import "fonts";

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

    font-family: 'Roboto', 'Helvetica-Neue', 'Helvetica', 'Arial', sans-serif;

    #left-nav {
      display: flex;
      align-items: center;

      #logo {
        margin-left: 25px;

        font-size: 32px;
        font-weight: bold;

        margin-top: -4px;

        font-family: 'Lato', 'Helvetica-Neue', 'Helvetica', 'Arial', sans-serif;

        a {
          color: black;
          text-decoration: none;
        }
      }

      .nav-el {
        margin-left: 35px;
        font-size: 16px;
        font-weight: bold;

        color: black;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
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
