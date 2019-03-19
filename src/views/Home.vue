<template>
  <div id="home">
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

      <div id="content-container">
          <div id="side">

          </div>

          <div id="content">

          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'home',

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
    }
}
</script>

<style lang="scss">
    $nav-height: 75px;

    #home {
        display: flex;
        flex-direction: column;
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

    #content-container {
        display: flex;
        height: calc(100vh - #{$nav-height});

        #side {
            background-color: #eee;
            width: 400px;
        }

        #content {
            width: 100%;
        }
    }
</style>
