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
              <li class="category add">
                  <router-link class="name" to="/add"><span class="plus">+</span> Ajouter une question</router-link>
              </li>
          </ul>
      </div>

      <div id="content">
          <template v-if="id">
              <div id="sider">
                  <div id="edition">
                      <font-awesome-icon icon="moon" />
                      <font-awesome-icon icon="pen" />
                      <font-awesome-icon icon="trash" />
                  </div>

                  <div id="last-edit">
                      Dernière édition par Litarvan <span id="time">(il y a 5 minutes)</span>
                  </div>
              </div>

              <h1>Launchwrapper introuvable <span class="id">#{{ id | upper }}</span></h1>

              <h2>Erreur (console)</h2>

              <pre v-highlightjs><code class="hljs plain">Erreur: impossible de trouver ou charger la classe principale net.minecraft.&lt;*&gt;.&lt;*&gt;</code></pre>

              <h3>Variante 1 : Launchwrapper</h3>
              <pre v-highlightjs><code class="hljs plain">Erreur: impossible de trouver ou charger la classe principale net.minecraft.launchwrapper.Launch</code></pre>

              <h3>Variante 2 : Minecraft</h3>
              <pre v-highlightjs><code class="hljs plain">Erreur: impossible de trouver ou charger la classe principale net.minecraft.client.main.Main</code></pre>

              <h2>Solution</h2>

              <h3>Variante 1 : Launchwrapper</h3>

              <p>
                  Cette erreur est très courante, et peut résulter de deux choses. Pour commencer, avez-vous besoin de Forge ?
              </p>

              <h4>&rarr; Non je n'ai pas besoin de Forge</h4>

              <p>
                  Éditez le fichier Launcher.java.
                  En haut, dans la déclaraiton du GameInfos, mettez "false" à la place de "true" comme ceci :
              </p>

              <pre v-highlightjs><code class="java">public static final GameInfos SC_INFOS = new GameInfos("Quelque chose", SC_VERSION, false, new GameTweak[] {});</code></pre>

              <p>
                  Relancez, le problème devrais être réglé.
              </p>

              <h4>&rarr; Oui j'ai besoin de Forge</h4>

              <p>
                  Cela vient alors d'une erreur dans la création du pack. Une solution serait d'utiliser le
                  <router-link to="/pack">générateur de pack.</router-link>
              </p>

              <p>
                  Sinon, l'erreur vient de l'absence d'une librairie appelée <i>Launchwrapper</i>. Pour confirmer,
                  rendez-vous dans .nomduserveur/libs, et vérifiez qu'il n'y a aucune librairie appelée launchwrapper-(version).jar.
                  Si elle est présente, l'erreur vient alors d'autre part et nous vous invitons à demander de l'aide sur le
                  <a href="https://discord.gg/GRKbbpV">serveur de support</a>.
              </p>

              <p>
                  Si vous n'avez pas de dossier libs/, ou qu'il est vide, cela vient d'une erreur de mise à jour, il faut alors
                  regarder si il n'y a pas eu une erreur dans la console, ou que la mise à jour ne se soit simplement pas faite
                  (ce que vous pourrez vérifier en regardant la présente de messages précédés de "[S-Update]" dans la console).
              </p>

              <p>
                  Normalement, pour la création d'un pack, il faut clean son .minecraft, installer la version désirée depuis
                  le launcher, fermer le jeu, installer forge, et surtout <b>lancer le jeu avec Forge</b>, avant de le fermer
                  à nouveau et de prendre les fichiers. Si vous avez oublié de lancer le jeu <u>avec Forge</u>, launchwrapper n'existe
                  alors pas, ce qui cause cette erreur. Recommencer la création du pack sans oublier cette étape, et l'erreur devrait
                  être réglée.
              </p>

              <h3>Variante 2  : Minecraft</h3>

              <p>
                  Cela signifie que le JAR principal de Minecraft (normalement Minecraft.jar) est introuvable.
                  Vérifiez dans le .nomduserveur si il est bien présent et qu'il fait une taille correcte.
              </p>

              <p>
                  Si il est absent, regardez votre console, il se peut qu'il y ait eu un problème de mise à jour.
                  Sinon, il est peut-être tout simplement absent de votre FTP, ou alors la mise à jour ne se fait tout simplement pas,
                  ce que vous pourrez vérifier en regardant la présente de messages précédés de "[S-Update]" dans la console.
              </p>
          </template>
      </div>
  </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            questions: [
                {
                    name: 'Lancement du jeu',
                    content: [
                        {
                            id: 'LW-01',
                            name: 'Launchwrapper introuvable'
                        },
                        {
                            id: 'LW-02',
                            name: 'Tweak class introuvable'
                        }
                    ]
                },
                {
                    name: 'Mise à jour',
                    content: [
                        {
                            id: 'SU-W01',
                            name: '404 sur /panel'
                        },
                        {
                            id: 'SU-W02',
                            name: 'Gestionnaire de fichiers introuvable'
                        },
                        {
                            id: 'SU-L01',
                            name: '403 sur /Login'
                        },
                        {
                            id: 'SU-L02',
                            name: "'Bad server response'"
                        }
                    ]
                }
            ]
        }
    },
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

            font-size: 14px;
        }

        #categories {
            font-size: 13px;
            padding-left: 10px;

            &, .questions {
                list-style: none;
            }

            .category {
                margin-bottom: 20px;

                &.add {
                    display: inline-block;

                    .name {
                        font-size: 15px;
                        color: black;
                    }

                    .plus {
                        font-size: 17px;
                        vertical-align: 1px;
                    }

                    &:hover {
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }

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

        overflow-y: auto;

        #sider {
            position: absolute;
            top: 75px;
            right: 15px;

            padding: 15px;

            color: #888;
            background: white;

            border-bottom-left-radius: 8px;

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
            background-color: #f3f3f3;

            padding: 15px;
        }
    }
</style>
