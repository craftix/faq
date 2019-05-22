<template>
    <div id="add">
        <h1 id="header">Ajouter une question</h1>

        <div id="options">
            <div class="sub-option">
                <h2>Informations</h2>

                <div>
                    <label for="title">Titre :</label>
                    <input id="title" type="text" placeholder="Launchwrapper introuvable" v-model="title" />
                </div>
                <div>
                    <label for="id">ID :</label>
                    <input id="id" type="text" placeholder="LW-01" v-model="id" />
                </div>
            </div>
            <div class="sub-option cat">
                <h2>Catégorie</h2>

                <div>
                    <label for="add-cat">
                        <input id="add-cat" type="radio" name="cat" value="new" v-model="categoryChoice" />
                        Nouvelle catégorie
                    </label>
                </div>
                <div>
                    <label for="add-cat-input">Nom : </label>
                    <input id="add-cat-input" type="text" :disabled="categoryChoice === 'existing'" ref="newField" />
                </div>

                <div>
                    <label for="cat">
                        <input id="cat" type="radio" name="cat" value="existing" v-model="categoryChoice" />
                        Catégorie existante
                    </label>
                </div>
                <div>
                    <label for="cat-input">Nom : </label>
                    <input id="cat-input" type="text" :disabled="categoryChoice === 'new'" />
                </div>
            </div>
        </div>

        <h2>{{ preview ? 'Aperçu' : 'Contenu' }} <button id="preview" @click="preview = !preview">{{ preview ? 'Contenu' : 'Aperçu (CTRL+P)'}}</button></h2>

        <textarea id="editor" v-model="text" v-if="!preview" @keydown="editorKey" ref="editor"></textarea>
        <div id="editor" class="preview" v-if="preview" v-html="result"></div>

        <div id="bottom-buttons">
            <button>Enregistrer</button>
            <button>Annuler</button>

            <span id="saving" v-if="saving">Sauvegarde...</span>
        </div>
    </div>
</template>

<script>
    import marked from 'marked';
    import codify from '../codify';

    export default {
        name: 'add',
        mounted() {
            const save = localStorage.getItem('autosave');

            if (save) {
                this.text = save;
            }

            this.interval = setInterval(() => {
                this.save();
            }, 60000);

            document.addEventListener('keydown', this.documentKey);
        },
        destroyed() {
            clearInterval(this.interval);
            document.removeEventListener('keydown', this.documentKey);
        },
        data() {
            return {
                interval: null,
                categoryChoice: 'existing',
                title: '',
                id: '',
                text: '',
                preview: false,
                result: '',
                lastSelect: null,
                saving: false
            };
        },
        methods: {
            save() {
                if (!this.saving) {
                    setTimeout(() => this.saving = false, 2000);
                }

                this.saving = true;
                localStorage.setItem('autosave', this.text);
            },
            documentKey(e) {
                if (e.ctrlKey && e.key === 'p') {
                    e.preventDefault();
                    this.preview = !this.preview;

                    return;
                }
            },
            editorKey(e) {
                if (e.ctrlKey && e.key === 's') {
                    e.preventDefault();
                    this.save();

                    return;
                }

                codify(this.$refs.editor, e, val => this.text = val);
            },
            submit() {
                clearInterval(this.interval);
                localStorage.removeItem('autosave');
            }
        },
        watch: {
            categoryChoice(val) {
                if (val === 'new') {
                    setTimeout(() => this.$refs.newField.focus(), 100);
                }
            },
            preview(val) {
                if (val) {
                    this.lastSelect = [this.$refs.editor.selectionStart, this.$refs.editor.selectionEnd];
                    this.result = '<h1>' + (this.title || 'Titre' ) + ' <span class="id">#' + (this.id || 'ID-00').toUpperCase() + '</span></h1>'
                        + marked(this.text);
                } else {
                    if (this.lastSelect) {
                        setTimeout(() => {
                            this.$refs.editor.selectionStart = this.lastSelect[0];
                            this.$refs.editor.selectionEnd = this.lastSelect[1];

                            this.lastSelect = null;
                        }, 100);
                    }

                    setTimeout(() => this.$refs.editor.focus(), 100);
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../viewer';

    #add {
        padding: 30px;
        box-sizing: border-box;

        font-family: 'Helvetica-Neue', 'Roboto', 'Arial', sans-serif;

        height: calc(100vh - 75px);

        display: flex;
        flex-direction: column;
    }

    #header {
        margin: 0;
    }

    input, textarea {
        border: none;

        background-color: #dddddd;
        color: black;
    }

    #options {
        display: flex;

        .sub-option {
            width: 50%;

            div {
                margin-bottom: 10px;
            }

            &.cat {
                margin-top: -62px; /* mphphph */
            }
        }

        input {
            height: 15px;
            padding: 5px;

            border-radius: 2px;

            &[type=text] {
                width: calc(100% - 100px);
                max-width: 275px;
            }

            &[disabled] {
                background-color: #ccc;
            }
        }

        label[for=add-cat-input], label[for=cat-input] {
            margin-left: 25px;
        }

        label {
            display: inline-block;

            min-width: 50px;
            margin-right: 10px;
        }
    }

    #preview {
        margin-left: 5px;
    }

    #editor {
        width: calc(100% - 20px);

        margin: 10px;
        margin-top: 0;
        padding: 10px;
        box-sizing: border-box;

        border-radius: 4px;

        flex: 2;

        font-size: 14px;

        &.preview {
            @include viewer();
        }
    }

    #bottom-buttons {
        padding: 10px;
        padding-bottom: 0;

        #saving {
            color: #666;
            margin-left: 15px;

            font-size: 14px;
        }
    }
</style>
