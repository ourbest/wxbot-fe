<style scoped>

</style>
<template>
    <div class="editor-wrapper">
        <vue-wangeditor v-model="content"></vue-wangeditor>
    </div>
</template>
<script>
    import VueWangeditor from 'vue-wangeditor';
    export default {
        components: {
            VueWangeditor
        },

        data() {
            return {
                content: ''
            }
        },

        methods: {
            saveContent() {
                this.$Loading.start();
                this.$http.post('/bot/article/content/update', {
                    id: this.uid,
                    content: this.content
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
                this.content = resp.data.content;
            });
        }
    };
</script>