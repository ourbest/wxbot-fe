<style scoped>
    .article-view {
        width: 700px;
        margin: 20px auto;
        text-align: left;
    }

    .article-view h2 {
        margin-bottom: 10px;
        line-height: 1.4;
        font-weight: 400;
        font-size: 24px;
    }
</style>
<style>
    #js_content {
        font-size: 16px;
        word-wrap: break-word;
        -webkit-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;
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
    <div class="article-view">
        <h2>{{ $route.params.title }}</h2>
        <div v-html="content"></div>
        <Back-top></Back-top>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                content: ''
            }
        },

        computed: {
            uid() {
                return this.$route.params.uid;
            }
        },

        methods: {
            loadContent() {
                this.$http.get('/bot/article/content', {
                    params: {
                        id: this.uid
                    }
                }).then(resp => {
                    this.content = resp.data.content;
                });
            }
        },

        mounted() {
            this.loadContent();
        }
    };
</script>