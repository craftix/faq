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

        <h2>{{ preview ? 'Aperçu' : 'Contenu' }} <button id="preview" @click="preview = !preview">{{ preview ? 'Contenu' : 'Aperçu'}}</button></h2>

        <textarea id="editor" v-if="!preview" @keydown="editorKey" ref="editor"></textarea>
        <div id="editor" class="preview" v-if="preview" v-html="result"></div>
    </div>
</template>

<script>
    import marked from 'marked';

    export default {
        name: 'add',
        data() {
            return {
                categoryChoice: 'existing',
                title: '',
                id: '',
                //text: '',
                preview: false,
                result: ''
            };
        },
        methods: {
            editorKey(e) {
                const a = this.$refs.editor.selectionStart;
                const b = this.$refs.editor.selectionEnd;
                const val = this.$refs.editor.value;
                const set = a => this.$refs.editor.value = a;

                if (a !== b) {
                    if (e.key === 'Tab') {
                        e.preventDefault();


                    }

                    return;
                }

                let spaces = 0;
                let lastLinePos = 0;
                for (const c in val) {
                    if (val[c] === '\n' && c < a) {
                        lastLinePos = parseInt(c) + 1; /// ??
                    }
                }

                switch(e.key) {
                    case 'Enter':
                        e.preventDefault();

                        for (let i = lastLinePos; i < b; i++) {
                            if (val[i] === ' ') {
                                spaces++;
                            } else {
                                break;
                            }
                        }

                        spaces = Math.floor(spaces / 4);

                        if (a > 0 && val[a - 1] === '{' && val[a] === '}') {
                            const shift = '\n' + '    '.repeat(spaces + 1) + '\n';

                            set(this.$refs.editor.value = val.substring(0, a)
                                + shift + '    '.repeat(spaces)
                                + val.substring(b));

                            this.$refs.editor.selectionEnd = a + shift.length -1;
                            break;
                            //spaces++;
                        }

                        set(val.substring(0, a)
                            + '\n'
                            + '    '.repeat(spaces)
                            + val.substring(b));

                        this.$refs.editor.selectionEnd = a + spaces * 4 + 1;

                        break;
                    case 'Tab':
                        e.preventDefault();
                        const shift = ' '.repeat(4 - ((a - lastLinePos) % 4));

                        set(val.substring(0, a)
                            + shift
                            + val.substring(b));

                        this.$refs.editor.selectionEnd = a + shift.length;

                        break;
                    case 'Backspace':
                        e.preventDefault();

                        for (let i = a - 1; i >= 0; i--) {
                            if (val[i] === ' ' && spaces < 4) {
                                spaces++;
                            } else {
                                break;
                            }
                        }

                        const newPos = a - (spaces >= 4 ? 4 : 1);
                        set(val.substring(0, newPos) + val.substring(b));

                        this.$refs.editor.selectionEnd = newPos;

                        break;
                    case '{':
                        e.preventDefault();

                        set(val.substring(0, a)
                            + '{}'
                            + val.substring(b));

                        this.$refs.editor.selectionEnd = a + 1;

                        break;
                    case '(':
                        e.preventDefault();

                        set(val.substring(0, a)
                            + '()'
                            + val.substring(b));

                        this.$refs.editor.selectionEnd = a + 1;

                        break;

                    case '"':
                        e.preventDefault();

                        set(val.substring(0, a)
                            + '""'
                            + val.substring(b));

                        this.$refs.editor.selectionEnd = a + 1;

                        break;
                    case "'":
                        e.preventDefault();

                        set(val.substring(0, a)
                            + "''"
                            + val.substring(b));

                        this.$refs.editor.selectionEnd = a + 1;

                        break;
                }
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
                    this.result = '<h1>' + (this.title || 'Titre' ) + ' <span class="id">#' + (this.id || 'ID-00').toUpperCase() + '</span></h1>'
                        + marked(this.$refs.editor.value);
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
</style>
