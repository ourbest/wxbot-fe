<style scoped>
    .tools {
        margin-top: 10px;
    }

    .text {
        /*min-height: 600px;*/
    }

    #editor {
        position: relative;
    }

    #editor-toolbar {
        z-index: 5000000;
        border: 1px solid #ccc;
        background-color: #eee;
    }

    #editor-body {
        height: 600px;
        border: 1px solid #ccc;
        border-top: 0;
        text-align: left;
    }

    #js_content {
        font-size: 16px;
        word-wrap: break-word;
        -webkit-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;
        width: 740px;
        margin-left: auto;
        margin-right: auto;
    }

    #js_content table {
        margin-bottom: 10px;
        border-collapse: collapse;
        display: table;
        width: 100% !important;
    }

    #js_content * {
        max-width: 100% !important;
        box-sizing: border-box !important;
        -webkit-box-sizing: border-box !important;
        word-wrap: break-word !important;
    }
</style>
<template>
    <div class="editor-wrapper">
        <h2>编辑文章</h2>
        <div id="editor">
            <div id="editor-toolbar" class="toolbar">
            </div>
            <div id="editor-body" class="text"> <!--可使用 min-height 实现编辑区域自动增加高度-->
                <p>请输入内容</p>
            </div>
        </div>
        <div class="tools">
            <Button @click="saveContent" type="primary">保存</Button>
            <Button @click="$router.go(-1)">取消</Button>
        </div>
    </div>
</template>
<script>
    import E from 'wangeditor';
    export default {

        data() {
            return {
                options: {
                    pasteText: true,
                    menus: [
                        'image',  // 插入图片
                        'link',  // 插入链接
                        'undo',  // 撤销
                        'redo'  // 重复
                    ]
                }
            }
        },

        methods: {
            saveContent() {
                this.$Loading.start();
                this.$http.post('/bot/article/content/update', {
                    id: this.uid,
                    content: this.editor.txt.html()
                }).then(() => {
                    this.$Loading.finish();
                    this.$router.go(-1);
                });
            }
        },

        computed: {
            uid() {
                return this.$route.params.uid;
            }
        },

        mounted() {
            this.$http.get('/bot/article/content', {
                params: {
                    id: this.uid
                }
            }).then(resp => {
                const content = resp.data.content;
                this.editor = new E('#editor-toolbar', '#editor-body');
                Object.keys(this.options).map(property => {
                    this.editor.customConfig[property] = this.options[property]
                })

                // create the editor
                this.editor.create();

                // init props content
                this.editor.txt.html(content)
            });
        }
    };
</script>