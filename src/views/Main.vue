<template>
  <div id="main">
      <div id="side">
          <input id="search" placeholder="Rechercher..." />

          <ul id="categories">
              <li class="category">
                  <span class="name">Lancement du jeu</span>

                  <ul class="questions">
                      <li class="question">
                          <a class="link" @click="select('lw-01')"><span class="id">#LW-01</span> Launchwrapper introuvable</a>
                      </li>
                      <li class="question">
                          <a class="link" @click="select('lw-02')"><span class="id">#LW-02</span> Tweak class introuvable</a>
                      </li>
                  </ul>
              </li>
              <li class="category">
                  <span class="name">Mise à jour</span>

                  <ul class="questions">
                      <li class="question">
                          <span class="id">#SU-W01</span> 404 sur /panel
                      </li>
                      <li class="question">
                          <span class="id">#SU-W02</span> Gestionnaire de fichiers introuvable
                      </li>
                      <li class="question">
                          <span class="id">#SU-L01</span> 403 sur /Login
                      </li>
                      <li class="question">
                          <span class="id">#SU-L02</span> 'Bad server response'
                      </li>
                  </ul>
              </li>
          </ul>
      </div>

      <div id="content">
          <template v-if="id">
              <div id="sider">
                  <div id="edition">
                      <font-awesome-icon icon="pen" />
                      <font-awesome-icon icon="trash" />
                  </div>

                  <div id="last-edit">
                      Dernière édition par Litarvan <span id="time">(il y a 5 minutes)</span>
                  </div>
              </div>

              <h1>Launchwrapper introuvable <span class="id">#{{ id | upper }}</span></h1>

              <h2>Erreur</h2>

              <pre v-highlightjs><code>Erreur: impossible de trouver ou charger la classe principale (classe java)</code></pre>

              <h3>Variante 1 : Launchwrapper</h3>
              <pre v-highlightjs><code>Erreur: impossible de trouver ou charger la classe principale net.minecraft.launchwrapper.Launch</code></pre>

              Voir <u>Solution 1</u>

              <h3>Variante 2 : Minecraft</h3>
              <pre v-highlightjs><code>Erreur: impossible de trouver ou charger la classe principale net.minecraft.client.main.Main</code></pre>

              Voir <u>Solution 2</u>

              <pre v-highlightjs>
                  <code class="java">public void test() {
  String o = "test";
  System.out.println(5 + o);

  if (o.equals("yuu")) {
      int[] a = new int[] {5};
  }
}</code>
              </pre>
          </template>
      </div>
  </div>
</template>

<script>
export default {
    name: 'home',
    methods: {
        select(id) {
            this.$router.push('/q/' + id);
        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        }
    },
    filters: {
        upper(str) {
            return str.toUpperCase();
        }
    }
}
</script>

<style lang="scss">
    #main {
        display: flex;
        height: calc(100vh - 75px);

        font-family: 'Helvetica-Neue', 'Roboto', 'Arial', sans-serif;
    }

    #side {
        background-color: #eee;
        width: 400px;

        display: flex;
        flex-direction: column;

        #search {
            background-color: #ddd;
            color: #222;

            height: 25px;
            padding: 10px;

            border: none;
            outline: none;
        }

        #categories {
            font-size: 13px;
            padding-left: 10px;

            &, .questions {
                list-style: none;
            }

            .category {
                margin-bottom: 20px;

                .name {
                    font-weight: bold;
                    font-size: 16px;
                }

                .questions {
                    padding-left: 20px;
                    padding-top: 5px;

                    .question {
                        .id {
                            color: #444;
                            font-style: italic;
                            font-size: 10px;
                        }

                        .link:hover {
                            text-decoration: underline;
                            cursor: pointer;
                        }

                        margin-bottom: 2px;
                    }
                }
            }
        }
    }

    #content {
        width: 100%;
        padding: 30px;
        padding-top: 0;

        box-sizing: border-box;

        font-family: 'Helvetica-Neue', 'Roboto', 'Arial', sans-serif;

        #sider {
            position: absolute;
            top: 90px;
            right: 20px;

            color: #888;

            #edition {
                text-align: right;

                * {
                    margin-left: 15px;
                }
            }

            #last-edit {
                text-decoration: underline;
                font-size: 14px;

                margin-top: 5px;

                #time {
                    font-style: italic;
                }
            }
        }

        h1 .id {
            color: #666;
            font-style: italic;
            font-weight: normal;

            font-size: 26px;
        }

        code {
            font-size: 13px;

            border-radius: 4px;
            background-color: #f8f8f8;

            padding: 15px;
        }
    }
</style>
