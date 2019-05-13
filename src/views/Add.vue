<template>
    <div id="add">
        <h1 id="header">Ajouter une question</h1>

        <div id="options">
            <div class="sub-option">
                <h2>Informations</h2>

                <div><label for="title">Titre :</label> <input id="title" type="text" placeholder="Launchwrapper introuvable" /></div>
                <div><label for="id">ID :</label><input id="id" type="text" placeholder="LW-01" /></div>
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

        <h2>{{ preview ? 'Preview' : 'Contenu' }} <button id="preview" @click="preview = !preview">{{ preview ? 'Contenu' : 'Preview'}}</button></h2>

        <textarea id="editor" v-model="text" v-if="!preview"></textarea>
        <div id="editor" v-if="preview" v-html="result"></div>
    </div>
</template>

<script>
    import marked from 'marked';

    export default {
        name: 'add',
        data() {
            return {
                categoryChoice: 'existing',
                text: '',
                preview: false,
                result: ''
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
                    this.result = marked(this.text);
                }
            }
        }
    }
</script>

<style lang="scss">
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
    }
</style>
